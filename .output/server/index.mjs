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
		"mtime": "2026-09-02T02:44:49.356Z",
		"size": 15086,
		"path": "../public/favicon.ico"
	},
	"/logotipo.webp": {
		"type": "image/webp",
		"etag": "\"1c700-hfa8Y9a9TMQJ+I/2wksM5NlkPJQ\"",
		"mtime": "2026-09-02T02:44:49.356Z",
		"size": 116480,
		"path": "../public/logotipo.webp"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"54-xccS4N+LhQ93zfst8LazSz10DOE\"",
		"mtime": "2026-09-02T02:44:49.356Z",
		"size": 84,
		"path": "../public/robots.txt"
	},
	"/sitemap.xml": {
		"type": "application/xml",
		"etag": "\"1ad-f4uKTQKAMkyQZWHxE5ryTuyh6wk\"",
		"mtime": "2026-09-02T02:44:49.356Z",
		"size": 429,
		"path": "../public/sitemap.xml"
	},
	"/assets/AdminModal-D9dsSc4G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc1-LZ8lmTy/xnQlUKqETng5pxNrUXU\"",
		"mtime": "2026-09-02T02:44:45.587Z",
		"size": 3009,
		"path": "../public/assets/AdminModal-D9dsSc4G.js"
	},
	"/assets/AdminTabs-C63cIQMT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"31d-yXCuhmQnJeRXGa26xZaX0crTlx4\"",
		"mtime": "2026-09-02T02:44:45.587Z",
		"size": 797,
		"path": "../public/assets/AdminTabs-C63cIQMT.js"
	},
	"/assets/Layout-BzBubz03.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3319-o5yC2q/O/0VNOomSK6BxXLO0UCw\"",
		"mtime": "2026-09-02T02:44:45.587Z",
		"size": 13081,
		"path": "../public/assets/Layout-BzBubz03.js"
	},
	"/assets/OverlaysBundle-DWa7t-6a.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1736c-ZG1D1X8VgUEKocu7nVL44PNHm1w\"",
		"mtime": "2026-09-02T02:44:45.587Z",
		"size": 95084,
		"path": "../public/assets/OverlaysBundle-DWa7t-6a.js"
	},
	"/assets/ProductCard-BgsK8P56.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"93b-xJ/KDekf+8+nEGI84fzqgixXEvI\"",
		"mtime": "2026-09-02T02:44:45.587Z",
		"size": 2363,
		"path": "../public/assets/ProductCard-BgsK8P56.js"
	},
	"/assets/ShareSheet-BSTDj01C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"104c-LCdyMXT1DaXBppEEqhUP6wNfrFs\"",
		"mtime": "2026-09-02T02:44:45.587Z",
		"size": 4172,
		"path": "../public/assets/ShareSheet-BSTDj01C.js"
	},
	"/assets/SmartImage-Baqa-DzA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"755-WMsyexU17uY7UiC6WBU4quVhRJg\"",
		"mtime": "2026-09-02T02:44:45.587Z",
		"size": 1877,
		"path": "../public/assets/SmartImage-Baqa-DzA.js"
	},
	"/assets/arrow-left-BmAZr12X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-gXo0UkGcbBZfOn7hniDqDJBFM0E\"",
		"mtime": "2026-09-02T02:44:45.587Z",
		"size": 165,
		"path": "../public/assets/arrow-left-BmAZr12X.js"
	},
	"/assets/arrow-right-DdeI4MLJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-f9DD0ZW4LzKdOxjMGfi4ORxd6MY\"",
		"mtime": "2026-09-02T02:44:45.587Z",
		"size": 165,
		"path": "../public/assets/arrow-right-DdeI4MLJ.js"
	},
	"/assets/arrow-up-right-D-a4p84_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a7-/tmZ3lmzimemwkKtHJst5lvZGRQ\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 167,
		"path": "../public/assets/arrow-up-right-D-a4p84_.js"
	},
	"/assets/auth-CIAYoVqA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3560-is6goaj8ZBpKcqzButjtbfMiwco\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 13664,
		"path": "../public/assets/auth-CIAYoVqA.js"
	},
	"/assets/auth-IFTR1jMo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11ad-rk2nTZsrB5ph4Q6tNoNAo1nY2dQ\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 4525,
		"path": "../public/assets/auth-IFTR1jMo.js"
	},
	"/assets/badge-check-Ct12fjB0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13c-XY0phrNLMiQmTCnxm8KOnUKtvSY\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 316,
		"path": "../public/assets/badge-check-Ct12fjB0.js"
	},
	"/assets/banner-BP2agth0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b3-ARwQgjBIJQGnEWxlp9gdrpg94Cc\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 2483,
		"path": "../public/assets/banner-BP2agth0.js"
	},
	"/assets/bazarixy-logo.webp.asset-CRxaR9He.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ac-v1A9tB1yGCmdfnScNLvNKb8jvCg\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 428,
		"path": "../public/assets/bazarixy-logo.webp.asset-CRxaR9He.js"
	},
	"/assets/bazarixy-mark-BoezJBBF.webp": {
		"type": "image/webp",
		"etag": "\"13b1a-VTfHiNLa+4ZyKgn/xLXhph+vQ0s\"",
		"mtime": "2026-09-02T02:44:45.593Z",
		"size": 80666,
		"path": "../public/assets/bazarixy-mark-BoezJBBF.webp"
	},
	"/assets/cart-B7c66aDQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f7b-7FkLlnG2TDxLZj0RqnHT6ymJ4Nc\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 8059,
		"path": "../public/assets/cart-B7c66aDQ.js"
	},
	"/assets/cat-casa-Bhw4cn94.jpg": {
		"type": "image/jpeg",
		"etag": "\"109e2-64W5w/r881d5MlggeuEVfSxlSx0\"",
		"mtime": "2026-09-02T02:44:45.593Z",
		"size": 68066,
		"path": "../public/assets/cat-casa-Bhw4cn94.jpg"
	},
	"/assets/cat-eletronicos-B0bni-lq.jpg": {
		"type": "image/jpeg",
		"etag": "\"9eb4-guTG9oGXHjsPlNospr8KbgmQSSA\"",
		"mtime": "2026-09-02T02:44:45.593Z",
		"size": 40628,
		"path": "../public/assets/cat-eletronicos-B0bni-lq.jpg"
	},
	"/assets/cat-beleza-D1kCkjAZ.jpg": {
		"type": "image/jpeg",
		"etag": "\"1b46f-YLJlnudyTIkSuWvMBi/i8eFg2QU\"",
		"mtime": "2026-09-02T02:44:45.593Z",
		"size": 111727,
		"path": "../public/assets/cat-beleza-D1kCkjAZ.jpg"
	},
	"/detalhesdolinks.png": {
		"type": "image/png",
		"etag": "\"185fbb-45RAE28pFvi1PhMWXwJvPmF6EEs\"",
		"mtime": "2026-09-02T02:44:49.358Z",
		"size": 1597371,
		"path": "../public/detalhesdolinks.png"
	},
	"/assets/cat-outros-Bhul1THh.jpg": {
		"type": "image/jpeg",
		"etag": "\"25185-tPs/blFvuESlEW9ziAZHOqlcZyE\"",
		"mtime": "2026-09-02T02:44:45.593Z",
		"size": 151941,
		"path": "../public/assets/cat-outros-Bhul1THh.jpg"
	},
	"/assets/categories-DzJHQ5dX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2543-vgSoS1qmfYVft5igisTaqtNbKsw\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 9539,
		"path": "../public/assets/categories-DzJHQ5dX.js"
	},
	"/assets/categories-store-BCv9gazj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"846-Gwk8gvYHZQL4868ItGWa0sFKVRg\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 2118,
		"path": "../public/assets/categories-store-BCv9gazj.js"
	},
	"/assets/category._slug-Bzp7awd5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fe-xEnw7hzm/0PximnyaVZDpzVY3bg\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 254,
		"path": "../public/assets/category._slug-Bzp7awd5.js"
	},
	"/assets/category._slug-DDQS5ecL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-DhA5gRbnO6noSV84gQsGVGc3BFU\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 236,
		"path": "../public/assets/category._slug-DDQS5ecL.js"
	},
	"/assets/category._slug-Dt9zv9PC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1452-WwaEAXHT4iKhM5p9+cZ2h7+F5jY\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 5202,
		"path": "../public/assets/category._slug-Dt9zv9PC.js"
	},
	"/assets/chart-column-CLxaEe1t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-mTEwKWR7xtGCLQdksxeYu4V8QeI\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 251,
		"path": "../public/assets/chart-column-CLxaEe1t.js"
	},
	"/assets/check-CCNqrC1g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c-za+g0Apj+yzWeYK+kKbueqKdpas\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 124,
		"path": "../public/assets/check-CCNqrC1g.js"
	},
	"/assets/check-check-C81FTFjX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b3-mFPyqlzucwo8UtuqG9wcbNmA/YY\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 179,
		"path": "../public/assets/check-check-C81FTFjX.js"
	},
	"/assets/checkout-PE5HMI-U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"58fa-qXuBmh2eQnJGD7zbvE6uKitngTg\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 22778,
		"path": "../public/assets/checkout-PE5HMI-U.js"
	},
	"/assets/chevron-down-B4OPneHY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"80-yGDV/ilnUMkky/FY27IppG7E1eU\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 128,
		"path": "../public/assets/chevron-down-B4OPneHY.js"
	},
	"/assets/chevron-left-CDy3kl3r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82-N8QrP4bsG3X+9PEP3TPCooVgnY8\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 130,
		"path": "../public/assets/chevron-left-CDy3kl3r.js"
	},
	"/assets/chevron-right-C9evg30a.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82-ffgIljbPZdkW0OYWbFdXvI5GBvw\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 130,
		"path": "../public/assets/chevron-right-C9evg30a.js"
	},
	"/assets/circle-check-BNg_BNCk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-ynv7NYeMmTYExFOKSL9Iyl7Jyh0\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 178,
		"path": "../public/assets/circle-check-BNg_BNCk.js"
	},
	"/assets/client-2CaapKbc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11a4-Fyv0tqTWodxDq83Ih2kVTOCPLM8\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 4516,
		"path": "../public/assets/client-2CaapKbc.js"
	},
	"/assets/clock-Ck_bJSgx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-CYv5zrLZuPbYLtl+al1BNfTEAUk\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 169,
		"path": "../public/assets/clock-Ck_bJSgx.js"
	},
	"/assets/coins-DKTzYf2R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11d-YwsRP+VX2289rBT1ZlX+Q6RR/QE\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 285,
		"path": "../public/assets/coins-DKTzYf2R.js"
	},
	"/assets/colors-BJKl-Gdh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3d4-9inSdsk5bsroRB269bctgt/oKrE\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 980,
		"path": "../public/assets/colors-BJKl-Gdh.js"
	},
	"/assets/como-pagar-Ct__dUVu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1117-UlouN7ONgAk35DKW4szZsDs5o+s\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 4375,
		"path": "../public/assets/como-pagar-Ct__dUVu.js"
	},
	"/assets/copy-BJVIj8L1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-mujCqIFvddec03i++qiw+eNsagE\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 236,
		"path": "../public/assets/copy-BJVIj8L1.js"
	},
	"/assets/coupons-GKhqI4xk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1772-/d04ChDdzfCK1NtREt8ig7/PauE\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 6002,
		"path": "../public/assets/coupons-GKhqI4xk.js"
	},
	"/assets/coupons-store-DAGmBCon.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a2-pvemxyus91QKpY7fd9jFujTzUhI\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 1698,
		"path": "../public/assets/coupons-store-DAGmBCon.js"
	},
	"/assets/createLucideIcon-cPwvoQem.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a0-p4j4oMg8OI8NWiq6sASxP2tvJ4M\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 1184,
		"path": "../public/assets/createLucideIcon-cPwvoQem.js"
	},
	"/assets/credit-card-m2jg6_n_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf-QELYgSs445QoI0kRlpAAx1PFUTE\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 207,
		"path": "../public/assets/credit-card-m2jg6_n_.js"
	},
	"/assets/email-index-BkhzwmRU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"331-s7EfEipQR2NOJ7wxE4uaguu87rQ\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 817,
		"path": "../public/assets/email-index-BkhzwmRU.js"
	},
	"/assets/email-verification-D5d8vE88.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"263-evLpenusL1J4D9nLLiLAmcRS8hY\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 611,
		"path": "../public/assets/email-verification-D5d8vE88.js"
	},
	"/assets/eye-btBJQO-u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100-3nNqj/FCnSvkOfogOhs9ijRdJCk\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 256,
		"path": "../public/assets/eye-btBJQO-u.js"
	},
	"/assets/eye-off-Dw96vlZ1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ae-sD1sSerxeiWa45G6IpRiKdEdd94\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 430,
		"path": "../public/assets/eye-off-Dw96vlZ1.js"
	},
	"/assets/favorites-CqH0NCfx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ba8-aNM6NDgv0FcatukjSoVqwOe/kkg\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 2984,
		"path": "../public/assets/favorites-CqH0NCfx.js"
	},
	"/assets/flame-DbHt73Yn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c7-FGO9wkmqxJ5YJRmW/AJY54ujyrw\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 199,
		"path": "../public/assets/flame-DbHt73Yn.js"
	},
	"/assets/folder-tree-DpOf1GO5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1df-IxneIzIY2+9q68bdB1dRtM18GYM\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 479,
		"path": "../public/assets/folder-tree-DpOf1GO5.js"
	},
	"/assets/follows-BwMEz0UR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"358-c9/aW6H9IAKbinBihEE11fLJgxU\"",
		"mtime": "2026-09-02T02:44:45.588Z",
		"size": 856,
		"path": "../public/assets/follows-BwMEz0UR.js"
	},
	"/assets/format-CYW_xdiT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b1-G10l8/x9mRib3XpXQqFI3TlxHy4\"",
		"mtime": "2026-09-02T02:44:45.589Z",
		"size": 177,
		"path": "../public/assets/format-CYW_xdiT.js"
	},
	"/assets/gift-P_P6ynZd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15d-vnGlK+wrSg36ME2+Kx3ADJwuOAQ\"",
		"mtime": "2026-09-02T02:44:45.589Z",
		"size": 349,
		"path": "../public/assets/gift-P_P6ynZd.js"
	},
	"/assets/globe-CldbeQ-m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f2-eSW+Q/zP399JEK4GRSnwUcYKe1U\"",
		"mtime": "2026-09-02T02:44:45.589Z",
		"size": 242,
		"path": "../public/assets/globe-CldbeQ-m.js"
	},
	"/assets/home-config-O201sRNd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7df-WwQwH3fNP/JWrilIu1XBHxPZZpw\"",
		"mtime": "2026-09-02T02:44:45.589Z",
		"size": 2015,
		"path": "../public/assets/home-config-O201sRNd.js"
	},
	"/assets/image-D-lNMpac.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10d-cLciIbciv4jOZdRfvFH+28A0aQc\"",
		"mtime": "2026-09-02T02:44:45.589Z",
		"size": 269,
		"path": "../public/assets/image-D-lNMpac.js"
	},
	"/assets/index.esm-BfRdXDx1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"443c-PlpGoAGegDv6Ti74ZAQQQKcGTCI\"",
		"mtime": "2026-09-02T02:44:45.589Z",
		"size": 17468,
		"path": "../public/assets/index.esm-BfRdXDx1.js"
	},
	"/assets/index.esm-BsGhgQHX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7019-UOYZFpoHpXI31trIliGPlzZHcow\"",
		"mtime": "2026-09-02T02:44:45.589Z",
		"size": 28697,
		"path": "../public/assets/index.esm-BsGhgQHX.js"
	},
	"/assets/index.esm-C2rmm-5h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"80-WLUa7VBUtRCL7vRi420w3G3kYgk\"",
		"mtime": "2026-09-02T02:44:45.589Z",
		"size": 128,
		"path": "../public/assets/index.esm-C2rmm-5h.js"
	},
	"/assets/index.esm-CL2QnA-Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f1e4-4lYRSG0ojBFElXkSHdzuc9a0tsI\"",
		"mtime": "2026-09-02T02:44:45.589Z",
		"size": 127460,
		"path": "../public/assets/index.esm-CL2QnA-Q.js"
	},
	"/assets/index.esm-WVmNHtZ-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8830-6VKThYDQbrmCWbT+Ce8klgFzryc\"",
		"mtime": "2026-09-02T02:44:45.589Z",
		"size": 34864,
		"path": "../public/assets/index.esm-WVmNHtZ-.js"
	},
	"/assets/info-9r1nfKh8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cc-gF4q9mcxVlikIE3XkAGqtUCLlg0\"",
		"mtime": "2026-09-02T02:44:45.589Z",
		"size": 204,
		"path": "../public/assets/info-9r1nfKh8.js"
	},
	"/assets/jsx-runtime-0vZSBttN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a8-DT21o0DVEenQwk6wXcylq/J4hZA\"",
		"mtime": "2026-09-02T02:44:45.589Z",
		"size": 424,
		"path": "../public/assets/jsx-runtime-0vZSBttN.js"
	},
	"/assets/justina-_WGl1QUw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ff4-cz1F+po+BWI7o1K4zFK5RmjBpPs\"",
		"mtime": "2026-09-02T02:44:45.589Z",
		"size": 12276,
		"path": "../public/assets/justina-_WGl1QUw.js"
	},
	"/assets/justina.abas._id-kuL5RbKz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3533-D6froKCOJlqM2mEI6xb7NOYtfFA\"",
		"mtime": "2026-09-02T02:44:45.589Z",
		"size": 13619,
		"path": "../public/assets/justina.abas._id-kuL5RbKz.js"
	},
	"/assets/justina.categorias-fcLK1RDL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f4c-uESRj1N8RmlkUuDuYHkFu+OdBIY\"",
		"mtime": "2026-09-02T02:44:45.589Z",
		"size": 12108,
		"path": "../public/assets/justina.categorias-fcLK1RDL.js"
	},
	"/assets/index-sFOshSpf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6b7e4-pC1dvzjSio+LgLJkzS/EH1wtPm0\"",
		"mtime": "2026-09-02T02:44:45.587Z",
		"size": 440292,
		"path": "../public/assets/index-sFOshSpf.js"
	},
	"/assets/index.esm-C9KZtAzi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"87953-16ZEQAaTpL5rpBaTrqayLoicD50\"",
		"mtime": "2026-09-02T02:44:45.589Z",
		"size": 555347,
		"path": "../public/assets/index.esm-C9KZtAzi.js"
	},
	"/assets/justina.config-9FDG901d.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"979-OL6TJWUEKLHMsZDFAI78EIe8il8\"",
		"mtime": "2026-09-02T02:44:45.589Z",
		"size": 2425,
		"path": "../public/assets/justina.config-9FDG901d.js"
	},
	"/assets/justina.cupons-DLfwkcg8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"157b-yOHOEJx3RFRlHlE1Kn3I1b7gcXs\"",
		"mtime": "2026-09-02T02:44:45.589Z",
		"size": 5499,
		"path": "../public/assets/justina.cupons-DLfwkcg8.js"
	},
	"/assets/justina.equipa-C59f5Uvv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16ba-7hSxRFZwCsJcMvGWCafnx4MBngs\"",
		"mtime": "2026-09-02T02:44:45.589Z",
		"size": 5818,
		"path": "../public/assets/justina.equipa-C59f5Uvv.js"
	},
	"/assets/justina.home-JbEu7Tm9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"42cc-sBau07cuh4bP96ZB2bx9l94/Dbc\"",
		"mtime": "2026-09-02T02:44:45.589Z",
		"size": 17100,
		"path": "../public/assets/justina.home-JbEu7Tm9.js"
	},
	"/assets/justina.index-BYBGtct3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2786-gYGyhgP8vp2TvaP8UlEwT1MU1Qc\"",
		"mtime": "2026-09-02T02:44:45.589Z",
		"size": 10118,
		"path": "../public/assets/justina.index-BYBGtct3.js"
	},
	"/assets/justina.logistica-D25ki0p8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d5f-sehjBnLfVckf1s3VHBMDmqrjaj8\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 11615,
		"path": "../public/assets/justina.logistica-D25ki0p8.js"
	},
	"/assets/justina.lojas._id-D-JcD5P_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19d4-BxL75GvH/t/6GJiZAS6ngC7ohCA\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 6612,
		"path": "../public/assets/justina.lojas._id-D-JcD5P_.js"
	},
	"/assets/justina.lojas-CHhRNwkr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c4e-U2ZRNrM2Uaea+Ses4iFxSpOyF60\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 7246,
		"path": "../public/assets/justina.lojas-CHhRNwkr.js"
	},
	"/assets/justina.metas-_rmdJd-0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cdc-iappvcgDkqAyJlSnIuVEy3p+bi0\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 7388,
		"path": "../public/assets/justina.metas-_rmdJd-0.js"
	},
	"/assets/justina.pagamentos-DT2u_8Ul.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1885-Yfc2bdsFRswJhDJcQc/F8xos9tI\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 6277,
		"path": "../public/assets/justina.pagamentos-DT2u_8Ul.js"
	},
	"/assets/justina.pedidos-CenZmtc9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"52ce-6Kg6vsXeCgXFQXUyhQbazk5GY3A\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 21198,
		"path": "../public/assets/justina.pedidos-CenZmtc9.js"
	},
	"/assets/justina.pesquisas-DJipltvL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"169a-/xccIFkyIKA9CBojFBoezaylLG4\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 5786,
		"path": "../public/assets/justina.pesquisas-DJipltvL.js"
	},
	"/assets/justina.produtos-C00qNDPq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8174-0Q9G0rxB2ph8SII2QKXhtow0IBI\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 33140,
		"path": "../public/assets/justina.produtos-C00qNDPq.js"
	},
	"/assets/justina.receita-C-MVv-bi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2033-f6gN7WNSREh7eilJj6n8+AzZAR4\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 8243,
		"path": "../public/assets/justina.receita-C-MVv-bi.js"
	},
	"/assets/justina.usuarios-BJy4nlZk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f04-ueA0gHDmoJSvH4+o9tBW0JCJMWQ\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 3844,
		"path": "../public/assets/justina.usuarios-BJy4nlZk.js"
	},
	"/assets/layers-sKUIrNts.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a5-THRzSNWTv+Fyajhf1hkCPQqdwkI\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 421,
		"path": "../public/assets/layers-sKUIrNts.js"
	},
	"/assets/layout-grid-D1eYRydS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15a-kBeTIsnBb6aq6JMgbjocdGPXXuQ\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 346,
		"path": "../public/assets/layout-grid-D1eYRydS.js"
	},
	"/assets/link-5skObtIq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"53b4-HCK1apJxlSbAyyjD0Xg7HNT1hAM\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 21428,
		"path": "../public/assets/link-5skObtIq.js"
	},
	"/assets/lock-DY9q7Zdn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ce-PMI389bhM6Hu71gvUDIHoEa7uFM\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 206,
		"path": "../public/assets/lock-DY9q7Zdn.js"
	},
	"/assets/log-out-D_ahBdNI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-U+Sk/m2WMlkVc0tn+CEyFrcBFjs\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 230,
		"path": "../public/assets/log-out-D_ahBdNI.js"
	},
	"/assets/logistics-store-CzKOEfqN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c64-MNoGTpVoJCN0+ErPSBw4RJlvnrU\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 3172,
		"path": "../public/assets/logistics-store-CzKOEfqN.js"
	},
	"/assets/mail-Cbg9Xqpo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-x3YDs1f4xiRt9LFahbcZ41zDVZI\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 213,
		"path": "../public/assets/mail-Cbg9Xqpo.js"
	},
	"/assets/map-pin-C6mqjQGc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-sL6PyQ4lLzP22O1PKbMMDeJn51g\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 259,
		"path": "../public/assets/map-pin-C6mqjQGc.js"
	},
	"/assets/me-BdvwCoMo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2588-z2iFFXjkdzLWGMsGFwd7fNpqCFM\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 9608,
		"path": "../public/assets/me-BdvwCoMo.js"
	},
	"/assets/menu-Dnpcru1z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"321-MWs5CQWByQVCSQMYy7MmeA1eC+w\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 801,
		"path": "../public/assets/menu-Dnpcru1z.js"
	},
	"/assets/message-square-DcYrvzMm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-gPpzrLup6SlWEnlhQplVxPTS/GA\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 233,
		"path": "../public/assets/message-square-DcYrvzMm.js"
	},
	"/assets/minus-N15Mem45.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"75-5Og0sY47fyyLBLvPO6DAqxyGsE8\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 117,
		"path": "../public/assets/minus-N15Mem45.js"
	},
	"/assets/not-found-i5RsCZif.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-Trmr7GZIBZuvfg4uM18tBiRtOXg\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 118,
		"path": "../public/assets/not-found-i5RsCZif.js"
	},
	"/assets/notifications-4npjc0ty.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1491-Ay7NRXeicTN4YkDShjrbN02+PoQ\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 5265,
		"path": "../public/assets/notifications-4npjc0ty.js"
	},
	"/assets/notifications-DPjkyi2V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3b8-V08+ovR5m+qzuV7bohB/5BONreQ\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 952,
		"path": "../public/assets/notifications-DPjkyi2V.js"
	},
	"/assets/notifications-store-BW512fsz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"517-EXZwiFy4dPLrndwv1yrLLbiRQvk\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 1303,
		"path": "../public/assets/notifications-store-BW512fsz.js"
	},
	"/assets/orders-BtGNIghV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"403-000InWzFDXPXvqnjhpBaY1ENwWU\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 1027,
		"path": "../public/assets/orders-BtGNIghV.js"
	},
	"/assets/orders-V8ZEYio2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"57ea-9CAIvzlPISmsp/5Vd6YR71yp3E8\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 22506,
		"path": "../public/assets/orders-V8ZEYio2.js"
	},
	"/assets/orders-store-CeQTNpig.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ed0-szZQT1dZh8QbK9h5XC8IlaMsa2c\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 7888,
		"path": "../public/assets/orders-store-CeQTNpig.js"
	},
	"/assets/p-cream-t29T4qSa.jpg": {
		"type": "image/jpeg",
		"etag": "\"7d1c-OF87WaSKzGYV4wll3FlG+reblzA\"",
		"mtime": "2026-09-02T02:44:45.594Z",
		"size": 32028,
		"path": "../public/assets/p-cream-t29T4qSa.jpg"
	},
	"/assets/p-dress-BEbFKKeJ.jpg": {
		"type": "image/jpeg",
		"etag": "\"8b7f-xusMudTEekzqGEljjV1OStbMgsU\"",
		"mtime": "2026-09-02T02:44:45.594Z",
		"size": 35711,
		"path": "../public/assets/p-dress-BEbFKKeJ.jpg"
	},
	"/assets/p-brushes-BdxdHdet.jpg": {
		"type": "image/jpeg",
		"etag": "\"12ca4-QEM7Pxib/X2lBQLJ3FZwFifHFbo\"",
		"mtime": "2026-09-02T02:44:45.593Z",
		"size": 76964,
		"path": "../public/assets/p-brushes-BdxdHdet.jpg"
	},
	"/assets/p-jumpsuit-BkhcJynf.jpg": {
		"type": "image/jpeg",
		"etag": "\"b652-llu0RjNBZpx6CW4FXmoJV0PCe2w\"",
		"mtime": "2026-09-02T02:44:45.594Z",
		"size": 46674,
		"path": "../public/assets/p-jumpsuit-BkhcJynf.jpg"
	},
	"/assets/p-knit-B1VN3gUH.jpg": {
		"type": "image/jpeg",
		"etag": "\"178e5-bp21sK1XIkX36dgMZsPUBpGG3/M\"",
		"mtime": "2026-09-02T02:44:45.594Z",
		"size": 96485,
		"path": "../public/assets/p-knit-B1VN3gUH.jpg"
	},
	"/assets/p-lipstick-CX6Dj8cF.jpg": {
		"type": "image/jpeg",
		"etag": "\"15b47-gxs0XoZAuNzHvPslCpXEq+DCAcU\"",
		"mtime": "2026-09-02T02:44:45.594Z",
		"size": 88903,
		"path": "../public/assets/p-lipstick-CX6Dj8cF.jpg"
	},
	"/assets/p-pants-w2etJJsJ.jpg": {
		"type": "image/jpeg",
		"etag": "\"ad98-TgL+g++/aInC8NKn0yV9gtipSJ0\"",
		"mtime": "2026-09-02T02:44:45.594Z",
		"size": 44440,
		"path": "../public/assets/p-pants-w2etJJsJ.jpg"
	},
	"/assets/p-perfume-BnxGlR6I.jpg": {
		"type": "image/jpeg",
		"etag": "\"c4e5-FHYORWvyQw9GRTCgnSCkkTb5BsQ\"",
		"mtime": "2026-09-02T02:44:45.594Z",
		"size": 50405,
		"path": "../public/assets/p-perfume-BnxGlR6I.jpg"
	},
	"/assets/p-reddress-BngZqOK1.jpg": {
		"type": "image/jpeg",
		"etag": "\"ae1f-EopdjO+URdpSyHI4ZpN3YJ6tGj0\"",
		"mtime": "2026-09-02T02:44:45.594Z",
		"size": 44575,
		"path": "../public/assets/p-reddress-BngZqOK1.jpg"
	},
	"/assets/p-skirt-DNF_I8F3.jpg": {
		"type": "image/jpeg",
		"etag": "\"8b75-7lpHtIZ7XyMgHLrwrwDukBIPnGs\"",
		"mtime": "2026-09-02T02:44:45.594Z",
		"size": 35701,
		"path": "../public/assets/p-skirt-DNF_I8F3.jpg"
	},
	"/assets/p-swim-9aOCY719.jpg": {
		"type": "image/jpeg",
		"etag": "\"f963-+F35GN6hkofO+2LKZ/nR/wRC6fM\"",
		"mtime": "2026-09-02T02:44:45.594Z",
		"size": 63843,
		"path": "../public/assets/p-swim-9aOCY719.jpg"
	},
	"/assets/p-tank-DYSgLGey.jpg": {
		"type": "image/jpeg",
		"etag": "\"102a0-8UKqAkGsFC7tn5V4uyafssb8d88\"",
		"mtime": "2026-09-02T02:44:45.595Z",
		"size": 66208,
		"path": "../public/assets/p-tank-DYSgLGey.jpg"
	},
	"/assets/p-top-BTKTbnRS.jpg": {
		"type": "image/jpeg",
		"etag": "\"d291-bFerBrwW3D5Spjqlsv3DtjgOqeg\"",
		"mtime": "2026-09-02T02:44:45.595Z",
		"size": 53905,
		"path": "../public/assets/p-top-BTKTbnRS.jpg"
	},
	"/assets/package-CBeDJ4Sv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"174-gnilbzb7pwtarW10b09b3v8jClU\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 372,
		"path": "../public/assets/package-CBeDJ4Sv.js"
	},
	"/assets/p-jeans-BIj6CxYP.jpg": {
		"type": "image/jpeg",
		"etag": "\"23415-HTJ6loY6CPgdWI8ul1wq49eUCjw\"",
		"mtime": "2026-09-02T02:44:45.594Z",
		"size": 144405,
		"path": "../public/assets/p-jeans-BIj6CxYP.jpg"
	},
	"/assets/package-open-BY2XdXjc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"243-l0RVjAIOk4BJPFftLEI+6IqZ4/k\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 579,
		"path": "../public/assets/package-open-BY2XdXjc.js"
	},
	"/assets/pay-express.jpg.asset-Cyk8AYll.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33c-YsNAiUCenUU9xbjiEN2Uf6Tv/wI\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 828,
		"path": "../public/assets/pay-express.jpg.asset-Cyk8AYll.js"
	},
	"/assets/pay._method-BuwES4s8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3105-eomNHe2j/6Bc0zesxWq+aidXeh8\"",
		"mtime": "2026-09-02T02:44:45.590Z",
		"size": 12549,
		"path": "../public/assets/pay._method-BuwES4s8.js"
	},
	"/assets/payments-store-BKA0NUTP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a7-Erne+etz5PolkSXDvJy2Z7oR1G0\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 2471,
		"path": "../public/assets/payments-store-BKA0NUTP.js"
	},
	"/assets/pencil-Ce_zgDGo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"114-j0YXPdWv9PfdFfNqqYve08jZsE8\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 276,
		"path": "../public/assets/pencil-Ce_zgDGo.js"
	},
	"/assets/pending-payment-CjTbbZwJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"181-5aYgCRh+5tLa1Kl8HmV93vGWeM0\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 385,
		"path": "../public/assets/pending-payment-CjTbbZwJ.js"
	},
	"/assets/plus-CsFklqLM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-hV1ZU//qKDkNfMVQj6KE+nM11Io\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 153,
		"path": "../public/assets/plus-CsFklqLM.js"
	},
	"/assets/points-6Xat1z6i.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1467-8NycBr/pDfHLzYx5CAQ3zOYByBs\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 5223,
		"path": "../public/assets/points-6Xat1z6i.js"
	},
	"/assets/points-CcgbEhiv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"544-RQM59IFDM+RGT5phibxnsovd+sc\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 1348,
		"path": "../public/assets/points-CcgbEhiv.js"
	},
	"/assets/product._id-Bk-8w9pv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10e-aMBaaj0vL00ExqHu+FjzxVYjGe4\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 270,
		"path": "../public/assets/product._id-Bk-8w9pv.js"
	},
	"/assets/product._id-C-I2zEP1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f8-yH5jF1F7GiLU2wLK6nIwOAJ7XqM\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 248,
		"path": "../public/assets/product._id-C-I2zEP1.js"
	},
	"/assets/privacidade-C-a-rjkT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27fd-IqBTXp8PBKHHCdMhyutS34v1ou8\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 10237,
		"path": "../public/assets/privacidade-C-a-rjkT.js"
	},
	"/assets/product._id-n7G7SNI5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6515-i7o7oRewyFGauOt10yej52rl7OE\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 25877,
		"path": "../public/assets/product._id-n7G7SNI5.js"
	},
	"/assets/products-store-CH6YppLy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"96e-JNB+cBGAPdwx8rD6I1rFBwopA7w\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 2414,
		"path": "../public/assets/products-store-CH6YppLy.js"
	},
	"/assets/promo-1-D9QBnF1Y.png": {
		"type": "image/png",
		"etag": "\"5c5d7-jgaByYJZ7VuNG4j6B9aQDUG3WUA\"",
		"mtime": "2026-09-02T02:44:45.595Z",
		"size": 378327,
		"path": "../public/assets/promo-1-D9QBnF1Y.png"
	},
	"/assets/promo-2-djOW7yEW.png": {
		"type": "image/png",
		"etag": "\"6be5d-obj99+iBJlyAl1e8ohm/6uGppF4\"",
		"mtime": "2026-09-02T02:44:45.595Z",
		"size": 441949,
		"path": "../public/assets/promo-2-djOW7yEW.png"
	},
	"/assets/promo-3-Ddu1tsCS.png": {
		"type": "image/png",
		"etag": "\"3c903-jvRqSVXnhNZpruPkxbj6Jbjs8vA\"",
		"mtime": "2026-09-02T02:44:45.595Z",
		"size": 248067,
		"path": "../public/assets/promo-3-Ddu1tsCS.png"
	},
	"/assets/recommendations-BbIWjVZl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b19-BiBRZmRbO6O4Cr/eDmvrrNWVfcc\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 2841,
		"path": "../public/assets/recommendations-BbIWjVZl.js"
	},
	"/assets/react-SIfiwpqq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ff9-FGVdof4/lFGmrdRsB9EIvuwBlYc\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 8185,
		"path": "../public/assets/react-SIfiwpqq.js"
	},
	"/assets/referrals-BQRCRUtJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d6-4dKJsMcLAl5AhwatMKl5urbFXQ8\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 1238,
		"path": "../public/assets/referrals-BQRCRUtJ.js"
	},
	"/assets/revenue-C0c5_dMi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2fa-OiUSRI5aHxCb69wV/cuthDAOJc4\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 762,
		"path": "../public/assets/revenue-C0c5_dMi.js"
	},
	"/assets/reviews-D-FB6nbN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85f-R16RML9mA9HSMOsNpo9/I09qkjo\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 2143,
		"path": "../public/assets/reviews-D-FB6nbN.js"
	},
	"/assets/roles-iOhd5TD7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"637-xvQr2Dh4f1MvmrxbNwTn99K3/PY\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 1591,
		"path": "../public/assets/roles-iOhd5TD7.js"
	},
	"/assets/root-DLTE-HSj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20-vSYConOtSP6ciwr9zKsPixNwWmc\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 32,
		"path": "../public/assets/root-DLTE-HSj.js"
	},
	"/assets/rotate-ccw-DjyDNOwP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c8-DPGJLCZ7OBGOoyvAr0ExEg8iCyI\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 200,
		"path": "../public/assets/rotate-ccw-DjyDNOwP.js"
	},
	"/assets/routes-DWzYtzmR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4312-kBYwSqvYnbWN/Npu+bXf0ZH4ka8\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 17170,
		"path": "../public/assets/routes-DWzYtzmR.js"
	},
	"/assets/search-CzMGmf7M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-b9y6AXI3WU49XAW6vzxNX+9hJAk\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 174,
		"path": "../public/assets/search-CzMGmf7M.js"
	},
	"/assets/send-DCFGnZqu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1de-oNrZCmEQ/zK54Axy+adruAdikp8\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 478,
		"path": "../public/assets/send-DCFGnZqu.js"
	},
	"/assets/send-ZWEKRvvd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"190-B/GfUD7xbrPbgKl49aL3RUUMISI\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 400,
		"path": "../public/assets/send-ZWEKRvvd.js"
	},
	"/assets/settings-C2BEpQYp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2845-R5w+1hwaPl4UaEJvE80C2pTIP84\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 10309,
		"path": "../public/assets/settings-C2BEpQYp.js"
	},
	"/assets/settings-OVXPq8of.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7-3pKLuymqQVTPmjoZvaV+SiXunqU\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 487,
		"path": "../public/assets/settings-OVXPq8of.js"
	},
	"/assets/share-2-CcqjdWpJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"165-QDmsr1TmhtKuw2U4e493BS0yS7g\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 357,
		"path": "../public/assets/share-2-CcqjdWpJ.js"
	},
	"/assets/shield-alert-RE0kBelx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"161-8yki1oTNML+fp1mC2WlW/iEOcIc\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 353,
		"path": "../public/assets/shield-alert-RE0kBelx.js"
	},
	"/assets/shield-check-B3PmHBMY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-G33KRg9KT60ucl9G/TtXATi40Ns\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 320,
		"path": "../public/assets/shield-check-B3PmHBMY.js"
	},
	"/assets/shop._id-Bi43mxzr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f4-8WpzWZl2ZAayRMbzrFS9doDJQA8\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 244,
		"path": "../public/assets/shop._id-Bi43mxzr.js"
	},
	"/assets/shop._id-JXHiKL_o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15f9-WHb5UoGpKSGwPfR0tU6ryWnnUaE\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 5625,
		"path": "../public/assets/shop._id-JXHiKL_o.js"
	},
	"/assets/shopping-bag-wN4xsTXd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"154-tWGIP3GN/lxEepwn9Jj3DDP4Gyc\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 340,
		"path": "../public/assets/shopping-bag-wN4xsTXd.js"
	},
	"/assets/sliders-horizontal-DfsKfQ27.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a8-zO5qcWGz+pvo9SdbZSUW47NbGfQ\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 424,
		"path": "../public/assets/sliders-horizontal-DfsKfQ27.js"
	},
	"/assets/sparkles-USJV5op3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-8Cue5x6m3xDHvPVgMMegQ1Hxrmg\"",
		"mtime": "2026-09-02T02:44:45.592Z",
		"size": 494,
		"path": "../public/assets/sparkles-USJV5op3.js"
	},
	"/assets/star-CYIcROk7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d8-CAGMcBuAXcdSdd1ngXKmc3CYgrk\"",
		"mtime": "2026-09-02T02:44:45.593Z",
		"size": 472,
		"path": "../public/assets/star-CYIcROk7.js"
	},
	"/assets/store-BPHnSeEG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f2-7DjxDcYbVWyOI525/S93wYQ1Tuw\"",
		"mtime": "2026-09-02T02:44:45.593Z",
		"size": 498,
		"path": "../public/assets/store-BPHnSeEG.js"
	},
	"/assets/store-MMK0XR0f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bf2-rP0CLZvbO/p+F/xx4sX+meFZuRE\"",
		"mtime": "2026-09-02T02:44:45.593Z",
		"size": 3058,
		"path": "../public/assets/store-MMK0XR0f.js"
	},
	"/assets/styles-Ddqch_it.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"253cc-D0XINY/pt83eTby31NYz57V21RU\"",
		"mtime": "2026-09-02T02:44:45.595Z",
		"size": 152524,
		"path": "../public/assets/styles-Ddqch_it.css"
	},
	"/assets/super-ofertas-ZurxQTO5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"533-4eLECbU33veJxqq+Uopux5U5o1w\"",
		"mtime": "2026-09-02T02:44:45.593Z",
		"size": 1331,
		"path": "../public/assets/super-ofertas-ZurxQTO5.js"
	},
	"/assets/suportlogo-BBF_wn1G.png": {
		"type": "image/png",
		"etag": "\"72c7f-/MBMtVbUOXou9xmVGKtzlcmnap8\"",
		"mtime": "2026-09-02T02:44:45.595Z",
		"size": 470143,
		"path": "../public/assets/suportlogo-BBF_wn1G.png"
	},
	"/assets/support-D9miCyWY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a21-7Y54xK6UDwrSPDGpOQDxkEKIHtA\"",
		"mtime": "2026-09-02T02:44:45.593Z",
		"size": 18977,
		"path": "../public/assets/support-D9miCyWY.js"
	},
	"/assets/sync-store-DRBowSHU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"675-7+e92YuxdZPUNbQKdNe4l9t51WU\"",
		"mtime": "2026-09-02T02:44:45.593Z",
		"size": 1653,
		"path": "../public/assets/sync-store-DRBowSHU.js"
	},
	"/assets/target-CBRGy9km.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e2-t3Sn5kCdbBtiqBWGg3xx+H8JwHo\"",
		"mtime": "2026-09-02T02:44:45.593Z",
		"size": 226,
		"path": "../public/assets/target-CBRGy9km.js"
	},
	"/assets/termos-UBGOZ7Et.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"318a-pmMayIeePTq7P49ZGmMdCK+LeyE\"",
		"mtime": "2026-09-02T02:44:45.593Z",
		"size": 12682,
		"path": "../public/assets/termos-UBGOZ7Et.js"
	},
	"/assets/ticket-BiNpThdz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-xN89hCgQihvZy3O5LFOZhNcbbuo\"",
		"mtime": "2026-09-02T02:44:45.593Z",
		"size": 321,
		"path": "../public/assets/ticket-BiNpThdz.js"
	},
	"/assets/trash-2-D9ykOZrd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-SFufvwScaqfz7pcnb2UUn3FfGKk\"",
		"mtime": "2026-09-02T02:44:45.593Z",
		"size": 328,
		"path": "../public/assets/trash-2-D9ykOZrd.js"
	},
	"/assets/trending-up-B6Edyn1q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"af-ZcD8ymo8T8OMoVkfzimNFhXKuIY\"",
		"mtime": "2026-09-02T02:44:45.593Z",
		"size": 175,
		"path": "../public/assets/trending-up-B6Edyn1q.js"
	},
	"/assets/triangle-alert-FTKqut9w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109-OpU+dqUqLnrikxh4aRCiuvoiOrA\"",
		"mtime": "2026-09-02T02:44:45.593Z",
		"size": 265,
		"path": "../public/assets/triangle-alert-FTKqut9w.js"
	},
	"/assets/trocas-devolucoes-DutJgCqT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22b0-faOfzp4lwnenaHE6eWvSStkxUYw\"",
		"mtime": "2026-09-02T02:44:45.593Z",
		"size": 8880,
		"path": "../public/assets/trocas-devolucoes-DutJgCqT.js"
	},
	"/assets/truck-CyWOy9Pq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"196-uGkug4CZttLs7NFYlEME1CCeoDU\"",
		"mtime": "2026-09-02T02:44:45.593Z",
		"size": 406,
		"path": "../public/assets/truck-CyWOy9Pq.js"
	},
	"/assets/undo-2-Dz34a5Qr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d0-+JX2jz9JFkOkKTnnSwRaYZYKoo8\"",
		"mtime": "2026-09-02T02:44:45.593Z",
		"size": 208,
		"path": "../public/assets/undo-2-Dz34a5Qr.js"
	},
	"/assets/upload-_W_nh37K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9cb-x5tyrRfxMb4TO1kM1j4Bfyoay1w\"",
		"mtime": "2026-09-02T02:44:45.593Z",
		"size": 2507,
		"path": "../public/assets/upload-_W_nh37K.js"
	},
	"/assets/useMatch-BkHFXV7H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"213-rvLoQvpVwIn3soSE7ZmC0OdpvcY\"",
		"mtime": "2026-09-02T02:44:45.593Z",
		"size": 531,
		"path": "../public/assets/useMatch-BkHFXV7H.js"
	},
	"/assets/user-data-DUzrHjcJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a11-0XcBYm9MFwaox9S8oFa7YtuJNOs\"",
		"mtime": "2026-09-02T02:44:45.593Z",
		"size": 2577,
		"path": "../public/assets/user-data-DUzrHjcJ.js"
	},
	"/assets/user-plus-HbfwRcYz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-AQDJ12q23Dnf5CGOnaVrhifxSio\"",
		"mtime": "2026-09-02T02:44:45.593Z",
		"size": 310,
		"path": "../public/assets/user-plus-HbfwRcYz.js"
	},
	"/assets/users-C-3GO8qD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-2Etv51zCmy57gDoatAApaFJa9Vk\"",
		"mtime": "2026-09-02T02:44:45.593Z",
		"size": 306,
		"path": "../public/assets/users-C-3GO8qD.js"
	},
	"/assets/wallet-B1Rcb-Ud.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11e-pcmmlXiLgPvRoVEYKUoKffKeTQM\"",
		"mtime": "2026-09-02T02:44:45.593Z",
		"size": 286,
		"path": "../public/assets/wallet-B1Rcb-Ud.js"
	},
	"/assets/wallet-hghld4pm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"160b-vQtbk1xX2XepzH9pS98Re6NPrDM\"",
		"mtime": "2026-09-02T02:44:45.593Z",
		"size": 5643,
		"path": "../public/assets/wallet-hghld4pm.js"
	},
	"/assets/x-B2FTZ7Vt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-YzY9+adS4NM8VvQ9ImCQoQFBfkc\"",
		"mtime": "2026-09-02T02:44:45.593Z",
		"size": 154,
		"path": "../public/assets/x-B2FTZ7Vt.js"
	},
	"/assets/zap-bFH_IeqZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"106-o1zlUbhJe/IP+W3bfjkTqsG2slY\"",
		"mtime": "2026-09-02T02:44:45.593Z",
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
