import { Suspense, lazy, useEffect, useState } from "react";

import { useStore } from "@/lib/store";

const OverlaysBundle = lazy(() => import("@/components/OverlaysBundle"));

/**
 * Carrega os painéis (menu, login, carrinho, favoritos, perfil, avisos) assim
 * que o navegador fica livre — ou imediatamente se o utilizador abrir um deles
 * antes disso. Mantém exactamente o mesmo comportamento, sem pesar no arranque.
 */
export function DeferredOverlays({
  menuOpen,
  onMenuOpenChange,
}: {
  menuOpen: boolean;
  onMenuOpenChange: (v: boolean) => void;
}) {
  const {
    loginOpen,
    cartDrawerOpen,
    favDrawerOpen,
    profileDrawerOpen,
    notifDrawerOpen,
  } = useStore();
  const wanted =
    menuOpen ||
    loginOpen ||
    cartDrawerOpen ||
    favDrawerOpen ||
    profileDrawerOpen ||
    notifDrawerOpen;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;
    const idle = (
      window as unknown as {
        requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      }
    ).requestIdleCallback;
    if (idle) {
      const id = idle(() => setReady(true), { timeout: 2500 });
      return () =>
        (
          window as unknown as { cancelIdleCallback?: (id: number) => void }
        ).cancelIdleCallback?.(id);
    }
    const t = setTimeout(() => setReady(true), 1200);
    return () => clearTimeout(t);
  }, [ready]);

  if (!ready && !wanted) return null;

  return (
    <Suspense fallback={null}>
      <OverlaysBundle menuOpen={menuOpen} onMenuOpenChange={onMenuOpenChange} />
    </Suspense>
  );
}
