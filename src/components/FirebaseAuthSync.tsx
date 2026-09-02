import { useEffect, useRef } from "react";
import { useRouter } from "@tanstack/react-router";

import { actions } from "@/lib/store";
import { firebaseEnabled } from "@/lib/firebase/client";

/**
 * Mantém o estado local em sincronia com o Firebase Auth. Não renderiza nada.
 * Todo o SDK do Firebase é carregado depois da hidratação (import dinâmico),
 * para não pesar no JavaScript inicial da página.
 */
export function FirebaseAuthSync() {
  const stopOrders = useRef<(() => void) | null>(null);
  const lastUid = useRef<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!firebaseEnabled) return;
    let disposed = false;
    let stopAuth: (() => void) | null = null;

    void (async () => {
      const [
        { initAnalytics },
        { subscribeToUser },
        { upsertUserProfile },
        { watchStaff },
        { initOrdersBridge, watchOrders },
        { rememberEmail },
        { captureReferralFromUrl, recordReferralOnce },
        { bindFollows },
        { bindNotifications },
        { setOrdersOwner },
        { setNotificationsOwner },
        { bindPoints },
      ] = await Promise.all([
        import("@/lib/firebase/client"),
        import("@/lib/firebase/auth"),
        import("@/lib/firebase/user-data"),
        import("@/lib/firebase/roles"),
        import("@/lib/firebase/orders"),
        import("@/lib/firebase/email-index"),
        import("@/lib/firebase/referrals"),
        import("@/lib/firebase/follows"),
        import("@/lib/firebase/notifications"),
        import("@/lib/orders-store"),
        import("@/lib/notifications-store"),
        import("@/lib/points"),
      ]);
      if (disposed) return;

      captureReferralFromUrl();
      void initAnalytics();
      initOrdersBridge();

      stopAuth = subscribeToUser((user) => {
        stopOrders.current?.();
        stopOrders.current = null;
        if (!user) {
          const wasSignedIn = lastUid.current !== null;
          lastUid.current = null;
          actions.setUser(null);
          watchStaff(null);
          bindPoints(null);
          bindFollows(null);
          bindNotifications(null);
          setNotificationsOwner(null);
          setOrdersOwner(null);
          if (wasSignedIn) void router.invalidate();
          return;
        }
        const isNewSession = lastUid.current !== user.uid;
        lastUid.current = user.uid;
        setOrdersOwner(user.uid);
        setNotificationsOwner(user.uid);
        bindNotifications(user.uid);
        actions.setUser({
          email: user.email,
          uid: user.uid,
          name: user.name,
          photoURL: user.photoURL,
        });
        // Sessão activa: nenhum ecrã de login pode continuar aberto.
        if (isNewSession) {
          actions.closeLogin();
          void router.invalidate();
        }
        void upsertUserProfile(user);
        void recordReferralOnce(user.uid);
        bindPoints(user.uid);
        bindFollows(user.uid);
        if (user.email) void rememberEmail(user.email);
        watchStaff(user.uid);
        stopOrders.current = watchOrders(user.uid, false);
      });
      if (disposed) {
        stopAuth?.();
        stopAuth = null;
      }
    })();

    return () => {
      disposed = true;
      stopAuth?.();
      stopOrders.current?.();
      stopOrders.current = null;
    };
  }, [router]);

  return null;
}
