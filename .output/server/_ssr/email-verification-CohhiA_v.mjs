import "../_libs/firebase.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/email-verification-CohhiA_v.js
async function requestSignupVerification(email, name) {
	const response = await fetch("/api/signup-verification", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			action: "request",
			email,
			name
		})
	});
	const data = await response.json();
	if (!response.ok) throw new Error(data.error ?? "Não foi possível enviar o código.");
	return true;
}
async function verifySignupVerification(code) {
	const response = await fetch("/api/signup-verification", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			action: "verify",
			code
		})
	});
	const data = await response.json();
	if (!response.ok || !data.ok) return {
		ok: false,
		error: data.error ?? "Código inválido."
	};
	return {
		ok: true,
		email: data.email ?? ""
	};
}
//#endregion
export { verifySignupVerification as n, requestSignupVerification as t };
