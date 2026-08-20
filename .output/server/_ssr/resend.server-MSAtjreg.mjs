import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/resend.server-MSAtjreg.js
var RESEND_ENDPOINT = "https://api.resend.com/emails";
async function sendWithResend(input) {
	const apiKey = processModule.env["RESEND_API_KEY"];
	if (!apiKey) throw new Error("RESEND_API_KEY não configurada.");
	const from = processModule.env["EMAIL_FROM"] ?? "Bazarixy <nao-responder@bazarixy.com>";
	const res = await fetch(RESEND_ENDPOINT, {
		method: "POST",
		headers: {
			"content-type": "application/json",
			authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			from,
			to: [input.to],
			subject: input.subject,
			html: input.html,
			...input.replyTo ? { reply_to: input.replyTo } : {}
		})
	});
	const body = await res.text();
	if (!res.ok) {
		console.error(`Resend falhou [${res.status}]: ${body}`);
		throw new Error(`Resend falhou [${res.status}]: ${body}`);
	}
	return { id: JSON.parse(body).id ?? "" };
}
/**
* Confirma que o pedido vem de um utilizador autenticado no Firebase e devolve
* o e-mail verificado do token (evita que alguém envie e-mails para terceiros).
*/
async function verifyFirebaseIdToken(idToken) {
	const apiKey = {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_FIREBASE_API_KEY": "AIzaSyDpOPBg4lerbbBHqOYH1qdhjqzzg2tzCkA",
		"VITE_FIREBASE_APP_ID": "1:161966137396:web:9f8c521b602dbfb00daa61",
		"VITE_FIREBASE_AUTH_DOMAIN": "auth.bazarixy.com",
		"VITE_FIREBASE_MEASUREMENT_ID": "G-YTKW4E8XX2",
		"VITE_FIREBASE_MESSAGING_SENDER_ID": "161966137396",
		"VITE_FIREBASE_PROJECT_ID": "bazarixymy",
		"VITE_FIREBASE_STORAGE_BUCKET": "bazarixymy.firebasestorage.app",
		"VITE_SUPABASE_PROJECT_ID": "mqpblpflcnpbwkxfmrhs",
		"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_XSYTCkV5qFNEgK-zkDk4yA_FmQjid-7",
		"VITE_SUPABASE_URL": "https://mqpblpflcnpbwkxfmrhs.supabase.co"
	}["VITE_FIREBASE_API_KEY"];
	if (!apiKey || !idToken) return null;
	const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ idToken })
	});
	if (!res.ok) return null;
	const u = (await res.json()).users?.[0];
	return u ? {
		uid: u.localId,
		email: (u.email ?? "").toLowerCase()
	} : null;
}
/**
* Confirma no Firestore (com o próprio token do utilizador, respeitando as
* regras) se quem pede é membro activo da equipa. Só a equipa pode enviar
* e-mails para outros endereços — por exemplo o estado de um pedido.
*/
async function isActiveStaff(idToken, uid) {
	const projectId = {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_FIREBASE_API_KEY": "AIzaSyDpOPBg4lerbbBHqOYH1qdhjqzzg2tzCkA",
		"VITE_FIREBASE_APP_ID": "1:161966137396:web:9f8c521b602dbfb00daa61",
		"VITE_FIREBASE_AUTH_DOMAIN": "auth.bazarixy.com",
		"VITE_FIREBASE_MEASUREMENT_ID": "G-YTKW4E8XX2",
		"VITE_FIREBASE_MESSAGING_SENDER_ID": "161966137396",
		"VITE_FIREBASE_PROJECT_ID": "bazarixymy",
		"VITE_FIREBASE_STORAGE_BUCKET": "bazarixymy.firebasestorage.app",
		"VITE_SUPABASE_PROJECT_ID": "mqpblpflcnpbwkxfmrhs",
		"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_XSYTCkV5qFNEgK-zkDk4yA_FmQjid-7",
		"VITE_SUPABASE_URL": "https://mqpblpflcnpbwkxfmrhs.supabase.co"
	}["VITE_FIREBASE_PROJECT_ID"];
	if (!projectId || !idToken || !uid) return false;
	const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/staff/${uid}`;
	const res = await fetch(url, { headers: { authorization: `Bearer ${idToken}` } });
	if (!res.ok) return false;
	const doc = await res.json();
	const role = doc.fields?.role?.stringValue;
	return doc.fields?.active?.booleanValue === true && (role === "admin" || role === "gerente" || role === "atendente");
}
//#endregion
export { isActiveStaff, sendWithResend, verifyFirebaseIdToken };
