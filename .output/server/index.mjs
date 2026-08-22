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
		"mtime": "2026-08-22T03:12:55.483Z",
		"size": 15086,
		"path": "../public/favicon.ico"
	},
	"/logotipo.webp": {
		"type": "image/webp",
		"etag": "\"1c700-hfa8Y9a9TMQJ+I/2wksM5NlkPJQ\"",
		"mtime": "2026-08-22T03:12:55.486Z",
		"size": 116480,
		"path": "../public/logotipo.webp"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"54-xccS4N+LhQ93zfst8LazSz10DOE\"",
		"mtime": "2026-08-22T03:12:55.488Z",
		"size": 84,
		"path": "../public/robots.txt"
	},
	"/sitemap.xml": {
		"type": "application/xml",
		"etag": "\"1ad-f4uKTQKAMkyQZWHxE5ryTuyh6wk\"",
		"mtime": "2026-08-22T03:12:55.489Z",
		"size": 429,
		"path": "../public/sitemap.xml"
	},
	"/assets/AdminModal-tidT8vnD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bbb-f+9443LjWpzV7KgW1uCC58a0eTc\"",
		"mtime": "2026-08-22T03:12:51.798Z",
		"size": 3003,
		"path": "../public/assets/AdminModal-tidT8vnD.js"
	},
	"/assets/AdminTabs-gttd_LMf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"317-gIADl6np3B9d58t/o+E2VeJ8G4o\"",
		"mtime": "2026-08-22T03:12:51.798Z",
		"size": 791,
		"path": "../public/assets/AdminTabs-gttd_LMf.js"
	},
	"/assets/Layout-WcBAus2I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1abc5-XgSgz/SU12Ik3OcjCVcC19o/s/I\"",
		"mtime": "2026-08-22T03:12:51.798Z",
		"size": 109509,
		"path": "../public/assets/Layout-WcBAus2I.js"
	},
	"/assets/ProductCard-DP-b5Y-r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"93b-KQOJ3ChGY2IPRcYFrWu6zD0W9U8\"",
		"mtime": "2026-08-22T03:12:51.798Z",
		"size": 2363,
		"path": "../public/assets/ProductCard-DP-b5Y-r.js"
	},
	"/assets/ShareSheet-BXUPJbCN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1043-e33hcTY2KzuTr+JaXiDxigaWiao\"",
		"mtime": "2026-08-22T03:12:51.798Z",
		"size": 4163,
		"path": "../public/assets/ShareSheet-BXUPJbCN.js"
	},
	"/assets/arrow-left-BmAZr12X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-gXo0UkGcbBZfOn7hniDqDJBFM0E\"",
		"mtime": "2026-08-22T03:12:51.798Z",
		"size": 165,
		"path": "../public/assets/arrow-left-BmAZr12X.js"
	},
	"/assets/arrow-right-DdeI4MLJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-f9DD0ZW4LzKdOxjMGfi4ORxd6MY\"",
		"mtime": "2026-08-22T03:12:51.798Z",
		"size": 165,
		"path": "../public/assets/arrow-right-DdeI4MLJ.js"
	},
	"/assets/arrow-up-right-D-a4p84_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a7-/tmZ3lmzimemwkKtHJst5lvZGRQ\"",
		"mtime": "2026-08-22T03:12:51.798Z",
		"size": 167,
		"path": "../public/assets/arrow-up-right-D-a4p84_.js"
	},
	"/assets/auth-CiyJLcRV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3984-CxmNzm+N7ipTW7MVhv4bZX0LBFk\"",
		"mtime": "2026-08-22T03:12:51.798Z",
		"size": 14724,
		"path": "../public/assets/auth-CiyJLcRV.js"
	},
	"/assets/badge-check-Ct12fjB0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13c-XY0phrNLMiQmTCnxm8KOnUKtvSY\"",
		"mtime": "2026-08-22T03:12:51.798Z",
		"size": 316,
		"path": "../public/assets/badge-check-Ct12fjB0.js"
	},
	"/assets/banner-D3itc8Xw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7a9-egKiSM6NNCRAvsIJYkUnjeP1EZE\"",
		"mtime": "2026-08-22T03:12:51.798Z",
		"size": 1961,
		"path": "../public/assets/banner-D3itc8Xw.js"
	},
	"/assets/bazarixy-logo.webp.asset-CRxaR9He.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ac-v1A9tB1yGCmdfnScNLvNKb8jvCg\"",
		"mtime": "2026-08-22T03:12:51.798Z",
		"size": 428,
		"path": "../public/assets/bazarixy-logo.webp.asset-CRxaR9He.js"
	},
	"/assets/bazarixy-mark-BoezJBBF.webp": {
		"type": "image/webp",
		"etag": "\"13b1a-VTfHiNLa+4ZyKgn/xLXhph+vQ0s\"",
		"mtime": "2026-08-22T03:12:51.802Z",
		"size": 80666,
		"path": "../public/assets/bazarixy-mark-BoezJBBF.webp"
	},
	"/assets/cart-CGn0T0fM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f06-6AwK5d4ReR5x3Eg+0Gss0DB53b0\"",
		"mtime": "2026-08-22T03:12:51.798Z",
		"size": 7942,
		"path": "../public/assets/cart-CGn0T0fM.js"
	},
	"/assets/cat-beleza-D1kCkjAZ.jpg": {
		"type": "image/jpeg",
		"etag": "\"1b46f-YLJlnudyTIkSuWvMBi/i8eFg2QU\"",
		"mtime": "2026-08-22T03:12:51.802Z",
		"size": 111727,
		"path": "../public/assets/cat-beleza-D1kCkjAZ.jpg"
	},
	"/assets/cat-casa-Bhw4cn94.jpg": {
		"type": "image/jpeg",
		"etag": "\"109e2-64W5w/r881d5MlggeuEVfSxlSx0\"",
		"mtime": "2026-08-22T03:12:51.802Z",
		"size": 68066,
		"path": "../public/assets/cat-casa-Bhw4cn94.jpg"
	},
	"/assets/cat-eletronicos-B0bni-lq.jpg": {
		"type": "image/jpeg",
		"etag": "\"9eb4-guTG9oGXHjsPlNospr8KbgmQSSA\"",
		"mtime": "2026-08-22T03:12:51.802Z",
		"size": 40628,
		"path": "../public/assets/cat-eletronicos-B0bni-lq.jpg"
	},
	"/assets/cat-outros-Bhul1THh.jpg": {
		"type": "image/jpeg",
		"etag": "\"25185-tPs/blFvuESlEW9ziAZHOqlcZyE\"",
		"mtime": "2026-08-22T03:12:51.802Z",
		"size": 151941,
		"path": "../public/assets/cat-outros-Bhul1THh.jpg"
	},
	"/assets/categories-store-DMS0RA4Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"846-eG1PsxBIld9P2jVEHeWrqDBAuS4\"",
		"mtime": "2026-08-22T03:12:51.798Z",
		"size": 2118,
		"path": "../public/assets/categories-store-DMS0RA4Q.js"
	},
	"/assets/categories-wqKsI3_v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25a6-CS6RdWMqVp2Mg/tmaYc8oBdJmhg\"",
		"mtime": "2026-08-22T03:12:51.798Z",
		"size": 9638,
		"path": "../public/assets/categories-wqKsI3_v.js"
	},
	"/detalhesdolinks.png": {
		"type": "image/png",
		"etag": "\"185fbb-45RAE28pFvi1PhMWXwJvPmF6EEs\"",
		"mtime": "2026-08-22T03:12:55.492Z",
		"size": 1597371,
		"path": "../public/detalhesdolinks.png"
	},
	"/assets/category._slug-B7JzNONv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f8-t2oonsCN94tF5edrGR8V4u2cmcw\"",
		"mtime": "2026-08-22T03:12:51.798Z",
		"size": 248,
		"path": "../public/assets/category._slug-B7JzNONv.js"
	},
	"/assets/category._slug-CHq34tFQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-s0dU3C/OZnL5YXtkVBDi2yOvdJc\"",
		"mtime": "2026-08-22T03:12:51.798Z",
		"size": 230,
		"path": "../public/assets/category._slug-CHq34tFQ.js"
	},
	"/assets/category._slug-swWV3mlx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1270-YllI1pXG7afuB6wZkOKxp7kzi/0\"",
		"mtime": "2026-08-22T03:12:51.798Z",
		"size": 4720,
		"path": "../public/assets/category._slug-swWV3mlx.js"
	},
	"/assets/chart-column-CLxaEe1t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-mTEwKWR7xtGCLQdksxeYu4V8QeI\"",
		"mtime": "2026-08-22T03:12:51.798Z",
		"size": 251,
		"path": "../public/assets/chart-column-CLxaEe1t.js"
	},
	"/assets/check-CCNqrC1g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c-za+g0Apj+yzWeYK+kKbueqKdpas\"",
		"mtime": "2026-08-22T03:12:51.798Z",
		"size": 124,
		"path": "../public/assets/check-CCNqrC1g.js"
	},
	"/assets/checkout-C7-SeP4F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5404-KDZhrKoO0H7D5YfaRW4juXorWeM\"",
		"mtime": "2026-08-22T03:12:51.798Z",
		"size": 21508,
		"path": "../public/assets/checkout-C7-SeP4F.js"
	},
	"/assets/chevron-right-BRClqNJT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf-wIaO0ieqawSkXFuwRLAiZNr6TTs\"",
		"mtime": "2026-08-22T03:12:51.798Z",
		"size": 207,
		"path": "../public/assets/chevron-right-BRClqNJT.js"
	},
	"/assets/circle-check-BNg_BNCk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-ynv7NYeMmTYExFOKSL9Iyl7Jyh0\"",
		"mtime": "2026-08-22T03:12:51.798Z",
		"size": 178,
		"path": "../public/assets/circle-check-BNg_BNCk.js"
	},
	"/assets/clock-Ck_bJSgx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-CYv5zrLZuPbYLtl+al1BNfTEAUk\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 169,
		"path": "../public/assets/clock-Ck_bJSgx.js"
	},
	"/assets/coins-DKTzYf2R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11d-YwsRP+VX2289rBT1ZlX+Q6RR/QE\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 285,
		"path": "../public/assets/coins-DKTzYf2R.js"
	},
	"/assets/colors-BJKl-Gdh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3d4-9inSdsk5bsroRB269bctgt/oKrE\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 980,
		"path": "../public/assets/colors-BJKl-Gdh.js"
	},
	"/assets/como-pagar-BX-bBskk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1117-fAKWrA562smfSgLIYVHSww2vPMc\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 4375,
		"path": "../public/assets/como-pagar-BX-bBskk.js"
	},
	"/assets/copy-BJVIj8L1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-mujCqIFvddec03i++qiw+eNsagE\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 236,
		"path": "../public/assets/copy-BJVIj8L1.js"
	},
	"/assets/coupons-9Gy7e5ke.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1745-97Ua3HjdcJ5OknlDTHepnzbYbC4\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 5957,
		"path": "../public/assets/coupons-9Gy7e5ke.js"
	},
	"/assets/coupons-store-BgWwLTK_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a2-VWKl8OkZJyBKpW1gGGgtEfDQ54s\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 1698,
		"path": "../public/assets/coupons-store-BgWwLTK_.js"
	},
	"/assets/createLucideIcon-cPwvoQem.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a0-p4j4oMg8OI8NWiq6sASxP2tvJ4M\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 1184,
		"path": "../public/assets/createLucideIcon-cPwvoQem.js"
	},
	"/assets/credit-card-m2jg6_n_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf-QELYgSs445QoI0kRlpAAx1PFUTE\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 207,
		"path": "../public/assets/credit-card-m2jg6_n_.js"
	},
	"/assets/eye-btBJQO-u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100-3nNqj/FCnSvkOfogOhs9ijRdJCk\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 256,
		"path": "../public/assets/eye-btBJQO-u.js"
	},
	"/assets/favorites-BnKFJagO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b82-Houo0htwRHlW7RpQ4t/h9297XuM\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 2946,
		"path": "../public/assets/favorites-BnKFJagO.js"
	},
	"/assets/flame-DbHt73Yn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c7-FGO9wkmqxJ5YJRmW/AJY54ujyrw\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 199,
		"path": "../public/assets/flame-DbHt73Yn.js"
	},
	"/assets/folder-tree-DpOf1GO5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1df-IxneIzIY2+9q68bdB1dRtM18GYM\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 479,
		"path": "../public/assets/folder-tree-DpOf1GO5.js"
	},
	"/assets/format-CYW_xdiT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b1-G10l8/x9mRib3XpXQqFI3TlxHy4\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 177,
		"path": "../public/assets/format-CYW_xdiT.js"
	},
	"/assets/home-config-DezQUIpg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7df-lw3F80F3g0awC3Zf/kcG/+D/35w\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 2015,
		"path": "../public/assets/home-config-DezQUIpg.js"
	},
	"/assets/client-CCk7ihxz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"86f0e-aXhSDiP/HU4ic/PJdk1tx9x5oKs\"",
		"mtime": "2026-08-22T03:12:51.798Z",
		"size": 552718,
		"path": "../public/assets/client-CCk7ihxz.js"
	},
	"/assets/image-D-lNMpac.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10d-cLciIbciv4jOZdRfvFH+28A0aQc\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 269,
		"path": "../public/assets/image-D-lNMpac.js"
	},
	"/assets/index-oL9TBDsE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6fb30-OjaMtykcLdxtD7QmggRtYPSZ1XU\"",
		"mtime": "2026-08-22T03:12:51.798Z",
		"size": 457520,
		"path": "../public/assets/index-oL9TBDsE.js"
	},
	"/assets/index.esm-CVjMrPB1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6fc3-mKUyYZ6cQ9q/794xHshI2hh/vVA\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 28611,
		"path": "../public/assets/index.esm-CVjMrPB1.js"
	},
	"/assets/index.esm-Dd3XleGY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14272-kJG3H8j4J0iWcWiOsRO5FJEYhpg\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 82546,
		"path": "../public/assets/index.esm-Dd3XleGY.js"
	},
	"/assets/index.esm-Z2UCGr0V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4440-uLrpEQc+NwaIUfbct/iCT6MmG5Y\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 17472,
		"path": "../public/assets/index.esm-Z2UCGr0V.js"
	},
	"/assets/info-9r1nfKh8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cc-gF4q9mcxVlikIE3XkAGqtUCLlg0\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 204,
		"path": "../public/assets/info-9r1nfKh8.js"
	},
	"/assets/justina-Dy1ErfJd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2eef-OygkAEYOWOa4iICkcCvYpsunAsU\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 12015,
		"path": "../public/assets/justina-Dy1ErfJd.js"
	},
	"/assets/justina.abas._id-BntzEaWV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3505-CByJC9t6GtfM9L48kFHdoH3+ZSk\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 13573,
		"path": "../public/assets/justina.abas._id-BntzEaWV.js"
	},
	"/assets/justina.categorias-C-_l4LYV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f1d-dly2ZtZ/fP64F7mLt2S0qM+JRq0\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 12061,
		"path": "../public/assets/justina.categorias-C-_l4LYV.js"
	},
	"/assets/justina.config-BZmO7kSH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"94a-sCXK2M6imo9qX9QT487z3A3opr0\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 2378,
		"path": "../public/assets/justina.config-BZmO7kSH.js"
	},
	"/assets/justina.cupons-AX6G3myk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1576-QQG6kOStmKNaLscPzQ8TfB6L+FQ\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 5494,
		"path": "../public/assets/justina.cupons-AX6G3myk.js"
	},
	"/assets/justina.equipa-BJvBfVsG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"166c-dCWeaOOqr1aWP9rZKmMUrAYPwls\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 5740,
		"path": "../public/assets/justina.equipa-BJvBfVsG.js"
	},
	"/assets/justina.home-C3au545S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"429d-aEhaTOQJFpWnXFFOLk3/StkCkcA\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 17053,
		"path": "../public/assets/justina.home-C3au545S.js"
	},
	"/assets/justina.index-CdxOYONU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"272b-cV2x7p5cDdpmYn0OYQxDzFq6/pc\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 10027,
		"path": "../public/assets/justina.index-CdxOYONU.js"
	},
	"/assets/justina.logistica-CN2Skpsr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d5a-h0fH+iw4f1iJ2purSpWUqY6v1HU\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 11610,
		"path": "../public/assets/justina.logistica-CN2Skpsr.js"
	},
	"/assets/justina.lojas-CRGng20z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c1f-cMOIZCg0qPBccCaDQf/X8ozKXic\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 7199,
		"path": "../public/assets/justina.lojas-CRGng20z.js"
	},
	"/assets/justina.lojas._id-BTeN305C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1975-avlKWT99t4mXRu6MEotxXUWlCtY\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 6517,
		"path": "../public/assets/justina.lojas._id-BTeN305C.js"
	},
	"/assets/justina.metas-CCoy-2a7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c7d-rxg7eYpMlo5fAo/U/04wVUMz1JU\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 7293,
		"path": "../public/assets/justina.metas-CCoy-2a7.js"
	},
	"/assets/justina.pagamentos-CNRkvE0h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1880-bydgXsHiG3HvewSPPK3lppmYLes\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 6272,
		"path": "../public/assets/justina.pagamentos-CNRkvE0h.js"
	},
	"/assets/justina.pesquisas-BExytB_p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1645-gxOIDSW8S+hsfAEP975+5/4htcQ\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 5701,
		"path": "../public/assets/justina.pesquisas-BExytB_p.js"
	},
	"/assets/justina.pedidos-m39j-spc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5251-fkq0c4UwTErYCn/pXT3kRb8vDQg\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 21073,
		"path": "../public/assets/justina.pedidos-m39j-spc.js"
	},
	"/assets/justina.produtos-CMyE4_hR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"811d-MZAtRYU9wtudAJtdjAj0Wj5V8fA\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 33053,
		"path": "../public/assets/justina.produtos-CMyE4_hR.js"
	},
	"/assets/justina.receita-Bp38UMq5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fd3-3xRG846+WwpCGKp7SQidzHCV238\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 8147,
		"path": "../public/assets/justina.receita-Bp38UMq5.js"
	},
	"/assets/justina.usuarios-CIO12acG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eb8-K02twFd9Kk/8rRsKtHpogcYp/ng\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 3768,
		"path": "../public/assets/justina.usuarios-CIO12acG.js"
	},
	"/assets/layers-sKUIrNts.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a5-THRzSNWTv+Fyajhf1hkCPQqdwkI\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 421,
		"path": "../public/assets/layers-sKUIrNts.js"
	},
	"/assets/layout-grid-D1eYRydS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15a-kBeTIsnBb6aq6JMgbjocdGPXXuQ\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 346,
		"path": "../public/assets/layout-grid-D1eYRydS.js"
	},
	"/assets/link-CUNlWCXC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"53ae-GDBy6/Gl3Jz/d3knd/77Ih55gfI\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 21422,
		"path": "../public/assets/link-CUNlWCXC.js"
	},
	"/assets/lock-DY9q7Zdn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ce-PMI389bhM6Hu71gvUDIHoEa7uFM\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 206,
		"path": "../public/assets/lock-DY9q7Zdn.js"
	},
	"/assets/logistics-store-CqaaVv8L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c64-B3mVvJP4TpyVYbqDljhohphGUr4\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 3172,
		"path": "../public/assets/logistics-store-CqaaVv8L.js"
	},
	"/assets/mail-Cbg9Xqpo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-x3YDs1f4xiRt9LFahbcZ41zDVZI\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 213,
		"path": "../public/assets/mail-Cbg9Xqpo.js"
	},
	"/assets/map-pin-C6mqjQGc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-sL6PyQ4lLzP22O1PKbMMDeJn51g\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 259,
		"path": "../public/assets/map-pin-C6mqjQGc.js"
	},
	"/assets/me-DSCQDo4B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24c4-zlj7EfAGj8z44i88XR+JGxp2O0Q\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 9412,
		"path": "../public/assets/me-DSCQDo4B.js"
	},
	"/assets/message-square-DcYrvzMm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-gPpzrLup6SlWEnlhQplVxPTS/GA\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 233,
		"path": "../public/assets/message-square-DcYrvzMm.js"
	},
	"/assets/not-found-i5RsCZif.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-Trmr7GZIBZuvfg4uM18tBiRtOXg\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 118,
		"path": "../public/assets/not-found-i5RsCZif.js"
	},
	"/assets/notifications-CSnyBI_s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1456-GxLFm6iadbJPFr7HZpCFo48apEM\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 5206,
		"path": "../public/assets/notifications-CSnyBI_s.js"
	},
	"/assets/orders-DTriJoEm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"56ec-Da0qhQ38Skyyz0X1WQXA1nyOTrI\"",
		"mtime": "2026-08-22T03:12:51.799Z",
		"size": 22252,
		"path": "../public/assets/orders-DTriJoEm.js"
	},
	"/assets/p-brushes-BdxdHdet.jpg": {
		"type": "image/jpeg",
		"etag": "\"12ca4-QEM7Pxib/X2lBQLJ3FZwFifHFbo\"",
		"mtime": "2026-08-22T03:12:51.802Z",
		"size": 76964,
		"path": "../public/assets/p-brushes-BdxdHdet.jpg"
	},
	"/assets/p-cream-t29T4qSa.jpg": {
		"type": "image/jpeg",
		"etag": "\"7d1c-OF87WaSKzGYV4wll3FlG+reblzA\"",
		"mtime": "2026-08-22T03:12:51.802Z",
		"size": 32028,
		"path": "../public/assets/p-cream-t29T4qSa.jpg"
	},
	"/assets/p-dress-BEbFKKeJ.jpg": {
		"type": "image/jpeg",
		"etag": "\"8b7f-xusMudTEekzqGEljjV1OStbMgsU\"",
		"mtime": "2026-08-22T03:12:51.802Z",
		"size": 35711,
		"path": "../public/assets/p-dress-BEbFKKeJ.jpg"
	},
	"/assets/p-jeans-BIj6CxYP.jpg": {
		"type": "image/jpeg",
		"etag": "\"23415-HTJ6loY6CPgdWI8ul1wq49eUCjw\"",
		"mtime": "2026-08-22T03:12:51.802Z",
		"size": 144405,
		"path": "../public/assets/p-jeans-BIj6CxYP.jpg"
	},
	"/assets/p-jumpsuit-BkhcJynf.jpg": {
		"type": "image/jpeg",
		"etag": "\"b652-llu0RjNBZpx6CW4FXmoJV0PCe2w\"",
		"mtime": "2026-08-22T03:12:51.802Z",
		"size": 46674,
		"path": "../public/assets/p-jumpsuit-BkhcJynf.jpg"
	},
	"/assets/p-knit-B1VN3gUH.jpg": {
		"type": "image/jpeg",
		"etag": "\"178e5-bp21sK1XIkX36dgMZsPUBpGG3/M\"",
		"mtime": "2026-08-22T03:12:51.802Z",
		"size": 96485,
		"path": "../public/assets/p-knit-B1VN3gUH.jpg"
	},
	"/assets/p-lipstick-CX6Dj8cF.jpg": {
		"type": "image/jpeg",
		"etag": "\"15b47-gxs0XoZAuNzHvPslCpXEq+DCAcU\"",
		"mtime": "2026-08-22T03:12:51.802Z",
		"size": 88903,
		"path": "../public/assets/p-lipstick-CX6Dj8cF.jpg"
	},
	"/assets/p-pants-w2etJJsJ.jpg": {
		"type": "image/jpeg",
		"etag": "\"ad98-TgL+g++/aInC8NKn0yV9gtipSJ0\"",
		"mtime": "2026-08-22T03:12:51.802Z",
		"size": 44440,
		"path": "../public/assets/p-pants-w2etJJsJ.jpg"
	},
	"/assets/p-perfume-BnxGlR6I.jpg": {
		"type": "image/jpeg",
		"etag": "\"c4e5-FHYORWvyQw9GRTCgnSCkkTb5BsQ\"",
		"mtime": "2026-08-22T03:12:51.803Z",
		"size": 50405,
		"path": "../public/assets/p-perfume-BnxGlR6I.jpg"
	},
	"/assets/p-reddress-BngZqOK1.jpg": {
		"type": "image/jpeg",
		"etag": "\"ae1f-EopdjO+URdpSyHI4ZpN3YJ6tGj0\"",
		"mtime": "2026-08-22T03:12:51.803Z",
		"size": 44575,
		"path": "../public/assets/p-reddress-BngZqOK1.jpg"
	},
	"/assets/p-skirt-DNF_I8F3.jpg": {
		"type": "image/jpeg",
		"etag": "\"8b75-7lpHtIZ7XyMgHLrwrwDukBIPnGs\"",
		"mtime": "2026-08-22T03:12:51.803Z",
		"size": 35701,
		"path": "../public/assets/p-skirt-DNF_I8F3.jpg"
	},
	"/assets/p-swim-9aOCY719.jpg": {
		"type": "image/jpeg",
		"etag": "\"f963-+F35GN6hkofO+2LKZ/nR/wRC6fM\"",
		"mtime": "2026-08-22T03:12:51.803Z",
		"size": 63843,
		"path": "../public/assets/p-swim-9aOCY719.jpg"
	},
	"/assets/p-tank-DYSgLGey.jpg": {
		"type": "image/jpeg",
		"etag": "\"102a0-8UKqAkGsFC7tn5V4uyafssb8d88\"",
		"mtime": "2026-08-22T03:12:51.803Z",
		"size": 66208,
		"path": "../public/assets/p-tank-DYSgLGey.jpg"
	},
	"/assets/p-top-BTKTbnRS.jpg": {
		"type": "image/jpeg",
		"etag": "\"d291-bFerBrwW3D5Spjqlsv3DtjgOqeg\"",
		"mtime": "2026-08-22T03:12:51.803Z",
		"size": 53905,
		"path": "../public/assets/p-top-BTKTbnRS.jpg"
	},
	"/assets/package-CBeDJ4Sv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"174-gnilbzb7pwtarW10b09b3v8jClU\"",
		"mtime": "2026-08-22T03:12:51.800Z",
		"size": 372,
		"path": "../public/assets/package-CBeDJ4Sv.js"
	},
	"/assets/pay-express.jpg.asset-Cyk8AYll.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33c-YsNAiUCenUU9xbjiEN2Uf6Tv/wI\"",
		"mtime": "2026-08-22T03:12:51.800Z",
		"size": 828,
		"path": "../public/assets/pay-express.jpg.asset-Cyk8AYll.js"
	},
	"/assets/pay._method-Btmu0E2Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"36e9-2AzgQ+bD1EaZF/rq8XT2+DhkE34\"",
		"mtime": "2026-08-22T03:12:51.800Z",
		"size": 14057,
		"path": "../public/assets/pay._method-Btmu0E2Z.js"
	},
	"/assets/payments-store-4J0LNHMQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a7-oaQgGfXSKJvAY8811w9JRWTj/Kw\"",
		"mtime": "2026-08-22T03:12:51.800Z",
		"size": 2471,
		"path": "../public/assets/payments-store-4J0LNHMQ.js"
	},
	"/assets/pencil-Ce_zgDGo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"114-j0YXPdWv9PfdFfNqqYve08jZsE8\"",
		"mtime": "2026-08-22T03:12:51.800Z",
		"size": 276,
		"path": "../public/assets/pencil-Ce_zgDGo.js"
	},
	"/assets/pending-payment-CjTbbZwJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"181-5aYgCRh+5tLa1Kl8HmV93vGWeM0\"",
		"mtime": "2026-08-22T03:12:51.800Z",
		"size": 385,
		"path": "../public/assets/pending-payment-CjTbbZwJ.js"
	},
	"/assets/plus-CsFklqLM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-hV1ZU//qKDkNfMVQj6KE+nM11Io\"",
		"mtime": "2026-08-22T03:12:51.800Z",
		"size": 153,
		"path": "../public/assets/plus-CsFklqLM.js"
	},
	"/assets/points-C2qHmZGO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13ec-zk1KkDGSodbdl7FumbU4AvnT1IU\"",
		"mtime": "2026-08-22T03:12:51.800Z",
		"size": 5100,
		"path": "../public/assets/points-C2qHmZGO.js"
	},
	"/assets/privacidade-CA-oyW3b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27fc-6dxqeYxxY42nYrqnK+a1FHIaUow\"",
		"mtime": "2026-08-22T03:12:51.800Z",
		"size": 10236,
		"path": "../public/assets/privacidade-CA-oyW3b.js"
	},
	"/assets/product._id-BfnHBzYS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"108-vreh8AzLpM1r4+0OLa3C5zqmQEM\"",
		"mtime": "2026-08-22T03:12:51.800Z",
		"size": 264,
		"path": "../public/assets/product._id-BfnHBzYS.js"
	},
	"/assets/product._id-C58OsIqk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f2-JAYVdCuOBNIx+j+JvcA8vsFaWMA\"",
		"mtime": "2026-08-22T03:12:51.800Z",
		"size": 242,
		"path": "../public/assets/product._id-C58OsIqk.js"
	},
	"/assets/product._id-Dn0QUpOM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"64f5-DjR8QlWFEPIRf2xN8oJ7wVKl6Z0\"",
		"mtime": "2026-08-22T03:12:51.800Z",
		"size": 25845,
		"path": "../public/assets/product._id-Dn0QUpOM.js"
	},
	"/assets/promo-1-D9QBnF1Y.png": {
		"type": "image/png",
		"etag": "\"5c5d7-jgaByYJZ7VuNG4j6B9aQDUG3WUA\"",
		"mtime": "2026-08-22T03:12:51.803Z",
		"size": 378327,
		"path": "../public/assets/promo-1-D9QBnF1Y.png"
	},
	"/assets/promo-2-djOW7yEW.png": {
		"type": "image/png",
		"etag": "\"6be5d-obj99+iBJlyAl1e8ohm/6uGppF4\"",
		"mtime": "2026-08-22T03:12:51.803Z",
		"size": 441949,
		"path": "../public/assets/promo-2-djOW7yEW.png"
	},
	"/assets/promo-3-Ddu1tsCS.png": {
		"type": "image/png",
		"etag": "\"3c903-jvRqSVXnhNZpruPkxbj6Jbjs8vA\"",
		"mtime": "2026-08-22T03:12:51.803Z",
		"size": 248067,
		"path": "../public/assets/promo-3-Ddu1tsCS.png"
	},
	"/assets/react-SIfiwpqq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ff9-FGVdof4/lFGmrdRsB9EIvuwBlYc\"",
		"mtime": "2026-08-22T03:12:51.800Z",
		"size": 8185,
		"path": "../public/assets/react-SIfiwpqq.js"
	},
	"/assets/recommendations-D59VeKIC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac6-fLODhLNZ/iBgyTgWXHEW+yA6xNE\"",
		"mtime": "2026-08-22T03:12:51.800Z",
		"size": 2758,
		"path": "../public/assets/recommendations-D59VeKIC.js"
	},
	"/assets/revenue-CppAH632.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2fa-gmqTdGFQ4YSjeC/nRCAqbPmIFRc\"",
		"mtime": "2026-08-22T03:12:51.800Z",
		"size": 762,
		"path": "../public/assets/revenue-CppAH632.js"
	},
	"/assets/reviews-BEpYxSXr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"83a-Ee2RaQoF+XrrSXxZiRrP935TSOc\"",
		"mtime": "2026-08-22T03:12:51.800Z",
		"size": 2106,
		"path": "../public/assets/reviews-BEpYxSXr.js"
	},
	"/assets/roles-BxRxBsbo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5f2-YBv9d6+sGZnHzzqPpVVnbgxpMZA\"",
		"mtime": "2026-08-22T03:12:51.800Z",
		"size": 1522,
		"path": "../public/assets/roles-BxRxBsbo.js"
	},
	"/assets/root-DLTE-HSj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20-vSYConOtSP6ciwr9zKsPixNwWmc\"",
		"mtime": "2026-08-22T03:12:51.800Z",
		"size": 32,
		"path": "../public/assets/root-DLTE-HSj.js"
	},
	"/assets/rotate-ccw-DjyDNOwP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c8-DPGJLCZ7OBGOoyvAr0ExEg8iCyI\"",
		"mtime": "2026-08-22T03:12:51.800Z",
		"size": 200,
		"path": "../public/assets/rotate-ccw-DjyDNOwP.js"
	},
	"/assets/routes-DOEGLM7i.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4270-EywnCk4HsBGDNt7ChR9LZez9gCI\"",
		"mtime": "2026-08-22T03:12:51.800Z",
		"size": 17008,
		"path": "../public/assets/routes-DOEGLM7i.js"
	},
	"/assets/search-CzMGmf7M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-b9y6AXI3WU49XAW6vzxNX+9hJAk\"",
		"mtime": "2026-08-22T03:12:51.800Z",
		"size": 174,
		"path": "../public/assets/search-CzMGmf7M.js"
	},
	"/assets/send-CkxQhFft.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"190-Z9LKGicvpfrDn5x6ONk1RoctQkU\"",
		"mtime": "2026-08-22T03:12:51.800Z",
		"size": 400,
		"path": "../public/assets/send-CkxQhFft.js"
	},
	"/assets/send-DCFGnZqu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1de-oNrZCmEQ/zK54Axy+adruAdikp8\"",
		"mtime": "2026-08-22T03:12:51.800Z",
		"size": 478,
		"path": "../public/assets/send-DCFGnZqu.js"
	},
	"/assets/settings-BY9M-Ns7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6f3-5jisSVDYkfq89P0oCmImO+1AAw8\"",
		"mtime": "2026-08-22T03:12:51.800Z",
		"size": 1779,
		"path": "../public/assets/settings-BY9M-Ns7.js"
	},
	"/assets/settings-C4NiRUOv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27c8-W7GCrdrjM8JTWjY2qX+0FnfJpxU\"",
		"mtime": "2026-08-22T03:12:51.800Z",
		"size": 10184,
		"path": "../public/assets/settings-C4NiRUOv.js"
	},
	"/assets/share-2-CcqjdWpJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"165-QDmsr1TmhtKuw2U4e493BS0yS7g\"",
		"mtime": "2026-08-22T03:12:51.800Z",
		"size": 357,
		"path": "../public/assets/share-2-CcqjdWpJ.js"
	},
	"/assets/shield-alert-RE0kBelx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"161-8yki1oTNML+fp1mC2WlW/iEOcIc\"",
		"mtime": "2026-08-22T03:12:51.801Z",
		"size": 353,
		"path": "../public/assets/shield-alert-RE0kBelx.js"
	},
	"/assets/shield-check-B3PmHBMY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-G33KRg9KT60ucl9G/TtXATi40Ns\"",
		"mtime": "2026-08-22T03:12:51.801Z",
		"size": 320,
		"path": "../public/assets/shield-check-B3PmHBMY.js"
	},
	"/assets/shop._id-CSRiohbI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ee-5rkmCXujQU7JtpOsGtWCBWQMTQ0\"",
		"mtime": "2026-08-22T03:12:51.801Z",
		"size": 238,
		"path": "../public/assets/shop._id-CSRiohbI.js"
	},
	"/assets/shop._id-WQ0FQyHK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1589-fXVljbSRov72uqUCIlpfTrIeTFg\"",
		"mtime": "2026-08-22T03:12:51.801Z",
		"size": 5513,
		"path": "../public/assets/shop._id-WQ0FQyHK.js"
	},
	"/assets/shopping-bag-wN4xsTXd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"154-tWGIP3GN/lxEepwn9Jj3DDP4Gyc\"",
		"mtime": "2026-08-22T03:12:51.801Z",
		"size": 340,
		"path": "../public/assets/shopping-bag-wN4xsTXd.js"
	},
	"/assets/site-BMLULtuQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3db-0yheRN84fpOYCd14HBF/Uhf72J8\"",
		"mtime": "2026-08-22T03:12:51.801Z",
		"size": 987,
		"path": "../public/assets/site-BMLULtuQ.js"
	},
	"/assets/sliders-horizontal-AhCtpuXs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c3-AENPeABu4ynN89rMt2ndKYd6jeY\"",
		"mtime": "2026-08-22T03:12:51.801Z",
		"size": 707,
		"path": "../public/assets/sliders-horizontal-AhCtpuXs.js"
	},
	"/assets/sparkles-USJV5op3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-8Cue5x6m3xDHvPVgMMegQ1Hxrmg\"",
		"mtime": "2026-08-22T03:12:51.801Z",
		"size": 494,
		"path": "../public/assets/sparkles-USJV5op3.js"
	},
	"/assets/star-CYIcROk7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d8-CAGMcBuAXcdSdd1ngXKmc3CYgrk\"",
		"mtime": "2026-08-22T03:12:51.801Z",
		"size": 472,
		"path": "../public/assets/star-CYIcROk7.js"
	},
	"/assets/store-BDC-RKuz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"be8-ivn3MtFiZq1TvPUjZbATwAt1hn8\"",
		"mtime": "2026-08-22T03:12:51.801Z",
		"size": 3048,
		"path": "../public/assets/store-BDC-RKuz.js"
	},
	"/assets/store-BPHnSeEG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f2-7DjxDcYbVWyOI525/S93wYQ1Tuw\"",
		"mtime": "2026-08-22T03:12:51.801Z",
		"size": 498,
		"path": "../public/assets/store-BPHnSeEG.js"
	},
	"/assets/styles-D6H4RI_b.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"25423-AD7mebMU0AwckK9P/aryNykrOfg\"",
		"mtime": "2026-08-22T03:12:51.804Z",
		"size": 152611,
		"path": "../public/assets/styles-D6H4RI_b.css"
	},
	"/assets/super-ofertas-DMNaaNZV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"529-v4PdevOzp0+Wvdda7uL1xPf2Cas\"",
		"mtime": "2026-08-22T03:12:51.801Z",
		"size": 1321,
		"path": "../public/assets/super-ofertas-DMNaaNZV.js"
	},
	"/assets/support-C7NVLQYC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4071-G7f5GYqduj0s/Ha673CrmLpo51w\"",
		"mtime": "2026-08-22T03:12:51.801Z",
		"size": 16497,
		"path": "../public/assets/support-C7NVLQYC.js"
	},
	"/assets/sync-store-LZYaH0jt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4bc-oygzw5FE8DcqZ3KtU1LMrJ5J5/0\"",
		"mtime": "2026-08-22T03:12:51.801Z",
		"size": 1212,
		"path": "../public/assets/sync-store-LZYaH0jt.js"
	},
	"/assets/target-CBRGy9km.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e2-t3Sn5kCdbBtiqBWGg3xx+H8JwHo\"",
		"mtime": "2026-08-22T03:12:51.801Z",
		"size": 226,
		"path": "../public/assets/target-CBRGy9km.js"
	},
	"/assets/termos-PZ2zODzk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3189-xjNnTmXrp5McrMugMYpV8gWfdT4\"",
		"mtime": "2026-08-22T03:12:51.801Z",
		"size": 12681,
		"path": "../public/assets/termos-PZ2zODzk.js"
	},
	"/assets/ticket-BiNpThdz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-xN89hCgQihvZy3O5LFOZhNcbbuo\"",
		"mtime": "2026-08-22T03:12:51.801Z",
		"size": 321,
		"path": "../public/assets/ticket-BiNpThdz.js"
	},
	"/assets/trash-2-D9ykOZrd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-SFufvwScaqfz7pcnb2UUn3FfGKk\"",
		"mtime": "2026-08-22T03:12:51.801Z",
		"size": 328,
		"path": "../public/assets/trash-2-D9ykOZrd.js"
	},
	"/assets/trending-up-B6Edyn1q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"af-ZcD8ymo8T8OMoVkfzimNFhXKuIY\"",
		"mtime": "2026-08-22T03:12:51.801Z",
		"size": 175,
		"path": "../public/assets/trending-up-B6Edyn1q.js"
	},
	"/assets/triangle-alert-FTKqut9w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109-OpU+dqUqLnrikxh4aRCiuvoiOrA\"",
		"mtime": "2026-08-22T03:12:51.801Z",
		"size": 265,
		"path": "../public/assets/triangle-alert-FTKqut9w.js"
	},
	"/assets/trocas-devolucoes-BsQEhehN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22af-1stqNPgVvMk4t91nMUlFtpDU7rA\"",
		"mtime": "2026-08-22T03:12:51.801Z",
		"size": 8879,
		"path": "../public/assets/trocas-devolucoes-BsQEhehN.js"
	},
	"/assets/truck-CyWOy9Pq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"196-uGkug4CZttLs7NFYlEME1CCeoDU\"",
		"mtime": "2026-08-22T03:12:51.801Z",
		"size": 406,
		"path": "../public/assets/truck-CyWOy9Pq.js"
	},
	"/assets/undo-2-Dz34a5Qr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d0-+JX2jz9JFkOkKTnnSwRaYZYKoo8\"",
		"mtime": "2026-08-22T03:12:51.801Z",
		"size": 208,
		"path": "../public/assets/undo-2-Dz34a5Qr.js"
	},
	"/assets/upload-DNABbORH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a2-qcwelpidpjd1xTWibAhxBcyEjQA\"",
		"mtime": "2026-08-22T03:12:51.801Z",
		"size": 2466,
		"path": "../public/assets/upload-DNABbORH.js"
	},
	"/assets/useMatch-DX_Jk4R_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"213-w2L3wkfzr8vWj6iBru+6nPjQjrU\"",
		"mtime": "2026-08-22T03:12:51.801Z",
		"size": 531,
		"path": "../public/assets/useMatch-DX_Jk4R_.js"
	},
	"/assets/user-plus-HbfwRcYz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-AQDJ12q23Dnf5CGOnaVrhifxSio\"",
		"mtime": "2026-08-22T03:12:51.801Z",
		"size": 310,
		"path": "../public/assets/user-plus-HbfwRcYz.js"
	},
	"/assets/users-C-3GO8qD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-2Etv51zCmy57gDoatAApaFJa9Vk\"",
		"mtime": "2026-08-22T03:12:51.801Z",
		"size": 306,
		"path": "../public/assets/users-C-3GO8qD.js"
	},
	"/assets/wallet-B1Rcb-Ud.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11e-pcmmlXiLgPvRoVEYKUoKffKeTQM\"",
		"mtime": "2026-08-22T03:12:51.801Z",
		"size": 286,
		"path": "../public/assets/wallet-B1Rcb-Ud.js"
	},
	"/assets/wallet-BtVHHq4t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15c1-JKPVt3XUHDTH9PqSnL0Kkgx3Fms\"",
		"mtime": "2026-08-22T03:12:51.801Z",
		"size": 5569,
		"path": "../public/assets/wallet-BtVHHq4t.js"
	},
	"/assets/x-B2FTZ7Vt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-YzY9+adS4NM8VvQ9ImCQoQFBfkc\"",
		"mtime": "2026-08-22T03:12:51.801Z",
		"size": 154,
		"path": "../public/assets/x-B2FTZ7Vt.js"
	},
	"/assets/zap-bFH_IeqZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"106-o1zlUbhJe/IP+W3bfjkTqsG2slY\"",
		"mtime": "2026-08-22T03:12:51.802Z",
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
