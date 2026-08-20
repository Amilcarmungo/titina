globalThis.__nitro_main__ = import.meta.url;
import { n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"3aee-Zo8J2wVztANN0xilF2Btpy6g7qI\"",
		"mtime": "2026-08-20T19:50:21.959Z",
		"size": 15086,
		"path": "../public/favicon.ico"
	},
	"/assets/AdminModal--9ebiBsW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bbb-cbpaHG68ay4Zokv//2GnmR9qxjs\"",
		"mtime": "2026-08-20T19:50:17.919Z",
		"size": 3003,
		"path": "../public/assets/AdminModal--9ebiBsW.js"
	},
	"/assets/AdminTabs-rhiuWfzK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"317-ww8a49ogQoJIkj/l7ai3kEgUMwA\"",
		"mtime": "2026-08-20T19:50:17.919Z",
		"size": 791,
		"path": "../public/assets/AdminTabs-rhiuWfzK.js"
	},
	"/assets/Layout-MH2dn77m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a3c2-S9jJA20KtDK5/TUSrtExM11oCxk\"",
		"mtime": "2026-08-20T19:50:17.919Z",
		"size": 107458,
		"path": "../public/assets/Layout-MH2dn77m.js"
	},
	"/assets/ProductCard-Bo71VzqN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"602-dkVOsZtOdxGCbQP9QWw52WLIxz0\"",
		"mtime": "2026-08-20T19:50:17.919Z",
		"size": 1538,
		"path": "../public/assets/ProductCard-Bo71VzqN.js"
	},
	"/assets/ShareSheet-Div4sICL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1043-7bziu9gJm/uzDzXwMTXfIEoCoVM\"",
		"mtime": "2026-08-20T19:50:17.919Z",
		"size": 4163,
		"path": "../public/assets/ShareSheet-Div4sICL.js"
	},
	"/assets/admin-B3lYkNjC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ece-YFTTLPpVuZB0cK8bsNfSR82DsVA\"",
		"mtime": "2026-08-20T19:50:17.919Z",
		"size": 11982,
		"path": "../public/assets/admin-B3lYkNjC.js"
	},
	"/assets/admin.abas._id-BGus7NvG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"34fd-YErxMEP7iMMpCaFKR8UjmQXgFBA\"",
		"mtime": "2026-08-20T19:50:17.919Z",
		"size": 13565,
		"path": "../public/assets/admin.abas._id-BGus7NvG.js"
	},
	"/assets/admin.categorias-DT4fA0l5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f1d-wnfW7//PHj3X9A/l9UnCiR/wvZk\"",
		"mtime": "2026-08-20T19:50:17.919Z",
		"size": 12061,
		"path": "../public/assets/admin.categorias-DT4fA0l5.js"
	},
	"/assets/admin.config-CMxJ2edx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"94a-azsEvq2/OPvu6WJ8oS3mRCrEDUg\"",
		"mtime": "2026-08-20T19:50:17.919Z",
		"size": 2378,
		"path": "../public/assets/admin.config-CMxJ2edx.js"
	},
	"/assets/admin.cupons-BN_Hu3dH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1576-AhClAZzRksuj0tyWaDgZIyOHYto\"",
		"mtime": "2026-08-20T19:50:17.919Z",
		"size": 5494,
		"path": "../public/assets/admin.cupons-BN_Hu3dH.js"
	},
	"/assets/admin.equipa-Ba3bhAou.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"166a-ZUgUXpKUWelC9RfBssYnlc8ux7Q\"",
		"mtime": "2026-08-20T19:50:17.919Z",
		"size": 5738,
		"path": "../public/assets/admin.equipa-Ba3bhAou.js"
	},
	"/assets/admin.home-C5FT34g5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4295-v2kCHwIvTrEDgBfd4BvV2NLl1/A\"",
		"mtime": "2026-08-20T19:50:17.919Z",
		"size": 17045,
		"path": "../public/assets/admin.home-C5FT34g5.js"
	},
	"/assets/admin.index-x2M5Bhsq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2715-zzN/ja36QJ6gAWBOhSWQP0R2mh0\"",
		"mtime": "2026-08-20T19:50:17.920Z",
		"size": 10005,
		"path": "../public/assets/admin.index-x2M5Bhsq.js"
	},
	"/assets/admin.logistica-BT1y-XVE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d5a-lLpzojZZu9n3ncG6bEeouiBh9uk\"",
		"mtime": "2026-08-20T19:50:17.920Z",
		"size": 11610,
		"path": "../public/assets/admin.logistica-BT1y-XVE.js"
	},
	"/assets/admin.lojas-D7l-vPEn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c1d-LohQFZnunxkH2fqm6feLKbf9Sw8\"",
		"mtime": "2026-08-20T19:50:17.920Z",
		"size": 7197,
		"path": "../public/assets/admin.lojas-D7l-vPEn.js"
	},
	"/assets/admin.lojas._id-BYkN-sYT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"196b-O47Oz/0BSCxdTA9oYNXEAADQJrY\"",
		"mtime": "2026-08-20T19:50:17.920Z",
		"size": 6507,
		"path": "../public/assets/admin.lojas._id-BYkN-sYT.js"
	},
	"/assets/admin.metas-DTr0wsFk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c7d-u0WwaG4J2+n/FtIoYDyqe9QUFfY\"",
		"mtime": "2026-08-20T19:50:17.920Z",
		"size": 7293,
		"path": "../public/assets/admin.metas-DTr0wsFk.js"
	},
	"/assets/admin.pagamentos-BMlAmwzZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1880-ZKQ5+SVSoL8XhnkKbMUHWnKtd4o\"",
		"mtime": "2026-08-20T19:50:17.920Z",
		"size": 6272,
		"path": "../public/assets/admin.pagamentos-BMlAmwzZ.js"
	},
	"/assets/admin.pedidos-DX-Hmo8k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5251-YIf9Jk89UHDP1gJW/DyZrIuA40w\"",
		"mtime": "2026-08-20T19:50:17.920Z",
		"size": 21073,
		"path": "../public/assets/admin.pedidos-DX-Hmo8k.js"
	},
	"/assets/admin.pesquisas-CyvYiPdD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1645-NSkSjlE0FS9FYPy+FKfI+20OR/E\"",
		"mtime": "2026-08-20T19:50:17.920Z",
		"size": 5701,
		"path": "../public/assets/admin.pesquisas-CyvYiPdD.js"
	},
	"/assets/admin.produtos-B3Lbt57O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"811d-DH0Cy/KKGVN3XNViPNdhX+lvHpA\"",
		"mtime": "2026-08-20T19:50:17.920Z",
		"size": 33053,
		"path": "../public/assets/admin.produtos-B3Lbt57O.js"
	},
	"/assets/admin.receita-CWHTFSRk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fcf-SykKf/JruoJqs7Mk+hSXqUSDlho\"",
		"mtime": "2026-08-20T19:50:17.920Z",
		"size": 8143,
		"path": "../public/assets/admin.receita-CWHTFSRk.js"
	},
	"/assets/admin.usuarios-yojcTdqH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eb8-3lvZCtmrA96whvuEUDsaAz8AvVY\"",
		"mtime": "2026-08-20T19:50:17.920Z",
		"size": 3768,
		"path": "../public/assets/admin.usuarios-yojcTdqH.js"
	},
	"/assets/arrow-left-BmAZr12X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-gXo0UkGcbBZfOn7hniDqDJBFM0E\"",
		"mtime": "2026-08-20T19:50:17.920Z",
		"size": 165,
		"path": "../public/assets/arrow-left-BmAZr12X.js"
	},
	"/assets/arrow-right-DdeI4MLJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-f9DD0ZW4LzKdOxjMGfi4ORxd6MY\"",
		"mtime": "2026-08-20T19:50:17.920Z",
		"size": 165,
		"path": "../public/assets/arrow-right-DdeI4MLJ.js"
	},
	"/assets/arrow-up-right-D-a4p84_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a7-/tmZ3lmzimemwkKtHJst5lvZGRQ\"",
		"mtime": "2026-08-20T19:50:17.920Z",
		"size": 167,
		"path": "../public/assets/arrow-up-right-D-a4p84_.js"
	},
	"/assets/auth-BWHpeYux.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"35df-OsOrVDyLFPhuEYbOcrX3Un9OGQE\"",
		"mtime": "2026-08-20T19:50:17.920Z",
		"size": 13791,
		"path": "../public/assets/auth-BWHpeYux.js"
	},
	"/assets/badge-check-Ct12fjB0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13c-XY0phrNLMiQmTCnxm8KOnUKtvSY\"",
		"mtime": "2026-08-20T19:50:17.920Z",
		"size": 316,
		"path": "../public/assets/badge-check-Ct12fjB0.js"
	},
	"/assets/banner-DYwY-1Z1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7a9-m60Qmdb38xfl9CHMoIFXcuQadUM\"",
		"mtime": "2026-08-20T19:50:17.920Z",
		"size": 1961,
		"path": "../public/assets/banner-DYwY-1Z1.js"
	},
	"/assets/bazarixy-logo.webp.asset-CRxaR9He.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ac-v1A9tB1yGCmdfnScNLvNKb8jvCg\"",
		"mtime": "2026-08-20T19:50:17.920Z",
		"size": 428,
		"path": "../public/assets/bazarixy-logo.webp.asset-CRxaR9He.js"
	},
	"/assets/bazarixy-mark-BoezJBBF.webp": {
		"type": "image/webp",
		"etag": "\"13b1a-VTfHiNLa+4ZyKgn/xLXhph+vQ0s\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 80666,
		"path": "../public/assets/bazarixy-mark-BoezJBBF.webp"
	},
	"/assets/cart-rNG3oirN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f06-rdJoZ1cXO7ryWa/I1DTkEF9z1Ss\"",
		"mtime": "2026-08-20T19:50:17.920Z",
		"size": 7942,
		"path": "../public/assets/cart-rNG3oirN.js"
	},
	"/assets/cat-beleza-D1kCkjAZ.jpg": {
		"type": "image/jpeg",
		"etag": "\"1b46f-YLJlnudyTIkSuWvMBi/i8eFg2QU\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 111727,
		"path": "../public/assets/cat-beleza-D1kCkjAZ.jpg"
	},
	"/assets/cat-casa-Bhw4cn94.jpg": {
		"type": "image/jpeg",
		"etag": "\"109e2-64W5w/r881d5MlggeuEVfSxlSx0\"",
		"mtime": "2026-08-20T19:50:17.924Z",
		"size": 68066,
		"path": "../public/assets/cat-casa-Bhw4cn94.jpg"
	},
	"/assets/cat-eletronicos-B0bni-lq.jpg": {
		"type": "image/jpeg",
		"etag": "\"9eb4-guTG9oGXHjsPlNospr8KbgmQSSA\"",
		"mtime": "2026-08-20T19:50:17.924Z",
		"size": 40628,
		"path": "../public/assets/cat-eletronicos-B0bni-lq.jpg"
	},
	"/assets/cat-outros-Bhul1THh.jpg": {
		"type": "image/jpeg",
		"etag": "\"25185-tPs/blFvuESlEW9ziAZHOqlcZyE\"",
		"mtime": "2026-08-20T19:50:17.924Z",
		"size": 151941,
		"path": "../public/assets/cat-outros-Bhul1THh.jpg"
	},
	"/assets/categories-RvCJhlMV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"256f-n3JqmKb7uxGgu99UjPN72mbKQQQ\"",
		"mtime": "2026-08-20T19:50:17.920Z",
		"size": 9583,
		"path": "../public/assets/categories-RvCJhlMV.js"
	},
	"/assets/categories-store-BzMYDwrU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"846-SNS/PY/UJociSBLpmplTQfLZFdk\"",
		"mtime": "2026-08-20T19:50:17.920Z",
		"size": 2118,
		"path": "../public/assets/categories-store-BzMYDwrU.js"
	},
	"/assets/category._slug-BXENoZfC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1270-YL+2YHKwbJPr3apAEkUg2ivpkbI\"",
		"mtime": "2026-08-20T19:50:17.920Z",
		"size": 4720,
		"path": "../public/assets/category._slug-BXENoZfC.js"
	},
	"/assets/category._slug-BegY9Khu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f8-kJPzwO6izIM4qc0hbqkZi56qmc4\"",
		"mtime": "2026-08-20T19:50:17.920Z",
		"size": 248,
		"path": "../public/assets/category._slug-BegY9Khu.js"
	},
	"/assets/category._slug-CP130P0H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-/MUTwBmso3h6Q7zQS6kkx1ci6OA\"",
		"mtime": "2026-08-20T19:50:17.920Z",
		"size": 230,
		"path": "../public/assets/category._slug-CP130P0H.js"
	},
	"/assets/chart-column-CLxaEe1t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-mTEwKWR7xtGCLQdksxeYu4V8QeI\"",
		"mtime": "2026-08-20T19:50:17.920Z",
		"size": 251,
		"path": "../public/assets/chart-column-CLxaEe1t.js"
	},
	"/assets/check-CCNqrC1g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c-za+g0Apj+yzWeYK+kKbueqKdpas\"",
		"mtime": "2026-08-20T19:50:17.920Z",
		"size": 124,
		"path": "../public/assets/check-CCNqrC1g.js"
	},
	"/assets/checkout-D6M8qIu-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5404-eKJIE2H65iKlGjjGYhcLStPjr88\"",
		"mtime": "2026-08-20T19:50:17.920Z",
		"size": 21508,
		"path": "../public/assets/checkout-D6M8qIu-.js"
	},
	"/assets/chevron-right-BRClqNJT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf-wIaO0ieqawSkXFuwRLAiZNr6TTs\"",
		"mtime": "2026-08-20T19:50:17.921Z",
		"size": 207,
		"path": "../public/assets/chevron-right-BRClqNJT.js"
	},
	"/assets/circle-check-BNg_BNCk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-ynv7NYeMmTYExFOKSL9Iyl7Jyh0\"",
		"mtime": "2026-08-20T19:50:17.921Z",
		"size": 178,
		"path": "../public/assets/circle-check-BNg_BNCk.js"
	},
	"/assets/clock-Ck_bJSgx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-CYv5zrLZuPbYLtl+al1BNfTEAUk\"",
		"mtime": "2026-08-20T19:50:17.921Z",
		"size": 169,
		"path": "../public/assets/clock-Ck_bJSgx.js"
	},
	"/assets/coins-DKTzYf2R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11d-YwsRP+VX2289rBT1ZlX+Q6RR/QE\"",
		"mtime": "2026-08-20T19:50:17.921Z",
		"size": 285,
		"path": "../public/assets/coins-DKTzYf2R.js"
	},
	"/assets/client-C1Ll2hCY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"86f0e-h4sX+V9qEX3ckH5jK/VEMaAqIu8\"",
		"mtime": "2026-08-20T19:50:17.921Z",
		"size": 552718,
		"path": "../public/assets/client-C1Ll2hCY.js"
	},
	"/assets/colors-BJKl-Gdh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3d4-9inSdsk5bsroRB269bctgt/oKrE\"",
		"mtime": "2026-08-20T19:50:17.921Z",
		"size": 980,
		"path": "../public/assets/colors-BJKl-Gdh.js"
	},
	"/assets/como-pagar-C2_1DGCR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1117-JVnPvA7rxUXPL8jtluOITUDVtIs\"",
		"mtime": "2026-08-20T19:50:17.921Z",
		"size": 4375,
		"path": "../public/assets/como-pagar-C2_1DGCR.js"
	},
	"/assets/copy-BJVIj8L1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-mujCqIFvddec03i++qiw+eNsagE\"",
		"mtime": "2026-08-20T19:50:17.921Z",
		"size": 236,
		"path": "../public/assets/copy-BJVIj8L1.js"
	},
	"/assets/coupons-Cw4wtY5A.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1745-vF4lEn3cuplYdRaZmAWIwXqSM34\"",
		"mtime": "2026-08-20T19:50:17.921Z",
		"size": 5957,
		"path": "../public/assets/coupons-Cw4wtY5A.js"
	},
	"/assets/coupons-store-D3fvRWIt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a2-JjEjiqkqc5plIbM1XJM1Ovfl0pA\"",
		"mtime": "2026-08-20T19:50:17.921Z",
		"size": 1698,
		"path": "../public/assets/coupons-store-D3fvRWIt.js"
	},
	"/assets/createLucideIcon-cPwvoQem.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a0-p4j4oMg8OI8NWiq6sASxP2tvJ4M\"",
		"mtime": "2026-08-20T19:50:17.921Z",
		"size": 1184,
		"path": "../public/assets/createLucideIcon-cPwvoQem.js"
	},
	"/assets/credit-card-m2jg6_n_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf-QELYgSs445QoI0kRlpAAx1PFUTE\"",
		"mtime": "2026-08-20T19:50:17.921Z",
		"size": 207,
		"path": "../public/assets/credit-card-m2jg6_n_.js"
	},
	"/assets/eye-btBJQO-u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100-3nNqj/FCnSvkOfogOhs9ijRdJCk\"",
		"mtime": "2026-08-20T19:50:17.921Z",
		"size": 256,
		"path": "../public/assets/eye-btBJQO-u.js"
	},
	"/assets/favorites-Cfir3Ykz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b82-EZIlkRAx0iOnUJYSQgvNrqh5XLg\"",
		"mtime": "2026-08-20T19:50:17.921Z",
		"size": 2946,
		"path": "../public/assets/favorites-Cfir3Ykz.js"
	},
	"/assets/flame-DbHt73Yn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c7-FGO9wkmqxJ5YJRmW/AJY54ujyrw\"",
		"mtime": "2026-08-20T19:50:17.921Z",
		"size": 199,
		"path": "../public/assets/flame-DbHt73Yn.js"
	},
	"/assets/format-CYW_xdiT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b1-G10l8/x9mRib3XpXQqFI3TlxHy4\"",
		"mtime": "2026-08-20T19:50:17.921Z",
		"size": 177,
		"path": "../public/assets/format-CYW_xdiT.js"
	},
	"/assets/home-config-CgDQRKeu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7df-745FoxrsTEbNQQtZL9xmc43EvOk\"",
		"mtime": "2026-08-20T19:50:17.921Z",
		"size": 2015,
		"path": "../public/assets/home-config-CgDQRKeu.js"
	},
	"/assets/image-D-lNMpac.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10d-cLciIbciv4jOZdRfvFH+28A0aQc\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 269,
		"path": "../public/assets/image-D-lNMpac.js"
	},
	"/assets/folder-tree-DpOf1GO5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1df-IxneIzIY2+9q68bdB1dRtM18GYM\"",
		"mtime": "2026-08-20T19:50:17.921Z",
		"size": 479,
		"path": "../public/assets/folder-tree-DpOf1GO5.js"
	},
	"/assets/index-hk9hZPco.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6f8e3-w/8C/2aCh0mrT3eXLy0VKrhb4Hk\"",
		"mtime": "2026-08-20T19:50:17.918Z",
		"size": 456931,
		"path": "../public/assets/index-hk9hZPco.js"
	},
	"/assets/index.esm-DsCv4lCR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13cd5-+uX6BiZRJzctSMYBLOnCdJa2bLA\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 81109,
		"path": "../public/assets/index.esm-DsCv4lCR.js"
	},
	"/assets/index.esm-CVjMrPB1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6fc3-mKUyYZ6cQ9q/794xHshI2hh/vVA\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 28611,
		"path": "../public/assets/index.esm-CVjMrPB1.js"
	},
	"/assets/index.esm-Z2UCGr0V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4440-uLrpEQc+NwaIUfbct/iCT6MmG5Y\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 17472,
		"path": "../public/assets/index.esm-Z2UCGr0V.js"
	},
	"/assets/info-9r1nfKh8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cc-gF4q9mcxVlikIE3XkAGqtUCLlg0\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 204,
		"path": "../public/assets/info-9r1nfKh8.js"
	},
	"/assets/layers-sKUIrNts.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a5-THRzSNWTv+Fyajhf1hkCPQqdwkI\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 421,
		"path": "../public/assets/layers-sKUIrNts.js"
	},
	"/assets/layout-grid-D1eYRydS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15a-kBeTIsnBb6aq6JMgbjocdGPXXuQ\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 346,
		"path": "../public/assets/layout-grid-D1eYRydS.js"
	},
	"/assets/link-BXNL7SeI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"53ae-C4R2k4IpkoMygGnX0EGEdaQreyA\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 21422,
		"path": "../public/assets/link-BXNL7SeI.js"
	},
	"/assets/lock-DY9q7Zdn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ce-PMI389bhM6Hu71gvUDIHoEa7uFM\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 206,
		"path": "../public/assets/lock-DY9q7Zdn.js"
	},
	"/assets/logistics-store-BYg7K0ZC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c64-+JW1THtj4w8g9GvD9CUbad2jlcc\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 3172,
		"path": "../public/assets/logistics-store-BYg7K0ZC.js"
	},
	"/assets/logotipo-BJ2lWMnX.webp": {
		"type": "image/webp",
		"etag": "\"1c700-hfa8Y9a9TMQJ+I/2wksM5NlkPJQ\"",
		"mtime": "2026-08-20T19:50:17.924Z",
		"size": 116480,
		"path": "../public/assets/logotipo-BJ2lWMnX.webp"
	},
	"/assets/mail-Cbg9Xqpo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-x3YDs1f4xiRt9LFahbcZ41zDVZI\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 213,
		"path": "../public/assets/mail-Cbg9Xqpo.js"
	},
	"/assets/map-pin-C6mqjQGc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-sL6PyQ4lLzP22O1PKbMMDeJn51g\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 259,
		"path": "../public/assets/map-pin-C6mqjQGc.js"
	},
	"/assets/me-C3PvpoFS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24c4-frdGh9/Cqwz8n6HBTj1H4UM1brA\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 9412,
		"path": "../public/assets/me-C3PvpoFS.js"
	},
	"/assets/message-square-DcYrvzMm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-gPpzrLup6SlWEnlhQplVxPTS/GA\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 233,
		"path": "../public/assets/message-square-DcYrvzMm.js"
	},
	"/assets/not-found-i5RsCZif.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-Trmr7GZIBZuvfg4uM18tBiRtOXg\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 118,
		"path": "../public/assets/not-found-i5RsCZif.js"
	},
	"/assets/notifications-DtDnb6gD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1456-sv7qY3rJovOqXFWIIhR5iEhg+2g\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 5206,
		"path": "../public/assets/notifications-DtDnb6gD.js"
	},
	"/assets/orders-DoAJU97M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"54e7-6uh4yGE6Op7phFL1Urg7gQRqXgI\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 21735,
		"path": "../public/assets/orders-DoAJU97M.js"
	},
	"/assets/p-brushes-BdxdHdet.jpg": {
		"type": "image/jpeg",
		"etag": "\"12ca4-QEM7Pxib/X2lBQLJ3FZwFifHFbo\"",
		"mtime": "2026-08-20T19:50:17.924Z",
		"size": 76964,
		"path": "../public/assets/p-brushes-BdxdHdet.jpg"
	},
	"/assets/p-cream-t29T4qSa.jpg": {
		"type": "image/jpeg",
		"etag": "\"7d1c-OF87WaSKzGYV4wll3FlG+reblzA\"",
		"mtime": "2026-08-20T19:50:17.924Z",
		"size": 32028,
		"path": "../public/assets/p-cream-t29T4qSa.jpg"
	},
	"/assets/p-dress-BEbFKKeJ.jpg": {
		"type": "image/jpeg",
		"etag": "\"8b7f-xusMudTEekzqGEljjV1OStbMgsU\"",
		"mtime": "2026-08-20T19:50:17.924Z",
		"size": 35711,
		"path": "../public/assets/p-dress-BEbFKKeJ.jpg"
	},
	"/assets/p-jeans-BIj6CxYP.jpg": {
		"type": "image/jpeg",
		"etag": "\"23415-HTJ6loY6CPgdWI8ul1wq49eUCjw\"",
		"mtime": "2026-08-20T19:50:17.924Z",
		"size": 144405,
		"path": "../public/assets/p-jeans-BIj6CxYP.jpg"
	},
	"/assets/p-knit-B1VN3gUH.jpg": {
		"type": "image/jpeg",
		"etag": "\"178e5-bp21sK1XIkX36dgMZsPUBpGG3/M\"",
		"mtime": "2026-08-20T19:50:17.925Z",
		"size": 96485,
		"path": "../public/assets/p-knit-B1VN3gUH.jpg"
	},
	"/assets/p-jumpsuit-BkhcJynf.jpg": {
		"type": "image/jpeg",
		"etag": "\"b652-llu0RjNBZpx6CW4FXmoJV0PCe2w\"",
		"mtime": "2026-08-20T19:50:17.925Z",
		"size": 46674,
		"path": "../public/assets/p-jumpsuit-BkhcJynf.jpg"
	},
	"/assets/p-lipstick-CX6Dj8cF.jpg": {
		"type": "image/jpeg",
		"etag": "\"15b47-gxs0XoZAuNzHvPslCpXEq+DCAcU\"",
		"mtime": "2026-08-20T19:50:17.925Z",
		"size": 88903,
		"path": "../public/assets/p-lipstick-CX6Dj8cF.jpg"
	},
	"/assets/p-pants-w2etJJsJ.jpg": {
		"type": "image/jpeg",
		"etag": "\"ad98-TgL+g++/aInC8NKn0yV9gtipSJ0\"",
		"mtime": "2026-08-20T19:50:17.925Z",
		"size": 44440,
		"path": "../public/assets/p-pants-w2etJJsJ.jpg"
	},
	"/assets/p-perfume-BnxGlR6I.jpg": {
		"type": "image/jpeg",
		"etag": "\"c4e5-FHYORWvyQw9GRTCgnSCkkTb5BsQ\"",
		"mtime": "2026-08-20T19:50:17.925Z",
		"size": 50405,
		"path": "../public/assets/p-perfume-BnxGlR6I.jpg"
	},
	"/assets/p-reddress-BngZqOK1.jpg": {
		"type": "image/jpeg",
		"etag": "\"ae1f-EopdjO+URdpSyHI4ZpN3YJ6tGj0\"",
		"mtime": "2026-08-20T19:50:17.925Z",
		"size": 44575,
		"path": "../public/assets/p-reddress-BngZqOK1.jpg"
	},
	"/assets/p-skirt-DNF_I8F3.jpg": {
		"type": "image/jpeg",
		"etag": "\"8b75-7lpHtIZ7XyMgHLrwrwDukBIPnGs\"",
		"mtime": "2026-08-20T19:50:17.925Z",
		"size": 35701,
		"path": "../public/assets/p-skirt-DNF_I8F3.jpg"
	},
	"/assets/p-swim-9aOCY719.jpg": {
		"type": "image/jpeg",
		"etag": "\"f963-+F35GN6hkofO+2LKZ/nR/wRC6fM\"",
		"mtime": "2026-08-20T19:50:17.925Z",
		"size": 63843,
		"path": "../public/assets/p-swim-9aOCY719.jpg"
	},
	"/assets/p-tank-DYSgLGey.jpg": {
		"type": "image/jpeg",
		"etag": "\"102a0-8UKqAkGsFC7tn5V4uyafssb8d88\"",
		"mtime": "2026-08-20T19:50:17.925Z",
		"size": 66208,
		"path": "../public/assets/p-tank-DYSgLGey.jpg"
	},
	"/assets/p-top-BTKTbnRS.jpg": {
		"type": "image/jpeg",
		"etag": "\"d291-bFerBrwW3D5Spjqlsv3DtjgOqeg\"",
		"mtime": "2026-08-20T19:50:17.925Z",
		"size": 53905,
		"path": "../public/assets/p-top-BTKTbnRS.jpg"
	},
	"/assets/package-CBeDJ4Sv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"174-gnilbzb7pwtarW10b09b3v8jClU\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 372,
		"path": "../public/assets/package-CBeDJ4Sv.js"
	},
	"/assets/pay-express.jpg.asset-Cyk8AYll.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33c-YsNAiUCenUU9xbjiEN2Uf6Tv/wI\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 828,
		"path": "../public/assets/pay-express.jpg.asset-Cyk8AYll.js"
	},
	"/assets/pay._method-DdpabPxm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33de-DEhtYHN74k3/v5ceq1DCkrtVjS4\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 13278,
		"path": "../public/assets/pay._method-DdpabPxm.js"
	},
	"/assets/payments-store-JB8NrLPc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a7-5/QiXe7cREwKaL1lIfsXaJP40jU\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 2471,
		"path": "../public/assets/payments-store-JB8NrLPc.js"
	},
	"/assets/pencil-Ce_zgDGo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"114-j0YXPdWv9PfdFfNqqYve08jZsE8\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 276,
		"path": "../public/assets/pencil-Ce_zgDGo.js"
	},
	"/assets/pending-payment-CjTbbZwJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"181-5aYgCRh+5tLa1Kl8HmV93vGWeM0\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 385,
		"path": "../public/assets/pending-payment-CjTbbZwJ.js"
	},
	"/assets/plus-CsFklqLM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-hV1ZU//qKDkNfMVQj6KE+nM11Io\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 153,
		"path": "../public/assets/plus-CsFklqLM.js"
	},
	"/assets/points-B-FHQ8th.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13ec-sEN5QiHBX/7q2iaXj9Crm0Yrqhg\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 5100,
		"path": "../public/assets/points-B-FHQ8th.js"
	},
	"/assets/privacidade-C9IF9NWi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"282c-kw0e0AA2h4g0U/zNPsSxF72sk7Y\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 10284,
		"path": "../public/assets/privacidade-C9IF9NWi.js"
	},
	"/assets/product._id-CTjsm6I6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"63c7-rUFhEF+ZP6/BsDEg5/wjhildeQU\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 25543,
		"path": "../public/assets/product._id-CTjsm6I6.js"
	},
	"/assets/product._id-Dd1Ac1ha.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"108-ld3qsJAtjRQCWqgX9LLeSEVLqm8\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 264,
		"path": "../public/assets/product._id-Dd1Ac1ha.js"
	},
	"/assets/product._id-Duo0zlbu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f2-A2iNTlh8K/Z2a+JcwUA2GzRl8mI\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 242,
		"path": "../public/assets/product._id-Duo0zlbu.js"
	},
	"/assets/promo-2-djOW7yEW.png": {
		"type": "image/png",
		"etag": "\"6be5d-obj99+iBJlyAl1e8ohm/6uGppF4\"",
		"mtime": "2026-08-20T19:50:17.926Z",
		"size": 441949,
		"path": "../public/assets/promo-2-djOW7yEW.png"
	},
	"/assets/promo-1-D9QBnF1Y.png": {
		"type": "image/png",
		"etag": "\"5c5d7-jgaByYJZ7VuNG4j6B9aQDUG3WUA\"",
		"mtime": "2026-08-20T19:50:17.925Z",
		"size": 378327,
		"path": "../public/assets/promo-1-D9QBnF1Y.png"
	},
	"/assets/promo-3-Ddu1tsCS.png": {
		"type": "image/png",
		"etag": "\"3c903-jvRqSVXnhNZpruPkxbj6Jbjs8vA\"",
		"mtime": "2026-08-20T19:50:17.926Z",
		"size": 248067,
		"path": "../public/assets/promo-3-Ddu1tsCS.png"
	},
	"/assets/react-SIfiwpqq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ff9-FGVdof4/lFGmrdRsB9EIvuwBlYc\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 8185,
		"path": "../public/assets/react-SIfiwpqq.js"
	},
	"/assets/revenue-C7T3yA9Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2fa-Vp8Ljl6a+7+1S88aoYXePWNvU1g\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 762,
		"path": "../public/assets/revenue-C7T3yA9Y.js"
	},
	"/assets/reviews-Cst8jYgc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"83a-nsfYGj+R+ia8HxLRoB6bARIEoVw\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 2106,
		"path": "../public/assets/reviews-Cst8jYgc.js"
	},
	"/assets/roles-BKB0Oipk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5f2-eQNRwZGSgoNLiNvo/tuyamWHikM\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 1522,
		"path": "../public/assets/roles-BKB0Oipk.js"
	},
	"/assets/root-DLTE-HSj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20-vSYConOtSP6ciwr9zKsPixNwWmc\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 32,
		"path": "../public/assets/root-DLTE-HSj.js"
	},
	"/assets/rotate-ccw-DjyDNOwP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c8-DPGJLCZ7OBGOoyvAr0ExEg8iCyI\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 200,
		"path": "../public/assets/rotate-ccw-DjyDNOwP.js"
	},
	"/assets/routes-Fbp7J5SI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ce3-1q7lVLurNbQbc2WWVwxo2JXRF2E\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 15587,
		"path": "../public/assets/routes-Fbp7J5SI.js"
	},
	"/assets/search-CzMGmf7M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-b9y6AXI3WU49XAW6vzxNX+9hJAk\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 174,
		"path": "../public/assets/search-CzMGmf7M.js"
	},
	"/assets/send-BDMLRI3-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"190-klpR9YNhc6v+VFqZZm91zv0v01A\"",
		"mtime": "2026-08-20T19:50:17.922Z",
		"size": 400,
		"path": "../public/assets/send-BDMLRI3-.js"
	},
	"/assets/send-DCFGnZqu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1de-oNrZCmEQ/zK54Axy+adruAdikp8\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 478,
		"path": "../public/assets/send-DCFGnZqu.js"
	},
	"/assets/settings-B1g-VPIY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6f3-L1NJp9S+5w4Y9LA/kC5lWwaio5M\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 1779,
		"path": "../public/assets/settings-B1g-VPIY.js"
	},
	"/assets/settings-CyzbYc-r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27cd-es1f6q8h1J3FhDp/dOxfX3IRTgg\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 10189,
		"path": "../public/assets/settings-CyzbYc-r.js"
	},
	"/assets/share-2-CcqjdWpJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"165-QDmsr1TmhtKuw2U4e493BS0yS7g\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 357,
		"path": "../public/assets/share-2-CcqjdWpJ.js"
	},
	"/assets/shield-alert-RE0kBelx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"161-8yki1oTNML+fp1mC2WlW/iEOcIc\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 353,
		"path": "../public/assets/shield-alert-RE0kBelx.js"
	},
	"/assets/shield-check-B3PmHBMY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-G33KRg9KT60ucl9G/TtXATi40Ns\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 320,
		"path": "../public/assets/shield-check-B3PmHBMY.js"
	},
	"/assets/shop._id-2fcw-2oA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ee-NDcn7lyw/f+KMAyTk5Ci4N+YWUw\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 238,
		"path": "../public/assets/shop._id-2fcw-2oA.js"
	},
	"/assets/shop._id-BNu3AzLm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1589-LTv+dR4UqT1P3tLgcFjUxpCikfk\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 5513,
		"path": "../public/assets/shop._id-BNu3AzLm.js"
	},
	"/assets/shopping-bag-wN4xsTXd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"154-tWGIP3GN/lxEepwn9Jj3DDP4Gyc\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 340,
		"path": "../public/assets/shopping-bag-wN4xsTXd.js"
	},
	"/assets/site-DybwFdKQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a4-b49TP5D3qc4eY+ZeRNoUCkJr1yA\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 676,
		"path": "../public/assets/site-DybwFdKQ.js"
	},
	"/assets/sliders-horizontal-AhCtpuXs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c3-AENPeABu4ynN89rMt2ndKYd6jeY\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 707,
		"path": "../public/assets/sliders-horizontal-AhCtpuXs.js"
	},
	"/assets/sparkles-USJV5op3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-8Cue5x6m3xDHvPVgMMegQ1Hxrmg\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 494,
		"path": "../public/assets/sparkles-USJV5op3.js"
	},
	"/assets/star-CYIcROk7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d8-CAGMcBuAXcdSdd1ngXKmc3CYgrk\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 472,
		"path": "../public/assets/star-CYIcROk7.js"
	},
	"/assets/store-BPHnSeEG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f2-7DjxDcYbVWyOI525/S93wYQ1Tuw\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 498,
		"path": "../public/assets/store-BPHnSeEG.js"
	},
	"/assets/store-CgUNSNFq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"be8-TmrALGUXj+Cr8pr3PORQBF6Fm4M\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 3048,
		"path": "../public/assets/store-CgUNSNFq.js"
	},
	"/assets/styles-C5z6iKHd.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"252e0-//gtiDL1/D8ufIxMh0gikv6JIhQ\"",
		"mtime": "2026-08-20T19:50:17.926Z",
		"size": 152288,
		"path": "../public/assets/styles-C5z6iKHd.css"
	},
	"/assets/super-ofertas-CigVSyUJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"529-a+Ke57ftYJNEyx39Bh/xi6AXrJs\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 1321,
		"path": "../public/assets/super-ofertas-CigVSyUJ.js"
	},
	"/assets/support-Cj36GOkp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"406c-f1uNJ+BiC0gHJwHNFBL+ziTVGwg\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 16492,
		"path": "../public/assets/support-Cj36GOkp.js"
	},
	"/assets/sync-store-BUPiTZzZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4bc-9GUsJCKOH67YDjoKN83l9dnfCZY\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 1212,
		"path": "../public/assets/sync-store-BUPiTZzZ.js"
	},
	"/assets/target-CBRGy9km.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e2-t3Sn5kCdbBtiqBWGg3xx+H8JwHo\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 226,
		"path": "../public/assets/target-CBRGy9km.js"
	},
	"/assets/termos-xWb5HFv8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"31b9-i9pO4RKDiW2bTWeNky3oKUWYn/0\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 12729,
		"path": "../public/assets/termos-xWb5HFv8.js"
	},
	"/assets/ticket-BiNpThdz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-xN89hCgQihvZy3O5LFOZhNcbbuo\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 321,
		"path": "../public/assets/ticket-BiNpThdz.js"
	},
	"/assets/trash-2-D9ykOZrd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-SFufvwScaqfz7pcnb2UUn3FfGKk\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 328,
		"path": "../public/assets/trash-2-D9ykOZrd.js"
	},
	"/assets/trending-up-B6Edyn1q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"af-ZcD8ymo8T8OMoVkfzimNFhXKuIY\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 175,
		"path": "../public/assets/trending-up-B6Edyn1q.js"
	},
	"/assets/triangle-alert-FTKqut9w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109-OpU+dqUqLnrikxh4aRCiuvoiOrA\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 265,
		"path": "../public/assets/triangle-alert-FTKqut9w.js"
	},
	"/assets/trocas-devolucoes--KXFfsie.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22df-IpYlOJ0br0O8hirP1/zSny+QRCQ\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 8927,
		"path": "../public/assets/trocas-devolucoes--KXFfsie.js"
	},
	"/assets/truck-CyWOy9Pq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"196-uGkug4CZttLs7NFYlEME1CCeoDU\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 406,
		"path": "../public/assets/truck-CyWOy9Pq.js"
	},
	"/assets/undo-2-Dz34a5Qr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d0-+JX2jz9JFkOkKTnnSwRaYZYKoo8\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 208,
		"path": "../public/assets/undo-2-Dz34a5Qr.js"
	},
	"/assets/upload-D2-q9XfO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a2-tYx+ot/NdgyaJYeDLVi+oEmmVo4\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 2466,
		"path": "../public/assets/upload-D2-q9XfO.js"
	},
	"/assets/useMatch-ACfgcG1I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"213-H2i4csC8bNtKd0oxZ1Np+8ntECU\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 531,
		"path": "../public/assets/useMatch-ACfgcG1I.js"
	},
	"/assets/user-plus-HbfwRcYz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-AQDJ12q23Dnf5CGOnaVrhifxSio\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 310,
		"path": "../public/assets/user-plus-HbfwRcYz.js"
	},
	"/assets/users-C-3GO8qD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-2Etv51zCmy57gDoatAApaFJa9Vk\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 306,
		"path": "../public/assets/users-C-3GO8qD.js"
	},
	"/assets/wallet-B1Rcb-Ud.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11e-pcmmlXiLgPvRoVEYKUoKffKeTQM\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 286,
		"path": "../public/assets/wallet-B1Rcb-Ud.js"
	},
	"/assets/wallet-CGbnxlY-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15c1-YTkBaVRFQOrZuZCWL7QNFJqTDO0\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 5569,
		"path": "../public/assets/wallet-CGbnxlY-.js"
	},
	"/assets/x-B2FTZ7Vt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-YzY9+adS4NM8VvQ9ImCQoQFBfkc\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 154,
		"path": "../public/assets/x-B2FTZ7Vt.js"
	},
	"/assets/zap-bFH_IeqZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"106-o1zlUbhJe/IP+W3bfjkTqsG2slY\"",
		"mtime": "2026-08-20T19:50:17.923Z",
		"size": 262,
		"path": "../public/assets/zap-bFH_IeqZ.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_oPkhj4 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_oPkhj4
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
