import { r as getFirebaseAuth } from "./client-C80F8PZn.mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/send-Dtuv1lVJ.js
/**
* Helper reutilizável do frontend para pedir o envio de um e-mail.
* Nunca fala com o Resend directamente — chama a API serverless /api/email
* com o ID token do Firebase, para a chave nunca aparecer no browser.
*/
var send_exports = /* @__PURE__ */ __exportAll({ sendAppEmail: () => sendAppEmail });
async function sendAppEmail(template, to, data) {
	try {
		const user = getFirebaseAuth()?.currentUser;
		const idToken = user ? await user.getIdToken() : "";
		if (!idToken) return false;
		return (await fetch("/api/email", {
			method: "POST",
			headers: {
				"content-type": "application/json",
				authorization: `Bearer ${idToken}`
			},
			body: JSON.stringify({
				template,
				to,
				data
			})
		})).ok;
	} catch {
		return false;
	}
}
//#endregion
export { send_exports as n, sendAppEmail as t };
