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
	"/assets/AdminModal-DU1Nd0Sa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bbb-C4gvvMDbJPGc69v3sVj4GlVflTA\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 3003,
		"path": "../public/assets/AdminModal-DU1Nd0Sa.js"
	},
	"/assets/AdminTabs-hkHs6336.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"317-SR85o68T1eCT6tAKocTnBqto5tw\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 791,
		"path": "../public/assets/AdminTabs-hkHs6336.js"
	},
	"/assets/Layout-DFjI1JOR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a563-//lozPQrwVOyHJcwdxHAOIPY6xI\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 107875,
		"path": "../public/assets/Layout-DFjI1JOR.js"
	},
	"/assets/ProductCard-lbZ73wRx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5fc-0mazSFnnmd7HMYpBBrJCSvueRLE\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 1532,
		"path": "../public/assets/ProductCard-lbZ73wRx.js"
	},
	"/assets/ShareSheet-BCjgj10r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1043-FGZSaCi2km6SZu3XaNhDMg5ZCTo\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 4163,
		"path": "../public/assets/ShareSheet-BCjgj10r.js"
	},
	"/assets/admin-1jccIZ-u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f6e-xa77iprXEuzt92B6S00u2FQckLs\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 12142,
		"path": "../public/assets/admin-1jccIZ-u.js"
	},
	"/assets/admin.abas._id-U3ElUJ6N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"34fd-7rwVZLHzUViGIEZdtGjU6rnpK9g\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 13565,
		"path": "../public/assets/admin.abas._id-U3ElUJ6N.js"
	},
	"/assets/admin.categorias-DrN3xiJ8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f1d-iaHN6ro1CnJjL2ZlfpDNkoksSn0\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 12061,
		"path": "../public/assets/admin.categorias-DrN3xiJ8.js"
	},
	"/assets/admin.config-BGPtPWmJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"94a-WuJYRiY321ZrOF4cFLdXt61B47U\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 2378,
		"path": "../public/assets/admin.config-BGPtPWmJ.js"
	},
	"/assets/admin.cupons-BLFauTdO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1576-Liv8NOD7eiC6fZTCZZCxpLlGuzE\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 5494,
		"path": "../public/assets/admin.cupons-BLFauTdO.js"
	},
	"/assets/admin.equipa-Dplpg1AS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"166a-SykSKSA7wTaO2pPtSSxub5FTVEk\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 5738,
		"path": "../public/assets/admin.equipa-Dplpg1AS.js"
	},
	"/assets/admin.home-3aNrv5o2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4292-1Wqm8XOtdnTpPEvAPiDfxeCsccM\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 17042,
		"path": "../public/assets/admin.home-3aNrv5o2.js"
	},
	"/assets/admin.index-DPqsC4ng.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2712-ttbH11gnUtuF1gkpHMd6WUx2oec\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 10002,
		"path": "../public/assets/admin.index-DPqsC4ng.js"
	},
	"/assets/admin.logistica-DwIf8P8J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2958-B9B6Uax8CuW0MHGZ03kqxH7cqUM\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 10584,
		"path": "../public/assets/admin.logistica-DwIf8P8J.js"
	},
	"/assets/admin.lojas._id-BKJdVKU0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1965-hW6d3pnnWoaj8WEjj9L4zO5HHJI\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 6501,
		"path": "../public/assets/admin.lojas._id-BKJdVKU0.js"
	},
	"/assets/admin.metas-tboDlgs4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c7d-i0/pR6PyL3Lozi8SUKFkr640K3U\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 7293,
		"path": "../public/assets/admin.metas-tboDlgs4.js"
	},
	"/assets/admin.lojas-DQYUgkbA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c1a-vGnkJsBDwmMGu+NIgYFXu5QB078\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 7194,
		"path": "../public/assets/admin.lojas-DQYUgkbA.js"
	},
	"/assets/admin.pagamentos-gl69qKO6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1880-gy1ghQjd3XtIx+R9mE8tw4EXHp0\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 6272,
		"path": "../public/assets/admin.pagamentos-gl69qKO6.js"
	},
	"/assets/admin.pedidos-BtIxni1Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f2b-QMZ5+NWAWnIpaYYaab9o3A/zEPo\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 20267,
		"path": "../public/assets/admin.pedidos-BtIxni1Y.js"
	},
	"/assets/admin.receita-22-h9QcP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fc9-7jZzqcD4RZYs/IFh7CWwPmdAq84\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 8137,
		"path": "../public/assets/admin.receita-22-h9QcP.js"
	},
	"/assets/admin.usuarios-MZtkMWD1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eb8-PjtpSsIq6UgQ3+U4MjiVMAGx4hg\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 3768,
		"path": "../public/assets/admin.usuarios-MZtkMWD1.js"
	},
	"/assets/admin.produtos-bjYl-whe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8105-LrIqCzOp8TLoxC0PpIbrFIgVZ7A\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 33029,
		"path": "../public/assets/admin.produtos-bjYl-whe.js"
	},
	"/assets/arrow-left-BmAZr12X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-gXo0UkGcbBZfOn7hniDqDJBFM0E\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 165,
		"path": "../public/assets/arrow-left-BmAZr12X.js"
	},
	"/assets/arrow-right-DdeI4MLJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-f9DD0ZW4LzKdOxjMGfi4ORxd6MY\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 165,
		"path": "../public/assets/arrow-right-DdeI4MLJ.js"
	},
	"/assets/arrow-up-right-D-a4p84_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a7-/tmZ3lmzimemwkKtHJst5lvZGRQ\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 167,
		"path": "../public/assets/arrow-up-right-D-a4p84_.js"
	},
	"/assets/badge-check-Ct12fjB0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13c-XY0phrNLMiQmTCnxm8KOnUKtvSY\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 316,
		"path": "../public/assets/badge-check-Ct12fjB0.js"
	},
	"/assets/banner-B7dB-VpD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7a1-UpEMg4dtcpsKLIZRcDPHAsTqjs4\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 1953,
		"path": "../public/assets/banner-B7dB-VpD.js"
	},
	"/assets/bazarixy-logo.webp.asset-CRxaR9He.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ac-v1A9tB1yGCmdfnScNLvNKb8jvCg\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 428,
		"path": "../public/assets/bazarixy-logo.webp.asset-CRxaR9He.js"
	},
	"/assets/cart-BPlEtI_w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1dbc-APT50M8uhHLZChRSXyBvKUy8s/s\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 7612,
		"path": "../public/assets/cart-BPlEtI_w.js"
	},
	"/assets/cat-beleza-D1kCkjAZ.jpg": {
		"type": "image/jpeg",
		"etag": "\"1b46f-YLJlnudyTIkSuWvMBi/i8eFg2QU\"",
		"mtime": "2026-08-15T18:36:09.883Z",
		"size": 111727,
		"path": "../public/assets/cat-beleza-D1kCkjAZ.jpg"
	},
	"/assets/cat-casa-Bhw4cn94.jpg": {
		"type": "image/jpeg",
		"etag": "\"109e2-64W5w/r881d5MlggeuEVfSxlSx0\"",
		"mtime": "2026-08-15T18:36:09.883Z",
		"size": 68066,
		"path": "../public/assets/cat-casa-Bhw4cn94.jpg"
	},
	"/assets/cat-eletronicos-B0bni-lq.jpg": {
		"type": "image/jpeg",
		"etag": "\"9eb4-guTG9oGXHjsPlNospr8KbgmQSSA\"",
		"mtime": "2026-08-15T18:36:09.883Z",
		"size": 40628,
		"path": "../public/assets/cat-eletronicos-B0bni-lq.jpg"
	},
	"/assets/cat-outros-Bhul1THh.jpg": {
		"type": "image/jpeg",
		"etag": "\"25185-tPs/blFvuESlEW9ziAZHOqlcZyE\"",
		"mtime": "2026-08-15T18:36:09.883Z",
		"size": 151941,
		"path": "../public/assets/cat-outros-Bhul1THh.jpg"
	},
	"/assets/categories-CCBo90Rl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"256f-GG1GPUm6B35021zqqTkDDEK/Rbk\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 9583,
		"path": "../public/assets/categories-CCBo90Rl.js"
	},
	"/assets/categories-store-DMZfpzIO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"83e-LT/Y7StIhSM4y+sEtd3a34NO+lI\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 2110,
		"path": "../public/assets/categories-store-DMZfpzIO.js"
	},
	"/assets/category._slug-B1m9j-IF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"126b-PHpXiFA00EbK06yMnRT4OzXPUdU\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 4715,
		"path": "../public/assets/category._slug-B1m9j-IF.js"
	},
	"/assets/category._slug-Cr8GuMcl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-h3vdNv0xX18k3kk5M6t1wm9bI7M\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 230,
		"path": "../public/assets/category._slug-Cr8GuMcl.js"
	},
	"/assets/category._slug-xTM5Yolh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f8-FhlGr/SCq1kCBqYc7h6RGQvNNog\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 248,
		"path": "../public/assets/category._slug-xTM5Yolh.js"
	},
	"/assets/check-CCNqrC1g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c-za+g0Apj+yzWeYK+kKbueqKdpas\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 124,
		"path": "../public/assets/check-CCNqrC1g.js"
	},
	"/assets/checkout-DsIR6aEX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c90-H5vz6pkR+wrIVud/iANpFtfsZ2E\"",
		"mtime": "2026-08-15T18:36:09.881Z",
		"size": 19600,
		"path": "../public/assets/checkout-DsIR6aEX.js"
	},
	"/assets/chevron-right-BRClqNJT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf-wIaO0ieqawSkXFuwRLAiZNr6TTs\"",
		"mtime": "2026-08-15T18:36:09.881Z",
		"size": 207,
		"path": "../public/assets/chevron-right-BRClqNJT.js"
	},
	"/assets/clock-Ck_bJSgx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-CYv5zrLZuPbYLtl+al1BNfTEAUk\"",
		"mtime": "2026-08-15T18:36:09.881Z",
		"size": 169,
		"path": "../public/assets/clock-Ck_bJSgx.js"
	},
	"/assets/coins-DKTzYf2R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11d-YwsRP+VX2289rBT1ZlX+Q6RR/QE\"",
		"mtime": "2026-08-15T18:36:09.881Z",
		"size": 285,
		"path": "../public/assets/coins-DKTzYf2R.js"
	},
	"/assets/colors-BJKl-Gdh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3d4-9inSdsk5bsroRB269bctgt/oKrE\"",
		"mtime": "2026-08-15T18:36:09.881Z",
		"size": 980,
		"path": "../public/assets/colors-BJKl-Gdh.js"
	},
	"/assets/copy-BJVIj8L1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-mujCqIFvddec03i++qiw+eNsagE\"",
		"mtime": "2026-08-15T18:36:09.881Z",
		"size": 236,
		"path": "../public/assets/copy-BJVIj8L1.js"
	},
	"/assets/coupons-CNV7XubU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"173f-O5VfTKRfssYWWjeIo4urtO1qIRY\"",
		"mtime": "2026-08-15T18:36:09.881Z",
		"size": 5951,
		"path": "../public/assets/coupons-CNV7XubU.js"
	},
	"/assets/coupons-store-BphO3OmW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a2-tz17tkGuVYgD373WiekNrBhL5JI\"",
		"mtime": "2026-08-15T18:36:09.881Z",
		"size": 1698,
		"path": "../public/assets/coupons-store-BphO3OmW.js"
	},
	"/assets/createLucideIcon-cPwvoQem.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a0-p4j4oMg8OI8NWiq6sASxP2tvJ4M\"",
		"mtime": "2026-08-15T18:36:09.881Z",
		"size": 1184,
		"path": "../public/assets/createLucideIcon-cPwvoQem.js"
	},
	"/assets/client-CPKXwLm3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"86e52-HWsfcYAjZNS8qStJ0Eacy49S8Tk\"",
		"mtime": "2026-08-15T18:36:09.881Z",
		"size": 552530,
		"path": "../public/assets/client-CPKXwLm3.js"
	},
	"/assets/auth-C3xTa6J8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"355e-N1txB6rAtjovYtYWY5OccNqSmko\"",
		"mtime": "2026-08-15T18:36:09.880Z",
		"size": 13662,
		"path": "../public/assets/auth-C3xTa6J8.js"
	},
	"/assets/credit-card-m2jg6_n_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf-QELYgSs445QoI0kRlpAAx1PFUTE\"",
		"mtime": "2026-08-15T18:36:09.881Z",
		"size": 207,
		"path": "../public/assets/credit-card-m2jg6_n_.js"
	},
	"/assets/eye-btBJQO-u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100-3nNqj/FCnSvkOfogOhs9ijRdJCk\"",
		"mtime": "2026-08-15T18:36:09.881Z",
		"size": 256,
		"path": "../public/assets/eye-btBJQO-u.js"
	},
	"/assets/favorites-CoWeBn8_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b82-kXHTihiizRreGmHn8r63lk2Amqw\"",
		"mtime": "2026-08-15T18:36:09.881Z",
		"size": 2946,
		"path": "../public/assets/favorites-CoWeBn8_.js"
	},
	"/assets/flame-DbHt73Yn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c7-FGO9wkmqxJ5YJRmW/AJY54ujyrw\"",
		"mtime": "2026-08-15T18:36:09.881Z",
		"size": 199,
		"path": "../public/assets/flame-DbHt73Yn.js"
	},
	"/assets/folder-tree-DpOf1GO5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1df-IxneIzIY2+9q68bdB1dRtM18GYM\"",
		"mtime": "2026-08-15T18:36:09.881Z",
		"size": 479,
		"path": "../public/assets/folder-tree-DpOf1GO5.js"
	},
	"/assets/format-CYW_xdiT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b1-G10l8/x9mRib3XpXQqFI3TlxHy4\"",
		"mtime": "2026-08-15T18:36:09.881Z",
		"size": 177,
		"path": "../public/assets/format-CYW_xdiT.js"
	},
	"/assets/home-config-x-DggIaO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7df-SFFdntwZpfgT7LP7jH/6t6hKhCM\"",
		"mtime": "2026-08-15T18:36:09.881Z",
		"size": 2015,
		"path": "../public/assets/home-config-x-DggIaO.js"
	},
	"/assets/image-D-lNMpac.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10d-cLciIbciv4jOZdRfvFH+28A0aQc\"",
		"mtime": "2026-08-15T18:36:09.881Z",
		"size": 269,
		"path": "../public/assets/image-D-lNMpac.js"
	},
	"/assets/index-Io_QLHgu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6ea32-A+R09A5yGrK+tHXzQLbQGi9jUNw\"",
		"mtime": "2026-08-15T18:36:09.879Z",
		"size": 453170,
		"path": "../public/assets/index-Io_QLHgu.js"
	},
	"/assets/index.esm-CVjMrPB1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6fc3-mKUyYZ6cQ9q/794xHshI2hh/vVA\"",
		"mtime": "2026-08-15T18:36:09.881Z",
		"size": 28611,
		"path": "../public/assets/index.esm-CVjMrPB1.js"
	},
	"/assets/index.esm-Z2UCGr0V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4440-uLrpEQc+NwaIUfbct/iCT6MmG5Y\"",
		"mtime": "2026-08-15T18:36:09.881Z",
		"size": 17472,
		"path": "../public/assets/index.esm-Z2UCGr0V.js"
	},
	"/assets/index.esm-yl2r2RXh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13ccd-HdHQPmph5RB28ayMBE3sHWa2TMk\"",
		"mtime": "2026-08-15T18:36:09.881Z",
		"size": 81101,
		"path": "../public/assets/index.esm-yl2r2RXh.js"
	},
	"/assets/info-9r1nfKh8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cc-gF4q9mcxVlikIE3XkAGqtUCLlg0\"",
		"mtime": "2026-08-15T18:36:09.881Z",
		"size": 204,
		"path": "../public/assets/info-9r1nfKh8.js"
	},
	"/assets/layers-sKUIrNts.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a5-THRzSNWTv+Fyajhf1hkCPQqdwkI\"",
		"mtime": "2026-08-15T18:36:09.881Z",
		"size": 421,
		"path": "../public/assets/layers-sKUIrNts.js"
	},
	"/assets/layout-grid-D1eYRydS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15a-kBeTIsnBb6aq6JMgbjocdGPXXuQ\"",
		"mtime": "2026-08-15T18:36:09.881Z",
		"size": 346,
		"path": "../public/assets/layout-grid-D1eYRydS.js"
	},
	"/assets/link-BRwJjC8R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"53ae-vzKHLe0eQyL7KWZJalfPCnYnYso\"",
		"mtime": "2026-08-15T18:36:09.881Z",
		"size": 21422,
		"path": "../public/assets/link-BRwJjC8R.js"
	},
	"/assets/lock-DY9q7Zdn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ce-PMI389bhM6Hu71gvUDIHoEa7uFM\"",
		"mtime": "2026-08-15T18:36:09.881Z",
		"size": 206,
		"path": "../public/assets/lock-DY9q7Zdn.js"
	},
	"/assets/logistics-store-DhKXo8jD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7d8-YfC2x/Zo/4JRq3sXka3sL27G86g\"",
		"mtime": "2026-08-15T18:36:09.881Z",
		"size": 2008,
		"path": "../public/assets/logistics-store-DhKXo8jD.js"
	},
	"/assets/logotipo-BJ2lWMnX.webp": {
		"type": "image/webp",
		"etag": "\"1c700-hfa8Y9a9TMQJ+I/2wksM5NlkPJQ\"",
		"mtime": "2026-08-15T18:36:09.883Z",
		"size": 116480,
		"path": "../public/assets/logotipo-BJ2lWMnX.webp"
	},
	"/assets/mail-Cbg9Xqpo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-x3YDs1f4xiRt9LFahbcZ41zDVZI\"",
		"mtime": "2026-08-15T18:36:09.881Z",
		"size": 213,
		"path": "../public/assets/mail-Cbg9Xqpo.js"
	},
	"/assets/map-pin-C6mqjQGc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-sL6PyQ4lLzP22O1PKbMMDeJn51g\"",
		"mtime": "2026-08-15T18:36:09.881Z",
		"size": 259,
		"path": "../public/assets/map-pin-C6mqjQGc.js"
	},
	"/assets/me-wrQMWgoT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24c4-qGKGEhDKtLd+Ml+9PCo+gFtmBFc\"",
		"mtime": "2026-08-15T18:36:09.881Z",
		"size": 9412,
		"path": "../public/assets/me-wrQMWgoT.js"
	},
	"/assets/message-square-DcYrvzMm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-gPpzrLup6SlWEnlhQplVxPTS/GA\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 233,
		"path": "../public/assets/message-square-DcYrvzMm.js"
	},
	"/assets/not-found-i5RsCZif.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-Trmr7GZIBZuvfg4uM18tBiRtOXg\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 118,
		"path": "../public/assets/not-found-i5RsCZif.js"
	},
	"/assets/notifications-CbY52YFa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1456-nqt7djVnMJcY+RZAwFLtYM55sFI\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 5206,
		"path": "../public/assets/notifications-CbY52YFa.js"
	},
	"/assets/orders-BUXPP_X8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"529a-U6M0p3cM0fubmQ4QJDL735dexXw\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 21146,
		"path": "../public/assets/orders-BUXPP_X8.js"
	},
	"/assets/p-brushes-BdxdHdet.jpg": {
		"type": "image/jpeg",
		"etag": "\"12ca4-QEM7Pxib/X2lBQLJ3FZwFifHFbo\"",
		"mtime": "2026-08-15T18:36:09.883Z",
		"size": 76964,
		"path": "../public/assets/p-brushes-BdxdHdet.jpg"
	},
	"/assets/p-dress-BEbFKKeJ.jpg": {
		"type": "image/jpeg",
		"etag": "\"8b7f-xusMudTEekzqGEljjV1OStbMgsU\"",
		"mtime": "2026-08-15T18:36:09.883Z",
		"size": 35711,
		"path": "../public/assets/p-dress-BEbFKKeJ.jpg"
	},
	"/assets/p-cream-t29T4qSa.jpg": {
		"type": "image/jpeg",
		"etag": "\"7d1c-OF87WaSKzGYV4wll3FlG+reblzA\"",
		"mtime": "2026-08-15T18:36:09.883Z",
		"size": 32028,
		"path": "../public/assets/p-cream-t29T4qSa.jpg"
	},
	"/assets/p-jeans-BIj6CxYP.jpg": {
		"type": "image/jpeg",
		"etag": "\"23415-HTJ6loY6CPgdWI8ul1wq49eUCjw\"",
		"mtime": "2026-08-15T18:36:09.884Z",
		"size": 144405,
		"path": "../public/assets/p-jeans-BIj6CxYP.jpg"
	},
	"/assets/p-jumpsuit-BkhcJynf.jpg": {
		"type": "image/jpeg",
		"etag": "\"b652-llu0RjNBZpx6CW4FXmoJV0PCe2w\"",
		"mtime": "2026-08-15T18:36:09.884Z",
		"size": 46674,
		"path": "../public/assets/p-jumpsuit-BkhcJynf.jpg"
	},
	"/assets/p-knit-B1VN3gUH.jpg": {
		"type": "image/jpeg",
		"etag": "\"178e5-bp21sK1XIkX36dgMZsPUBpGG3/M\"",
		"mtime": "2026-08-15T18:36:09.884Z",
		"size": 96485,
		"path": "../public/assets/p-knit-B1VN3gUH.jpg"
	},
	"/assets/p-lipstick-CX6Dj8cF.jpg": {
		"type": "image/jpeg",
		"etag": "\"15b47-gxs0XoZAuNzHvPslCpXEq+DCAcU\"",
		"mtime": "2026-08-15T18:36:09.884Z",
		"size": 88903,
		"path": "../public/assets/p-lipstick-CX6Dj8cF.jpg"
	},
	"/assets/p-pants-w2etJJsJ.jpg": {
		"type": "image/jpeg",
		"etag": "\"ad98-TgL+g++/aInC8NKn0yV9gtipSJ0\"",
		"mtime": "2026-08-15T18:36:09.884Z",
		"size": 44440,
		"path": "../public/assets/p-pants-w2etJJsJ.jpg"
	},
	"/assets/p-perfume-BnxGlR6I.jpg": {
		"type": "image/jpeg",
		"etag": "\"c4e5-FHYORWvyQw9GRTCgnSCkkTb5BsQ\"",
		"mtime": "2026-08-15T18:36:09.884Z",
		"size": 50405,
		"path": "../public/assets/p-perfume-BnxGlR6I.jpg"
	},
	"/assets/p-reddress-BngZqOK1.jpg": {
		"type": "image/jpeg",
		"etag": "\"ae1f-EopdjO+URdpSyHI4ZpN3YJ6tGj0\"",
		"mtime": "2026-08-15T18:36:09.884Z",
		"size": 44575,
		"path": "../public/assets/p-reddress-BngZqOK1.jpg"
	},
	"/assets/p-skirt-DNF_I8F3.jpg": {
		"type": "image/jpeg",
		"etag": "\"8b75-7lpHtIZ7XyMgHLrwrwDukBIPnGs\"",
		"mtime": "2026-08-15T18:36:09.884Z",
		"size": 35701,
		"path": "../public/assets/p-skirt-DNF_I8F3.jpg"
	},
	"/assets/p-swim-9aOCY719.jpg": {
		"type": "image/jpeg",
		"etag": "\"f963-+F35GN6hkofO+2LKZ/nR/wRC6fM\"",
		"mtime": "2026-08-15T18:36:09.884Z",
		"size": 63843,
		"path": "../public/assets/p-swim-9aOCY719.jpg"
	},
	"/assets/p-tank-DYSgLGey.jpg": {
		"type": "image/jpeg",
		"etag": "\"102a0-8UKqAkGsFC7tn5V4uyafssb8d88\"",
		"mtime": "2026-08-15T18:36:09.884Z",
		"size": 66208,
		"path": "../public/assets/p-tank-DYSgLGey.jpg"
	},
	"/assets/p-top-BTKTbnRS.jpg": {
		"type": "image/jpeg",
		"etag": "\"d291-bFerBrwW3D5Spjqlsv3DtjgOqeg\"",
		"mtime": "2026-08-15T18:36:09.884Z",
		"size": 53905,
		"path": "../public/assets/p-top-BTKTbnRS.jpg"
	},
	"/assets/package-CBeDJ4Sv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"174-gnilbzb7pwtarW10b09b3v8jClU\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 372,
		"path": "../public/assets/package-CBeDJ4Sv.js"
	},
	"/assets/pay-express.jpg.asset-Cyk8AYll.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33c-YsNAiUCenUU9xbjiEN2Uf6Tv/wI\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 828,
		"path": "../public/assets/pay-express.jpg.asset-Cyk8AYll.js"
	},
	"/assets/payments-store-xDI1ZkfY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99f-ucRVQf0HpqXiQGI3+XLqnwcD0+U\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 2463,
		"path": "../public/assets/payments-store-xDI1ZkfY.js"
	},
	"/assets/pay._method-BG_igi9U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3052-WSiZXxhfi3mVudzd0hwTJGsr3Uc\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 12370,
		"path": "../public/assets/pay._method-BG_igi9U.js"
	},
	"/assets/pencil-Ce_zgDGo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"114-j0YXPdWv9PfdFfNqqYve08jZsE8\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 276,
		"path": "../public/assets/pencil-Ce_zgDGo.js"
	},
	"/assets/pending-payment-CjTbbZwJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"181-5aYgCRh+5tLa1Kl8HmV93vGWeM0\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 385,
		"path": "../public/assets/pending-payment-CjTbbZwJ.js"
	},
	"/assets/plus-CsFklqLM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-hV1ZU//qKDkNfMVQj6KE+nM11Io\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 153,
		"path": "../public/assets/plus-CsFklqLM.js"
	},
	"/assets/points-cm3zK7bn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13e6-J4ukRvuuNGzJkAzbISZmE1fLFoY\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 5094,
		"path": "../public/assets/points-cm3zK7bn.js"
	},
	"/assets/privacidade-D1ecMbdk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"282c-r6ku7zjOs1IbKOK+lrpIl7Q2Qfo\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 10284,
		"path": "../public/assets/privacidade-D1ecMbdk.js"
	},
	"/assets/product._id-BFrXBJ5p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f2-bDsoImVB/F35FMjXEQLQnoKHoho\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 242,
		"path": "../public/assets/product._id-BFrXBJ5p.js"
	},
	"/assets/product._id-BMuo4-9W.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"108-pfr9t75HlFygaz4n/UDs8Yh1w/I\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 264,
		"path": "../public/assets/product._id-BMuo4-9W.js"
	},
	"/assets/product._id-BjiaJ4OQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a34-E3OT752fkO01xJkv+fPjpizxDe8\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 27188,
		"path": "../public/assets/product._id-BjiaJ4OQ.js"
	},
	"/assets/promo-1-D9QBnF1Y.png": {
		"type": "image/png",
		"etag": "\"5c5d7-jgaByYJZ7VuNG4j6B9aQDUG3WUA\"",
		"mtime": "2026-08-15T18:36:09.884Z",
		"size": 378327,
		"path": "../public/assets/promo-1-D9QBnF1Y.png"
	},
	"/assets/promo-2-djOW7yEW.png": {
		"type": "image/png",
		"etag": "\"6be5d-obj99+iBJlyAl1e8ohm/6uGppF4\"",
		"mtime": "2026-08-15T18:36:09.884Z",
		"size": 441949,
		"path": "../public/assets/promo-2-djOW7yEW.png"
	},
	"/assets/promo-3-Ddu1tsCS.png": {
		"type": "image/png",
		"etag": "\"3c903-jvRqSVXnhNZpruPkxbj6Jbjs8vA\"",
		"mtime": "2026-08-15T18:36:09.885Z",
		"size": 248067,
		"path": "../public/assets/promo-3-Ddu1tsCS.png"
	},
	"/assets/react-SIfiwpqq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ff9-FGVdof4/lFGmrdRsB9EIvuwBlYc\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 8185,
		"path": "../public/assets/react-SIfiwpqq.js"
	},
	"/assets/revenue-lZKxm0Wn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2fa-4/vWIa3UPHZ0mOo6o0HRXMsRrb8\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 762,
		"path": "../public/assets/revenue-lZKxm0Wn.js"
	},
	"/assets/reviews-BL_0UeDc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3a2-KRSH3voqjytPL2QwAJwirfd16Ek\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 930,
		"path": "../public/assets/reviews-BL_0UeDc.js"
	},
	"/assets/roles-CawZpz5D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5f2-75sHGcc6up3pHDIUPnL4yudABHM\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 1522,
		"path": "../public/assets/roles-CawZpz5D.js"
	},
	"/assets/root-DLTE-HSj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20-vSYConOtSP6ciwr9zKsPixNwWmc\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 32,
		"path": "../public/assets/root-DLTE-HSj.js"
	},
	"/assets/rotate-ccw-DjyDNOwP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c8-DPGJLCZ7OBGOoyvAr0ExEg8iCyI\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 200,
		"path": "../public/assets/rotate-ccw-DjyDNOwP.js"
	},
	"/assets/routes-0swOKkkQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ce0-4Zjlnw+MAtaO2719hcghufVCdrQ\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 15584,
		"path": "../public/assets/routes-0swOKkkQ.js"
	},
	"/assets/search-CzMGmf7M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-b9y6AXI3WU49XAW6vzxNX+9hJAk\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 174,
		"path": "../public/assets/search-CzMGmf7M.js"
	},
	"/assets/send-BAYOjIfJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"190-g8/O5Y8q5nANIae2iQKUUfKoWL4\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 400,
		"path": "../public/assets/send-BAYOjIfJ.js"
	},
	"/assets/send-DCFGnZqu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1de-oNrZCmEQ/zK54Axy+adruAdikp8\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 478,
		"path": "../public/assets/send-DCFGnZqu.js"
	},
	"/assets/settings-BJWQXYoL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27ca-FY8i19ONLq0F4QRCE8ZVE1rO6vU\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 10186,
		"path": "../public/assets/settings-BJWQXYoL.js"
	},
	"/assets/settings-Ed1kAGr7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6f3-EboJJ2b21iHoa4eJGj48PAI34jI\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 1779,
		"path": "../public/assets/settings-Ed1kAGr7.js"
	},
	"/assets/share-2-CcqjdWpJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"165-QDmsr1TmhtKuw2U4e493BS0yS7g\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 357,
		"path": "../public/assets/share-2-CcqjdWpJ.js"
	},
	"/assets/shield-check-B3PmHBMY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-G33KRg9KT60ucl9G/TtXATi40Ns\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 320,
		"path": "../public/assets/shield-check-B3PmHBMY.js"
	},
	"/assets/shop._id-C4BbOX4T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ee-E+xwv1qJq7Z1wD3CBYhujYJqyf4\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 238,
		"path": "../public/assets/shop._id-C4BbOX4T.js"
	},
	"/assets/shop._id-bGRUpWLU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15ef-LGfeFs/syJp3zUo+eLcavH+6n5U\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 5615,
		"path": "../public/assets/shop._id-bGRUpWLU.js"
	},
	"/assets/shopping-bag-wN4xsTXd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"154-tWGIP3GN/lxEepwn9Jj3DDP4Gyc\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 340,
		"path": "../public/assets/shopping-bag-wN4xsTXd.js"
	},
	"/assets/site-CES1ZCO5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1aa-5dzO14u61x6L9BognrTXns2ChPU\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 426,
		"path": "../public/assets/site-CES1ZCO5.js"
	},
	"/assets/sliders-horizontal-AhCtpuXs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c3-AENPeABu4ynN89rMt2ndKYd6jeY\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 707,
		"path": "../public/assets/sliders-horizontal-AhCtpuXs.js"
	},
	"/assets/sparkles-USJV5op3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-8Cue5x6m3xDHvPVgMMegQ1Hxrmg\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 494,
		"path": "../public/assets/sparkles-USJV5op3.js"
	},
	"/assets/star-CYIcROk7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d8-CAGMcBuAXcdSdd1ngXKmc3CYgrk\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 472,
		"path": "../public/assets/star-CYIcROk7.js"
	},
	"/assets/store-BPHnSeEG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f2-7DjxDcYbVWyOI525/S93wYQ1Tuw\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 498,
		"path": "../public/assets/store-BPHnSeEG.js"
	},
	"/assets/store-CNob65OE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"be8-b8+BU3M80hIwOIjRRm5yh+xAG54\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 3048,
		"path": "../public/assets/store-CNob65OE.js"
	},
	"/assets/styles-d63AzDbD.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"24fc5-HmhW8mhGkoRwtg5S06zxe+zcLEA\"",
		"mtime": "2026-08-15T18:36:09.885Z",
		"size": 151493,
		"path": "../public/assets/styles-d63AzDbD.css"
	},
	"/assets/super-ofertas-C-S-v837.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"529-7p0h7niInl/tQ+PgWskUHcrfUoE\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 1321,
		"path": "../public/assets/super-ofertas-C-S-v837.js"
	},
	"/assets/support-DKSuqd8x.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3b0e-nyFKn2Srr5nRu37usDJPaE9FAds\"",
		"mtime": "2026-08-15T18:36:09.882Z",
		"size": 15118,
		"path": "../public/assets/support-DKSuqd8x.js"
	},
	"/assets/target-CBRGy9km.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e2-t3Sn5kCdbBtiqBWGg3xx+H8JwHo\"",
		"mtime": "2026-08-15T18:36:09.883Z",
		"size": 226,
		"path": "../public/assets/target-CBRGy9km.js"
	},
	"/assets/sync-store-KuMTKe2X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4bc-hfnY+deYo4a3Gsqbszp5PhbNckw\"",
		"mtime": "2026-08-15T18:36:09.883Z",
		"size": 1212,
		"path": "../public/assets/sync-store-KuMTKe2X.js"
	},
	"/assets/termos-C4XFE_0C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"31b9-Gu5u4+D50i4Fb8pdHai9uMLZo2g\"",
		"mtime": "2026-08-15T18:36:09.883Z",
		"size": 12729,
		"path": "../public/assets/termos-C4XFE_0C.js"
	},
	"/assets/ticket-BiNpThdz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-xN89hCgQihvZy3O5LFOZhNcbbuo\"",
		"mtime": "2026-08-15T18:36:09.883Z",
		"size": 321,
		"path": "../public/assets/ticket-BiNpThdz.js"
	},
	"/assets/trash-2-D9ykOZrd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-SFufvwScaqfz7pcnb2UUn3FfGKk\"",
		"mtime": "2026-08-15T18:36:09.883Z",
		"size": 328,
		"path": "../public/assets/trash-2-D9ykOZrd.js"
	},
	"/assets/trending-up-B6Edyn1q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"af-ZcD8ymo8T8OMoVkfzimNFhXKuIY\"",
		"mtime": "2026-08-15T18:36:09.883Z",
		"size": 175,
		"path": "../public/assets/trending-up-B6Edyn1q.js"
	},
	"/assets/triangle-alert-FTKqut9w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109-OpU+dqUqLnrikxh4aRCiuvoiOrA\"",
		"mtime": "2026-08-15T18:36:09.883Z",
		"size": 265,
		"path": "../public/assets/triangle-alert-FTKqut9w.js"
	},
	"/assets/trocas-devolucoes-CEDCfSXR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22df-p7jMV42HjSm8+za2Qk9VvFlc/Ks\"",
		"mtime": "2026-08-15T18:36:09.883Z",
		"size": 8927,
		"path": "../public/assets/trocas-devolucoes-CEDCfSXR.js"
	},
	"/assets/truck-CyWOy9Pq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"196-uGkug4CZttLs7NFYlEME1CCeoDU\"",
		"mtime": "2026-08-15T18:36:09.883Z",
		"size": 406,
		"path": "../public/assets/truck-CyWOy9Pq.js"
	},
	"/assets/undo-2-Dz34a5Qr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d0-+JX2jz9JFkOkKTnnSwRaYZYKoo8\"",
		"mtime": "2026-08-15T18:36:09.883Z",
		"size": 208,
		"path": "../public/assets/undo-2-Dz34a5Qr.js"
	},
	"/assets/upload-Bu0ZLLve.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a2-iA4WkEK8XA2vzw2N5GCBFS73nVs\"",
		"mtime": "2026-08-15T18:36:09.883Z",
		"size": 2466,
		"path": "../public/assets/upload-Bu0ZLLve.js"
	},
	"/assets/useMatch-jXdJqwBT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"213-aSJ13rbYrtFcQzhhafKeJby/E9A\"",
		"mtime": "2026-08-15T18:36:09.883Z",
		"size": 531,
		"path": "../public/assets/useMatch-jXdJqwBT.js"
	},
	"/assets/user-plus-HbfwRcYz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-AQDJ12q23Dnf5CGOnaVrhifxSio\"",
		"mtime": "2026-08-15T18:36:09.883Z",
		"size": 310,
		"path": "../public/assets/user-plus-HbfwRcYz.js"
	},
	"/assets/users-C-3GO8qD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-2Etv51zCmy57gDoatAApaFJa9Vk\"",
		"mtime": "2026-08-15T18:36:09.883Z",
		"size": 306,
		"path": "../public/assets/users-C-3GO8qD.js"
	},
	"/assets/wallet-B1Rcb-Ud.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11e-pcmmlXiLgPvRoVEYKUoKffKeTQM\"",
		"mtime": "2026-08-15T18:36:09.883Z",
		"size": 286,
		"path": "../public/assets/wallet-B1Rcb-Ud.js"
	},
	"/assets/wallet-DEDddFyi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15c1-cFQmVYleFjWI+434/O+6bHR2Dwo\"",
		"mtime": "2026-08-15T18:36:09.883Z",
		"size": 5569,
		"path": "../public/assets/wallet-DEDddFyi.js"
	},
	"/assets/x-B2FTZ7Vt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-YzY9+adS4NM8VvQ9ImCQoQFBfkc\"",
		"mtime": "2026-08-15T18:36:09.883Z",
		"size": 154,
		"path": "../public/assets/x-B2FTZ7Vt.js"
	},
	"/assets/zap-bFH_IeqZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"106-o1zlUbhJe/IP+W3bfjkTqsG2slY\"",
		"mtime": "2026-08-15T18:36:09.883Z",
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
var _lazy_BFbasc = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_BFbasc
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
