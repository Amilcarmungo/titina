import { useEffect, useRef } from "react";
import { useRouter } from "@tanstack/react-router";

import { actions } from "@/lib/store";
import { firebaseEnabled, initAnalytics } from "@/lib/firebase/client";
import { subscribeToUser } from "@/lib/firebase/auth";
import { upsertUserProfile } from "@/lib/firebase/user-data";
import { watchStaff } from "@/lib/firebase/roles";
import { initOrdersBridge, watchOrders } from "@/lib/firebase/orders";
import { rememberEmail } from "@/lib/firebase/email-index";
import { captureReferralFromUrl, recordReferralOnce } from "@/lib/firebase/referrals";
import { bindFollows } from "@/lib/firebase/follows";
import { bindNotifications } from "@/lib/firebase/notifications";
import { setOrdersOwner } from "@/lib/orders-store";
import { setNotificationsOwner } from "@/lib/notifications-store";
import { bindPoints } from "@/lib/points";

/** Mantém o estado local em sincronia com o Firebase Auth. Não renderiza nada. */
export function FirebaseAuthSync() {
  const stopOrders = useRef<(() => void) | null>(null);
  const lastUid = useRef<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!firebaseEnabled) return;
    captureReferralFromUrl();
    void initAnalytics();
    initOrdersBridge();
    return subscribeToUser((user) => {
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
  }, [router]);

  return null;
}
