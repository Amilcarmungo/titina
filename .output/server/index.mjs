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
		"mtime": "2026-09-02T03:01:25.870Z",
		"size": 15086,
		"path": "../public/favicon.ico"
	},
	"/logotipo.webp": {
		"type": "image/webp",
		"etag": "\"1c700-hfa8Y9a9TMQJ+I/2wksM5NlkPJQ\"",
		"mtime": "2026-09-02T03:01:25.871Z",
		"size": 116480,
		"path": "../public/logotipo.webp"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"54-xccS4N+LhQ93zfst8LazSz10DOE\"",
		"mtime": "2026-09-02T03:01:25.870Z",
		"size": 84,
		"path": "../public/robots.txt"
	},
	"/sitemap.xml": {
		"type": "application/xml",
		"etag": "\"1ad-f4uKTQKAMkyQZWHxE5ryTuyh6wk\"",
		"mtime": "2026-09-02T03:01:25.871Z",
		"size": 429,
		"path": "../public/sitemap.xml"
	},
	"/assets/AdminModal-D9dsSc4G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc1-LZ8lmTy/xnQlUKqETng5pxNrUXU\"",
		"mtime": "2026-09-02T03:01:22.079Z",
		"size": 3009,
		"path": "../public/assets/AdminModal-D9dsSc4G.js"
	},
	"/assets/AdminTabs-C63cIQMT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"31d-yXCuhmQnJeRXGa26xZaX0crTlx4\"",
		"mtime": "2026-09-02T03:01:22.079Z",
		"size": 797,
		"path": "../public/assets/AdminTabs-C63cIQMT.js"
	},
	"/assets/Layout-CiwKIJVb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3319-ICkiIyaTLPDNZOwryp/LC4cZSdg\"",
		"mtime": "2026-09-02T03:01:22.079Z",
		"size": 13081,
		"path": "../public/assets/Layout-CiwKIJVb.js"
	},
	"/assets/OverlaysBundle-BYMHAcT5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1736c-BNy079uUbiFAURy8Pd2YzMXTN6A\"",
		"mtime": "2026-09-02T03:01:22.079Z",
		"size": 95084,
		"path": "../public/assets/OverlaysBundle-BYMHAcT5.js"
	},
	"/assets/ProductCard-BgsK8P56.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"93b-xJ/KDekf+8+nEGI84fzqgixXEvI\"",
		"mtime": "2026-09-02T03:01:22.079Z",
		"size": 2363,
		"path": "../public/assets/ProductCard-BgsK8P56.js"
	},
	"/assets/ShareSheet-TTOjF1PD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"104c-TbqOofyPbq99YH3baea/PcWE3+Q\"",
		"mtime": "2026-09-02T03:01:22.079Z",
		"size": 4172,
		"path": "../public/assets/ShareSheet-TTOjF1PD.js"
	},
	"/assets/SmartImage-Baqa-DzA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"755-WMsyexU17uY7UiC6WBU4quVhRJg\"",
		"mtime": "2026-09-02T03:01:22.079Z",
		"size": 1877,
		"path": "../public/assets/SmartImage-Baqa-DzA.js"
	},
	"/assets/arrow-left-BmAZr12X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-gXo0UkGcbBZfOn7hniDqDJBFM0E\"",
		"mtime": "2026-09-02T03:01:22.079Z",
		"size": 165,
		"path": "../public/assets/arrow-left-BmAZr12X.js"
	},
	"/assets/arrow-right-DdeI4MLJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-f9DD0ZW4LzKdOxjMGfi4ORxd6MY\"",
		"mtime": "2026-09-02T03:01:22.079Z",
		"size": 165,
		"path": "../public/assets/arrow-right-DdeI4MLJ.js"
	},
	"/assets/arrow-up-right-D-a4p84_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a7-/tmZ3lmzimemwkKtHJst5lvZGRQ\"",
		"mtime": "2026-09-02T03:01:22.079Z",
		"size": 167,
		"path": "../public/assets/arrow-up-right-D-a4p84_.js"
	},
	"/assets/auth-DGr7A1qi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3560-LewM9jm22hMuuFubra+W1GhnfIw\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 13664,
		"path": "../public/assets/auth-DGr7A1qi.js"
	},
	"/assets/auth-IFTR1jMo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11ad-rk2nTZsrB5ph4Q6tNoNAo1nY2dQ\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 4525,
		"path": "../public/assets/auth-IFTR1jMo.js"
	},
	"/assets/badge-check-Ct12fjB0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13c-XY0phrNLMiQmTCnxm8KOnUKtvSY\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 316,
		"path": "../public/assets/badge-check-Ct12fjB0.js"
	},
	"/assets/banner-BP2agth0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b3-ARwQgjBIJQGnEWxlp9gdrpg94Cc\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 2483,
		"path": "../public/assets/banner-BP2agth0.js"
	},
	"/assets/bazarixy-logo.webp.asset-CRxaR9He.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ac-v1A9tB1yGCmdfnScNLvNKb8jvCg\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 428,
		"path": "../public/assets/bazarixy-logo.webp.asset-CRxaR9He.js"
	},
	"/assets/bazarixy-mark-BoezJBBF.webp": {
		"type": "image/webp",
		"etag": "\"13b1a-VTfHiNLa+4ZyKgn/xLXhph+vQ0s\"",
		"mtime": "2026-09-02T03:01:22.093Z",
		"size": 80666,
		"path": "../public/assets/bazarixy-mark-BoezJBBF.webp"
	},
	"/assets/cart-Cd2whKPO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f7b-Lowi5kbj+V+KkTSZ20DfU5lYC7M\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 8059,
		"path": "../public/assets/cart-Cd2whKPO.js"
	},
	"/assets/cat-beleza-D1kCkjAZ.jpg": {
		"type": "image/jpeg",
		"etag": "\"1b46f-YLJlnudyTIkSuWvMBi/i8eFg2QU\"",
		"mtime": "2026-09-02T03:01:22.093Z",
		"size": 111727,
		"path": "../public/assets/cat-beleza-D1kCkjAZ.jpg"
	},
	"/assets/cat-casa-Bhw4cn94.jpg": {
		"type": "image/jpeg",
		"etag": "\"109e2-64W5w/r881d5MlggeuEVfSxlSx0\"",
		"mtime": "2026-09-02T03:01:22.093Z",
		"size": 68066,
		"path": "../public/assets/cat-casa-Bhw4cn94.jpg"
	},
	"/assets/cat-eletronicos-B0bni-lq.jpg": {
		"type": "image/jpeg",
		"etag": "\"9eb4-guTG9oGXHjsPlNospr8KbgmQSSA\"",
		"mtime": "2026-09-02T03:01:22.093Z",
		"size": 40628,
		"path": "../public/assets/cat-eletronicos-B0bni-lq.jpg"
	},
	"/detalhesdolinks.png": {
		"type": "image/png",
		"etag": "\"185fbb-45RAE28pFvi1PhMWXwJvPmF6EEs\"",
		"mtime": "2026-09-02T03:01:25.871Z",
		"size": 1597371,
		"path": "../public/detalhesdolinks.png"
	},
	"/assets/cat-outros-Bhul1THh.jpg": {
		"type": "image/jpeg",
		"etag": "\"25185-tPs/blFvuESlEW9ziAZHOqlcZyE\"",
		"mtime": "2026-09-02T03:01:22.093Z",
		"size": 151941,
		"path": "../public/assets/cat-outros-Bhul1THh.jpg"
	},
	"/assets/categories-MeGdyHpe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2543-qnLeLL+xD/hLsT7P+gGfQvFdBP4\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 9539,
		"path": "../public/assets/categories-MeGdyHpe.js"
	},
	"/assets/categories-store-BoJO67xJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"846-9zBPfMPpApZ4veU4Jz+4RJvor7w\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 2118,
		"path": "../public/assets/categories-store-BoJO67xJ.js"
	},
	"/assets/category._slug-Dx8Gjgvh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1452-BPJ4AU0dMuLxGQ8nV5KQhSU7k/A\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 5202,
		"path": "../public/assets/category._slug-Dx8Gjgvh.js"
	},
	"/assets/category._slug-B8GByZkV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-e/n3jxA/rnDlCoIhyORbL6ILazQ\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 236,
		"path": "../public/assets/category._slug-B8GByZkV.js"
	},
	"/assets/category._slug-L8utGguZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fe-PJSHDDKE3JzJ/F78VDBsbi56YdY\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 254,
		"path": "../public/assets/category._slug-L8utGguZ.js"
	},
	"/assets/chart-column-CLxaEe1t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-mTEwKWR7xtGCLQdksxeYu4V8QeI\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 251,
		"path": "../public/assets/chart-column-CLxaEe1t.js"
	},
	"/assets/check-CCNqrC1g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c-za+g0Apj+yzWeYK+kKbueqKdpas\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 124,
		"path": "../public/assets/check-CCNqrC1g.js"
	},
	"/assets/check-check-C81FTFjX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b3-mFPyqlzucwo8UtuqG9wcbNmA/YY\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 179,
		"path": "../public/assets/check-check-C81FTFjX.js"
	},
	"/assets/checkout-BbWh5GzC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"58fa-5WNhlNu8VoJF2YaaX6k26b7ktfo\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 22778,
		"path": "../public/assets/checkout-BbWh5GzC.js"
	},
	"/assets/chevron-down-B4OPneHY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"80-yGDV/ilnUMkky/FY27IppG7E1eU\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 128,
		"path": "../public/assets/chevron-down-B4OPneHY.js"
	},
	"/assets/chevron-left-CDy3kl3r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82-N8QrP4bsG3X+9PEP3TPCooVgnY8\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 130,
		"path": "../public/assets/chevron-left-CDy3kl3r.js"
	},
	"/assets/chevron-right-C9evg30a.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82-ffgIljbPZdkW0OYWbFdXvI5GBvw\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 130,
		"path": "../public/assets/chevron-right-C9evg30a.js"
	},
	"/assets/circle-check-BNg_BNCk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-ynv7NYeMmTYExFOKSL9Iyl7Jyh0\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 178,
		"path": "../public/assets/circle-check-BNg_BNCk.js"
	},
	"/assets/client-2CaapKbc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11a4-Fyv0tqTWodxDq83Ih2kVTOCPLM8\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 4516,
		"path": "../public/assets/client-2CaapKbc.js"
	},
	"/assets/clock-Ck_bJSgx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-CYv5zrLZuPbYLtl+al1BNfTEAUk\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 169,
		"path": "../public/assets/clock-Ck_bJSgx.js"
	},
	"/assets/colors-BJKl-Gdh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3d4-9inSdsk5bsroRB269bctgt/oKrE\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 980,
		"path": "../public/assets/colors-BJKl-Gdh.js"
	},
	"/assets/como-pagar-DQfETRq1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1117-JU9rYHWWVTtmZNLlehTXuaiF9u4\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 4375,
		"path": "../public/assets/como-pagar-DQfETRq1.js"
	},
	"/assets/copy-BJVIj8L1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-mujCqIFvddec03i++qiw+eNsagE\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 236,
		"path": "../public/assets/copy-BJVIj8L1.js"
	},
	"/assets/coupons-C38GKqKr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1772-amBmoaViWKmTnWYQgLYFwLnCLL0\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 6002,
		"path": "../public/assets/coupons-C38GKqKr.js"
	},
	"/assets/coupons-store-DAGmBCon.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a2-pvemxyus91QKpY7fd9jFujTzUhI\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 1698,
		"path": "../public/assets/coupons-store-DAGmBCon.js"
	},
	"/assets/createLucideIcon-cPwvoQem.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a0-p4j4oMg8OI8NWiq6sASxP2tvJ4M\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 1184,
		"path": "../public/assets/createLucideIcon-cPwvoQem.js"
	},
	"/assets/credit-card-m2jg6_n_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf-QELYgSs445QoI0kRlpAAx1PFUTE\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 207,
		"path": "../public/assets/credit-card-m2jg6_n_.js"
	},
	"/assets/email-index-BkhzwmRU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"331-s7EfEipQR2NOJ7wxE4uaguu87rQ\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 817,
		"path": "../public/assets/email-index-BkhzwmRU.js"
	},
	"/assets/email-verification-D5d8vE88.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"263-evLpenusL1J4D9nLLiLAmcRS8hY\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 611,
		"path": "../public/assets/email-verification-D5d8vE88.js"
	},
	"/assets/eye-btBJQO-u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100-3nNqj/FCnSvkOfogOhs9ijRdJCk\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 256,
		"path": "../public/assets/eye-btBJQO-u.js"
	},
	"/assets/eye-off-Dw96vlZ1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ae-sD1sSerxeiWa45G6IpRiKdEdd94\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 430,
		"path": "../public/assets/eye-off-Dw96vlZ1.js"
	},
	"/assets/favorites-bM_dRz6-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ba8-/M1lz7VB4cgsZ1o11YvhoGn+Q0Y\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 2984,
		"path": "../public/assets/favorites-bM_dRz6-.js"
	},
	"/assets/flame-DbHt73Yn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c7-FGO9wkmqxJ5YJRmW/AJY54ujyrw\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 199,
		"path": "../public/assets/flame-DbHt73Yn.js"
	},
	"/assets/folder-tree-DpOf1GO5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1df-IxneIzIY2+9q68bdB1dRtM18GYM\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 479,
		"path": "../public/assets/folder-tree-DpOf1GO5.js"
	},
	"/assets/follows-BwMEz0UR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"358-c9/aW6H9IAKbinBihEE11fLJgxU\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 856,
		"path": "../public/assets/follows-BwMEz0UR.js"
	},
	"/assets/format-CYW_xdiT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b1-G10l8/x9mRib3XpXQqFI3TlxHy4\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 177,
		"path": "../public/assets/format-CYW_xdiT.js"
	},
	"/assets/gift-P_P6ynZd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15d-vnGlK+wrSg36ME2+Kx3ADJwuOAQ\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 349,
		"path": "../public/assets/gift-P_P6ynZd.js"
	},
	"/assets/globe-CldbeQ-m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f2-eSW+Q/zP399JEK4GRSnwUcYKe1U\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 242,
		"path": "../public/assets/globe-CldbeQ-m.js"
	},
	"/assets/home-config-O201sRNd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7df-WwQwH3fNP/JWrilIu1XBHxPZZpw\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 2015,
		"path": "../public/assets/home-config-O201sRNd.js"
	},
	"/assets/image-D-lNMpac.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10d-cLciIbciv4jOZdRfvFH+28A0aQc\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 269,
		"path": "../public/assets/image-D-lNMpac.js"
	},
	"/assets/index-BImaCIeI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6b7c3-sPkcAR+FNcAPBw81r51LWloXm8Q\"",
		"mtime": "2026-09-02T03:01:22.079Z",
		"size": 440259,
		"path": "../public/assets/index-BImaCIeI.js"
	},
	"/assets/index.esm-BsGhgQHX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7019-UOYZFpoHpXI31trIliGPlzZHcow\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 28697,
		"path": "../public/assets/index.esm-BsGhgQHX.js"
	},
	"/assets/index.esm-BfRdXDx1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"443c-PlpGoAGegDv6Ti74ZAQQQKcGTCI\"",
		"mtime": "2026-09-02T03:01:22.082Z",
		"size": 17468,
		"path": "../public/assets/index.esm-BfRdXDx1.js"
	},
	"/assets/index.esm-C2rmm-5h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"80-WLUa7VBUtRCL7vRi420w3G3kYgk\"",
		"mtime": "2026-09-02T03:01:22.085Z",
		"size": 128,
		"path": "../public/assets/index.esm-C2rmm-5h.js"
	},
	"/assets/index.esm-CL2QnA-Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f1e4-4lYRSG0ojBFElXkSHdzuc9a0tsI\"",
		"mtime": "2026-09-02T03:01:22.086Z",
		"size": 127460,
		"path": "../public/assets/index.esm-CL2QnA-Q.js"
	},
	"/assets/index.esm-WVmNHtZ-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8830-6VKThYDQbrmCWbT+Ce8klgFzryc\"",
		"mtime": "2026-09-02T03:01:22.086Z",
		"size": 34864,
		"path": "../public/assets/index.esm-WVmNHtZ-.js"
	},
	"/assets/info-9r1nfKh8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cc-gF4q9mcxVlikIE3XkAGqtUCLlg0\"",
		"mtime": "2026-09-02T03:01:22.086Z",
		"size": 204,
		"path": "../public/assets/info-9r1nfKh8.js"
	},
	"/assets/jsx-runtime-0vZSBttN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a8-DT21o0DVEenQwk6wXcylq/J4hZA\"",
		"mtime": "2026-09-02T03:01:22.086Z",
		"size": 424,
		"path": "../public/assets/jsx-runtime-0vZSBttN.js"
	},
	"/assets/justina-CZd0XFlZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ff4-6xf6zP7xA3+dlkToAXO3Gf6qevE\"",
		"mtime": "2026-09-02T03:01:22.086Z",
		"size": 12276,
		"path": "../public/assets/justina-CZd0XFlZ.js"
	},
	"/assets/justina.abas._id-EW2ZRxmG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3533-d4eTP3ZwHawcFg4xY75JPv6rpgw\"",
		"mtime": "2026-09-02T03:01:22.086Z",
		"size": 13619,
		"path": "../public/assets/justina.abas._id-EW2ZRxmG.js"
	},
	"/assets/justina.categorias-DvI759lb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f4c-Y7i+NlmKO25EEX7yew1b5z4hEIQ\"",
		"mtime": "2026-09-02T03:01:22.086Z",
		"size": 12108,
		"path": "../public/assets/justina.categorias-DvI759lb.js"
	},
	"/assets/justina.config-6-3iUuOn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"979-Mhx4YzUGPaIEYrpvFrAm9pKyqbo\"",
		"mtime": "2026-09-02T03:01:22.086Z",
		"size": 2425,
		"path": "../public/assets/justina.config-6-3iUuOn.js"
	},
	"/assets/index.esm-C9KZtAzi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"87953-16ZEQAaTpL5rpBaTrqayLoicD50\"",
		"mtime": "2026-09-02T03:01:22.085Z",
		"size": 555347,
		"path": "../public/assets/index.esm-C9KZtAzi.js"
	},
	"/assets/justina.cupons-nBPmWZD1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"157b-LFMdL+5HPsfHs0jdc2eaWgxwP6M\"",
		"mtime": "2026-09-02T03:01:22.086Z",
		"size": 5499,
		"path": "../public/assets/justina.cupons-nBPmWZD1.js"
	},
	"/assets/justina.equipa-BflrQxtn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16ba-cViDeMCzzUXULnJPEgAgfw4EH8U\"",
		"mtime": "2026-09-02T03:01:22.086Z",
		"size": 5818,
		"path": "../public/assets/justina.equipa-BflrQxtn.js"
	},
	"/assets/justina.home-CsxnE5Pm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"42cc-hGBMji0T1miBlAar7WitNHKGuQE\"",
		"mtime": "2026-09-02T03:01:22.086Z",
		"size": 17100,
		"path": "../public/assets/justina.home-CsxnE5Pm.js"
	},
	"/assets/justina.index-Cdermlb2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2786-/c6m/mQaLNvrkdgnavmw5i6G6zE\"",
		"mtime": "2026-09-02T03:01:22.086Z",
		"size": 10118,
		"path": "../public/assets/justina.index-Cdermlb2.js"
	},
	"/assets/justina.logistica-B6c412tI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d5f-J9CzvKuymYdbvqs+c81KSIIUPhg\"",
		"mtime": "2026-09-02T03:01:22.086Z",
		"size": 11615,
		"path": "../public/assets/justina.logistica-B6c412tI.js"
	},
	"/assets/justina.lojas-B5JyDXyA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c4e-by+gYBGhl1rN5vcpIMcFnJwoAck\"",
		"mtime": "2026-09-02T03:01:22.086Z",
		"size": 7246,
		"path": "../public/assets/justina.lojas-B5JyDXyA.js"
	},
	"/assets/justina.lojas._id-DUo3rPfn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19d4-g66mR9X6Zbobwncfi1+0UNOqfAo\"",
		"mtime": "2026-09-02T03:01:22.086Z",
		"size": 6612,
		"path": "../public/assets/justina.lojas._id-DUo3rPfn.js"
	},
	"/assets/justina.metas-RAy7nq3V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cdc-D+V2kjcgqYC5sMYDzMv0q1oOzuI\"",
		"mtime": "2026-09-02T03:01:22.087Z",
		"size": 7388,
		"path": "../public/assets/justina.metas-RAy7nq3V.js"
	},
	"/assets/justina.pagamentos-Dok_0jB4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1885-60zLMgLhaips8g3+X+29UNjQbGY\"",
		"mtime": "2026-09-02T03:01:22.087Z",
		"size": 6277,
		"path": "../public/assets/justina.pagamentos-Dok_0jB4.js"
	},
	"/assets/justina.pedidos-CmJvSn-g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"52ce-EpgSEomttJ387uAeI1vUiNXJT10\"",
		"mtime": "2026-09-02T03:01:22.087Z",
		"size": 21198,
		"path": "../public/assets/justina.pedidos-CmJvSn-g.js"
	},
	"/assets/justina.pesquisas-I9dZcphn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1aaa-dCY3lvbXhG7JYBdJFyQ41U6nB9E\"",
		"mtime": "2026-09-02T03:01:22.087Z",
		"size": 6826,
		"path": "../public/assets/justina.pesquisas-I9dZcphn.js"
	},
	"/assets/justina.produtos-CHQZPcgx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8174-fc6fGzFL6Z01INxWAsaRNKVoxTU\"",
		"mtime": "2026-09-02T03:01:22.087Z",
		"size": 33140,
		"path": "../public/assets/justina.produtos-CHQZPcgx.js"
	},
	"/assets/justina.usuarios-8WO6vx1E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22e1-4F0dEnZJBpGFzZ7ivH0QnKNYSnQ\"",
		"mtime": "2026-09-02T03:01:22.087Z",
		"size": 8929,
		"path": "../public/assets/justina.usuarios-8WO6vx1E.js"
	},
	"/assets/justina.receita-Yd1dikoD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2033-Eeoqi1khOMvJK0s5cOt9Pzk2siI\"",
		"mtime": "2026-09-02T03:01:22.087Z",
		"size": 8243,
		"path": "../public/assets/justina.receita-Yd1dikoD.js"
	},
	"/assets/layers-sKUIrNts.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a5-THRzSNWTv+Fyajhf1hkCPQqdwkI\"",
		"mtime": "2026-09-02T03:01:22.087Z",
		"size": 421,
		"path": "../public/assets/layers-sKUIrNts.js"
	},
	"/assets/layout-grid-D1eYRydS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15a-kBeTIsnBb6aq6JMgbjocdGPXXuQ\"",
		"mtime": "2026-09-02T03:01:22.087Z",
		"size": 346,
		"path": "../public/assets/layout-grid-D1eYRydS.js"
	},
	"/assets/link-5skObtIq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"53b4-HCK1apJxlSbAyyjD0Xg7HNT1hAM\"",
		"mtime": "2026-09-02T03:01:22.087Z",
		"size": 21428,
		"path": "../public/assets/link-5skObtIq.js"
	},
	"/assets/lock-DY9q7Zdn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ce-PMI389bhM6Hu71gvUDIHoEa7uFM\"",
		"mtime": "2026-09-02T03:01:22.087Z",
		"size": 206,
		"path": "../public/assets/lock-DY9q7Zdn.js"
	},
	"/assets/log-out-D_ahBdNI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-U+Sk/m2WMlkVc0tn+CEyFrcBFjs\"",
		"mtime": "2026-09-02T03:01:22.087Z",
		"size": 230,
		"path": "../public/assets/log-out-D_ahBdNI.js"
	},
	"/assets/logistics-store-CzKOEfqN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c64-MNoGTpVoJCN0+ErPSBw4RJlvnrU\"",
		"mtime": "2026-09-02T03:01:22.087Z",
		"size": 3172,
		"path": "../public/assets/logistics-store-CzKOEfqN.js"
	},
	"/assets/mail-Cbg9Xqpo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-x3YDs1f4xiRt9LFahbcZ41zDVZI\"",
		"mtime": "2026-09-02T03:01:22.087Z",
		"size": 213,
		"path": "../public/assets/mail-Cbg9Xqpo.js"
	},
	"/assets/map-pin-C6mqjQGc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-sL6PyQ4lLzP22O1PKbMMDeJn51g\"",
		"mtime": "2026-09-02T03:01:22.087Z",
		"size": 259,
		"path": "../public/assets/map-pin-C6mqjQGc.js"
	},
	"/assets/me-C1wqCeRw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2096-XpObv46Q+mUiu4g4EUjpD3agWKc\"",
		"mtime": "2026-09-02T03:01:22.087Z",
		"size": 8342,
		"path": "../public/assets/me-C1wqCeRw.js"
	},
	"/assets/menu-Dnpcru1z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"321-MWs5CQWByQVCSQMYy7MmeA1eC+w\"",
		"mtime": "2026-09-02T03:01:22.087Z",
		"size": 801,
		"path": "../public/assets/menu-Dnpcru1z.js"
	},
	"/assets/message-square-DcYrvzMm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-gPpzrLup6SlWEnlhQplVxPTS/GA\"",
		"mtime": "2026-09-02T03:01:22.087Z",
		"size": 233,
		"path": "../public/assets/message-square-DcYrvzMm.js"
	},
	"/assets/minus-N15Mem45.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"75-5Og0sY47fyyLBLvPO6DAqxyGsE8\"",
		"mtime": "2026-09-02T03:01:22.087Z",
		"size": 117,
		"path": "../public/assets/minus-N15Mem45.js"
	},
	"/assets/not-found-i5RsCZif.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-Trmr7GZIBZuvfg4uM18tBiRtOXg\"",
		"mtime": "2026-09-02T03:01:22.087Z",
		"size": 118,
		"path": "../public/assets/not-found-i5RsCZif.js"
	},
	"/assets/notifications-2axAhYE7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1491-wYGHXTIEjtl1wXk1grczaWBvTOY\"",
		"mtime": "2026-09-02T03:01:22.087Z",
		"size": 5265,
		"path": "../public/assets/notifications-2axAhYE7.js"
	},
	"/assets/notifications-DPjkyi2V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3b8-V08+ovR5m+qzuV7bohB/5BONreQ\"",
		"mtime": "2026-09-02T03:01:22.087Z",
		"size": 952,
		"path": "../public/assets/notifications-DPjkyi2V.js"
	},
	"/assets/notifications-store-BW512fsz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"517-EXZwiFy4dPLrndwv1yrLLbiRQvk\"",
		"mtime": "2026-09-02T03:01:22.087Z",
		"size": 1303,
		"path": "../public/assets/notifications-store-BW512fsz.js"
	},
	"/assets/orders-CCJf-FgT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"403-We0jspWDuP93+7fi3SEJmZDq0Qc\"",
		"mtime": "2026-09-02T03:01:22.088Z",
		"size": 1027,
		"path": "../public/assets/orders-CCJf-FgT.js"
	},
	"/assets/orders-CzOafagG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"57ea-2jIxqwQEoJYUuN3O4llIHufjDec\"",
		"mtime": "2026-09-02T03:01:22.088Z",
		"size": 22506,
		"path": "../public/assets/orders-CzOafagG.js"
	},
	"/assets/orders-store-DBh3Cgqn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ed0-wF2nUomlTjxW/EV2s3WP74NEEgs\"",
		"mtime": "2026-09-02T03:01:22.088Z",
		"size": 7888,
		"path": "../public/assets/orders-store-DBh3Cgqn.js"
	},
	"/assets/p-cream-t29T4qSa.jpg": {
		"type": "image/jpeg",
		"etag": "\"7d1c-OF87WaSKzGYV4wll3FlG+reblzA\"",
		"mtime": "2026-09-02T03:01:22.093Z",
		"size": 32028,
		"path": "../public/assets/p-cream-t29T4qSa.jpg"
	},
	"/assets/p-dress-BEbFKKeJ.jpg": {
		"type": "image/jpeg",
		"etag": "\"8b7f-xusMudTEekzqGEljjV1OStbMgsU\"",
		"mtime": "2026-09-02T03:01:22.093Z",
		"size": 35711,
		"path": "../public/assets/p-dress-BEbFKKeJ.jpg"
	},
	"/assets/p-jeans-BIj6CxYP.jpg": {
		"type": "image/jpeg",
		"etag": "\"23415-HTJ6loY6CPgdWI8ul1wq49eUCjw\"",
		"mtime": "2026-09-02T03:01:22.094Z",
		"size": 144405,
		"path": "../public/assets/p-jeans-BIj6CxYP.jpg"
	},
	"/assets/p-jumpsuit-BkhcJynf.jpg": {
		"type": "image/jpeg",
		"etag": "\"b652-llu0RjNBZpx6CW4FXmoJV0PCe2w\"",
		"mtime": "2026-09-02T03:01:22.094Z",
		"size": 46674,
		"path": "../public/assets/p-jumpsuit-BkhcJynf.jpg"
	},
	"/assets/p-knit-B1VN3gUH.jpg": {
		"type": "image/jpeg",
		"etag": "\"178e5-bp21sK1XIkX36dgMZsPUBpGG3/M\"",
		"mtime": "2026-09-02T03:01:22.094Z",
		"size": 96485,
		"path": "../public/assets/p-knit-B1VN3gUH.jpg"
	},
	"/assets/p-lipstick-CX6Dj8cF.jpg": {
		"type": "image/jpeg",
		"etag": "\"15b47-gxs0XoZAuNzHvPslCpXEq+DCAcU\"",
		"mtime": "2026-09-02T03:01:22.094Z",
		"size": 88903,
		"path": "../public/assets/p-lipstick-CX6Dj8cF.jpg"
	},
	"/assets/p-pants-w2etJJsJ.jpg": {
		"type": "image/jpeg",
		"etag": "\"ad98-TgL+g++/aInC8NKn0yV9gtipSJ0\"",
		"mtime": "2026-09-02T03:01:22.094Z",
		"size": 44440,
		"path": "../public/assets/p-pants-w2etJJsJ.jpg"
	},
	"/assets/p-brushes-BdxdHdet.jpg": {
		"type": "image/jpeg",
		"etag": "\"12ca4-QEM7Pxib/X2lBQLJ3FZwFifHFbo\"",
		"mtime": "2026-09-02T03:01:22.093Z",
		"size": 76964,
		"path": "../public/assets/p-brushes-BdxdHdet.jpg"
	},
	"/assets/p-perfume-BnxGlR6I.jpg": {
		"type": "image/jpeg",
		"etag": "\"c4e5-FHYORWvyQw9GRTCgnSCkkTb5BsQ\"",
		"mtime": "2026-09-02T03:01:22.094Z",
		"size": 50405,
		"path": "../public/assets/p-perfume-BnxGlR6I.jpg"
	},
	"/assets/p-reddress-BngZqOK1.jpg": {
		"type": "image/jpeg",
		"etag": "\"ae1f-EopdjO+URdpSyHI4ZpN3YJ6tGj0\"",
		"mtime": "2026-09-02T03:01:22.094Z",
		"size": 44575,
		"path": "../public/assets/p-reddress-BngZqOK1.jpg"
	},
	"/assets/p-skirt-DNF_I8F3.jpg": {
		"type": "image/jpeg",
		"etag": "\"8b75-7lpHtIZ7XyMgHLrwrwDukBIPnGs\"",
		"mtime": "2026-09-02T03:01:22.094Z",
		"size": 35701,
		"path": "../public/assets/p-skirt-DNF_I8F3.jpg"
	},
	"/assets/p-swim-9aOCY719.jpg": {
		"type": "image/jpeg",
		"etag": "\"f963-+F35GN6hkofO+2LKZ/nR/wRC6fM\"",
		"mtime": "2026-09-02T03:01:22.094Z",
		"size": 63843,
		"path": "../public/assets/p-swim-9aOCY719.jpg"
	},
	"/assets/p-tank-DYSgLGey.jpg": {
		"type": "image/jpeg",
		"etag": "\"102a0-8UKqAkGsFC7tn5V4uyafssb8d88\"",
		"mtime": "2026-09-02T03:01:22.094Z",
		"size": 66208,
		"path": "../public/assets/p-tank-DYSgLGey.jpg"
	},
	"/assets/p-top-BTKTbnRS.jpg": {
		"type": "image/jpeg",
		"etag": "\"d291-bFerBrwW3D5Spjqlsv3DtjgOqeg\"",
		"mtime": "2026-09-02T03:01:22.094Z",
		"size": 53905,
		"path": "../public/assets/p-top-BTKTbnRS.jpg"
	},
	"/assets/package-CBeDJ4Sv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"174-gnilbzb7pwtarW10b09b3v8jClU\"",
		"mtime": "2026-09-02T03:01:22.088Z",
		"size": 372,
		"path": "../public/assets/package-CBeDJ4Sv.js"
	},
	"/assets/package-open-BY2XdXjc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"243-l0RVjAIOk4BJPFftLEI+6IqZ4/k\"",
		"mtime": "2026-09-02T03:01:22.088Z",
		"size": 579,
		"path": "../public/assets/package-open-BY2XdXjc.js"
	},
	"/assets/pay-express.jpg.asset-Cyk8AYll.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33c-YsNAiUCenUU9xbjiEN2Uf6Tv/wI\"",
		"mtime": "2026-09-02T03:01:22.090Z",
		"size": 828,
		"path": "../public/assets/pay-express.jpg.asset-Cyk8AYll.js"
	},
	"/assets/pay._method-D_viTDen.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3105-uCZ2vfDSQHeZOXPF2+Uz9byimD0\"",
		"mtime": "2026-09-02T03:01:22.090Z",
		"size": 12549,
		"path": "../public/assets/pay._method-D_viTDen.js"
	},
	"/assets/payments-store-BKA0NUTP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a7-Erne+etz5PolkSXDvJy2Z7oR1G0\"",
		"mtime": "2026-09-02T03:01:22.090Z",
		"size": 2471,
		"path": "../public/assets/payments-store-BKA0NUTP.js"
	},
	"/assets/pencil-Ce_zgDGo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"114-j0YXPdWv9PfdFfNqqYve08jZsE8\"",
		"mtime": "2026-09-02T03:01:22.090Z",
		"size": 276,
		"path": "../public/assets/pencil-Ce_zgDGo.js"
	},
	"/assets/pending-payment-CjTbbZwJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"181-5aYgCRh+5tLa1Kl8HmV93vGWeM0\"",
		"mtime": "2026-09-02T03:01:22.090Z",
		"size": 385,
		"path": "../public/assets/pending-payment-CjTbbZwJ.js"
	},
	"/assets/plus-CsFklqLM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-hV1ZU//qKDkNfMVQj6KE+nM11Io\"",
		"mtime": "2026-09-02T03:01:22.090Z",
		"size": 153,
		"path": "../public/assets/plus-CsFklqLM.js"
	},
	"/assets/points-C3uFuDYw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"154e-dvAIjDBpKoGS5wcRBKcvtd5E5/w\"",
		"mtime": "2026-09-02T03:01:22.090Z",
		"size": 5454,
		"path": "../public/assets/points-C3uFuDYw.js"
	},
	"/assets/points-DvCt3KV2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"544-rxgIvCJajOl4A739PoUJ5H2uMTg\"",
		"mtime": "2026-09-02T03:01:22.090Z",
		"size": 1348,
		"path": "../public/assets/points-DvCt3KV2.js"
	},
	"/assets/privacidade-j9Rs3ymH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27fd-2amfKWv9UAiPVfDUxKELSdyplSA\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 10237,
		"path": "../public/assets/privacidade-j9Rs3ymH.js"
	},
	"/assets/product._id-BdDri4fG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6515-Wl91xwUfAlwSyH08tkDSlT27ADE\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 25877,
		"path": "../public/assets/product._id-BdDri4fG.js"
	},
	"/assets/product._id-D1wyPJxH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f8-W+OyI8YIJsjry7jsf60kewXmqUg\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 248,
		"path": "../public/assets/product._id-D1wyPJxH.js"
	},
	"/assets/product._id-zugyH3pj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10e-/y7oF5W5E/Te7KvTFnhG+zZRTMQ\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 270,
		"path": "../public/assets/product._id-zugyH3pj.js"
	},
	"/assets/products-store-CH6YppLy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"96e-JNB+cBGAPdwx8rD6I1rFBwopA7w\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 2414,
		"path": "../public/assets/products-store-CH6YppLy.js"
	},
	"/assets/promo-2-djOW7yEW.png": {
		"type": "image/png",
		"etag": "\"6be5d-obj99+iBJlyAl1e8ohm/6uGppF4\"",
		"mtime": "2026-09-02T03:01:22.095Z",
		"size": 441949,
		"path": "../public/assets/promo-2-djOW7yEW.png"
	},
	"/assets/promo-3-Ddu1tsCS.png": {
		"type": "image/png",
		"etag": "\"3c903-jvRqSVXnhNZpruPkxbj6Jbjs8vA\"",
		"mtime": "2026-09-02T03:01:22.095Z",
		"size": 248067,
		"path": "../public/assets/promo-3-Ddu1tsCS.png"
	},
	"/assets/react-SIfiwpqq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ff9-FGVdof4/lFGmrdRsB9EIvuwBlYc\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 8185,
		"path": "../public/assets/react-SIfiwpqq.js"
	},
	"/assets/recommendations-BbIWjVZl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b19-BiBRZmRbO6O4Cr/eDmvrrNWVfcc\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 2841,
		"path": "../public/assets/recommendations-BbIWjVZl.js"
	},
	"/assets/referrals-CuqwjlJJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d6-w5UBWGXWNaH6d7uTVBSeXpnbVHc\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 1238,
		"path": "../public/assets/referrals-CuqwjlJJ.js"
	},
	"/assets/revenue-C0c5_dMi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2fa-OiUSRI5aHxCb69wV/cuthDAOJc4\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 762,
		"path": "../public/assets/revenue-C0c5_dMi.js"
	},
	"/assets/reviews-D-FB6nbN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85f-R16RML9mA9HSMOsNpo9/I09qkjo\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 2143,
		"path": "../public/assets/reviews-D-FB6nbN.js"
	},
	"/assets/roles-iOhd5TD7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"637-xvQr2Dh4f1MvmrxbNwTn99K3/PY\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 1591,
		"path": "../public/assets/roles-iOhd5TD7.js"
	},
	"/assets/root-DLTE-HSj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20-vSYConOtSP6ciwr9zKsPixNwWmc\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 32,
		"path": "../public/assets/root-DLTE-HSj.js"
	},
	"/assets/rotate-ccw-DjyDNOwP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c8-DPGJLCZ7OBGOoyvAr0ExEg8iCyI\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 200,
		"path": "../public/assets/rotate-ccw-DjyDNOwP.js"
	},
	"/assets/routes-C1oR5uEU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4312-6ug/EugakIg8ikWJgezCdnXObmE\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 17170,
		"path": "../public/assets/routes-C1oR5uEU.js"
	},
	"/assets/promo-1-D9QBnF1Y.png": {
		"type": "image/png",
		"etag": "\"5c5d7-jgaByYJZ7VuNG4j6B9aQDUG3WUA\"",
		"mtime": "2026-09-02T03:01:22.094Z",
		"size": 378327,
		"path": "../public/assets/promo-1-D9QBnF1Y.png"
	},
	"/assets/search-CzMGmf7M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-b9y6AXI3WU49XAW6vzxNX+9hJAk\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 174,
		"path": "../public/assets/search-CzMGmf7M.js"
	},
	"/assets/send-DCFGnZqu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1de-oNrZCmEQ/zK54Axy+adruAdikp8\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 478,
		"path": "../public/assets/send-DCFGnZqu.js"
	},
	"/assets/send-ZWEKRvvd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"190-B/GfUD7xbrPbgKl49aL3RUUMISI\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 400,
		"path": "../public/assets/send-ZWEKRvvd.js"
	},
	"/assets/settings-B7nchwOQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2845-39TG2+A9LK782D9hdshIbTlaSME\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 10309,
		"path": "../public/assets/settings-B7nchwOQ.js"
	},
	"/assets/settings-OVXPq8of.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7-3pKLuymqQVTPmjoZvaV+SiXunqU\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 487,
		"path": "../public/assets/settings-OVXPq8of.js"
	},
	"/assets/share-2-CcqjdWpJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"165-QDmsr1TmhtKuw2U4e493BS0yS7g\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 357,
		"path": "../public/assets/share-2-CcqjdWpJ.js"
	},
	"/assets/shield-alert-RE0kBelx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"161-8yki1oTNML+fp1mC2WlW/iEOcIc\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 353,
		"path": "../public/assets/shield-alert-RE0kBelx.js"
	},
	"/assets/shield-check-B3PmHBMY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-G33KRg9KT60ucl9G/TtXATi40Ns\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 320,
		"path": "../public/assets/shield-check-B3PmHBMY.js"
	},
	"/assets/shop._id-88WmCP5o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15f9-WU3f7O4cJ1EkmcFOXsUUHkvXWug\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 5625,
		"path": "../public/assets/shop._id-88WmCP5o.js"
	},
	"/assets/shop._id-Br87gKzz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f4-aEwuVyP/kwlGpSRZX/oTUo1MoWU\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 244,
		"path": "../public/assets/shop._id-Br87gKzz.js"
	},
	"/assets/shopping-bag-wN4xsTXd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"154-tWGIP3GN/lxEepwn9Jj3DDP4Gyc\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 340,
		"path": "../public/assets/shopping-bag-wN4xsTXd.js"
	},
	"/assets/sliders-horizontal-DfsKfQ27.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a8-zO5qcWGz+pvo9SdbZSUW47NbGfQ\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 424,
		"path": "../public/assets/sliders-horizontal-DfsKfQ27.js"
	},
	"/assets/sparkles-USJV5op3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-8Cue5x6m3xDHvPVgMMegQ1Hxrmg\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 494,
		"path": "../public/assets/sparkles-USJV5op3.js"
	},
	"/assets/star-CYIcROk7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d8-CAGMcBuAXcdSdd1ngXKmc3CYgrk\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 472,
		"path": "../public/assets/star-CYIcROk7.js"
	},
	"/assets/store-BPHnSeEG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f2-7DjxDcYbVWyOI525/S93wYQ1Tuw\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 498,
		"path": "../public/assets/store-BPHnSeEG.js"
	},
	"/assets/store-CSpBd35h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bf2-I2Otp1SIioc+aMB/yrPUuFeocXY\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 3058,
		"path": "../public/assets/store-CSpBd35h.js"
	},
	"/assets/super-ofertas-CXEa3JyJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"533-CTQHDGle5AGJqgCZhPF7CAkcO7g\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 1331,
		"path": "../public/assets/super-ofertas-CXEa3JyJ.js"
	},
	"/assets/suportlogo-BBF_wn1G.png": {
		"type": "image/png",
		"etag": "\"72c7f-/MBMtVbUOXou9xmVGKtzlcmnap8\"",
		"mtime": "2026-09-02T03:01:22.095Z",
		"size": 470143,
		"path": "../public/assets/suportlogo-BBF_wn1G.png"
	},
	"/assets/styles-CkdhFkNE.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"25a40-LJbam9N8c0KPijmIkNNt1NHjlMk\"",
		"mtime": "2026-09-02T03:01:22.095Z",
		"size": 154176,
		"path": "../public/assets/styles-CkdhFkNE.css"
	},
	"/assets/support-CX9tl_i0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a21-oyatIpkPSCaExb7m13dur+pB3Hg\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 18977,
		"path": "../public/assets/support-CX9tl_i0.js"
	},
	"/assets/sync-store-DRBowSHU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"675-7+e92YuxdZPUNbQKdNe4l9t51WU\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 1653,
		"path": "../public/assets/sync-store-DRBowSHU.js"
	},
	"/assets/target-CBRGy9km.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e2-t3Sn5kCdbBtiqBWGg3xx+H8JwHo\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 226,
		"path": "../public/assets/target-CBRGy9km.js"
	},
	"/assets/termos-BF64NgOX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"318a-9KtJEH0tUAVusn/eNNAFw3WZGbY\"",
		"mtime": "2026-09-02T03:01:22.091Z",
		"size": 12682,
		"path": "../public/assets/termos-BF64NgOX.js"
	},
	"/assets/ticket-BiNpThdz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-xN89hCgQihvZy3O5LFOZhNcbbuo\"",
		"mtime": "2026-09-02T03:01:22.092Z",
		"size": 321,
		"path": "../public/assets/ticket-BiNpThdz.js"
	},
	"/assets/trash-2-D9ykOZrd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-SFufvwScaqfz7pcnb2UUn3FfGKk\"",
		"mtime": "2026-09-02T03:01:22.092Z",
		"size": 328,
		"path": "../public/assets/trash-2-D9ykOZrd.js"
	},
	"/assets/trending-up-B6Edyn1q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"af-ZcD8ymo8T8OMoVkfzimNFhXKuIY\"",
		"mtime": "2026-09-02T03:01:22.092Z",
		"size": 175,
		"path": "../public/assets/trending-up-B6Edyn1q.js"
	},
	"/assets/triangle-alert-FTKqut9w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109-OpU+dqUqLnrikxh4aRCiuvoiOrA\"",
		"mtime": "2026-09-02T03:01:22.092Z",
		"size": 265,
		"path": "../public/assets/triangle-alert-FTKqut9w.js"
	},
	"/assets/truck-CyWOy9Pq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"196-uGkug4CZttLs7NFYlEME1CCeoDU\"",
		"mtime": "2026-09-02T03:01:22.092Z",
		"size": 406,
		"path": "../public/assets/truck-CyWOy9Pq.js"
	},
	"/assets/trocas-devolucoes-C9pnhpZg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22b0-EuCvWkOwXwCrtmiTS7nt5QqorQI\"",
		"mtime": "2026-09-02T03:01:22.092Z",
		"size": 8880,
		"path": "../public/assets/trocas-devolucoes-C9pnhpZg.js"
	},
	"/assets/undo-2-Dz34a5Qr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d0-+JX2jz9JFkOkKTnnSwRaYZYKoo8\"",
		"mtime": "2026-09-02T03:01:22.092Z",
		"size": 208,
		"path": "../public/assets/undo-2-Dz34a5Qr.js"
	},
	"/assets/upload-FB0JUmQn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9cb-SbTTtfsaNRGqlOU6UJgGAUC/rqo\"",
		"mtime": "2026-09-02T03:01:22.092Z",
		"size": 2507,
		"path": "../public/assets/upload-FB0JUmQn.js"
	},
	"/assets/useMatch-BkHFXV7H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"213-rvLoQvpVwIn3soSE7ZmC0OdpvcY\"",
		"mtime": "2026-09-02T03:01:22.093Z",
		"size": 531,
		"path": "../public/assets/useMatch-BkHFXV7H.js"
	},
	"/assets/user-data-DUzrHjcJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a11-0XcBYm9MFwaox9S8oFa7YtuJNOs\"",
		"mtime": "2026-09-02T03:01:22.093Z",
		"size": 2577,
		"path": "../public/assets/user-data-DUzrHjcJ.js"
	},
	"/assets/user-plus-HbfwRcYz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-AQDJ12q23Dnf5CGOnaVrhifxSio\"",
		"mtime": "2026-09-02T03:01:22.093Z",
		"size": 310,
		"path": "../public/assets/user-plus-HbfwRcYz.js"
	},
	"/assets/users-C-3GO8qD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-2Etv51zCmy57gDoatAApaFJa9Vk\"",
		"mtime": "2026-09-02T03:01:22.093Z",
		"size": 306,
		"path": "../public/assets/users-C-3GO8qD.js"
	},
	"/assets/wallet-B1Rcb-Ud.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11e-pcmmlXiLgPvRoVEYKUoKffKeTQM\"",
		"mtime": "2026-09-02T03:01:22.093Z",
		"size": 286,
		"path": "../public/assets/wallet-B1Rcb-Ud.js"
	},
	"/assets/wallet-Drkp9ZIM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"160b-r2U0QDSZ4ZaSZGStCkybQZOoD3c\"",
		"mtime": "2026-09-02T03:01:22.093Z",
		"size": 5643,
		"path": "../public/assets/wallet-Drkp9ZIM.js"
	},
	"/assets/x-B2FTZ7Vt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-YzY9+adS4NM8VvQ9ImCQoQFBfkc\"",
		"mtime": "2026-09-02T03:01:22.093Z",
		"size": 154,
		"path": "../public/assets/x-B2FTZ7Vt.js"
	},
	"/assets/zap-bFH_IeqZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"106-o1zlUbhJe/IP+W3bfjkTqsG2slY\"",
		"mtime": "2026-09-02T03:01:22.093Z",
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
