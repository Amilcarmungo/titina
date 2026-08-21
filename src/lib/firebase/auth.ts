import {
  EmailAuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  browserLocalPersistence,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  getRedirectResult,
  linkWithCredential,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  updatePassword,
  updateProfile,
  verifyPasswordResetCode,
  type AuthCredential,
  type User,
} from "firebase/auth";

import { getFirebaseAuth } from "./client";
import { emailIsRegistered, rememberEmail } from "./email-index";

export type AppUser = {
  uid: string;
  email: string;
  name?: string;
  photoURL?: string;
  provider?: string;
};

export function toAppUser(u: User): AppUser {
  return {
    uid: u.uid,
    email: u.email ?? "",
    name: u.displayName ?? undefined,
    photoURL: u.photoURL ?? undefined,
    provider: u.providerData[0]?.providerId,
  };
}

export function subscribeToUser(cb: (user: AppUser | null) => void) {
  const auth = getFirebaseAuth();
  if (!auth) return () => {};
  // Sessão persistente no dispositivo: entra uma vez, continua entrado.
  void setPersistence(auth, browserLocalPersistence).catch(() => {});
  // Conclui um login que voltou por redirect (mobile/webview) sem pedir nada.
  void getRedirectResult(auth).catch(() => {});
  return onAuthStateChanged(auth, (u) => cb(u ? toAppUser(u) : null));
}

function requireAuthInstance() {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase não está configurado.");
  return auth;
}

/**
 * Descobre se o email já tem conta (passo 1 do login) sem permitir enumeração:
 * consultamos apenas o hash SHA-256 do email no índice do Firestore.
 * `null` = indeterminado (o ecrã segue para cadastro e o Firebase valida).
 */
export async function emailHasAccount(email: string): Promise<boolean | null> {
  requireAuthInstance();
  return emailIsRegistered(email);
}

export async function signInWithEmail(email: string, password: string) {
  const auth = requireAuthInstance();
  const cred = await signInWithEmailAndPassword(
    auth,
    email.trim().toLowerCase(),
    password,
  );
  void rememberEmail(email);
  return toAppUser(cred.user);
}

export async function signUpWithEmail(
  email: string,
  password: string,
  name?: string,
) {
  const auth = requireAuthInstance();
  const cred = await createUserWithEmailAndPassword(
    auth,
    email.trim().toLowerCase(),
    password,
  );
  if (name) await updateProfile(cred.user, { displayName: name });
  void rememberEmail(email);
  return toAppUser(cred.user);
}

/**
 * Erro especial: o email já tem conta com senha. Guardamos a credencial do
 * Google para a LIGAR à conta existente — nenhum método é eliminado, o
 * utilizador passa a poder entrar com Google **ou** com a senha.
 */
export class NeedsPasswordLinkError extends Error {
  constructor(
    readonly email: string,
    readonly credential: AuthCredential,
  ) {
    super(
      "Esta conta já usa email e senha. Confirme a senha para ligar o Google.",
    );
    this.name = "NeedsPasswordLinkError";
  }
}

export async function signInWithGoogle() {
  const auth = requireAuthInstance();
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  try {
    const cred = await signInWithPopup(auth, provider);
    // Usa nome e foto da conta Google.
    if (cred.user.email) void rememberEmail(cred.user.email);
    return toAppUser(cred.user);
  } catch (err) {
    const code = (err as { code?: string }).code ?? "";
    // Popup bloqueado (comum em mobile/webviews): cai para redirect.
    if (
      code === "auth/popup-blocked" ||
      code === "auth/operation-not-supported-in-this-environment"
    ) {
      await signInWithRedirect(auth, provider);
      return null;
    }
    if (code === "auth/account-exists-with-different-credential") {
      const credential = GoogleAuthProvider.credentialFromError(err as never);
      const email =
        (err as { customData?: { email?: string } }).customData?.email ?? "";
      if (credential && email)
        throw new NeedsPasswordLinkError(email, credential);
    }
    throw err;
  }
}

