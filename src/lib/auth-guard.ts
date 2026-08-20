import { actions } from "@/lib/store";

/** Returns true if user is authenticated. Otherwise triggers login flow.
 *  On desktop → opens login modal. On mobile → navigates to /auth. */
export function requireAuth(user: { email: string } | null): boolean {
  if (user) return true;
  if (typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches) {
    actions.openLogin();
  } else if (typeof window !== "undefined") {
    window.location.assign("/auth");
  }
  return false;
}
