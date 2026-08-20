import { useSyncExternalStore } from "react";

type CartItem = { id: string; qty: number; size: string; color: string; selected?: boolean; variantId?: string; variantLabel?: string; unitPrice?: number; /** Foto da variante escolhida (mostrada no carrinho e nos pedidos). */ image?: string };
type User = { email: string; uid?: string; name?: string; photoURL?: string };
type State = {
  cart: CartItem[];
  favorites: string[];
  user: User | null;
  loginOpen: boolean;
  cartDrawerOpen: boolean;
  favDrawerOpen: boolean;
  profileDrawerOpen: boolean;
  menuOpen: boolean;
  notifDrawerOpen: boolean;
};

const KEY = "shop_state_v1";
const initial: State = {
  cart: [], favorites: [], user: null,
  loginOpen: false, cartDrawerOpen: false, favDrawerOpen: false, profileDrawerOpen: false,
  menuOpen: false, notifDrawerOpen: false,
};


let state: State = (() => {
  if (typeof window === "undefined") return initial;
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "");
    return { ...initial, ...saved, loginOpen: false, cartDrawerOpen: false, favDrawerOpen: false, profileDrawerOpen: false, menuOpen: false, notifDrawerOpen: false };
  } catch { return initial; }
})();

const listeners = new Set<() => void>();
function emit() {
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(state));
  listeners.forEach(l => l());
}
function subscribe(l: () => void) { listeners.add(l); return () => listeners.delete(l); }

export function useStore() {
  return useSyncExternalStore(subscribe, () => state, () => initial);
}

export const actions = {
  addToCart(item: CartItem) {
    const next = { selected: true, ...item };
    const existing = state.cart.find(c => c.id === item.id && c.size === item.size && c.color === item.color && c.variantId === item.variantId);
    if (existing) {
      state = { ...state, cart: state.cart.map(c => c === existing ? { ...c, qty: c.qty + item.qty, selected: true } : c) };
    } else {
      state = { ...state, cart: [...state.cart, next] };
    }
    if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate([15, 40, 15]);
    emit();
  },

  removeFromCart(idx: number) {
    state = { ...state, cart: state.cart.filter((_, i) => i !== idx) };
    emit();
  },
  clearCart() {
    state = { ...state, cart: [] };
    emit();
  },
  removeSelected() {
    state = { ...state, cart: state.cart.filter((c) => c.selected === false) };
    emit();
  },
  toggleSelected(idx: number) {
    state = { ...state, cart: state.cart.map((c, i) => i === idx ? { ...c, selected: c.selected === false } : c) };
    emit();
  },
  setAllSelected(value: boolean) {
    state = { ...state, cart: state.cart.map((c) => ({ ...c, selected: value })) };
    emit();
  },
  updateQty(idx: number, qty: number) {
    if (qty < 1) return;
    state = { ...state, cart: state.cart.map((c, i) => i === idx ? { ...c, qty } : c) };
    emit();
  },
  toggleFavorite(id: string) {
    state = {
      ...state,
      favorites: state.favorites.includes(id)
        ? state.favorites.filter(f => f !== id)
        : [...state.favorites, id],
    };
    if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(20);
    emit();
  },
  signIn(email: string) {
    state = { ...state, user: { ...(state.user ?? {}), email }, loginOpen: false };
    emit();
  },
  /** Sincroniza o usuário autenticado (Firebase Auth). */
  setUser(user: User | null) {
    state = { ...state, user, loginOpen: user ? false : state.loginOpen };
    emit();
  },
  signOut() {
    state = { ...state, user: null };
    emit();
  },
  openLogin() { state = { ...state, loginOpen: true }; emit(); },
  closeLogin() { state = { ...state, loginOpen: false }; emit(); },
  openCartDrawer() { state = { ...state, cartDrawerOpen: true }; emit(); },
  closeCartDrawer() { state = { ...state, cartDrawerOpen: false }; emit(); },
  openFavDrawer() { state = { ...state, favDrawerOpen: true }; emit(); },
  closeFavDrawer() { state = { ...state, favDrawerOpen: false }; emit(); },
  openProfileDrawer() { state = { ...state, profileDrawerOpen: true }; emit(); },
  closeProfileDrawer() { state = { ...state, profileDrawerOpen: false }; emit(); },
  openMenu() { state = { ...state, menuOpen: true }; emit(); },
  closeMenu() { state = { ...state, menuOpen: false }; emit(); },
  setMenu(v: boolean) { state = { ...state, menuOpen: v }; emit(); },
  openNotifDrawer() { state = { ...state, notifDrawerOpen: true }; emit(); },
  closeNotifDrawer() { state = { ...state, notifDrawerOpen: false }; emit(); },
};