export async function signInWithFacebook() {
  const auth = requireAuthInstance();
  const provider = new FacebookAuthProvider();
  try {
    const cred = await signInWithPopup(auth, provider);
    if (cred.user.email) void rememberEmail(cred.user.email);
    return toAppUser(cred.user);
  } catch (err) {
    const code = (err as { code?: string }).code ?? "";
    if (
      code === "auth/popup-blocked" ||
      code === "auth/operation-not-supported-in-this-environment"
    ) {
      await signInWithRedirect(auth, provider);
      return null;
    }
    throw err;
  }
}

/** Entra com a senha existente e liga o Google à mesma conta (dois métodos activos). */
export async function linkGoogleToPasswordAccount(
  email: string,
  password: string,
  credential: AuthCredential,
) {
  const auth = requireAuthInstance();
  const cred = await signInWithEmailAndPassword(
    auth,
    email.trim().toLowerCase(),
    password,
  );
  try {
    await linkWithCredential(cred.user, credential);
  } catch (err) {
    // Já estava ligado — não é um erro para o utilizador.
    if ((err as { code?: string }).code !== "auth/provider-already-linked")
      throw err;
  }
  void rememberEmail(email);
  return toAppUser(cred.user);
}

/** Métodos de entrada activos na conta actual. */
export function activeSignInMethods(): { password: boolean; google: boolean } {
  const user = getFirebaseAuth()?.currentUser;
  const ids = user?.providerData.map((p) => p.providerId) ?? [];
  return {
    password: ids.includes("password"),
    google: ids.includes("google.com"),
  };
}

/** Acrescenta (ou actualiza) a senha da conta — o Google continua activo. */
export async function ensurePasswordMethod(password: string) {
  const auth = requireAuthInstance();
  const user = auth.currentUser;
  if (!user?.email) throw new Error("Entre na sua conta primeiro.");
  const already = user.providerData.some((p) => p.providerId === "password");
  if (already) {
    await updatePassword(user, password);
    return;
  }
  await linkWithCredential(
    user,
    EmailAuthProvider.credential(user.email, password),
  );
}

/** Liga o Google a uma conta que hoje só tem senha (a partir das configurações). */
export async function linkGoogleToCurrentAccount() {
  const auth = requireAuthInstance();
  const user = auth.currentUser;
  if (!user) throw new Error("Entre na sua conta primeiro.");
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  const { linkWithPopup } = await import("firebase/auth");
  await linkWithPopup(user, provider);
}

export async function resetPassword(email: string) {
  const auth = requireAuthInstance();
  await sendPasswordResetEmail(auth, email.trim().toLowerCase(), {
    url: `${window.location.origin}/auth`,
  });
}

export async function validatePasswordResetCode(code: string) {
  const auth = requireAuthInstance();
  return verifyPasswordResetCode(auth, code);
}

export async function completePasswordReset(code: string, password: string) {
  const auth = requireAuthInstance();
  await confirmPasswordReset(auth, code, password);
}

export async function signOutUser() {
  const auth = getFirebaseAuth();
  if (auth) await signOut(auth);
}

/** Mensagens de erro em português para os códigos do Firebase Auth. */
export function authErrorMessage(err: unknown): string {
  const code = (err as { code?: string }).code ?? "";
  switch (code) {
    case "auth/invalid-email":
      return "Email inválido.";
    case "auth/missing-password":
      return "Digite sua senha.";
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Senha incorreta.";
    case "auth/user-not-found":
      return "Não encontramos essa conta.";
    case "auth/email-already-in-use":
      return "Esse email já tem conta. Faça login.";
    case "auth/weak-password":
      return "Senha muito fraca (mínimo 8 caracteres).";
    case "auth/too-many-requests":
      return "Muitas tentativas. Tente novamente em alguns minutos.";
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "Login social cancelado.";
    case "auth/network-request-failed":
      return "Sem conexão. Verifique sua internet.";
    case "auth/unauthorized-domain":
      return "Domínio não autorizado no Firebase Auth.";
    default:
      return (
        (err as Error)?.message?.replace("Firebase: ", "") ||
        "Não foi possível continuar."
      );
  }
}
