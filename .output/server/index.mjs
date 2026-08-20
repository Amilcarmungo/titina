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
	"/assets/AdminModal--9ebiBsW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bbb-cbpaHG68ay4Zokv//2GnmR9qxjs\"",
		"mtime": "2026-08-20T14:56:35.973Z",
		"size": 3003,
		"path": "../public/assets/AdminModal--9ebiBsW.js"
	},
	"/assets/ShareSheet-DVv0wbmn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1044-8tL944Bn6PGl1bViy0UH+CwcsSE\"",
		"mtime": "2026-08-20T14:56:35.974Z",
		"size": 4164,
		"path": "../public/assets/ShareSheet-DVv0wbmn.js"
	},
	"/assets/AdminTabs-rhiuWfzK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"317-ww8a49ogQoJIkj/l7ai3kEgUMwA\"",
		"mtime": "2026-08-20T14:56:35.973Z",
		"size": 791,
		"path": "../public/assets/AdminTabs-rhiuWfzK.js"
	},
	"/assets/ProductCard-82Y7KOQK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"602-BcNqHVpKU9ahf6+pRG22+LYiu5w\"",
		"mtime": "2026-08-20T14:56:35.974Z",
		"size": 1538,
		"path": "../public/assets/ProductCard-82Y7KOQK.js"
	},
	"/assets/admin-D2BUo5ru.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e4b-bPKUTSgm8j4Nzd2lS2f487WHsUs\"",
		"mtime": "2026-08-20T14:56:35.974Z",
		"size": 11851,
		"path": "../public/assets/admin-D2BUo5ru.js"
	},
	"/assets/admin.abas._id-BdrHi43J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"34fd-wsm3oyes3sztIARs4/RctDA+BYY\"",
		"mtime": "2026-08-20T14:56:35.974Z",
		"size": 13565,
		"path": "../public/assets/admin.abas._id-BdrHi43J.js"
	},
	"/assets/admin.config-CM4E6qsC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"94a-89R5DzDD0SE300GoK8mhBBd/Bn0\"",
		"mtime": "2026-08-20T14:56:35.974Z",
		"size": 2378,
		"path": "../public/assets/admin.config-CM4E6qsC.js"
	},
	"/assets/admin.categorias-SpRUW8aU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f1d-NBNLNuqJtcywGm7Y1X4/vbMCJ9s\"",
		"mtime": "2026-08-20T14:56:35.974Z",
		"size": 12061,
		"path": "../public/assets/admin.categorias-SpRUW8aU.js"
	},
	"/assets/admin.cupons-C0tUUNL4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1576-4tnw4yvSo5iM5ZMJlw2lHhorbzI\"",
		"mtime": "2026-08-20T14:56:35.974Z",
		"size": 5494,
		"path": "../public/assets/admin.cupons-C0tUUNL4.js"
	},
	"/assets/admin.equipa-BhqchQmb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"166a-gSy3Fbco58pYNATfg8jRuBWVsLY\"",
		"mtime": "2026-08-20T14:56:35.974Z",
		"size": 5738,
		"path": "../public/assets/admin.equipa-BhqchQmb.js"
	},
	"/assets/admin.index-0HWqZ_Z3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2715-S/jZlIHK3pDdPbd1BUInMN9Esfg\"",
		"mtime": "2026-08-20T14:56:35.974Z",
		"size": 10005,
		"path": "../public/assets/admin.index-0HWqZ_Z3.js"
	},
	"/assets/admin.home-DVDg0G9d.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4295-4RlX0Ia96FBF1Wj4u2LQAnh4BNo\"",
		"mtime": "2026-08-20T14:56:35.974Z",
		"size": 17045,
		"path": "../public/assets/admin.home-DVDg0G9d.js"
	},
	"/assets/admin.lojas-C2bnPakK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c1d-JiD/hnhWyfealEZyP64nWjJ+fIc\"",
		"mtime": "2026-08-20T14:56:35.974Z",
		"size": 7197,
		"path": "../public/assets/admin.lojas-C2bnPakK.js"
	},
	"/assets/admin.logistica-B_c-IP-X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d5a-qbRN24RKA7pjAMkSqnZYWKvwo8M\"",
		"mtime": "2026-08-20T14:56:35.974Z",
		"size": 11610,
		"path": "../public/assets/admin.logistica-B_c-IP-X.js"
	},
	"/assets/admin.lojas._id-BrnEkklw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"196b-BZmEP43ncm2NDsfY/nprGmHH9Mw\"",
		"mtime": "2026-08-20T14:56:35.974Z",
		"size": 6507,
		"path": "../public/assets/admin.lojas._id-BrnEkklw.js"
	},
	"/assets/admin.metas-CUBdbaSw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c7d-DFNExwMc0ZNBIEby5jMyk3TNYR8\"",
		"mtime": "2026-08-20T14:56:35.974Z",
		"size": 7293,
		"path": "../public/assets/admin.metas-CUBdbaSw.js"
	},
	"/assets/admin.pagamentos-pKlVAtTG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1880-8U4A/F1O74PeITJJYIqGUAhKmYE\"",
		"mtime": "2026-08-20T14:56:35.974Z",
		"size": 6272,
		"path": "../public/assets/admin.pagamentos-pKlVAtTG.js"
	},
	"/assets/admin.pedidos-BIoV-vBC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5251-hkpq1ZzyGcxtHaLAyIpyIR9Gqpo\"",
		"mtime": "2026-08-20T14:56:35.974Z",
		"size": 21073,
		"path": "../public/assets/admin.pedidos-BIoV-vBC.js"
	},
	"/assets/admin.produtos-BPIVarcv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"811d-sgoS9LvXUt3GWgJPwRMEIMCqvlE\"",
		"mtime": "2026-08-20T14:56:35.974Z",
		"size": 33053,
		"path": "../public/assets/admin.produtos-BPIVarcv.js"
	},
	"/assets/admin.receita-cUaY6z0R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fcf-+mZC/pGUge5is872Qq4kAbKWsPQ\"",
		"mtime": "2026-08-20T14:56:35.974Z",
		"size": 8143,
		"path": "../public/assets/admin.receita-cUaY6z0R.js"
	},
	"/assets/arrow-left-BmAZr12X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-gXo0UkGcbBZfOn7hniDqDJBFM0E\"",
		"mtime": "2026-08-20T14:56:35.974Z",
		"size": 165,
		"path": "../public/assets/arrow-left-BmAZr12X.js"
	},
	"/assets/admin.usuarios-yojcTdqH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eb8-3lvZCtmrA96whvuEUDsaAz8AvVY\"",
		"mtime": "2026-08-20T14:56:35.974Z",
		"size": 3768,
		"path": "../public/assets/admin.usuarios-yojcTdqH.js"
	},
	"/assets/arrow-up-right-D-a4p84_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a7-/tmZ3lmzimemwkKtHJst5lvZGRQ\"",
		"mtime": "2026-08-20T14:56:35.974Z",
		"size": 167,
		"path": "../public/assets/arrow-up-right-D-a4p84_.js"
	},
	"/assets/arrow-right-DdeI4MLJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-f9DD0ZW4LzKdOxjMGfi4ORxd6MY\"",
		"mtime": "2026-08-20T14:56:35.974Z",
		"size": 165,
		"path": "../public/assets/arrow-right-DdeI4MLJ.js"
	},
	"/assets/Layout-DQOr1KMO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a3ce-JeHh4SPAflHx9zKSojeJsDyvecM\"",
		"mtime": "2026-08-20T14:56:35.973Z",
		"size": 107470,
		"path": "../public/assets/Layout-DQOr1KMO.js"
	},
	"/assets/auth-vmyYxdin.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"35eb-DMikLWZAYFBV45hQP0GmtQXHwnw\"",
		"mtime": "2026-08-20T14:56:35.974Z",
		"size": 13803,
		"path": "../public/assets/auth-vmyYxdin.js"
	},
	"/assets/badge-check-Ct12fjB0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13c-XY0phrNLMiQmTCnxm8KOnUKtvSY\"",
		"mtime": "2026-08-20T14:56:35.974Z",
		"size": 316,
		"path": "../public/assets/badge-check-Ct12fjB0.js"
	},
	"/assets/banner--ZS96L_4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7a9-5HbWT85YVy8awv+zjUcF8k4Y2wo\"",
		"mtime": "2026-08-20T14:56:35.974Z",
		"size": 1961,
		"path": "../public/assets/banner--ZS96L_4.js"
	},
	"/assets/bazarixy-logo.webp.asset-CRxaR9He.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ac-v1A9tB1yGCmdfnScNLvNKb8jvCg\"",
		"mtime": "2026-08-20T14:56:35.974Z",
		"size": 428,
		"path": "../public/assets/bazarixy-logo.webp.asset-CRxaR9He.js"
	},
	"/assets/cart-XZiGq0aL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f06-SdeyobBbmojBdM2+vmmFyz48Izs\"",
		"mtime": "2026-08-20T14:56:35.974Z",
		"size": 7942,
		"path": "../public/assets/cart-XZiGq0aL.js"
	},
	"/assets/cat-beleza-D1kCkjAZ.jpg": {
		"type": "image/jpeg",
		"etag": "\"1b46f-YLJlnudyTIkSuWvMBi/i8eFg2QU\"",
		"mtime": "2026-08-20T14:56:35.978Z",
		"size": 111727,
		"path": "../public/assets/cat-beleza-D1kCkjAZ.jpg"
	},
	"/assets/cat-casa-Bhw4cn94.jpg": {
		"type": "image/jpeg",
		"etag": "\"109e2-64W5w/r881d5MlggeuEVfSxlSx0\"",
		"mtime": "2026-08-20T14:56:35.978Z",
		"size": 68066,
		"path": "../public/assets/cat-casa-Bhw4cn94.jpg"
	},
	"/assets/cat-eletronicos-B0bni-lq.jpg": {
		"type": "image/jpeg",
		"etag": "\"9eb4-guTG9oGXHjsPlNospr8KbgmQSSA\"",
		"mtime": "2026-08-20T14:56:35.978Z",
		"size": 40628,
		"path": "../public/assets/cat-eletronicos-B0bni-lq.jpg"
	},
	"/assets/cat-outros-Bhul1THh.jpg": {
		"type": "image/jpeg",
		"etag": "\"25185-tPs/blFvuESlEW9ziAZHOqlcZyE\"",
		"mtime": "2026-08-20T14:56:35.978Z",
		"size": 151941,
		"path": "../public/assets/cat-outros-Bhul1THh.jpg"
	},
	"/assets/categories-CT1OWJTu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"256f-6czLVt+T/qyoFZAM5JNlXM1En2I\"",
		"mtime": "2026-08-20T14:56:35.974Z",
		"size": 9583,
		"path": "../public/assets/categories-CT1OWJTu.js"
	},
	"/assets/categories-store-o-AgiGbf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"846-tdQWP1YQw52ewoydri3AgrdWZKQ\"",
		"mtime": "2026-08-20T14:56:35.974Z",
		"size": 2118,
		"path": "../public/assets/categories-store-o-AgiGbf.js"
	},
	"/assets/category._slug-BQrdQ0HM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1270-EWIiiIZIzOJVpEwT381hmlQS+sM\"",
		"mtime": "2026-08-20T14:56:35.975Z",
		"size": 4720,
		"path": "../public/assets/category._slug-BQrdQ0HM.js"
	},
	"/assets/category._slug-CtVJkn60.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-A7WpZqlI4KBfyyG46/jHC33kzUo\"",
		"mtime": "2026-08-20T14:56:35.975Z",
		"size": 230,
		"path": "../public/assets/category._slug-CtVJkn60.js"
	},
	"/assets/category._slug-Dpbo-gEu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f8-BDA3FBIql3UqPP1Oues8cmUnquU\"",
		"mtime": "2026-08-20T14:56:35.975Z",
		"size": 248,
		"path": "../public/assets/category._slug-Dpbo-gEu.js"
	},
	"/assets/check-CCNqrC1g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c-za+g0Apj+yzWeYK+kKbueqKdpas\"",
		"mtime": "2026-08-20T14:56:35.975Z",
		"size": 124,
		"path": "../public/assets/check-CCNqrC1g.js"
	},
	"/assets/checkout-B7SWm52H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5404-qP10R6gz055wyHDvWHhHmbx1Nek\"",
		"mtime": "2026-08-20T14:56:35.975Z",
		"size": 21508,
		"path": "../public/assets/checkout-B7SWm52H.js"
	},
	"/assets/chevron-right-BRClqNJT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf-wIaO0ieqawSkXFuwRLAiZNr6TTs\"",
		"mtime": "2026-08-20T14:56:35.975Z",
		"size": 207,
		"path": "../public/assets/chevron-right-BRClqNJT.js"
	},
	"/assets/circle-check-BNg_BNCk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-ynv7NYeMmTYExFOKSL9Iyl7Jyh0\"",
		"mtime": "2026-08-20T14:56:35.975Z",
		"size": 178,
		"path": "../public/assets/circle-check-BNg_BNCk.js"
	},
	"/assets/bazarixy-mark-BoezJBBF.webp": {
		"type": "image/webp",
		"etag": "\"13b1a-VTfHiNLa+4ZyKgn/xLXhph+vQ0s\"",
		"mtime": "2026-08-20T14:56:35.978Z",
		"size": 80666,
		"path": "../public/assets/bazarixy-mark-BoezJBBF.webp"
	},
	"/assets/clock-Ck_bJSgx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-CYv5zrLZuPbYLtl+al1BNfTEAUk\"",
		"mtime": "2026-08-20T14:56:35.975Z",
		"size": 169,
		"path": "../public/assets/clock-Ck_bJSgx.js"
	},
	"/assets/colors-BJKl-Gdh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3d4-9inSdsk5bsroRB269bctgt/oKrE\"",
		"mtime": "2026-08-20T14:56:35.975Z",
		"size": 980,
		"path": "../public/assets/colors-BJKl-Gdh.js"
	},
	"/assets/como-pagar-Brd04tLg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1117-EuBcAxZGFljIqRKNdpnU9LxBQ90\"",
		"mtime": "2026-08-20T14:56:35.975Z",
		"size": 4375,
		"path": "../public/assets/como-pagar-Brd04tLg.js"
	},
	"/assets/coins-DKTzYf2R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11d-YwsRP+VX2289rBT1ZlX+Q6RR/QE\"",
		"mtime": "2026-08-20T14:56:35.975Z",
		"size": 285,
		"path": "../public/assets/coins-DKTzYf2R.js"
	},
	"/assets/copy-BJVIj8L1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-mujCqIFvddec03i++qiw+eNsagE\"",
		"mtime": "2026-08-20T14:56:35.975Z",
		"size": 236,
		"path": "../public/assets/copy-BJVIj8L1.js"
	},
	"/assets/client-C1Ll2hCY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"86f0e-h4sX+V9qEX3ckH5jK/VEMaAqIu8\"",
		"mtime": "2026-08-20T14:56:35.975Z",
		"size": 552718,
		"path": "../public/assets/client-C1Ll2hCY.js"
	},
	"/assets/coupons-DtPNDl7K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1745-b0dk/a92Pjz2uOB2NNGXNw0kR8k\"",
		"mtime": "2026-08-20T14:56:35.975Z",
		"size": 5957,
		"path": "../public/assets/coupons-DtPNDl7K.js"
	},
	"/assets/coupons-store-D3fvRWIt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a2-JjEjiqkqc5plIbM1XJM1Ovfl0pA\"",
		"mtime": "2026-08-20T14:56:35.975Z",
		"size": 1698,
		"path": "../public/assets/coupons-store-D3fvRWIt.js"
	},
	"/assets/createLucideIcon-cPwvoQem.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a0-p4j4oMg8OI8NWiq6sASxP2tvJ4M\"",
		"mtime": "2026-08-20T14:56:35.975Z",
		"size": 1184,
		"path": "../public/assets/createLucideIcon-cPwvoQem.js"
	},
	"/assets/credit-card-m2jg6_n_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf-QELYgSs445QoI0kRlpAAx1PFUTE\"",
		"mtime": "2026-08-20T14:56:35.975Z",
		"size": 207,
		"path": "../public/assets/credit-card-m2jg6_n_.js"
	},
	"/assets/eye-btBJQO-u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100-3nNqj/FCnSvkOfogOhs9ijRdJCk\"",
		"mtime": "2026-08-20T14:56:35.975Z",
		"size": 256,
		"path": "../public/assets/eye-btBJQO-u.js"
	},
	"/assets/favorites-BloVfgJa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b82-qatXo1zl4YHmUdEeKwdtRVczRI8\"",
		"mtime": "2026-08-20T14:56:35.975Z",
		"size": 2946,
		"path": "../public/assets/favorites-BloVfgJa.js"
	},
	"/assets/flame-DbHt73Yn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c7-FGO9wkmqxJ5YJRmW/AJY54ujyrw\"",
		"mtime": "2026-08-20T14:56:35.975Z",
		"size": 199,
		"path": "../public/assets/flame-DbHt73Yn.js"
	},
	"/assets/folder-tree-DpOf1GO5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1df-IxneIzIY2+9q68bdB1dRtM18GYM\"",
		"mtime": "2026-08-20T14:56:35.975Z",
		"size": 479,
		"path": "../public/assets/folder-tree-DpOf1GO5.js"
	},
	"/assets/format-CYW_xdiT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b1-G10l8/x9mRib3XpXQqFI3TlxHy4\"",
		"mtime": "2026-08-20T14:56:35.975Z",
		"size": 177,
		"path": "../public/assets/format-CYW_xdiT.js"
	},
	"/assets/home-config-CgDQRKeu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7df-745FoxrsTEbNQQtZL9xmc43EvOk\"",
		"mtime": "2026-08-20T14:56:35.975Z",
		"size": 2015,
		"path": "../public/assets/home-config-CgDQRKeu.js"
	},
	"/assets/image-D-lNMpac.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10d-cLciIbciv4jOZdRfvFH+28A0aQc\"",
		"mtime": "2026-08-20T14:56:35.975Z",
		"size": 269,
		"path": "../public/assets/image-D-lNMpac.js"
	},
	"/assets/index-CZrSvHYR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6ed06-EnwhSncrbDWtyCuKfIbI5OgYsWg\"",
		"mtime": "2026-08-20T14:56:35.973Z",
		"size": 453894,
		"path": "../public/assets/index-CZrSvHYR.js"
	},
	"/assets/index.esm-CVjMrPB1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6fc3-mKUyYZ6cQ9q/794xHshI2hh/vVA\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 28611,
		"path": "../public/assets/index.esm-CVjMrPB1.js"
	},
	"/assets/index.esm-DsCv4lCR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13cd5-+uX6BiZRJzctSMYBLOnCdJa2bLA\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 81109,
		"path": "../public/assets/index.esm-DsCv4lCR.js"
	},
	"/assets/index.esm-Z2UCGr0V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4440-uLrpEQc+NwaIUfbct/iCT6MmG5Y\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 17472,
		"path": "../public/assets/index.esm-Z2UCGr0V.js"
	},
	"/assets/info-9r1nfKh8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cc-gF4q9mcxVlikIE3XkAGqtUCLlg0\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 204,
		"path": "../public/assets/info-9r1nfKh8.js"
	},
	"/assets/layers-sKUIrNts.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a5-THRzSNWTv+Fyajhf1hkCPQqdwkI\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 421,
		"path": "../public/assets/layers-sKUIrNts.js"
	},
	"/assets/layout-grid-D1eYRydS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15a-kBeTIsnBb6aq6JMgbjocdGPXXuQ\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 346,
		"path": "../public/assets/layout-grid-D1eYRydS.js"
	},
	"/assets/link-BXNL7SeI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"53ae-C4R2k4IpkoMygGnX0EGEdaQreyA\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 21422,
		"path": "../public/assets/link-BXNL7SeI.js"
	},
	"/assets/lock-DY9q7Zdn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ce-PMI389bhM6Hu71gvUDIHoEa7uFM\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 206,
		"path": "../public/assets/lock-DY9q7Zdn.js"
	},
	"/assets/logistics-store-BYg7K0ZC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c64-+JW1THtj4w8g9GvD9CUbad2jlcc\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 3172,
		"path": "../public/assets/logistics-store-BYg7K0ZC.js"
	},
	"/assets/logotipo-BJ2lWMnX.webp": {
		"type": "image/webp",
		"etag": "\"1c700-hfa8Y9a9TMQJ+I/2wksM5NlkPJQ\"",
		"mtime": "2026-08-20T14:56:35.978Z",
		"size": 116480,
		"path": "../public/assets/logotipo-BJ2lWMnX.webp"
	},
	"/assets/mail-Cbg9Xqpo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-x3YDs1f4xiRt9LFahbcZ41zDVZI\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 213,
		"path": "../public/assets/mail-Cbg9Xqpo.js"
	},
	"/assets/map-pin-C6mqjQGc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-sL6PyQ4lLzP22O1PKbMMDeJn51g\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 259,
		"path": "../public/assets/map-pin-C6mqjQGc.js"
	},
	"/assets/me-C4yWFpfH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24c4-kCv7WVA3AtPIqDjmN3L+vMlu3nI\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 9412,
		"path": "../public/assets/me-C4yWFpfH.js"
	},
	"/assets/message-square-DcYrvzMm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-gPpzrLup6SlWEnlhQplVxPTS/GA\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 233,
		"path": "../public/assets/message-square-DcYrvzMm.js"
	},
	"/assets/not-found-i5RsCZif.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-Trmr7GZIBZuvfg4uM18tBiRtOXg\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 118,
		"path": "../public/assets/not-found-i5RsCZif.js"
	},
	"/assets/notifications-ticOSUOl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1456-7M5ouOG9CYhyvFfV91jnuaD9OME\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 5206,
		"path": "../public/assets/notifications-ticOSUOl.js"
	},
	"/assets/orders-CX9elnSz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"54e7-1ntKSkXca+HadVbUXq/Qvip0rhY\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 21735,
		"path": "../public/assets/orders-CX9elnSz.js"
	},
	"/assets/p-brushes-BdxdHdet.jpg": {
		"type": "image/jpeg",
		"etag": "\"12ca4-QEM7Pxib/X2lBQLJ3FZwFifHFbo\"",
		"mtime": "2026-08-20T14:56:35.979Z",
		"size": 76964,
		"path": "../public/assets/p-brushes-BdxdHdet.jpg"
	},
	"/assets/p-cream-t29T4qSa.jpg": {
		"type": "image/jpeg",
		"etag": "\"7d1c-OF87WaSKzGYV4wll3FlG+reblzA\"",
		"mtime": "2026-08-20T14:56:35.979Z",
		"size": 32028,
		"path": "../public/assets/p-cream-t29T4qSa.jpg"
	},
	"/assets/p-dress-BEbFKKeJ.jpg": {
		"type": "image/jpeg",
		"etag": "\"8b7f-xusMudTEekzqGEljjV1OStbMgsU\"",
		"mtime": "2026-08-20T14:56:35.979Z",
		"size": 35711,
		"path": "../public/assets/p-dress-BEbFKKeJ.jpg"
	},
	"/assets/p-jeans-BIj6CxYP.jpg": {
		"type": "image/jpeg",
		"etag": "\"23415-HTJ6loY6CPgdWI8ul1wq49eUCjw\"",
		"mtime": "2026-08-20T14:56:35.979Z",
		"size": 144405,
		"path": "../public/assets/p-jeans-BIj6CxYP.jpg"
	},
	"/assets/p-jumpsuit-BkhcJynf.jpg": {
		"type": "image/jpeg",
		"etag": "\"b652-llu0RjNBZpx6CW4FXmoJV0PCe2w\"",
		"mtime": "2026-08-20T14:56:35.979Z",
		"size": 46674,
		"path": "../public/assets/p-jumpsuit-BkhcJynf.jpg"
	},
	"/assets/p-knit-B1VN3gUH.jpg": {
		"type": "image/jpeg",
		"etag": "\"178e5-bp21sK1XIkX36dgMZsPUBpGG3/M\"",
		"mtime": "2026-08-20T14:56:35.979Z",
		"size": 96485,
		"path": "../public/assets/p-knit-B1VN3gUH.jpg"
	},
	"/assets/p-lipstick-CX6Dj8cF.jpg": {
		"type": "image/jpeg",
		"etag": "\"15b47-gxs0XoZAuNzHvPslCpXEq+DCAcU\"",
		"mtime": "2026-08-20T14:56:35.979Z",
		"size": 88903,
		"path": "../public/assets/p-lipstick-CX6Dj8cF.jpg"
	},
	"/assets/p-pants-w2etJJsJ.jpg": {
		"type": "image/jpeg",
		"etag": "\"ad98-TgL+g++/aInC8NKn0yV9gtipSJ0\"",
		"mtime": "2026-08-20T14:56:35.979Z",
		"size": 44440,
		"path": "../public/assets/p-pants-w2etJJsJ.jpg"
	},
	"/assets/p-perfume-BnxGlR6I.jpg": {
		"type": "image/jpeg",
		"etag": "\"c4e5-FHYORWvyQw9GRTCgnSCkkTb5BsQ\"",
		"mtime": "2026-08-20T14:56:35.979Z",
		"size": 50405,
		"path": "../public/assets/p-perfume-BnxGlR6I.jpg"
	},
	"/assets/p-reddress-BngZqOK1.jpg": {
		"type": "image/jpeg",
		"etag": "\"ae1f-EopdjO+URdpSyHI4ZpN3YJ6tGj0\"",
		"mtime": "2026-08-20T14:56:35.979Z",
		"size": 44575,
		"path": "../public/assets/p-reddress-BngZqOK1.jpg"
	},
	"/assets/p-skirt-DNF_I8F3.jpg": {
		"type": "image/jpeg",
		"etag": "\"8b75-7lpHtIZ7XyMgHLrwrwDukBIPnGs\"",
		"mtime": "2026-08-20T14:56:35.979Z",
		"size": 35701,
		"path": "../public/assets/p-skirt-DNF_I8F3.jpg"
	},
	"/assets/p-swim-9aOCY719.jpg": {
		"type": "image/jpeg",
		"etag": "\"f963-+F35GN6hkofO+2LKZ/nR/wRC6fM\"",
		"mtime": "2026-08-20T14:56:35.979Z",
		"size": 63843,
		"path": "../public/assets/p-swim-9aOCY719.jpg"
	},
	"/assets/p-tank-DYSgLGey.jpg": {
		"type": "image/jpeg",
		"etag": "\"102a0-8UKqAkGsFC7tn5V4uyafssb8d88\"",
		"mtime": "2026-08-20T14:56:35.979Z",
		"size": 66208,
		"path": "../public/assets/p-tank-DYSgLGey.jpg"
	},
	"/assets/p-top-BTKTbnRS.jpg": {
		"type": "image/jpeg",
		"etag": "\"d291-bFerBrwW3D5Spjqlsv3DtjgOqeg\"",
		"mtime": "2026-08-20T14:56:35.979Z",
		"size": 53905,
		"path": "../public/assets/p-top-BTKTbnRS.jpg"
	},
	"/assets/package-CBeDJ4Sv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"174-gnilbzb7pwtarW10b09b3v8jClU\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 372,
		"path": "../public/assets/package-CBeDJ4Sv.js"
	},
	"/assets/pay-express.jpg.asset-Cyk8AYll.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33c-YsNAiUCenUU9xbjiEN2Uf6Tv/wI\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 828,
		"path": "../public/assets/pay-express.jpg.asset-Cyk8AYll.js"
	},
	"/assets/pay._method-DMaHzcTB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33de-vW/kNl6puz19gx8fiOgHb/Xob0c\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 13278,
		"path": "../public/assets/pay._method-DMaHzcTB.js"
	},
	"/assets/payments-store-JB8NrLPc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a7-5/QiXe7cREwKaL1lIfsXaJP40jU\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 2471,
		"path": "../public/assets/payments-store-JB8NrLPc.js"
	},
	"/assets/pencil-Ce_zgDGo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"114-j0YXPdWv9PfdFfNqqYve08jZsE8\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 276,
		"path": "../public/assets/pencil-Ce_zgDGo.js"
	},
	"/assets/pending-payment-CjTbbZwJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"181-5aYgCRh+5tLa1Kl8HmV93vGWeM0\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 385,
		"path": "../public/assets/pending-payment-CjTbbZwJ.js"
	},
	"/assets/plus-CsFklqLM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-hV1ZU//qKDkNfMVQj6KE+nM11Io\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 153,
		"path": "../public/assets/plus-CsFklqLM.js"
	},
	"/assets/privacidade-DCnJeCRQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"282c-a8WSY91bVsI/sDO14cqRZ/9jWqE\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 10284,
		"path": "../public/assets/privacidade-DCnJeCRQ.js"
	},
	"/assets/points-UXFuRnGa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13ec-kuBVfcIpNf8uqaJq4jBzDf1dFhU\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 5100,
		"path": "../public/assets/points-UXFuRnGa.js"
	},
	"/assets/product._id-BFoxL4sG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"62e0-XE6hoasCVCzGziIAFhPJSpyIh0w\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 25312,
		"path": "../public/assets/product._id-BFoxL4sG.js"
	},
	"/assets/product._id-BiYAuBTb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"108-Mu8giynRqI5gcCHSHbQkLj439M8\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 264,
		"path": "../public/assets/product._id-BiYAuBTb.js"
	},
	"/assets/product._id-DcXjB_vk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f2-pfQVqjESeQIIFOPDuraMYi2F450\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 242,
		"path": "../public/assets/product._id-DcXjB_vk.js"
	},
	"/assets/promo-1-D9QBnF1Y.png": {
		"type": "image/png",
		"etag": "\"5c5d7-jgaByYJZ7VuNG4j6B9aQDUG3WUA\"",
		"mtime": "2026-08-20T14:56:35.979Z",
		"size": 378327,
		"path": "../public/assets/promo-1-D9QBnF1Y.png"
	},
	"/assets/promo-2-djOW7yEW.png": {
		"type": "image/png",
		"etag": "\"6be5d-obj99+iBJlyAl1e8ohm/6uGppF4\"",
		"mtime": "2026-08-20T14:56:35.981Z",
		"size": 441949,
		"path": "../public/assets/promo-2-djOW7yEW.png"
	},
	"/assets/promo-3-Ddu1tsCS.png": {
		"type": "image/png",
		"etag": "\"3c903-jvRqSVXnhNZpruPkxbj6Jbjs8vA\"",
		"mtime": "2026-08-20T14:56:35.981Z",
		"size": 248067,
		"path": "../public/assets/promo-3-Ddu1tsCS.png"
	},
	"/assets/react-SIfiwpqq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ff9-FGVdof4/lFGmrdRsB9EIvuwBlYc\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 8185,
		"path": "../public/assets/react-SIfiwpqq.js"
	},
	"/assets/reviews-Cst8jYgc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"83a-nsfYGj+R+ia8HxLRoB6bARIEoVw\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 2106,
		"path": "../public/assets/reviews-Cst8jYgc.js"
	},
	"/assets/roles-BKB0Oipk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5f2-eQNRwZGSgoNLiNvo/tuyamWHikM\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 1522,
		"path": "../public/assets/roles-BKB0Oipk.js"
	},
	"/assets/root-DLTE-HSj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20-vSYConOtSP6ciwr9zKsPixNwWmc\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 32,
		"path": "../public/assets/root-DLTE-HSj.js"
	},
	"/assets/rotate-ccw-DjyDNOwP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c8-DPGJLCZ7OBGOoyvAr0ExEg8iCyI\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 200,
		"path": "../public/assets/rotate-ccw-DjyDNOwP.js"
	},
	"/assets/search-CzMGmf7M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-b9y6AXI3WU49XAW6vzxNX+9hJAk\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 174,
		"path": "../public/assets/search-CzMGmf7M.js"
	},
	"/assets/routes-BAFdtgDL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ce3-wM2W4P26D6EBR37+P7ecsy25HAY\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 15587,
		"path": "../public/assets/routes-BAFdtgDL.js"
	},
	"/assets/send-BDMLRI3-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"190-klpR9YNhc6v+VFqZZm91zv0v01A\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 400,
		"path": "../public/assets/send-BDMLRI3-.js"
	},
	"/assets/send-DCFGnZqu2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1de-oNrZCmEQ/zK54Axy+adruAdikp8\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 478,
		"path": "../public/assets/send-DCFGnZqu2.js"
	},
	"/assets/revenue-C7T3yA9Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2fa-Vp8Ljl6a+7+1S88aoYXePWNvU1g\"",
		"mtime": "2026-08-20T14:56:35.976Z",
		"size": 762,
		"path": "../public/assets/revenue-C7T3yA9Y.js"
	},
	"/assets/settings-B1g-VPIY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6f3-L1NJp9S+5w4Y9LA/kC5lWwaio5M\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 1779,
		"path": "../public/assets/settings-B1g-VPIY.js"
	},
	"/assets/settings-DXojiu7t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27cd-AhayFE50U9N4jbgNd5b6/HWCYpU\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 10189,
		"path": "../public/assets/settings-DXojiu7t.js"
	},
	"/assets/share-2-CcqjdWpJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"165-QDmsr1TmhtKuw2U4e493BS0yS7g\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 357,
		"path": "../public/assets/share-2-CcqjdWpJ.js"
	},
	"/assets/shield-check-B3PmHBMY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-G33KRg9KT60ucl9G/TtXATi40Ns\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 320,
		"path": "../public/assets/shield-check-B3PmHBMY.js"
	},
	"/assets/shop._id-Bv2rezk3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"154e-6z2LwFS/5zDHKOTMnNnjOq2K5ow\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 5454,
		"path": "../public/assets/shop._id-Bv2rezk3.js"
	},
	"/assets/shield-alert-RE0kBelx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"161-8yki1oTNML+fp1mC2WlW/iEOcIc\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 353,
		"path": "../public/assets/shield-alert-RE0kBelx.js"
	},
	"/assets/shop._id-DIgC-30u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ee-lw+uGgQchoLc/qBmwDpKsZ/5Fok\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 238,
		"path": "../public/assets/shop._id-DIgC-30u.js"
	},
	"/assets/shopping-bag-wN4xsTXd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"154-tWGIP3GN/lxEepwn9Jj3DDP4Gyc\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 340,
		"path": "../public/assets/shopping-bag-wN4xsTXd.js"
	},
	"/assets/site-CES1ZCO5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1aa-5dzO14u61x6L9BognrTXns2ChPU\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 426,
		"path": "../public/assets/site-CES1ZCO5.js"
	},
	"/assets/sliders-horizontal-AhCtpuXs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c3-AENPeABu4ynN89rMt2ndKYd6jeY\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 707,
		"path": "../public/assets/sliders-horizontal-AhCtpuXs.js"
	},
	"/assets/sparkles-USJV5op3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-8Cue5x6m3xDHvPVgMMegQ1Hxrmg\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 494,
		"path": "../public/assets/sparkles-USJV5op3.js"
	},
	"/assets/star-CYIcROk7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d8-CAGMcBuAXcdSdd1ngXKmc3CYgrk\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 472,
		"path": "../public/assets/star-CYIcROk7.js"
	},
	"/assets/store-CJON2pyA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"be8-spxbYTMvJ+VPwkVH1UUF3nu5RsE\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 3048,
		"path": "../public/assets/store-CJON2pyA.js"
	},
	"/assets/store-BPHnSeEG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f2-7DjxDcYbVWyOI525/S93wYQ1Tuw\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 498,
		"path": "../public/assets/store-BPHnSeEG.js"
	},
	"/assets/styles-CpAQcbLU.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"251ed-DsPptJmjTJZS2lUwLOnIEtfXlJc\"",
		"mtime": "2026-08-20T14:56:35.981Z",
		"size": 152045,
		"path": "../public/assets/styles-CpAQcbLU.css"
	},
	"/assets/super-ofertas-C3kij9AH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"529-un5N48o7QACCV/qyFFa1QJZsbf8\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 1321,
		"path": "../public/assets/super-ofertas-C3kij9AH.js"
	},
	"/assets/support-Dd1V6OHJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"406d-ME83o4dNBw7KxqQE0HgGLliQogs\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 16493,
		"path": "../public/assets/support-Dd1V6OHJ.js"
	},
	"/assets/sync-store-BUPiTZzZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4bc-9GUsJCKOH67YDjoKN83l9dnfCZY\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 1212,
		"path": "../public/assets/sync-store-BUPiTZzZ.js"
	},
	"/assets/target-CBRGy9km.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e2-t3Sn5kCdbBtiqBWGg3xx+H8JwHo\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 226,
		"path": "../public/assets/target-CBRGy9km.js"
	},
	"/assets/termos-QuQmOW21.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"31b9-XkSBR/LdVkgUlId3eIouP1XsdN0\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 12729,
		"path": "../public/assets/termos-QuQmOW21.js"
	},
	"/assets/ticket-BiNpThdz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-xN89hCgQihvZy3O5LFOZhNcbbuo\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 321,
		"path": "../public/assets/ticket-BiNpThdz.js"
	},
	"/assets/trash-2-D9ykOZrd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-SFufvwScaqfz7pcnb2UUn3FfGKk\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 328,
		"path": "../public/assets/trash-2-D9ykOZrd.js"
	},
	"/assets/trending-up-B6Edyn1q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"af-ZcD8ymo8T8OMoVkfzimNFhXKuIY\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 175,
		"path": "../public/assets/trending-up-B6Edyn1q.js"
	},
	"/assets/triangle-alert-FTKqut9w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109-OpU+dqUqLnrikxh4aRCiuvoiOrA\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 265,
		"path": "../public/assets/triangle-alert-FTKqut9w.js"
	},
	"/assets/trocas-devolucoes-B54aP9O7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22df-82m8jdTk3gYleNHfX8EoNYhIxbM\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 8927,
		"path": "../public/assets/trocas-devolucoes-B54aP9O7.js"
	},
	"/assets/truck-CyWOy9Pq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"196-uGkug4CZttLs7NFYlEME1CCeoDU\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 406,
		"path": "../public/assets/truck-CyWOy9Pq.js"
	},
	"/assets/undo-2-Dz34a5Qr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d0-+JX2jz9JFkOkKTnnSwRaYZYKoo8\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 208,
		"path": "../public/assets/undo-2-Dz34a5Qr.js"
	},
	"/assets/upload-DpeLQeIe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a2-InDHkFqlgHWTUiotVlGT/KuL1+s\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 2466,
		"path": "../public/assets/upload-DpeLQeIe.js"
	},
	"/assets/useMatch-ACfgcG1I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"213-H2i4csC8bNtKd0oxZ1Np+8ntECU\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 531,
		"path": "../public/assets/useMatch-ACfgcG1I.js"
	},
	"/assets/user-plus-HbfwRcYz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-AQDJ12q23Dnf5CGOnaVrhifxSio\"",
		"mtime": "2026-08-20T14:56:35.977Z",
		"size": 310,
		"path": "../public/assets/user-plus-HbfwRcYz.js"
	},
	"/assets/users-C-3GO8qD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-2Etv51zCmy57gDoatAApaFJa9Vk\"",
		"mtime": "2026-08-20T14:56:35.978Z",
		"size": 306,
		"path": "../public/assets/users-C-3GO8qD.js"
	},
	"/assets/wallet-B1Rcb-Ud.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11e-pcmmlXiLgPvRoVEYKUoKffKeTQM\"",
		"mtime": "2026-08-20T14:56:35.978Z",
		"size": 286,
		"path": "../public/assets/wallet-B1Rcb-Ud.js"
	},
	"/assets/wallet-CWpoZ_bD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15c1-hFLZCyWOqgwNubP9cWyeYd0We08\"",
		"mtime": "2026-08-20T14:56:35.978Z",
		"size": 5569,
		"path": "../public/assets/wallet-CWpoZ_bD.js"
	},
	"/assets/x-B2FTZ7Vt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-YzY9+adS4NM8VvQ9ImCQoQFBfkc\"",
		"mtime": "2026-08-20T14:56:35.978Z",
		"size": 154,
		"path": "../public/assets/x-B2FTZ7Vt.js"
	},
	"/assets/zap-bFH_IeqZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"106-o1zlUbhJe/IP+W3bfjkTqsG2slY\"",
		"mtime": "2026-08-20T14:56:35.978Z",
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
