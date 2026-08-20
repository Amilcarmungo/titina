import { n as __exportAll } from "../_runtime.mjs";
import { a as setUserProperties, i as logEvent, n as initializeAnalytics, p as registerVersion, r as isSupported, t as getAnalytics } from "./@firebase/analytics+[...].mjs";
import { c as linkWithPopup } from "./firebase__auth.mjs";
import "./@firebase/firestore+[...].mjs";
import "./firebase__storage.mjs";
//#region node_modules/firebase/app/dist/esm/index.esm.js
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
registerVersion("firebase", "12.17.1", "app");
//#endregion
//#region node_modules/firebase/auth/dist/esm/index.esm.js
var index_esm_exports$1 = /* @__PURE__ */ __exportAll({ linkWithPopup: () => linkWithPopup });
//#endregion
//#region node_modules/firebase/analytics/dist/esm/index.esm.js
var index_esm_exports = /* @__PURE__ */ __exportAll({
	getAnalytics: () => getAnalytics,
	initializeAnalytics: () => initializeAnalytics,
	isSupported: () => isSupported,
	logEvent: () => logEvent,
	setUserProperties: () => setUserProperties
});
//#endregion
export { index_esm_exports$1 as n, index_esm_exports as t };
