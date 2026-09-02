import { MobileMenu } from "@/components/MobileMenu";
import { LoginModal } from "@/components/LoginModal";
import {
  CartDrawer,
  FavoritesDrawer,
  ProfileDrawer,
  NotificationsDrawer,
} from "@/components/SideDrawers";

/**
 * Todos os painéis que só aparecem depois de uma acção do utilizador.
 * Ficam num pacote separado, carregado depois da página estar utilizável.
 */
export default function OverlaysBundle({
  menuOpen,
  onMenuOpenChange,
}: {
  menuOpen: boolean;
  onMenuOpenChange: (v: boolean) => void;
}) {
  return (
    <>
      <MobileMenu open={menuOpen} onOpenChange={onMenuOpenChange} />
      <LoginModal />
      <CartDrawer />
      <FavoritesDrawer />
      <ProfileDrawer />
      <NotificationsDrawer />
    </>
  );
}
