var e={};
/**
 * @license
 * Copyright 2017 Google LLC
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
 */const t=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let s=e.charCodeAt(r);s<128?t[n++]=s:s<2048?(t[n++]=s>>6|192,t[n++]=63&s|128):55296==(64512&s)&&r+1<e.length&&56320==(64512&e.charCodeAt(r+1))?(s=65536+((1023&s)<<10)+(1023&e.charCodeAt(++r)),t[n++]=s>>18|240,t[n++]=s>>12&63|128,t[n++]=s>>6&63|128,t[n++]=63&s|128):(t[n++]=s>>12|224,t[n++]=s>>6&63|128,t[n++]=63&s|128)}return t},n={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<e.length;s+=3){const t=e[s],i=s+1<e.length,o=i?e[s+1]:0,a=s+2<e.length,c=a?e[s+2]:0,u=t>>2,h=(3&t)<<4|o>>4;let l=(15&o)<<2|c>>6,d=63&c;a||(d=64,i||(l=64)),r.push(n[u],n[h],n[l],n[d])}return r.join("")},encodeString(e,n){return this.HAS_NATIVE_SUPPORT&&!n?btoa(e):this.encodeByteArray(t(e),n)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let n=0,r=0;for(;n<e.length;){const s=e[n++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=e[n++];t[r++]=String.fromCharCode((31&s)<<6|63&i)}else if(s>239&&s<365){const i=((7&s)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[r++]=String.fromCharCode(55296+(i>>10)),t[r++]=String.fromCharCode(56320+(1023&i))}else{const i=e[n++],o=e[n++];t[r++]=String.fromCharCode((15&s)<<12|(63&i)<<6|63&o)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<e.length;){const t=n[e.charAt(i++)],o=i<e.length?n[e.charAt(i)]:0;++i;const a=i<e.length?n[e.charAt(i)]:64;++i;const c=i<e.length?n[e.charAt(i)]:64;if(++i,null==t||null==o||null==a||null==c)throw new r;const u=t<<2|o>>4;if(s.push(u),64!==a){const e=o<<4&240|a>>2;if(s.push(e),64!==c){const e=a<<6&192|c;s.push(e)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class r extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const s=function(e){return function(e){const r=t(e);return n.encodeByteArray(r,!0)}(e).replace(/\./g,"")},i=function(e){try{return n.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};
/**
 * @license
 * Copyright 2022 Google LLC
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
const o=()=>
/**
 * @license
 * Copyright 2022 Google LLC
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
function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}().__FIREBASE_DEFAULTS__,a=()=>{try{return o()||(()=>{if("undefined"==typeof process)return;const t=e.__FIREBASE_DEFAULTS__;return t?JSON.parse(t):void 0})()||(()=>{if("undefined"==typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(n){return}const t=e&&i(e[1]);return t&&JSON.parse(t)})()}catch(t){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`)}},c=e=>{var t,n;return null==(n=null==(t=a())?void 0:t.emulatorHosts)?void 0:n[e]},u=e=>{const t=c(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),r]:[t.substring(0,n),r]},h=()=>{var e;return null==(e=a())?void 0:e.config},l=e=>{var t;return null==(t=a())?void 0:t[`_${e}`]};
/**
 * @license
 * Copyright 2017 Google LLC
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
class d{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,n))}}}
/**
 * @license
 * Copyright 2025 Google LLC
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
 */function f(e){try{return(e.startsWith("http://")||e.startsWith("https://")?new URL(e).hostname:e).endsWith(".cloudworkstations.dev")}catch{return!1}}async function p(e){return(await fetch(e,{credentials:"include"})).ok}
/**
 * @license
 * Copyright 2021 Google LLC
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
 */function m(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=t||"demo-project",r=e.iat||0,i=e.sub||e.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${n}`,aud:n,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...e};return[s(JSON.stringify({alg:"none",type:"JWT"})),s(JSON.stringify(o)),""].join(".")}const g={};let y=!1;function v(e,t){if("undefined"==typeof window||"undefined"==typeof document||!f(window.location.host)||g[e]===t||g[e]||y)return;function n(e){return`__firebase__banner__${e}`}g[e]=t;const r="__firebase__banner",s=function(){const e={prod:[],emulator:[]};for(const t of Object.keys(g))g[t]?e.emulator.push(t):e.prod.push(t);return e}().prod.length>0;function i(){const e=document.createElement("span");return e.style.cursor="pointer",e.style.marginLeft="16px",e.style.fontSize="24px",e.innerHTML=" &times;",e.onclick=()=>{y=!0,function(){const e=document.getElementById(r);e&&e.remove()}()},e}function o(){const e=function(e){let t=document.getElementById(e),n=!1;return t||(t=document.createElement("div"),t.setAttribute("id",e),n=!0),{created:n,element:t}}(r),t=n("text"),o=document.getElementById(t)||document.createElement("span"),a=n("learnmore"),c=document.getElementById(a)||document.createElement("a"),u=n("preprendIcon"),h=document.getElementById(u)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(e.created){const t=e.element;!function(e){e.style.display="flex",e.style.background="#7faaf0",e.style.position="fixed",e.style.bottom="5px",e.style.left="5px",e.style.padding=".5em",e.style.borderRadius="5px",e.style.alignItems="center"}(t),function(e,t){e.setAttribute("id",t),e.innerText="Learn more",e.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",e.setAttribute("target","__blank"),e.style.paddingLeft="5px",e.style.textDecoration="underline"}(c,a);const n=i();!function(e,t){e.setAttribute("width","24"),e.setAttribute("id",t),e.setAttribute("height","24"),e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.style.marginLeft="-6px"}(h,u),t.append(h,o,c,n),document.body.appendChild(t)}s?(o.innerText="Preview backend disconnected.",h.innerHTML='<g clip-path="url(#clip0_6013_33858)">\n<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6013_33858">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>'):(h.innerHTML='<g clip-path="url(#clip0_6083_34804)">\n<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6083_34804">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>',o.innerText="Preview backend running in this workspace."),o.setAttribute("id",t)}"loading"===document.readyState?window.addEventListener("DOMContentLoaded",o):o()}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */function w(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function _(){return!function(){var e;const t=null==(e=a())?void 0:e.forceEnvironment;if("node"===t)return!0;if("browser"===t)return!1;try{return"[object process]"===Object.prototype.toString.call(global.process)}catch(n){return!1}}()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}class E extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,E.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,T.prototype.create)}}class T{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},r=`${this.service}/${e}`,s=this.errors[e],i=s?function(e,t){return e.replace(I,(e,n)=>{const r=t[n];return null!=r?String(r):`<${n}?>`})}(s,n):"Error",o=`${this.serviceName}: ${i} (${r}).`;return new E(r,o,n)}}const I=/\{\$([^}]+)}/g;function b(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const s of n){if(!r.includes(s))return!1;const n=e[s],i=t[s];if(S(n)&&S(i)){if(!b(n,i))return!1}else if(n!==i)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function S(e){return null!==e&&"object"==typeof e}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */function C(e){const t=[];for(const[n,r]of Object.entries(e))Array.isArray(r)?r.forEach(e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function A(e){const t={};return e.replace(/^\?/,"").split("&").forEach(e=>{if(e){const[n,r]=e.split("=");t[decodeURIComponent(n)]=decodeURIComponent(r)}}),t}function k(e){const t=e.indexOf("?");if(!t)return"";const n=e.indexOf("#",t);return e.substring(t,n>0?n:void 0)}class N{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let r;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");r=function(e,t){if("object"!=typeof e||null===e)return!1;for(const n of t)if(n in e&&"function"==typeof e[n])return!0;return!1}(e,["next","error","complete"])?e:{next:e,error:t,complete:n},void 0===r.next&&(r.next=R),void 0===r.error&&(r.error=R),void 0===r.complete&&(r.complete=R);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch(e){}}),this.observers.push(r),s}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(n){"undefined"!=typeof console&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function R(){}
/**
 * @license
 * Copyright 2021 Google LLC
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
 */function D(e){return e&&e._delegate?e._delegate:e}class O{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}
/**
 * @license
 * Copyright 2019 Google LLC
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
 */const P="[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
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
 */class L{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new d;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(n){}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),n=(null==e?void 0:e.optional)??!1;if(!this.isInitialized(t)&&!this.shouldAutoInitialize()){if(n)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:t})}catch(r){if(n)return null;throw r}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}
/**
 * @license
 * Copyright 2019 Google LLC
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
 */(e))try{this.getOrInitializeService({instanceIdentifier:P})}catch(t){}for(const[e,n]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:r});n.resolve(e)}catch(t){}}}}clearInstance(e=P){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=P){return this.instances.has(e)}getOptions(e=P){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[s,i]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(s)&&i.resolve(r)}return r}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),r=this.onInitCallbacks.get(n)??new Set;r.add(e),this.onInitCallbacks.set(n,r);const s=this.instances.get(n);return s&&e(s,n),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const r of n)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(r=e,r===P?void 0:r),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}var r;return n||null}normalizeInstanceIdentifier(e=P){return this.component?this.component.multipleInstances?e:P:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class M{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new L(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */var x,U;(U=x||(x={}))[U.DEBUG=0]="DEBUG",U[U.VERBOSE=1]="VERBOSE",U[U.INFO=2]="INFO",U[U.WARN=3]="WARN",U[U.ERROR=4]="ERROR",U[U.SILENT=5]="SILENT";const V={debug:x.DEBUG,verbose:x.VERBOSE,info:x.INFO,warn:x.WARN,error:x.ERROR,silent:x.SILENT},F=x.INFO,j={[x.DEBUG]:"log",[x.VERBOSE]:"log",[x.INFO]:"info",[x.WARN]:"warn",[x.ERROR]:"error"},B=(e,t,...n)=>{if(t<e.logLevel)return;const r=(new Date).toISOString(),s=j[t];if(!s)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[s](`[${r}]  ${e.name}:`,...n)};class q{constructor(e){this.name=e,this._logLevel=F,this._logHandler=B,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in x))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?V[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,x.DEBUG,...e),this._logHandler(this,x.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,x.VERBOSE,...e),this._logHandler(this,x.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,x.INFO,...e),this._logHandler(this,x.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,x.WARN,...e),this._logHandler(this,x.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,x.ERROR,...e),this._logHandler(this,x.ERROR,...e)}}let $,z;const H=new WeakMap,G=new WeakMap,K=new WeakMap,W=new WeakMap,Q=new WeakMap;let X={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return G.get(e);if("objectStoreNames"===t)return e.objectStoreNames||K.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Z(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function Y(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(z||(z=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(ee(this),t),Z(H.get(this))}:function(...t){return Z(e.apply(ee(this),t))}:function(t,...n){const r=e.call(ee(this),t,...n);return K.set(r,t.sort?t.sort():[t]),Z(r)}}function J(e){return"function"==typeof e?Y(e):(e instanceof IDBTransaction&&function(e){if(G.has(e))return;const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("complete",s),e.removeEventListener("error",i),e.removeEventListener("abort",i)},s=()=>{t(),r()},i=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",s),e.addEventListener("error",i),e.addEventListener("abort",i)});G.set(e,t)}(e),t=e,($||($=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some(e=>t instanceof e)?new Proxy(e,X):e);var t}function Z(e){if(e instanceof IDBRequest)return function(e){const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("success",s),e.removeEventListener("error",i)},s=()=>{t(Z(e.result)),r()},i=()=>{n(e.error),r()};e.addEventListener("success",s),e.addEventListener("error",i)});return t.then(t=>{t instanceof IDBCursor&&H.set(t,e)}).catch(()=>{}),Q.set(t,e),t}(e);if(W.has(e))return W.get(e);const t=J(e);return t!==e&&(W.set(e,t),Q.set(t,e)),t}const ee=e=>Q.get(e);const te=["get","getKey","getAll","getAllKeys","count"],ne=["put","add","delete","clear"],re=new Map;function se(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(re.get(t))return re.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,s=ne.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!s&&!te.includes(n))return;const i=async function(e,...t){const i=this.transaction(e,s?"readwrite":"readonly");let o=i.store;return r&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),s&&i.done]))[0]};return re.set(t,i),i}X=(e=>({...e,get:(t,n,r)=>se(t,n)||e.get(t,n,r),has:(t,n)=>!!se(t,n)||e.has(t,n)}))(X);
/**
 * @license
 * Copyright 2019 Google LLC
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
class ie{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(function(e){const t=e.getComponent();return"VERSION"===(null==t?void 0:t.type)}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null}).filter(e=>e).join(" ")}}const oe="@firebase/app",ae="0.14.6",ce=new q("@firebase/app"),ue="@firebase/app-compat",he="@firebase/analytics-compat",le="@firebase/analytics",de="@firebase/app-check-compat",fe="@firebase/app-check",pe="@firebase/auth",me="@firebase/auth-compat",ge="@firebase/database",ye="@firebase/data-connect",ve="@firebase/database-compat",we="@firebase/functions",_e="@firebase/functions-compat",Ee="@firebase/installations",Te="@firebase/installations-compat",Ie="@firebase/messaging",be="@firebase/messaging-compat",Se="@firebase/performance",Ce="@firebase/performance-compat",Ae="@firebase/remote-config",ke="@firebase/remote-config-compat",Ne="@firebase/storage",Re="@firebase/storage-compat",De="@firebase/firestore",Oe="@firebase/ai",Pe="@firebase/firestore-compat",Le="firebase",Me="[DEFAULT]",xe={[oe]:"fire-core",[ue]:"fire-core-compat",[le]:"fire-analytics",[he]:"fire-analytics-compat",[fe]:"fire-app-check",[de]:"fire-app-check-compat",[pe]:"fire-auth",[me]:"fire-auth-compat",[ge]:"fire-rtdb",[ye]:"fire-data-connect",[ve]:"fire-rtdb-compat",[we]:"fire-fn",[_e]:"fire-fn-compat",[Ee]:"fire-iid",[Te]:"fire-iid-compat",[Ie]:"fire-fcm",[be]:"fire-fcm-compat",[Se]:"fire-perf",[Ce]:"fire-perf-compat",[Ae]:"fire-rc",[ke]:"fire-rc-compat",[Ne]:"fire-gcs",[Re]:"fire-gcs-compat",[De]:"fire-fst",[Pe]:"fire-fst-compat",[Oe]:"fire-vertex","fire-js":"fire-js",[Le]:"fire-js-all"},Ue=new Map,Ve=new Map,Fe=new Map;function je(e,t){try{e.container.addComponent(t)}catch(n){ce.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function Be(e){const t=e.name;if(Fe.has(t))return ce.debug(`There were multiple attempts to register component ${t}.`),!1;Fe.set(t,e);for(const n of Ue.values())je(n,e);for(const n of Ve.values())je(n,e);return!0}function qe(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function $e(e){return null!=e&&void 0!==e.settings}
/**
 * @license
 * Copyright 2019 Google LLC
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
 */const ze=new T("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});
/**
 * @license
 * Copyright 2019 Google LLC
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
class He{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new O("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ze.create("app-deleted",{appName:this._name})}}
/**
 * @license
 * Copyright 2019 Google LLC
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
 */const Ge="12.6.0";function Ke(e,t={}){let n=e;if("object"!=typeof t){t={name:t}}const r={name:Me,automaticDataCollectionEnabled:!0,...t},s=r.name;if("string"!=typeof s||!s)throw ze.create("bad-app-name",{appName:String(s)});if(n||(n=h()),!n)throw ze.create("no-options");const i=Ue.get(s);if(i){if(b(n,i.options)&&b(r,i.config))return i;throw ze.create("duplicate-app",{appName:s})}const o=new M(s);for(const c of Fe.values())o.addComponent(c);const a=new He(n,r,o);return Ue.set(s,a),a}function We(e=Me){const t=Ue.get(e);if(!t&&e===Me&&h())return Ke();if(!t)throw ze.create("no-app",{appName:e});return t}function Qe(e,t,n){let r=xe[e]??e;n&&(r+=`-${n}`);const s=r.match(/\s|\//),i=t.match(/\s|\//);if(s||i){const e=[`Unable to register library "${r}" with version "${t}":`];return s&&e.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&e.push("and"),i&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void ce.warn(e.join(" "))}Be(new O(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}
/**
 * @license
 * Copyright 2021 Google LLC
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
 */const Xe="firebase-heartbeat-store";let Ye=null;function Je(){return Ye||(Ye=function(e,t,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(e,t),a=Z(o);return r&&o.addEventListener("upgradeneeded",e=>{r(Z(o.result),e.oldVersion,e.newVersion,Z(o.transaction),e)}),n&&o.addEventListener("blocked",e=>n(e.oldVersion,e.newVersion,e)),a.then(e=>{i&&e.addEventListener("close",()=>i()),s&&e.addEventListener("versionchange",e=>s(e.oldVersion,e.newVersion,e))}).catch(()=>{}),a}("firebase-heartbeat-database",1,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore(Xe)}catch(n){console.warn(n)}}}).catch(e=>{throw ze.create("idb-open",{originalErrorMessage:e.message})})),Ye}async function Ze(e,t){try{const n=(await Je()).transaction(Xe,"readwrite"),r=n.objectStore(Xe);await r.put(t,et(e)),await n.done}catch(n){if(n instanceof E)ce.warn(n.message);else{const e=ze.create("idb-set",{originalErrorMessage:null==n?void 0:n.message});ce.warn(e.message)}}}function et(e){return`${e.name}!${e.options.appId}`}
/**
 * @license
 * Copyright 2021 Google LLC
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
 */class tt{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new rt(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){var e,t;try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=nt();if(null==(null==(e=this._heartbeatsCache)?void 0:e.heartbeats)&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==(null==(t=this._heartbeatsCache)?void 0:t.heartbeats)))return;if(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(e=>e.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats.length>30){const e=function(e){if(0===e.length)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}
/**
 * @license
 * Copyright 2019 Google LLC
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
 */(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(e,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){ce.warn(n)}}async getHeartbeatsHeader(){var e;try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==(null==(e=this._heartbeatsCache)?void 0:e.heartbeats)||0===this._heartbeatsCache.heartbeats.length)return"";const t=nt(),{heartbeatsToSend:n,unsentEntries:r}=function(e,t=1024){const n=[];let r=e.slice();for(const s of e){const e=n.find(e=>e.agent===s.agent);if(e){if(e.dates.push(s.date),st(n)>t){e.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),st(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}(this._heartbeatsCache.heartbeats),i=s(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return ce.warn(t),""}}}function nt(){return(new Date).toISOString().substring(0,10)}class rt{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!function(){try{return"object"==typeof indexedDB}catch(e){return!1}}()&&new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var e;t((null==(e=s.error)?void 0:e.message)||"")}}catch(n){t(n)}}).then(()=>!0).catch(()=>!1)}async read(){if(await this._canUseIndexedDBPromise){const e=await async function(e){try{const t=(await Je()).transaction(Xe),n=await t.objectStore(Xe).get(et(e));return await t.done,n}catch(t){if(t instanceof E)ce.warn(t.message);else{const e=ze.create("idb-get",{originalErrorMessage:null==t?void 0:t.message});ce.warn(e.message)}}}(this.app);return(null==e?void 0:e.heartbeats)?e:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return Ze(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return Ze(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:[...t.heartbeats,...e.heartbeats]})}}}function st(e){return s(JSON.stringify({version:2,heartbeats:e})).length}var it;function ot(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}it="",Be(new O("platform-logger",e=>new ie(e),"PRIVATE")),Be(new O("heartbeat",e=>new tt(e),"PRIVATE")),Qe(oe,ae,it),Qe(oe,ae,"esm2020"),Qe("fire-js","");const at=ot,ct=new T("auth","Firebase",{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}),ut=new q("@firebase/auth");function ht(e,...t){ut.logLevel<=x.ERROR&&ut.error(`Auth (${Ge}): ${e}`,...t)}
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
 */function lt(e,...t){throw mt(e,...t)}function dt(e,...t){return mt(e,...t)}function ft(e,t,n){const r={...at(),[t]:n};return new T("auth","Firebase",r).create(t,{appName:e.name})}function pt(e){return ft(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function mt(e,...t){if("string"!=typeof e){const n=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(n,...r)}return ct.create(e,...t)}function gt(e,t,...n){if(!e)throw mt(t,...n)}function yt(e){const t="INTERNAL ASSERTION FAILED: "+e;throw ht(t),new Error(t)}function vt(e,t){e||yt(t)}
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
 */function wt(){var e;return"undefined"!=typeof self&&(null==(e=self.location)?void 0:e.href)||""}function _t(){var e;return"undefined"!=typeof self&&(null==(e=self.location)?void 0:e.protocol)||null}
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
 */function Et(){return"undefined"==typeof navigator||!navigator||!("onLine"in navigator)||"boolean"!=typeof navigator.onLine||"http:"!==_t()&&"https:"!==_t()&&!function(){const e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}()&&!("connection"in navigator)||navigator.onLine}
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
class Tt{constructor(e,t){this.shortDelay=e,this.longDelay=t,vt(t>e,"Short delay should be less than long delay!"),this.isMobile="undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(w())||"object"==typeof navigator&&"ReactNative"===navigator.product}get(){return Et()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}
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
 */function It(e,t){vt(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}
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
 */class bt{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:"undefined"!=typeof globalThis&&globalThis.fetch?globalThis.fetch:"undefined"!=typeof fetch?fetch:void yt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:"undefined"!=typeof globalThis&&globalThis.Headers?globalThis.Headers:"undefined"!=typeof Headers?Headers:void yt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:"undefined"!=typeof globalThis&&globalThis.Response?globalThis.Response:"undefined"!=typeof Response?Response:void yt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}
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
 */const St={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"},Ct=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],At=new Tt(3e4,6e4);
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
 */function kt(e,t){return e.tenantId&&!t.tenantId?{...t,tenantId:e.tenantId}:t}async function Nt(e,t,n,r,s={}){return Rt(e,s,async()=>{let s={},i={};r&&("GET"===t?i=r:s={body:JSON.stringify(r)});const o=C({key:e.config.apiKey,...i}).slice(1),a=await e._getAdditionalHeaders();a["Content-Type"]="application/json",e.languageCode&&(a["X-Firebase-Locale"]=e.languageCode);const c={method:t,headers:a,...s};return"undefined"!=typeof navigator&&"Cloudflare-Workers"===navigator.userAgent||(c.referrerPolicy="no-referrer"),e.emulatorConfig&&f(e.emulatorConfig.host)&&(c.credentials="include"),bt.fetch()(await Ot(e,e.config.apiHost,n,o),c)})}async function Rt(e,t,n){e._canInitEmulator=!1;const r={...St,...t};try{const t=new Lt(e),s=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();const i=await s.json();if("needConfirmation"in i)throw Mt(e,"account-exists-with-different-credential",i);if(s.ok&&!("errorMessage"in i))return i;{const t=s.ok?i.errorMessage:i.error.message,[n,o]=t.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===n)throw Mt(e,"credential-already-in-use",i);if("EMAIL_EXISTS"===n)throw Mt(e,"email-already-in-use",i);if("USER_DISABLED"===n)throw Mt(e,"user-disabled",i);const a=r[n]||n.toLowerCase().replace(/[_\s]+/g,"-");if(o)throw ft(e,a,o);lt(e,a)}}catch(s){if(s instanceof E)throw s;lt(e,"network-request-failed",{message:String(s)})}}async function Dt(e,t,n,r,s={}){const i=await Nt(e,t,n,r,s);return"mfaPendingCredential"in i&&lt(e,"multi-factor-auth-required",{_serverResponse:i}),i}async function Ot(e,t,n,r){const s=`${t}${n}?${r}`,i=e,o=i.config.emulator?It(e.config,s):`${e.config.apiScheme}://${s}`;if(Ct.includes(n)&&(await i._persistenceManagerAvailable,"COOKIE"===i._getPersistenceType())){return i._getPersistence()._getFinalTarget(o).toString()}return o}function Pt(e){switch(e){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Lt{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(dt(this.auth,"network-request-failed")),At.get())})}}function Mt(e,t,n){const r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=dt(e,t,r);return s.customData._tokenResponse=n,s}function xt(e){return void 0!==e&&void 0!==e.enterprise}class Ut{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],void 0===e.recaptchaKey)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||0===this.recaptchaEnforcementState.length)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Pt(t.enforcementState);return null}isProviderEnabled(e){return"ENFORCE"===this.getProviderEnforcementState(e)||"AUDIT"===this.getProviderEnforcementState(e)}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function Vt(e,t){return Nt(e,"POST","/v1/accounts:lookup",t)}
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
 */function Ft(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(t){}}function jt(e){return 1e3*Number(e)}function Bt(e){const[t,n,r]=e.split(".");if(void 0===t||void 0===n||void 0===r)return ht("JWT malformed, contained fewer than 3 sections"),null;try{const e=i(n);return e?JSON.parse(e):(ht("Failed to decode base64 JWT payload"),null)}catch(s){return ht("Caught error parsing JWT payload as JSON",null==s?void 0:s.toString()),null}}function qt(e){const t=Bt(e);return gt(t,"internal-error"),gt(void 0!==t.exp,"internal-error"),gt(void 0!==t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}
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
 */async function $t(e,t,n=!1){if(n)return t;try{return await t}catch(r){throw r instanceof E&&function({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}
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
 */(r)&&e.auth.currentUser===e&&await e.auth.signOut(),r}}class zt{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){if(e){const e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}{this.errorBackoff=3e4;const e=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,e)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){return void("auth/network-request-failed"===(null==e?void 0:e.code)&&this.schedule(!0))}this.schedule()}}
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
 */class Ht{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ft(this.lastLoginAt),this.creationTime=Ft(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}
/**
 * @license
 * Copyright 2019 Google LLC
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
 */async function Gt(e){var t;const n=e.auth,r=await e.getIdToken(),s=await $t(e,Vt(n,{idToken:r}));gt(null==s?void 0:s.users.length,n,"internal-error");const i=s.users[0];e._notifyReloadListener(i);const o=(null==(t=i.providerUserInfo)?void 0:t.length)?Kt(i.providerUserInfo):[],a=(c=e.providerData,u=o,[...c.filter(e=>!u.some(t=>t.providerId===e.providerId)),...u]);var c,u;const h=e.isAnonymous,l=!(e.email&&i.passwordHash||(null==a?void 0:a.length)),d=!!h&&l,f={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new Ht(i.createdAt,i.lastLoginAt),isAnonymous:d};Object.assign(e,f)}function Kt(e){return e.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}
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
class Wt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){gt(e.idToken,"internal-error"),gt(void 0!==e.idToken,"internal-error"),gt(void 0!==e.refreshToken,"internal-error");const t="expiresIn"in e&&void 0!==e.expiresIn?Number(e.expiresIn):qt(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){gt(0!==e.length,"internal-error");const t=qt(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return t||!this.accessToken||this.isExpired?(gt(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null):this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:r,expiresIn:s}=await async function(e,t){const n=await Rt(e,{},async()=>{const n=C({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:r,apiKey:s}=e.config,i=await Ot(e,r,"/v1/token",`key=${s}`),o=await e._getAdditionalHeaders();o["Content-Type"]="application/x-www-form-urlencoded";const a={method:"POST",headers:o,body:n};return e.emulatorConfig&&f(e.emulatorConfig.host)&&(a.credentials="include"),bt.fetch()(i,a)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}(e,t);this.updateTokensAndExpiration(n,r,Number(s))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(e,t){const{refreshToken:n,accessToken:r,expirationTime:s}=t,i=new Wt;return n&&(gt("string"==typeof n,"internal-error",{appName:e}),i.refreshToken=n),r&&(gt("string"==typeof r,"internal-error",{appName:e}),i.accessToken=r),s&&(gt("number"==typeof s,"internal-error",{appName:e}),i.expirationTime=s),i}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Wt,this.toJSON())}_performRefresh(){return yt("not implemented")}}
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
 */function Qt(e,t){gt("string"==typeof e||void 0===e,"internal-error",{appName:t})}class Xt{constructor({uid:e,auth:t,stsTokenManager:n,...r}){this.providerId="firebase",this.proactiveRefresh=new zt(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new Ht(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await $t(this,this.stsTokenManager.getToken(this.auth,e));return gt(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return async function(e,t=!1){const n=D(e),r=await n.getIdToken(t),s=Bt(r);gt(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i="object"==typeof s.firebase?s.firebase:void 0,o=null==i?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Ft(jt(s.auth_time)),issuedAtTime:Ft(jt(s.iat)),expirationTime:Ft(jt(s.exp)),signInProvider:o||null,signInSecondFactor:(null==i?void 0:i.sign_in_second_factor)||null}}(this,e)}reload(){return async function(e){const t=D(e);await Gt(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}(this)}_assign(e){this!==e&&(gt(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>({...e})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Xt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){gt(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await Gt(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if($e(this.auth.app))return Promise.reject(pt(this.auth));const e=await this.getIdToken();return await $t(this,
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
async function(e,t){return Nt(e,"POST","/v1/accounts:delete",t)}(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const n=t.displayName??void 0,r=t.email??void 0,s=t.phoneNumber??void 0,i=t.photoURL??void 0,o=t.tenantId??void 0,a=t._redirectEventId??void 0,c=t.createdAt??void 0,u=t.lastLoginAt??void 0,{uid:h,emailVerified:l,isAnonymous:d,providerData:f,stsTokenManager:p}=t;gt(h&&p,e,"internal-error");const m=Wt.fromJSON(this.name,p);gt("string"==typeof h,e,"internal-error"),Qt(n,e.name),Qt(r,e.name),gt("boolean"==typeof l,e,"internal-error"),gt("boolean"==typeof d,e,"internal-error"),Qt(s,e.name),Qt(i,e.name),Qt(o,e.name),Qt(a,e.name),Qt(c,e.name),Qt(u,e.name);const g=new Xt({uid:h,auth:e,email:r,emailVerified:l,displayName:n,isAnonymous:d,photoURL:i,phoneNumber:s,tenantId:o,stsTokenManager:m,createdAt:c,lastLoginAt:u});return f&&Array.isArray(f)&&(g.providerData=f.map(e=>({...e}))),a&&(g._redirectEventId=a),g}static async _fromIdTokenResponse(e,t,n=!1){const r=new Wt;r.updateFromServerResponse(t);const s=new Xt({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:n});return await Gt(s),s}static async _fromGetAccountInfoResponse(e,t,n){const r=t.users[0];gt(void 0!==r.localId,"internal-error");const s=void 0!==r.providerUserInfo?Kt(r.providerUserInfo):[],i=!(r.email&&r.passwordHash||(null==s?void 0:s.length)),o=new Wt;o.updateFromIdToken(n);const a=new Xt({uid:r.localId,auth:e,stsTokenManager:o,isAnonymous:i}),c={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:s,metadata:new Ht(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash||(null==s?void 0:s.length))};return Object.assign(a,c),a}}
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
 */const Yt=new Map;function Jt(e){vt(e instanceof Function,"Expected a class definition");let t=Yt.get(e);return t?(vt(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,Yt.set(e,t),t)}
/**
 * @license
 * Copyright 2019 Google LLC
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
 */class Zt{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Zt.type="NONE";const en=Zt;
/**
 * @license
 * Copyright 2019 Google LLC
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
 */function tn(e,t,n){return`firebase:${e}:${t}:${n}`}class nn{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:r,name:s}=this.auth;this.fullUserKey=tn(this.userKey,r.apiKey,s),this.fullPersistenceKey=tn("persistence",r.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if("string"==typeof e){const t=await Vt(this.auth,{idToken:e}).catch(()=>{});return t?Xt._fromGetAccountInfoResponse(this.auth,t,e):null}return Xt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=e,t?this.setCurrentUser(t):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new nn(Jt(en),e,n);const r=(await Promise.all(t.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e);let s=r[0]||Jt(en);const i=tn(n,e.config.apiKey,e.name);let o=null;for(const c of t)try{const t=await c._get(i);if(t){let n;if("string"==typeof t){const r=await Vt(e,{idToken:t}).catch(()=>{});if(!r)break;n=await Xt._fromGetAccountInfoResponse(e,r,t)}else n=Xt._fromJSON(e,t);c!==s&&(o=n),s=c;break}}catch{}const a=r.filter(e=>e._shouldAllowMigration);return s._shouldAllowMigration&&a.length?(s=a[0],o&&await s._set(i,o.toJSON()),await Promise.all(t.map(async e=>{if(e!==s)try{await e._remove(i)}catch{}})),new nn(s,e,n)):new nn(s,e,n)}}
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
 */function rn(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(cn(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(sn(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(hn(t))return"Blackberry";if(ln(t))return"Webos";if(on(t))return"Safari";if((t.includes("chrome/")||an(t))&&!t.includes("edge/"))return"Chrome";if(un(t))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=e.match(t);if(2===(null==n?void 0:n.length))return n[1]}return"Other"}function sn(e=w()){return/firefox\//i.test(e)}function on(e=w()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function an(e=w()){return/crios\//i.test(e)}function cn(e=w()){return/iemobile/i.test(e)}function un(e=w()){return/android/i.test(e)}function hn(e=w()){return/blackberry/i.test(e)}function ln(e=w()){return/webos/i.test(e)}function dn(e=w()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function fn(){return function(){const e=w();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}()&&10===document.documentMode}function pn(e=w()){return dn(e)||un(e)||ln(e)||hn(e)||/windows phone/i.test(e)||cn(e)}
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
 */function mn(e,t=[]){let n;switch(e){case"Browser":n=rn(w());break;case"Worker":n=`${rn(w())}-${e}`;break;default:n=e}const r=t.length?t.join(","):"FirebaseCore-web";return`${n}/JsCore/${Ge}/${r}`}
/**
 * @license
 * Copyright 2022 Google LLC
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
 */class gn{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=t=>new Promise((n,r)=>{try{n(e(t))}catch(s){r(s)}});n.onAbort=t,this.queue.push(n);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const e of t)try{e()}catch(r){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:null==n?void 0:n.message})}}}
/**
 * @license
 * Copyright 2023 Google LLC
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
 */class yn{constructor(e){var t;const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??6,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),void 0!==n.containsLowercaseCharacter&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),void 0!==n.containsUppercaseCharacter&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),void 0!==n.containsNumericCharacter&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),void 0!==n.containsNonAlphanumericCharacter&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,"ENFORCEMENT_STATE_UNSPECIFIED"===this.enforcementState&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(null==(t=e.allowedNonAlphanumericCharacters)?void 0:t.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){let n;this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);for(let r=0;r<e.length;r++)n=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,r,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}
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
 */class vn{constructor(e,t,n,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new _n(this),this.idTokenSubscription=new _n(this),this.beforeStateQueue=new gn(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ct,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(e=>this._resolvePersistenceManagerAvailable=e)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Jt(t)),this._initializationPromise=this.queue(async()=>{var n,r,s;if(!this._deleted&&(this.persistenceManager=await nn.create(this,e),null==(n=this._resolvePersistenceManagerAvailable)||n.call(this),!this._deleted)){if(null==(r=this._popupRedirectResolver)?void 0:r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(i){}await this.initializeCurrentUser(t),this.lastNotifiedUid=(null==(s=this.currentUser)?void 0:s.uid)||null,this._deleted||(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();return this.currentUser||e?this.currentUser&&e&&this.currentUser.uid===e.uid?(this._currentUser._assign(e),void(await this.currentUser.getIdToken())):void(await this._updateCurrentUser(e,!0)):void 0}async initializeCurrentUserFromIdToken(e){try{const t=await Vt(this,{idToken:e}),n=await Xt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if($e(this.app)){const e=this.app.settings.authIdToken;return e?new Promise(t=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(e).then(t,t))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let r=n,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const n=null==(t=this.redirectUser)?void 0:t._redirectEventId,i=null==r?void 0:r._redirectEventId,o=await this.tryRedirectSignIn(e);n&&n!==i||!(null==o?void 0:o.user)||(r=o.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(i){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return gt(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(n){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Gt(e)}catch(t){if("auth/network-request-failed"!==(null==t?void 0:t.code))return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if($e(this.app))return Promise.reject(pt(this));const t=e?D(e):null;return t&&gt(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&gt(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return $e(this.app)?Promise.reject(pt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return $e(this.app)?Promise.reject(pt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Jt(e))})}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return null===this.tenantId?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await async function(e,t={}){return Nt(e,"GET","/v2/passwordPolicy",kt(e,t))}
/**
 * @license
 * Copyright 2023 Google LLC
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
 */(this),t=new yn(e);null===this.tenantId?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new T("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:await this.currentUser.getIdToken()};null!=this.tenantId&&(t.tenantId=this.tenantId),await async function(e,t){return Nt(e,"POST","/v2/accounts:revokeToken",kt(e,t))}(this,t)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:null==(e=this._currentUser)?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return null===e?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Jt(e)||this._popupRedirectResolver;gt(t,this,"argument-error"),this.redirectPersistenceManager=await nn.create(this,[Jt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),(null==(t=this._currentUser)?void 0:t._redirectEventId)===e?this._currentUser:(null==(n=this.redirectUser)?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const t=(null==(e=this.currentUser)?void 0:e.uid)??null;this.lastNotifiedUid!==t&&(this.lastNotifiedUid=t,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,r){if(this._deleted)return()=>{};const s="function"==typeof t?t:t.next.bind(t);let i=!1;const o=this._isInitialized?Promise.resolve():this._initializationPromise;if(gt(o,this,"internal-error"),o.then(()=>{i||s(this.currentUser)}),"function"==typeof t){const s=e.addObserver(t,n,r);return()=>{i=!0,s()}}{const n=e.addObserver(t);return()=>{i=!0,n()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return gt(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){e&&!this.frameworks.includes(e)&&(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=mn(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const n=await(null==(e=this.heartbeatServiceProvider.getImmediate({optional:!0}))?void 0:e.getHeartbeatsHeader());n&&(t["X-Firebase-Client"]=n);const r=await this._getAppCheckToken();return r&&(t["X-Firebase-AppCheck"]=r),t}async _getAppCheckToken(){var e;if($e(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await(null==(e=this.appCheckServiceProvider.getImmediate({optional:!0}))?void 0:e.getToken());return(null==t?void 0:t.error)&&function(e,...t){ut.logLevel<=x.WARN&&ut.warn(`Auth (${Ge}): ${e}`,...t)}(`Error while retrieving App Check token: ${t.error}`),null==t?void 0:t.token}}function wn(e){return D(e)}class _n{constructor(e){this.auth=e,this.observer=null,this.addObserver=function(e,t){const n=new N(e,t);return n.subscribe.bind(n)}(e=>this.observer=e)}get next(){return gt(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}
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
 */let En={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Tn(e){return En.loadJS(e)}class In{constructor(){this.enterprise=new bn}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class bn{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const Sn="NO_RECAPTCHA";class Cn{constructor(e){this.type="recaptcha-enterprise",this.auth=wn(e)}async verify(e="verify",t=!1){async function n(e){if(!t){if(null==e.tenantId&&null!=e._agentRecaptchaConfig)return e._agentRecaptchaConfig.siteKey;if(null!=e.tenantId&&void 0!==e._tenantRecaptchaConfigs[e.tenantId])return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise(async(t,n)=>{(async function(e,t){return Nt(e,"GET","/v2/recaptchaConfig",kt(e,t))})(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(r=>{if(void 0!==r.recaptchaKey){const n=new Ut(r);return null==e.tenantId?e._agentRecaptchaConfig=n:e._tenantRecaptchaConfigs[e.tenantId]=n,t(n.siteKey)}n(new Error("recaptcha Enterprise site key undefined"))}).catch(e=>{n(e)})})}function r(t,n,r){const s=window.grecaptcha;xt(s)?s.enterprise.ready(()=>{s.enterprise.execute(t,{action:e}).then(e=>{n(e)}).catch(()=>{n(Sn)})}):r(Error("No reCAPTCHA enterprise script loaded."))}if(this.auth.settings.appVerificationDisabledForTesting){return(new In).execute("siteKey",{action:"verify"})}return new Promise((e,s)=>{n(this.auth).then(n=>{if(!t&&xt(window.grecaptcha))r(n,e,s);else{if("undefined"==typeof window)return void s(new Error("RecaptchaVerifier is only supported in browser"));let t=En.recaptchaEnterpriseScript;0!==t.length&&(t+=n),Tn(t).then(()=>{r(n,e,s)}).catch(e=>{s(e)})}}).catch(e=>{s(e)})})}}async function An(e,t,n,r=!1,s=!1){const i=new Cn(e);let o;if(s)o=Sn;else try{o=await i.verify(n)}catch(c){o=await i.verify(n,!0)}const a={...t};if("mfaSmsEnrollment"===n||"mfaSmsSignIn"===n){if("phoneEnrollmentInfo"in a){const e=a.phoneEnrollmentInfo.phoneNumber,t=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:t,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in a){const e=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:e,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return r?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function kn(e,t,n,r,s){var i;if(null==(i=e._getRecaptchaConfig())?void 0:i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const s=await An(e,t,n,"getOobCode"===n);return r(e,s)}return r(e,t).catch(async s=>{if("auth/missing-recaptcha-token"===s.code){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const s=await An(e,t,n,"getOobCode"===n);return r(e,s)}return Promise.reject(s)})}
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
 */function Nn(e,t,n){const r=wn(e);gt(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const s=Rn(t),{host:i,port:o}=function(e){const t=Rn(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const e=s[1];return{host:e,port:Dn(r.substr(e.length+1))}}{const[e,t]=r.split(":");return{host:e,port:Dn(t)}}}(t),a=null===o?"":`:${o}`,c={url:`${s}//${i}${a}/`},u=Object.freeze({host:i,port:o,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:!1})});if(!r._canInitEmulator)return gt(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),void gt(b(c,r.config.emulator)&&b(u,r.emulatorConfig),r,"emulator-config-failed");r.config.emulator=c,r.emulatorConfig=u,r.settings.appVerificationDisabledForTesting=!0,f(i)?(p(`${s}//${i}${a}`),v("Auth",!0)):function(){function e(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!=typeof console&&"function"==typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.");"undefined"!=typeof window&&"undefined"!=typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}
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
 */()}function Rn(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function Dn(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}class On{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return yt("not implemented")}_getIdTokenResponse(e){return yt("not implemented")}_linkToIdToken(e,t){return yt("not implemented")}_getReauthenticationResolver(e){return yt("not implemented")}}async function Pn(e,t){return Nt(e,"POST","/v1/accounts:signUp",t)}
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
 */async function Ln(e,t){return Dt(e,"POST","/v1/accounts:signInWithPassword",kt(e,t))}
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
class Mn extends On{constructor(e,t,n,r=null){super("password",n),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new Mn(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new Mn(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e;if((null==t?void 0:t.email)&&(null==t?void 0:t.password)){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return kn(e,{returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signInWithPassword",Ln);case"emailLink":return async function(e,t){return Dt(e,"POST","/v1/accounts:signInWithEmailLink",kt(e,t))}(e,{email:this._email,oobCode:this._password});default:lt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return kn(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Pn);case"emailLink":return async function(e,t){return Dt(e,"POST","/v1/accounts:signInWithEmailLink",kt(e,t))}(e,{idToken:t,email:this._email,oobCode:this._password});default:lt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}
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
 */async function xn(e,t){return Dt(e,"POST","/v1/accounts:signInWithIdp",kt(e,t))}
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
 */class Un extends On{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Un(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):lt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e,{providerId:n,signInMethod:r,...s}=t;if(!n||!r)return null;const i=new Un(n,r);return i.idToken=s.idToken||void 0,i.accessToken=s.accessToken||void 0,i.secret=s.secret,i.nonce=s.nonce,i.pendingToken=s.pendingToken||null,i}_getIdTokenResponse(e){return xn(e,this.buildRequest())}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,xn(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,xn(e,t)}buildRequest(){const e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=C(t)}return e}}
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
 */class Vn{constructor(e){const t=A(k(e)),n=t.apiKey??null,r=t.oobCode??null,s=function(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}(t.mode??null);gt(n&&r&&s,"argument-error"),this.apiKey=n,this.operation=s,this.code=r,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=function(e){const t=A(k(e)).link,n=t?A(k(t)).deep_link_id:null,r=A(k(e)).deep_link_id;return(r?A(k(r)).link:null)||r||n||t||e}(e);try{return new Vn(t)}catch{return null}}}
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
 */class Fn{constructor(){this.providerId=Fn.PROVIDER_ID}static credential(e,t){return Mn._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=Vn.parseLink(t);return gt(n,"argument-error"),Mn._fromEmailAndCode(e,n.code,n.tenantId)}}Fn.PROVIDER_ID="password",Fn.EMAIL_PASSWORD_SIGN_IN_METHOD="password",Fn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";
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
class jn{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}
/**
 * @license
 * Copyright 2019 Google LLC
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
 */class Bn extends jn{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}
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
 */class qn extends Bn{constructor(){super("facebook.com")}static credential(e){return Un._fromParams({providerId:qn.PROVIDER_ID,signInMethod:qn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return qn.credentialFromTaggedObject(e)}static credentialFromError(e){return qn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return qn.credential(e.oauthAccessToken)}catch{return null}}}qn.FACEBOOK_SIGN_IN_METHOD="facebook.com",qn.PROVIDER_ID="facebook.com";
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
class $n extends Bn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Un._fromParams({providerId:$n.PROVIDER_ID,signInMethod:$n.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return $n.credentialFromTaggedObject(e)}static credentialFromError(e){return $n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return $n.credential(t,n)}catch{return null}}}$n.GOOGLE_SIGN_IN_METHOD="google.com",$n.PROVIDER_ID="google.com";
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
class zn extends Bn{constructor(){super("github.com")}static credential(e){return Un._fromParams({providerId:zn.PROVIDER_ID,signInMethod:zn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return zn.credentialFromTaggedObject(e)}static credentialFromError(e){return zn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return zn.credential(e.oauthAccessToken)}catch{return null}}}zn.GITHUB_SIGN_IN_METHOD="github.com",zn.PROVIDER_ID="github.com";
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
class Hn extends Bn{constructor(){super("twitter.com")}static credential(e,t){return Un._fromParams({providerId:Hn.PROVIDER_ID,signInMethod:Hn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Hn.credentialFromTaggedObject(e)}static credentialFromError(e){return Hn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return Hn.credential(t,n)}catch{return null}}}
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
async function Gn(e,t){return Dt(e,"POST","/v1/accounts:signUp",kt(e,t))}
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
 */Hn.TWITTER_SIGN_IN_METHOD="twitter.com",Hn.PROVIDER_ID="twitter.com";class Kn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,r=!1){const s=await Xt._fromIdTokenResponse(e,n,r),i=Wn(n);return new Kn({user:s,providerId:i,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const r=Wn(n);return new Kn({user:e,providerId:r,_tokenResponse:n,operationType:t})}}function Wn(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}
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
 */class Qn extends E{constructor(e,t,n,r){super(t.code,t.message),this.operationType=n,this.user=r,Object.setPrototypeOf(this,Qn.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,r){return new Qn(e,t,n,r)}}function Xn(e,t,n,r){return("reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch(n=>{if("auth/multi-factor-auth-required"===n.code)throw Qn._fromErrorAndOperation(e,n,t,r);throw n})}
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
async function Yn(e,t,n=!1){if($e(e.app))return Promise.reject(pt(e));const r="signIn",s=await Xn(e,r,t),i=await Kn._fromIdTokenResponse(e,r,s);return n||await e._updateCurrentUser(i.user),i}
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
async function Jn(e){const t=wn(e);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}async function Zn(e,t,n){if($e(e.app))return Promise.reject(pt(e));const r=wn(e),s=kn(r,{returnSecureToken:!0,email:t,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Gn),i=await s.catch(t=>{throw"auth/password-does-not-meet-requirements"===t.code&&Jn(e),t}),o=await Kn._fromIdTokenResponse(r,"signIn",i);return await r._updateCurrentUser(o.user),o}function er(e,t,n){return $e(e.app)?Promise.reject(pt(e)):async function(e,t){return Yn(wn(e),t)}(D(e),Fn.credential(t,n)).catch(async t=>{throw"auth/password-does-not-meet-requirements"===t.code&&Jn(e),t})}function tr(e,t,n,r){return D(e).onAuthStateChanged(t,n,r)}function nr(e){return D(e).signOut()}const rr="__sak";
/**
 * @license
 * Copyright 2019 Google LLC
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
 */class sr{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(rr,"1"),this.storage.removeItem(rr),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}
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
 */class ir extends sr{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=pn(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),r=this.localCache[t];n!==r&&e(t,r,n)}}onStorageEvent(e,t=!1){if(!e.key)return void this.forAllChangedKeys((e,t,n)=>{this.notifyListeners(e,n)});const n=e.key;t?this.detachListener():this.stopPolling();const r=()=>{const e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},s=this.storage.getItem(n);fn()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,10):r()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const r of Array.from(n))r(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}ir.type="LOCAL";const or=ir;
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
 */class ar extends sr{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}ar.type="SESSION";const cr=ar;
/**
 * @license
 * Copyright 2019 Google LLC
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
/**
 * @license
 * Copyright 2019 Google LLC
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
class ur{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(t=>t.isListeningto(e));if(t)return t;const n=new ur(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:r,data:s}=t.data,i=this.handlersMap[r];if(!(null==i?void 0:i.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:r});const o=Array.from(i).map(async e=>e(t.origin,s)),a=await function(e){return Promise.all(e.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}(o);t.ports[0].postMessage({status:"done",eventId:n,eventType:r,response:a})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}
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
function hr(e="",t=10){let n="";for(let r=0;r<t;r++)n+=Math.floor(10*Math.random());return e+n}
/**
 * @license
 * Copyright 2019 Google LLC
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
 */ur.receivers=[];class lr{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const r="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let s,i;return new Promise((o,a)=>{const c=hr("",20);r.port1.start();const u=setTimeout(()=>{a(new Error("unsupported_event"))},n);i={messageChannel:r,onMessage(e){const t=e;if(t.data.eventId===c)switch(t.data.status){case"ack":clearTimeout(u),s=setTimeout(()=>{a(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),o(t.data.response);break;default:clearTimeout(u),clearTimeout(s),a(new Error("invalid_response"))}}},this.handlers.add(i),r.port1.addEventListener("message",i.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[r.port2])}).finally(()=>{i&&this.removeMessageHandler(i)})}}
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
 */function dr(){return window}
/**
 * @license
 * Copyright 2020 Google LLC.
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
function fr(){return void 0!==dr().WorkerGlobalScope&&"function"==typeof dr().importScripts}
/**
 * @license
 * Copyright 2019 Google LLC
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
const pr="firebaseLocalStorageDb",mr="firebaseLocalStorage",gr="fbase_key";class yr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function vr(e,t){return e.transaction([mr],t?"readwrite":"readonly").objectStore(mr)}function wr(){const e=indexedDB.open(pr,1);return new Promise((t,n)=>{e.addEventListener("error",()=>{n(e.error)}),e.addEventListener("upgradeneeded",()=>{const t=e.result;try{t.createObjectStore(mr,{keyPath:gr})}catch(r){n(r)}}),e.addEventListener("success",async()=>{const n=e.result;n.objectStoreNames.contains(mr)?t(n):(n.close(),await function(){const e=indexedDB.deleteDatabase(pr);return new yr(e).toPromise()}(),t(await wr()))})})}async function _r(e,t,n){const r=vr(e,!0).put({[gr]:t,value:n});return new yr(r).toPromise()}function Er(e,t){const n=vr(e,!0).delete(t);return new yr(n).toPromise()}class Tr{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db||(this.db=await wr()),this.db}async _withRetries(e){let t=0;for(;;)try{const t=await this._openDb();return await e(t)}catch(n){if(t++>3)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return fr()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ur._getInstance(fr()?self:null),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await async function(){if(!(null==navigator?void 0:navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}(),!this.activeServiceWorker)return;this.sender=new lr(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);n&&(null==(e=n[0])?void 0:e.fulfilled)&&(null==(t=n[0])?void 0:t.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){var t;if(this.sender&&this.activeServiceWorker&&((null==(t=null==navigator?void 0:navigator.serviceWorker)?void 0:t.controller)||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await wr();return await _r(e,rr,"1"),await Er(e,rr),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>_r(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(t=>async function(e,t){const n=vr(e,!1).get(t),r=await new yr(n).toPromise();return void 0===r?null:r.value}(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Er(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(e=>{const t=vr(e,!1).getAll();return new yr(t).toPromise()});if(!e)return[];if(0!==this.pendingWrites)return[];const t=[],n=new Set;if(0!==e.length)for(const{fbase_key:r,value:s}of e)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(s)&&(this.notifyListeners(r,s),t.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!n.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const r of Array.from(n))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}Tr.type="LOCAL";const Ir=Tr;new Tt(3e4,6e4);
/**
 * @license
 * Copyright 2019 Google LLC
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
class br extends On{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return xn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return xn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return xn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Sr(e){return Yn(e.auth,new br(e),e.bypassAuthState)}function Cr(e){const{auth:t,user:n}=e;return gt(n,t,"internal-error"),
/**
 * @license
 * Copyright 2019 Google LLC
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
async function(e,t,n=!1){const{auth:r}=e;if($e(r.app))return Promise.reject(pt(r));const s="reauthenticate";try{const i=await $t(e,Xn(r,s,t,e),n);gt(i.idToken,r,"internal-error");const o=Bt(i.idToken);gt(o,r,"internal-error");const{sub:a}=o;return gt(e.uid===a,r,"user-mismatch"),Kn._forOperation(e,s,i)}catch(i){throw"auth/user-not-found"===(null==i?void 0:i.code)&&lt(r,"user-mismatch"),i}}(n,new br(e),e.bypassAuthState)}async function Ar(e){const{auth:t,user:n}=e;return gt(n,t,"internal-error"),async function(e,t,n=!1){const r=await $t(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return Kn._forOperation(e,"link",r)}(n,new br(e),e.bypassAuthState)}
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
 */class kr{constructor(e,t,n,r,s=!1){this.auth=e,this.resolver=n,this.user=r,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:r,tenantId:s,error:i,type:o}=e;if(i)return void this.reject(i);const a={auth:this.auth,requestUri:t,sessionId:n,tenantId:s||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(a))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Sr;case"linkViaPopup":case"linkViaRedirect":return Ar;case"reauthViaPopup":case"reauthViaRedirect":return Cr;default:lt(this.auth,"internal-error")}}resolve(e){vt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){vt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}
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
 */const Nr=new Tt(2e3,1e4);class Rr extends kr{constructor(e,t,n,r,s){super(e,t,r,s),this.provider=n,this.authWindow=null,this.pollId=null,Rr.currentPopupAction&&Rr.currentPopupAction.cancel(),Rr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return gt(e,this.auth,"internal-error"),e}async onExecution(){vt(1===this.filter.length,"Popup operations only handle one event");const e=hr();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(dt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return(null==(e=this.authWindow)?void 0:e.associatedEvent)||null}cancel(){this.reject(dt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Rr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;(null==(n=null==(t=this.authWindow)?void 0:t.window)?void 0:n.closed)?this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(dt(this.auth,"popup-closed-by-user"))},8e3):this.pollId=window.setTimeout(e,Nr.get())};e()}}Rr.currentPopupAction=null;
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
const Dr="pendingRedirect",Or=new Map;class Pr extends kr{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=Or.get(this.auth._key());if(!e){try{const t=await async function(e,t){const n=function(e){return tn(Dr,e.config.apiKey,e.name)}(t),r=function(e){return Jt(e._redirectPersistence)}(e);if(!(await r._isAvailable()))return!1;const s="true"===await r._get(n);return await r._remove(n),s}(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(t)}catch(t){e=()=>Promise.reject(t)}Or.set(this.auth._key(),e)}return this.bypassAuthState||Or.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"!==e.type){if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}}function Lr(e,t){Or.set(e._key(),t)}async function Mr(e,t,n=!1){if($e(e.app))return Promise.reject(pt(e));const r=wn(e),s=
/**
 * @license
 * Copyright 2021 Google LLC
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
function(e,t){return t?Jt(t):(gt(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}(r,t),i=new Pr(r,s,n),o=await i.execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,t)),o}
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
 */class xr{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!function(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Vr(e);default:return!1}}
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
 */(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!Vr(e)){const r=(null==(n=e.error.code)?void 0:n.split("auth/")[1])||"internal-error";t.onError(dt(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ur(e))}saveEventToCache(e){this.cachedEventUids.add(Ur(e)),this.lastProcessedEventTime=Date.now()}}function Ur(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join("-")}function Vr({type:e,error:t}){return"unknown"===e&&"auth/no-auth-event"===(null==t?void 0:t.code)}
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
const Fr=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,jr=/^https?/;async function Br(e){if(e.config.emulator)return;const{authorizedDomains:t}=await async function(e,t={}){return Nt(e,"GET","/v1/projects",t)}(e);for(const n of t)try{if(qr(n))return}catch{}lt(e,"unauthorized-domain")}function qr(e){const t=wt(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith("chrome-extension://")){const s=new URL(e);return""===s.hostname&&""===r?"chrome-extension:"===n&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===n&&s.hostname===r}if(!jr.test(n))return!1;if(Fr.test(e))return r===e;const s=e.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}
/**
 * @license
 * Copyright 2020 Google LLC.
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
 */const $r=new Tt(3e4,6e4);function zr(){const e=dr().___jsl;if(null==e?void 0:e.H)for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let n=0;n<e.CP.length;n++)e.CP[n]=null}function Hr(e){return new Promise((t,n)=>{var r,s,i;function o(){zr(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{zr(),n(dt(e,"network-request-failed"))},timeout:$r.get()})}if(null==(s=null==(r=dr().gapi)?void 0:r.iframes)?void 0:s.Iframe)t(gapi.iframes.getContext());else{if(!(null==(i=dr().gapi)?void 0:i.load)){const t=`__${"iframefcb"}${Math.floor(1e6*Math.random())}`;return dr()[t]=()=>{gapi.load?o():n(dt(e,"network-request-failed"))},Tn(`${En.gapiScript}?onload=${t}`).catch(e=>n(e))}o()}}).catch(e=>{throw Gr=null,e})}let Gr=null;
/**
 * @license
 * Copyright 2020 Google LLC.
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
const Kr=new Tt(5e3,15e3),Wr={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Qr=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Xr(e){const t=e.config;gt(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?It(t,"emulator/auth/iframe"):`https://${e.config.authDomain}/__/auth/iframe`,r={apiKey:t.apiKey,appName:e.name,v:Ge},s=Qr.get(e.config.apiHost);s&&(r.eid=s);const i=e._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${C(r).slice(1)}`}async function Yr(e){const t=await function(e){return Gr=Gr||Hr(e),Gr}(e),n=dr().gapi;return gt(n,e,"internal-error"),t.open({where:document.body,url:Xr(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Wr,dontclear:!0},t=>new Promise(async(n,r)=>{await t.restyle({setHideOnLeave:!1});const s=dt(e,"network-request-failed"),i=dr().setTimeout(()=>{r(s)},Kr.get());function o(){dr().clearTimeout(i),n(t)}t.ping(o).then(o,()=>{r(s)})}))}
/**
 * @license
 * Copyright 2020 Google LLC.
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
 */const Jr={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};class Zr{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}function es(e,t,n,r=500,s=600){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c={...Jr,width:r.toString(),height:s.toString(),top:i,left:o},u=w().toLowerCase();n&&(a=an(u)?"_blank":n),sn(u)&&(t=t||"http://localhost",c.scrollbars="yes");const h=Object.entries(c).reduce((e,[t,n])=>`${e}${t}=${n},`,"");if(function(e=w()){var t;return dn(e)&&!!(null==(t=window.navigator)?void 0:t.standalone)}(u)&&"_self"!==a)return function(e,t){const n=document.createElement("a");n.href=e,n.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}
/**
 * @license
 * Copyright 2021 Google LLC
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
 */(t||"",a),new Zr(null);const l=window.open(t||"",a,h);gt(l,e,"popup-blocked");try{l.focus()}catch(d){}return new Zr(l)}const ts="__/auth/handler",ns="emulator/auth/handler",rs=encodeURIComponent("fac");async function ss(e,t,n,r,s,i){gt(e.config.authDomain,e,"auth-domain-config-required"),gt(e.config.apiKey,e,"invalid-api-key");const o={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:r,v:Ge,eventId:s};if(t instanceof jn){t.setDefaultLanguage(e.languageCode),o.providerId=t.providerId||"",function(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(const[e,t]of Object.entries({}))o[e]=t}if(t instanceof Bn){const e=t.getScopes().filter(e=>""!==e);e.length>0&&(o.scopes=e.join(","))}e.tenantId&&(o.tid=e.tenantId);const a=o;for(const h of Object.keys(a))void 0===a[h]&&delete a[h];const c=await e._getAppCheckToken(),u=c?`#${rs}=${encodeURIComponent(c)}`:"";return`${function({config:e}){if(!e.emulator)return`https://${e.authDomain}/${ts}`;return It(e,ns)}
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
 */(e)}?${C(a).slice(1)}${u}`}const is="webStorageSupport";const os=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=cr,this._completeRedirectFn=Mr,this._overrideRedirectResult=Lr}async _openPopup(e,t,n,r){var s;vt(null==(s=this.eventManagers[e._key()])?void 0:s.manager,"_initialize() not called before _openPopup()");return es(e,await ss(e,t,n,wt(),r),hr())}async _openRedirect(e,t,n,r){await this._originValidation(e);return function(e){dr().location.href=e}(await ss(e,t,n,wt(),r)),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(vt(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await Yr(e),n=new xr(e);return t.register("authEvent",t=>{gt(null==t?void 0:t.authEvent,e,"invalid-auth-event");return{status:n.onEvent(t.authEvent)?"ACK":"ERROR"}},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(is,{type:is},n=>{var r;const s=null==(r=null==n?void 0:n[0])?void 0:r[is];void 0!==s&&t(!!s),lt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Br(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return pn()||on()||dn()}};var as="@firebase/auth",cs="1.12.0";
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
class us{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),(null==(e=this.auth.currentUser)?void 0:e.uid)||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;return{accessToken:await this.auth.currentUser.getIdToken(e)}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(t=>{e((null==t?void 0:t.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){gt(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}
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
/**
 * @license
 * Copyright 2021 Google LLC
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
const hs=l("authIdTokenMaxAge")||300;let ls=null;function ds(e=We()){const t=qe(e,"auth");if(t.isInitialized())return t.getImmediate();const n=function(e,t){const n=qe(e,"auth");if(n.isInitialized()){const e=n.getImmediate();if(b(n.getOptions(),t??{}))return e;lt(e,"already-initialized")}return n.initialize({options:t})}(e,{popupRedirectResolver:os,persistence:[Ir,or,cr]}),r=l("authTokenSyncURL");if(r&&"boolean"==typeof isSecureContext&&isSecureContext){const e=new URL(r,location.origin);if(location.origin===e.origin){const t=(s=e.toString(),async e=>{const t=e&&await e.getIdTokenResult(),n=t&&((new Date).getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>hs)return;const r=null==t?void 0:t.token;ls!==r&&(ls=r,await fetch(s,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))});!function(e,t,n){D(e).beforeAuthStateChanged(t,n)}(n,t,()=>t(n.currentUser)),function(e,t,n,r){D(e).onIdTokenChanged(t,n,r)}(n,e=>t(e))}}var s;const i=c("auth");return i&&Nn(n,`http://${i}`),n}var fs;En={loadJS:e=>new Promise((t,n)=>{const r=document.createElement("script");var s;r.setAttribute("src",e),r.onload=t,r.onerror=e=>{const t=dt("internal-error");t.customData=e,n(t)},r.type="text/javascript",r.charset="UTF-8",((null==(s=document.getElementsByTagName("head"))?void 0:s[0])??document).appendChild(r)}),gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="},fs="Browser",Be(new O("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:i,authDomain:o}=n.options;gt(i&&!i.includes(":"),"invalid-api-key",{appName:n.name});const a={apiKey:i,authDomain:o,clientPlatform:fs,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:mn(fs)},c=new vn(n,r,s,a);return function(e,t){const n=(null==t?void 0:t.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Jt);(null==t?void 0:t.errorMap)&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,null==t?void 0:t.popupRedirectResolver)}(c,t),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),Be(new O("auth-internal",e=>{const t=wn(e.getProvider("auth").getImmediate());return new us(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Qe(as,cs,function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}(fs)),Qe(as,cs,"esm2020");
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
Qe("firebase","12.7.0","app");var ps,ms,gs="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var e;
/** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */function t(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}function n(e,t,n){n||(n=0);const r=Array(16);if("string"==typeof t)for(var s=0;s<16;++s)r[s]=t.charCodeAt(n++)|t.charCodeAt(n++)<<8|t.charCodeAt(n++)<<16|t.charCodeAt(n++)<<24;else for(s=0;s<16;++s)r[s]=t[n++]|t[n++]<<8|t[n++]<<16|t[n++]<<24;t=e.g[0],n=e.g[1],s=e.g[2];let i,o=e.g[3];i=t+(o^n&(s^o))+r[0]+3614090360&4294967295,i=o+(s^(t=n+(i<<7&4294967295|i>>>25))&(n^s))+r[1]+3905402710&4294967295,o=t+(i<<12&4294967295|i>>>20),i=s+(n^o&(t^n))+r[2]+606105819&4294967295,i=n+(t^(s=o+(i<<17&4294967295|i>>>15))&(o^t))+r[3]+3250441966&4294967295,i=t+(o^(n=s+(i<<22&4294967295|i>>>10))&(s^o))+r[4]+4118548399&4294967295,i=o+(s^(t=n+(i<<7&4294967295|i>>>25))&(n^s))+r[5]+1200080426&4294967295,o=t+(i<<12&4294967295|i>>>20),i=s+(n^o&(t^n))+r[6]+2821735955&4294967295,i=n+(t^(s=o+(i<<17&4294967295|i>>>15))&(o^t))+r[7]+4249261313&4294967295,i=t+(o^(n=s+(i<<22&4294967295|i>>>10))&(s^o))+r[8]+1770035416&4294967295,i=o+(s^(t=n+(i<<7&4294967295|i>>>25))&(n^s))+r[9]+2336552879&4294967295,o=t+(i<<12&4294967295|i>>>20),i=s+(n^o&(t^n))+r[10]+4294925233&4294967295,i=n+(t^(s=o+(i<<17&4294967295|i>>>15))&(o^t))+r[11]+2304563134&4294967295,i=t+(o^(n=s+(i<<22&4294967295|i>>>10))&(s^o))+r[12]+1804603682&4294967295,i=o+(s^(t=n+(i<<7&4294967295|i>>>25))&(n^s))+r[13]+4254626195&4294967295,o=t+(i<<12&4294967295|i>>>20),i=s+(n^o&(t^n))+r[14]+2792965006&4294967295,i=n+(t^(s=o+(i<<17&4294967295|i>>>15))&(o^t))+r[15]+1236535329&4294967295,i=t+(s^o&((n=s+(i<<22&4294967295|i>>>10))^s))+r[1]+4129170786&4294967295,i=o+(n^s&((t=n+(i<<5&4294967295|i>>>27))^n))+r[6]+3225465664&4294967295,o=t+(i<<9&4294967295|i>>>23),i=s+(t^n&(o^t))+r[11]+643717713&4294967295,i=n+(o^t&((s=o+(i<<14&4294967295|i>>>18))^o))+r[0]+3921069994&4294967295,i=t+(s^o&((n=s+(i<<20&4294967295|i>>>12))^s))+r[5]+3593408605&4294967295,i=o+(n^s&((t=n+(i<<5&4294967295|i>>>27))^n))+r[10]+38016083&4294967295,o=t+(i<<9&4294967295|i>>>23),i=s+(t^n&(o^t))+r[15]+3634488961&4294967295,i=n+(o^t&((s=o+(i<<14&4294967295|i>>>18))^o))+r[4]+3889429448&4294967295,i=t+(s^o&((n=s+(i<<20&4294967295|i>>>12))^s))+r[9]+568446438&4294967295,i=o+(n^s&((t=n+(i<<5&4294967295|i>>>27))^n))+r[14]+3275163606&4294967295,o=t+(i<<9&4294967295|i>>>23),i=s+(t^n&(o^t))+r[3]+4107603335&4294967295,i=n+(o^t&((s=o+(i<<14&4294967295|i>>>18))^o))+r[8]+1163531501&4294967295,i=t+(s^o&((n=s+(i<<20&4294967295|i>>>12))^s))+r[13]+2850285829&4294967295,i=o+(n^s&((t=n+(i<<5&4294967295|i>>>27))^n))+r[2]+4243563512&4294967295,o=t+(i<<9&4294967295|i>>>23),i=s+(t^n&(o^t))+r[7]+1735328473&4294967295,i=n+(o^t&((s=o+(i<<14&4294967295|i>>>18))^o))+r[12]+2368359562&4294967295,i=t+((n=s+(i<<20&4294967295|i>>>12))^s^o)+r[5]+4294588738&4294967295,i=o+((t=n+(i<<4&4294967295|i>>>28))^n^s)+r[8]+2272392833&4294967295,o=t+(i<<11&4294967295|i>>>21),i=s+(o^t^n)+r[11]+1839030562&4294967295,i=n+((s=o+(i<<16&4294967295|i>>>16))^o^t)+r[14]+4259657740&4294967295,i=t+((n=s+(i<<23&4294967295|i>>>9))^s^o)+r[1]+2763975236&4294967295,i=o+((t=n+(i<<4&4294967295|i>>>28))^n^s)+r[4]+1272893353&4294967295,o=t+(i<<11&4294967295|i>>>21),i=s+(o^t^n)+r[7]+4139469664&4294967295,i=n+((s=o+(i<<16&4294967295|i>>>16))^o^t)+r[10]+3200236656&4294967295,i=t+((n=s+(i<<23&4294967295|i>>>9))^s^o)+r[13]+681279174&4294967295,i=o+((t=n+(i<<4&4294967295|i>>>28))^n^s)+r[0]+3936430074&4294967295,o=t+(i<<11&4294967295|i>>>21),i=s+(o^t^n)+r[3]+3572445317&4294967295,i=n+((s=o+(i<<16&4294967295|i>>>16))^o^t)+r[6]+76029189&4294967295,i=t+((n=s+(i<<23&4294967295|i>>>9))^s^o)+r[9]+3654602809&4294967295,i=o+((t=n+(i<<4&4294967295|i>>>28))^n^s)+r[12]+3873151461&4294967295,o=t+(i<<11&4294967295|i>>>21),i=s+(o^t^n)+r[15]+530742520&4294967295,i=n+((s=o+(i<<16&4294967295|i>>>16))^o^t)+r[2]+3299628645&4294967295,i=t+(s^((n=s+(i<<23&4294967295|i>>>9))|~o))+r[0]+4096336452&4294967295,i=o+(n^((t=n+(i<<6&4294967295|i>>>26))|~s))+r[7]+1126891415&4294967295,o=t+(i<<10&4294967295|i>>>22),i=s+(t^(o|~n))+r[14]+2878612391&4294967295,i=n+(o^((s=o+(i<<15&4294967295|i>>>17))|~t))+r[5]+4237533241&4294967295,i=t+(s^((n=s+(i<<21&4294967295|i>>>11))|~o))+r[12]+1700485571&4294967295,i=o+(n^((t=n+(i<<6&4294967295|i>>>26))|~s))+r[3]+2399980690&4294967295,o=t+(i<<10&4294967295|i>>>22),i=s+(t^(o|~n))+r[10]+4293915773&4294967295,i=n+(o^((s=o+(i<<15&4294967295|i>>>17))|~t))+r[1]+2240044497&4294967295,i=t+(s^((n=s+(i<<21&4294967295|i>>>11))|~o))+r[8]+1873313359&4294967295,i=o+(n^((t=n+(i<<6&4294967295|i>>>26))|~s))+r[15]+4264355552&4294967295,o=t+(i<<10&4294967295|i>>>22),i=s+(t^(o|~n))+r[6]+2734768916&4294967295,i=n+(o^((s=o+(i<<15&4294967295|i>>>17))|~t))+r[13]+1309151649&4294967295,i=t+(s^((n=s+(i<<21&4294967295|i>>>11))|~o))+r[4]+4149444226&4294967295,i=o+(n^((t=n+(i<<6&4294967295|i>>>26))|~s))+r[11]+3174756917&4294967295,o=t+(i<<10&4294967295|i>>>22),i=s+(t^(o|~n))+r[2]+718787259&4294967295,i=n+(o^((s=o+(i<<15&4294967295|i>>>17))|~t))+r[9]+3951481745&4294967295,e.g[0]=e.g[0]+t&4294967295,e.g[1]=e.g[1]+(s+(i<<21&4294967295|i>>>11))&4294967295,e.g[2]=e.g[2]+s&4294967295,e.g[3]=e.g[3]+o&4294967295}function r(e,t){this.h=t;const n=[];let r=!0;for(let s=e.length-1;s>=0;s--){const i=0|e[s];r&&i==t||(n[s]=i,r=!1)}this.g=n}!function(e,t){function n(){}n.prototype=t.prototype,e.F=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.D=function(e,n,r){for(var s=Array(arguments.length-2),i=2;i<arguments.length;i++)s[i-2]=arguments[i];return t.prototype[n].apply(e,s)}}(t,function(){this.blockSize=-1}),t.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0},t.prototype.v=function(e,t){void 0===t&&(t=e.length);const r=t-this.blockSize,s=this.C;let i=this.h,o=0;for(;o<t;){if(0==i)for(;o<=r;)n(this,e,o),o+=this.blockSize;if("string"==typeof e){for(;o<t;)if(s[i++]=e.charCodeAt(o++),i==this.blockSize){n(this,s),i=0;break}}else for(;o<t;)if(s[i++]=e[o++],i==this.blockSize){n(this,s),i=0;break}}this.h=i,this.o+=t},t.prototype.A=function(){var e=Array((this.h<56?this.blockSize:2*this.blockSize)-this.h);e[0]=128;for(var t=1;t<e.length-8;++t)e[t]=0;t=8*this.o;for(var n=e.length-8;n<e.length;++n)e[n]=255&t,t/=256;for(this.v(e),e=Array(16),t=0,n=0;n<4;++n)for(let r=0;r<32;r+=8)e[t++]=this.g[n]>>>r&255;return e};var s={};function i(e){return-128<=e&&e<128?function(e,t){var n=s;return Object.prototype.hasOwnProperty.call(n,e)?n[e]:n[e]=t(e)}(e,function(e){return new r([0|e],e<0?-1:0)}):new r([0|e],e<0?-1:0)}function o(e){if(isNaN(e)||!isFinite(e))return a;if(e<0)return d(o(-e));const t=[];let n=1;for(let r=0;e>=n;r++)t[r]=e/n|0,n*=4294967296;return new r(t,0)}var a=i(0),c=i(1),u=i(16777216);function h(e){if(0!=e.h)return!1;for(let t=0;t<e.g.length;t++)if(0!=e.g[t])return!1;return!0}function l(e){return-1==e.h}function d(e){const t=e.g.length,n=[];for(let r=0;r<t;r++)n[r]=~e.g[r];return new r(n,~e.h).add(c)}function f(e,t){return e.add(d(t))}function p(e,t){for(;(65535&e[t])!=e[t];)e[t+1]+=e[t]>>>16,e[t]&=65535,t++}function m(e,t){this.g=e,this.h=t}function g(e,t){if(h(t))throw Error("division by zero");if(h(e))return new m(a,a);if(l(e))return t=g(d(e),t),new m(d(t.g),d(t.h));if(l(t))return t=g(e,d(t)),new m(d(t.g),t.h);if(e.g.length>30){if(l(e)||l(t))throw Error("slowDivide_ only works with positive integers.");for(var n=c,r=t;r.l(e)<=0;)n=y(n),r=y(r);var s=v(n,1),i=v(r,1);for(r=v(r,2),n=v(n,2);!h(r);){var u=i.add(r);u.l(e)<=0&&(s=s.add(n),i=u),r=v(r,1),n=v(n,1)}return t=f(e,s.j(t)),new m(s,t)}for(s=a;e.l(t)>=0;){for(n=Math.max(1,Math.floor(e.m()/t.m())),r=(r=Math.ceil(Math.log(n)/Math.LN2))<=48?1:Math.pow(2,r-48),u=(i=o(n)).j(t);l(u)||u.l(e)>0;)u=(i=o(n-=r)).j(t);h(i)&&(i=c),s=s.add(i),e=f(e,u)}return new m(s,e)}function y(e){const t=e.g.length+1,n=[];for(let r=0;r<t;r++)n[r]=e.i(r)<<1|e.i(r-1)>>>31;return new r(n,e.h)}function v(e,t){const n=t>>5;t%=32;const s=e.g.length-n,i=[];for(let r=0;r<s;r++)i[r]=t>0?e.i(r+n)>>>t|e.i(r+n+1)<<32-t:e.i(r+n);return new r(i,e.h)}(e=r.prototype).m=function(){if(l(this))return-d(this).m();let e=0,t=1;for(let n=0;n<this.g.length;n++){const r=this.i(n);e+=(r>=0?r:4294967296+r)*t,t*=4294967296}return e},e.toString=function(e){if((e=e||10)<2||36<e)throw Error("radix out of range: "+e);if(h(this))return"0";if(l(this))return"-"+d(this).toString(e);const t=o(Math.pow(e,6));var n=this;let r="";for(;;){const s=g(n,t).g;let i=(((n=f(n,s.j(t))).g.length>0?n.g[0]:n.h)>>>0).toString(e);if(h(n=s))return i+r;for(;i.length<6;)i="0"+i;r=i+r}},e.i=function(e){return e<0?0:e<this.g.length?this.g[e]:this.h},e.l=function(e){return l(e=f(this,e))?-1:h(e)?0:1},e.abs=function(){return l(this)?d(this):this},e.add=function(e){const t=Math.max(this.g.length,e.g.length),n=[];let s=0;for(let r=0;r<=t;r++){let t=s+(65535&this.i(r))+(65535&e.i(r)),i=(t>>>16)+(this.i(r)>>>16)+(e.i(r)>>>16);s=i>>>16,t&=65535,i&=65535,n[r]=i<<16|t}return new r(n,-2147483648&n[n.length-1]?-1:0)},e.j=function(e){if(h(this)||h(e))return a;if(l(this))return l(e)?d(this).j(d(e)):d(d(this).j(e));if(l(e))return d(this.j(d(e)));if(this.l(u)<0&&e.l(u)<0)return o(this.m()*e.m());const t=this.g.length+e.g.length,n=[];for(var s=0;s<2*t;s++)n[s]=0;for(s=0;s<this.g.length;s++)for(let t=0;t<e.g.length;t++){const r=this.i(s)>>>16,i=65535&this.i(s),o=e.i(t)>>>16,a=65535&e.i(t);n[2*s+2*t]+=i*a,p(n,2*s+2*t),n[2*s+2*t+1]+=r*a,p(n,2*s+2*t+1),n[2*s+2*t+1]+=i*o,p(n,2*s+2*t+1),n[2*s+2*t+2]+=r*o,p(n,2*s+2*t+2)}for(e=0;e<t;e++)n[e]=n[2*e+1]<<16|n[2*e];for(e=t;e<2*t;e++)n[e]=0;return new r(n,0)},e.B=function(e){return g(this,e).h},e.and=function(e){const t=Math.max(this.g.length,e.g.length),n=[];for(let r=0;r<t;r++)n[r]=this.i(r)&e.i(r);return new r(n,this.h&e.h)},e.or=function(e){const t=Math.max(this.g.length,e.g.length),n=[];for(let r=0;r<t;r++)n[r]=this.i(r)|e.i(r);return new r(n,this.h|e.h)},e.xor=function(e){const t=Math.max(this.g.length,e.g.length),n=[];for(let r=0;r<t;r++)n[r]=this.i(r)^e.i(r);return new r(n,this.h^e.h)},t.prototype.digest=t.prototype.A,t.prototype.reset=t.prototype.u,t.prototype.update=t.prototype.v,ms=t,r.prototype.add=r.prototype.add,r.prototype.multiply=r.prototype.j,r.prototype.modulo=r.prototype.B,r.prototype.compare=r.prototype.l,r.prototype.toNumber=r.prototype.m,r.prototype.toString=r.prototype.toString,r.prototype.getBits=r.prototype.i,r.fromNumber=o,r.fromString=function e(t,n){if(0==t.length)throw Error("number format error: empty string");if((n=n||10)<2||36<n)throw Error("radix out of range: "+n);if("-"==t.charAt(0))return d(e(t.substring(1),n));if(t.indexOf("-")>=0)throw Error('number format error: interior "-" character');const r=o(Math.pow(n,8));let s=a;for(let a=0;a<t.length;a+=8){var i=Math.min(8,t.length-a);const e=parseInt(t.substring(a,a+i),n);i<8?(i=o(Math.pow(n,i)),s=s.j(i).add(o(e))):(s=s.j(r),s=s.add(o(e)))}return s},ps=r}).apply(void 0!==gs?gs:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});var ys,vs,ws,_s,Es,Ts,Is,bs,Ss="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var e,t=Object.defineProperty;var n=function(e){e=["object"==typeof globalThis&&globalThis,e,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof Ss&&Ss];for(var t=0;t<e.length;++t){var n=e[t];if(n&&n.Math==Math)return n}throw Error("Cannot find global object")}(this);function r(e,r){if(r)e:{var s=n;e=e.split(".");for(var i=0;i<e.length-1;i++){var o=e[i];if(!(o in s))break e;s=s[o]}(r=r(i=s[e=e[e.length-1]]))!=i&&null!=r&&t(s,e,{configurable:!0,writable:!0,value:r})}}r("Symbol.dispose",function(e){return e||Symbol("Symbol.dispose")}),r("Array.prototype.values",function(e){return e||function(){return this[Symbol.iterator]()}}),r("Object.entries",function(e){return e||function(e){var t,n=[];for(t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.push([t,e[t]]);return n}});
/** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */
var s=s||{},i=this||self;function o(e){var t=typeof e;return"object"==t&&null!=e||"function"==t}function a(e,t,n){return e.call.apply(e.bind,arguments)}function c(e,t,n){return(c=a).apply(null,arguments)}function u(e,t){var n=Array.prototype.slice.call(arguments,1);return function(){var t=n.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function h(e,t){function n(){}n.prototype=t.prototype,e.Z=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.Ob=function(e,n,r){for(var s=Array(arguments.length-2),i=2;i<arguments.length;i++)s[i-2]=arguments[i];return t.prototype[n].apply(e,s)}}var l="undefined"!=typeof AsyncContext&&"function"==typeof AsyncContext.Snapshot?e=>e&&AsyncContext.Snapshot.wrap(e):e=>e;function d(e){const t=e.length;if(t>0){const n=Array(t);for(let r=0;r<t;r++)n[r]=e[r];return n}return[]}function f(e,t){for(let r=1;r<arguments.length;r++){const t=arguments[r];var n=typeof t;if("array"==(n="object"!=n?n:t?Array.isArray(t)?"array":n:"null")||"object"==n&&"number"==typeof t.length){n=e.length||0;const r=t.length||0;e.length=n+r;for(let s=0;s<r;s++)e[n+s]=t[s]}else e.push(t)}}function p(e){i.setTimeout(()=>{throw e},0)}function m(){var e=_;let t=null;return e.g&&(t=e.g,e.g=e.g.next,e.g||(e.h=null),t.next=null),t}var g=new class{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return this.h>0?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}(()=>new y,e=>e.reset());class y{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}let v,w=!1,_=new class{constructor(){this.h=this.g=null}add(e,t){const n=g.get();n.set(e,t),this.h?this.h.next=n:this.g=n,this.h=n}},E=()=>{const e=Promise.resolve(void 0);v=()=>{e.then(T)}};function T(){for(var e;e=m();){try{e.h.call(e.g)}catch(n){p(n)}var t=g;t.j(e),t.h<100&&(t.h++,e.next=t.g,t.g=e)}w=!1}function I(){this.u=this.u,this.C=this.C}function b(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}I.prototype.u=!1,I.prototype.dispose=function(){this.u||(this.u=!0,this.N())},I.prototype[Symbol.dispose]=function(){this.dispose()},I.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()},b.prototype.h=function(){this.defaultPrevented=!0};var S=function(){if(!i.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{const e=()=>{};i.addEventListener("test",e,t),i.removeEventListener("test",e,t)}catch(n){}return e}();function C(e){return/^[\s\xa0]*$/.test(e)}function A(e,t){b.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e&&this.init(e,t)}h(A,b),A.prototype.init=function(e,t){const n=this.type=e.type,r=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;this.target=e.target||e.srcElement,this.g=t,(t=e.relatedTarget)||("mouseover"==n?t=e.fromElement:"mouseout"==n&&(t=e.toElement)),this.relatedTarget=t,r?(this.clientX=void 0!==r.clientX?r.clientX:r.pageX,this.clientY=void 0!==r.clientY?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType=e.pointerType,this.state=e.state,this.i=e,e.defaultPrevented&&A.Z.h.call(this)},A.prototype.h=function(){A.Z.h.call(this);const e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var k="closure_listenable_"+(1e6*Math.random()|0),N=0;function R(e,t,n,r,s){this.listener=e,this.proxy=null,this.src=t,this.type=n,this.capture=!!r,this.ha=s,this.key=++N,this.da=this.fa=!1}function D(e){e.da=!0,e.listener=null,e.proxy=null,e.src=null,e.ha=null}function O(e,t,n){for(const r in e)t.call(n,e[r],r,e)}function P(e){const t={};for(const n in e)t[n]=e[n];return t}const L="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function M(e,t){let n,r;for(let s=1;s<arguments.length;s++){for(n in r=arguments[s],r)e[n]=r[n];for(let t=0;t<L.length;t++)n=L[t],Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}}function x(e){this.src=e,this.g={},this.h=0}function U(e,t){const n=t.type;if(n in e.g){var r,s=e.g[n],i=Array.prototype.indexOf.call(s,t,void 0);(r=i>=0)&&Array.prototype.splice.call(s,i,1),r&&(D(t),0==e.g[n].length&&(delete e.g[n],e.h--))}}function V(e,t,n,r){for(let s=0;s<e.length;++s){const i=e[s];if(!i.da&&i.listener==t&&i.capture==!!n&&i.ha==r)return s}return-1}x.prototype.add=function(e,t,n,r,s){const i=e.toString();(e=this.g[i])||(e=this.g[i]=[],this.h++);const o=V(e,t,r,s);return o>-1?(t=e[o],n||(t.fa=!1)):((t=new R(t,this.src,i,!!r,s)).fa=n,e.push(t)),t};var F="closure_lm_"+(1e6*Math.random()|0),j={};function B(e,t,n,r,s){if(Array.isArray(t)){for(let i=0;i<t.length;i++)B(e,t[i],n,r,s);return null}return n=W(n),e&&e[k]?e.J(t,n,!!o(r)&&!!r.capture,s):function(e,t,n,r,s,i){if(!t)throw Error("Invalid event type");const a=o(s)?!!s.capture:!!s;let c=G(e);if(c||(e[F]=c=new x(e)),n=c.add(t,n,r,a,i),n.proxy)return n;if(r=function(){function e(n){return t.call(e.src,e.listener,n)}const t=H;return e}(),n.proxy=r,r.src=e,r.listener=n,e.addEventListener)S||(s=a),void 0===s&&(s=!1),e.addEventListener(t.toString(),r,s);else if(e.attachEvent)e.attachEvent(z(t.toString()),r);else{if(!e.addListener||!e.removeListener)throw Error("addEventListener and attachEvent are unavailable.");e.addListener(r)}return n}(e,t,n,!1,r,s)}function q(e,t,n,r,s){if(Array.isArray(t))for(var i=0;i<t.length;i++)q(e,t[i],n,r,s);else r=o(r)?!!r.capture:!!r,n=W(n),e&&e[k]?(e=e.i,(i=String(t).toString())in e.g&&((n=V(t=e.g[i],n,r,s))>-1&&(D(t[n]),Array.prototype.splice.call(t,n,1),0==t.length&&(delete e.g[i],e.h--)))):e&&(e=G(e))&&(t=e.g[t.toString()],e=-1,t&&(e=V(t,n,r,s)),(n=e>-1?t[e]:null)&&$(n))}function $(e){if("number"!=typeof e&&e&&!e.da){var t=e.src;if(t&&t[k])U(t.i,e);else{var n=e.type,r=e.proxy;t.removeEventListener?t.removeEventListener(n,r,e.capture):t.detachEvent?t.detachEvent(z(n),r):t.addListener&&t.removeListener&&t.removeListener(r),(n=G(t))?(U(n,e),0==n.h&&(n.src=null,t[F]=null)):D(e)}}}function z(e){return e in j?j[e]:j[e]="on"+e}function H(e,t){if(e.da)e=!0;else{t=new A(t,this);const n=e.listener,r=e.ha||e.src;e.fa&&$(e),e=n.call(r,t)}return e}function G(e){return(e=e[F])instanceof x?e:null}var K="__closure_events_fn_"+(1e9*Math.random()>>>0);function W(e){return"function"==typeof e?e:(e[K]||(e[K]=function(t){return e.handleEvent(t)}),e[K])}function Q(){I.call(this),this.i=new x(this),this.M=this,this.G=null}function X(e,t){var n,r=e.G;if(r)for(n=[];r;r=r.G)n.push(r);if(e=e.M,r=t.type||t,"string"==typeof t)t=new b(t,e);else if(t instanceof b)t.target=t.target||e;else{var s=t;M(t=new b(r,e),s)}let i,o;if(s=!0,n)for(o=n.length-1;o>=0;o--)i=t.g=n[o],s=Y(i,r,!0,t)&&s;if(i=t.g=e,s=Y(i,r,!0,t)&&s,s=Y(i,r,!1,t)&&s,n)for(o=0;o<n.length;o++)i=t.g=n[o],s=Y(i,r,!1,t)&&s}function Y(e,t,n,r){if(!(t=e.i.g[String(t)]))return!0;t=t.concat();let s=!0;for(let i=0;i<t.length;++i){const o=t[i];if(o&&!o.da&&o.capture==n){const t=o.listener,n=o.ha||o.src;o.fa&&U(e.i,o),s=!1!==t.call(n,r)&&s}}return s&&!r.defaultPrevented}function J(e){e.g=function(e,t){if("function"!=typeof e){if(!e||"function"!=typeof e.handleEvent)throw Error("Invalid listener argument");e=c(e.handleEvent,e)}return Number(t)>2147483647?-1:i.setTimeout(e,t||0)}(()=>{e.g=null,e.i&&(e.i=!1,J(e))},e.l);const t=e.h;e.h=null,e.m.apply(null,t)}h(Q,I),Q.prototype[k]=!0,Q.prototype.removeEventListener=function(e,t,n,r){q(this,e,t,n,r)},Q.prototype.N=function(){if(Q.Z.N.call(this),this.i){var e=this.i;for(const t in e.g){const n=e.g[t];for(let e=0;e<n.length;e++)D(n[e]);delete e.g[t],e.h--}}this.G=null},Q.prototype.J=function(e,t,n,r){return this.i.add(String(e),t,!1,n,r)},Q.prototype.K=function(e,t,n,r){return this.i.add(String(e),t,!0,n,r)};class Z extends I{constructor(e,t){super(),this.m=e,this.l=t,this.h=null,this.i=!1,this.g=null}j(e){this.h=arguments,this.g?this.i=!0:J(this)}N(){super.N(),this.g&&(i.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ee(e){I.call(this),this.h=e,this.g={}}h(ee,I);var te=[];function ne(e){O(e.g,function(e,t){this.g.hasOwnProperty(t)&&$(e)},e),e.g={}}ee.prototype.N=function(){ee.Z.N.call(this),ne(this)},ee.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var re=i.JSON.stringify,se=i.JSON.parse,ie=class{stringify(e){return i.JSON.stringify(e,void 0)}parse(e){return i.JSON.parse(e,void 0)}};function oe(){}function ae(){}var ce={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function ue(){b.call(this,"d")}function he(){b.call(this,"c")}h(ue,b),h(he,b);var le={},de=null;function fe(){return de=de||new Q}function pe(e){b.call(this,le.Ia,e)}function me(e){const t=fe();X(t,new pe(t))}function ge(e,t){b.call(this,le.STAT_EVENT,e),this.stat=t}function ye(e){const t=fe();X(t,new ge(t,e))}function ve(e,t){b.call(this,le.Ja,e),this.size=t}function we(e,t){if("function"!=typeof e)throw Error("Fn must not be null and must be a function");return i.setTimeout(function(){e()},t)}function _e(){this.g=!0}function Ee(e,t,n,r){e.info(function(){return"XMLHTTP TEXT ("+t+"): "+function(e,t){if(!e.g)return t;if(!t)return null;try{const i=JSON.parse(t);if(i)for(e=0;e<i.length;e++)if(Array.isArray(i[e])){var n=i[e];if(!(n.length<2)){var r=n[1];if(Array.isArray(r)&&!(r.length<1)){var s=r[0];if("noop"!=s&&"stop"!=s&&"close"!=s)for(let e=1;e<r.length;e++)r[e]=""}}}return re(i)}catch(i){return t}}(e,n)+(r?" "+r:"")})}le.Ia="serverreachability",h(pe,b),le.STAT_EVENT="statevent",h(ge,b),le.Ja="timingevent",h(ve,b),_e.prototype.ua=function(){this.g=!1},_e.prototype.info=function(){};var Te,Ie={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},be={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"};function Se(){}function Ce(e){return encodeURIComponent(String(e))}function Ae(e){var t=1;e=e.split(":");const n=[];for(;t>0&&e.length;)n.push(e.shift()),t--;return e.length&&n.push(e.join(":")),n}function ke(e,t,n,r){this.j=e,this.i=t,this.l=n,this.S=r||1,this.V=new ee(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Ne}function Ne(){this.i=null,this.g="",this.h=!1}h(Se,oe),Se.prototype.g=function(){return new XMLHttpRequest},Te=new Se;var Re={},De={};function Oe(e,t,n){e.M=1,e.A=rt(Je(t)),e.u=n,e.R=!0,Pe(e,null)}function Pe(e,t){e.F=Date.now(),xe(e),e.B=Je(e.A);var n=e.B,r=e.S;Array.isArray(r)||(r=[String(r)]),yt(n.i,"t",r),e.C=0,n=e.j.L,e.h=new Ne,e.g=rn(e.j,n?t:null,!e.u),e.P>0&&(e.O=new Z(c(e.Y,e,e.g),e.P)),t=e.V,n=e.g,r=e.ba;var s="readystatechange";Array.isArray(s)||(s&&(te[0]=s.toString()),s=te);for(let i=0;i<s.length;i++){const e=B(n,s[i],r||t.handleEvent,!1,t.h||t);if(!e)break;t.g[e.key]=e}t=e.J?P(e.J):{},e.u?(e.v||(e.v="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.ea(e.B,e.v,e.u,t)):(e.v="GET",e.g.ea(e.B,e.v,null,t)),me(),function(e,t,n,r,s,i){e.info(function(){if(e.g)if(i){var o="",a=i.split("&");for(let e=0;e<a.length;e++){var c=a[e].split("=");if(c.length>1){const e=c[0];c=c[1];const t=e.split("_");o=t.length>=2&&"type"==t[1]?o+(e+"=")+c+"&":o+(e+"=redacted&")}}}else o=null;else o=i;return"XMLHTTP REQ ("+r+") [attempt "+s+"]: "+t+"\n"+n+"\n"+o})}(e.i,e.v,e.B,e.l,e.S,e.u)}function Le(e){return!!e.g&&("GET"==e.v&&2!=e.M&&e.j.Aa)}function Me(e,t){var n=e.C,r=t.indexOf("\n",n);return-1==r?De:(n=Number(t.substring(n,r)),isNaN(n)?Re:(r+=1)+n>t.length?De:(t=t.slice(r,r+n),e.C=r+n,t))}function xe(e){e.T=Date.now()+e.H,Ue(e,e.H)}function Ue(e,t){if(null!=e.D)throw Error("WatchDog timer not null");e.D=we(c(e.aa,e),t)}function Ve(e){e.D&&(i.clearTimeout(e.D),e.D=null)}function Fe(e){0==e.j.I||e.K||Jt(e.j,e)}function je(e){Ve(e);var t=e.O;t&&"function"==typeof t.dispose&&t.dispose(),e.O=null,ne(e.V),e.g&&(t=e.g,e.g=null,t.abort(),t.dispose())}function Be(e,t){try{var n=e.j;if(0!=n.I&&(n.g==e||Ge(n.h,e)))if(!e.L&&Ge(n.h,e)&&3==n.I){try{var r=n.Ba.g.parse(t)}catch(h){r=null}if(Array.isArray(r)&&3==r.length){var s=r;if(0==s[0]){e:if(!n.v){if(n.g){if(!(n.g.F+3e3<e.F))break e;Yt(n),Bt(n)}Wt(n),ye(18)}}else n.xa=s[1],0<n.xa-n.K&&s[2]<37500&&n.F&&0==n.A&&!n.C&&(n.C=we(c(n.Va,n),6e3));He(n.h)<=1&&n.ta&&(n.ta=void 0)}else en(n,11)}else if((e.L||n.g==e)&&Yt(n),!C(t))for(s=n.Ba.g.parse(t),t=0;t<s.length;t++){let c=s[t];const h=c[0];if(!(h<=n.K))if(n.K=h,c=c[1],2==n.I)if("c"==c[0]){n.M=c[1],n.ba=c[2];const t=c[3];null!=t&&(n.ka=t,n.j.info("VER="+n.ka));const s=c[4];null!=s&&(n.za=s,n.j.info("SVER="+n.za));const h=c[5];null!=h&&"number"==typeof h&&h>0&&(r=1.5*h,n.O=r,n.j.info("backChannelRequestTimeoutMs_="+r)),r=n;const l=e.g;if(l){const e=l.g?l.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(e){var i=r.h;i.g||-1==e.indexOf("spdy")&&-1==e.indexOf("quic")&&-1==e.indexOf("h2")||(i.j=i.l,i.g=new Set,i.h&&(Ke(i,i.h),i.h=null))}if(r.G){const e=l.g?l.g.getResponseHeader("X-HTTP-Session-Id"):null;e&&(r.wa=e,nt(r.J,r.G,e))}}n.I=3,n.l&&n.l.ra(),n.aa&&(n.T=Date.now()-e.F,n.j.info("Handshake RTT: "+n.T+"ms"));var o=e;if((r=n).na=nn(r,r.L?r.ba:null,r.W),o.L){We(r.h,o);var a=o,u=r.O;u&&(a.H=u),a.D&&(Ve(a),xe(a)),r.g=o}else Kt(r);n.i.length>0&&$t(n)}else"stop"!=c[0]&&"close"!=c[0]||en(n,7);else 3==n.I&&("stop"==c[0]||"close"==c[0]?"stop"==c[0]?en(n,7):jt(n):"noop"!=c[0]&&n.l&&n.l.qa(c),n.A=0)}me()}catch(h){}}ke.prototype.ba=function(e){e=e.target;const t=this.O;t&&3==xt(e)?t.j():this.Y(e)},ke.prototype.Y=function(e){try{if(e==this.g)e:{const c=xt(this.g),u=this.g.ya();this.g.ca();if(!(c<3)&&(3!=c||this.g&&(this.h.h||this.g.la()||Ut(this.g)))){this.K||4!=c||7==u||me(),Ve(this);var t=this.g.ca();this.X=t;var n=function(e){if(!Le(e))return e.g.la();const t=Ut(e.g);if(""===t)return"";let n="";const r=t.length,s=4==xt(e.g);if(!e.h.i){if("undefined"==typeof TextDecoder)return je(e),Fe(e),"";e.h.i=new i.TextDecoder}for(let i=0;i<r;i++)e.h.h=!0,n+=e.h.i.decode(t[i],{stream:!(s&&i==r-1)});return t.length=0,e.h.g+=n,e.C=0,e.h.g}(this);if(this.o=200==t,function(e,t,n,r,s,i,o){e.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+s+"]: "+t+"\n"+n+"\n"+i+" "+o})}(this.i,this.v,this.B,this.l,this.S,c,t),this.o){if(this.U&&!this.L){t:{if(this.g){var r,s=this.g;if((r=s.g?s.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!C(r)){var o=r;break t}}o=null}if(!(e=o)){this.o=!1,this.m=3,ye(12),je(this),Fe(this);break e}Ee(this.i,this.l,e,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Be(this,e)}if(this.R){let t;for(e=!0;!this.K&&this.C<n.length;){if(t=Me(this,n),t==De){4==c&&(this.m=4,ye(14),e=!1),Ee(this.i,this.l,null,"[Incomplete Response]");break}if(t==Re){this.m=4,ye(15),Ee(this.i,this.l,n,"[Invalid Chunk]"),e=!1;break}Ee(this.i,this.l,t,null),Be(this,t)}if(Le(this)&&0!=this.C&&(this.h.g=this.h.g.slice(this.C),this.C=0),4!=c||0!=n.length||this.h.h||(this.m=1,ye(16),e=!1),this.o=this.o&&e,e){if(n.length>0&&!this.W){this.W=!0;var a=this.j;a.g==this&&a.aa&&!a.P&&(a.j.info("Great, no buffering proxy detected. Bytes received: "+n.length),Qt(a),a.P=!0,ye(11))}}else Ee(this.i,this.l,n,"[Invalid Chunked Response]"),je(this),Fe(this)}else Ee(this.i,this.l,n,null),Be(this,n);4==c&&je(this),this.o&&!this.K&&(4==c?Jt(this.j,this):(this.o=!1,xe(this)))}else(function(e){const t={};e=(e.g&&xt(e)>=2&&e.g.getAllResponseHeaders()||"").split("\r\n");for(let r=0;r<e.length;r++){if(C(e[r]))continue;var n=Ae(e[r]);const s=n[0];if("string"!=typeof(n=n[1]))continue;n=n.trim();const i=t[s]||[];t[s]=i,i.push(n)}!function(e,t){for(const n in e)t.call(void 0,e[n],n,e)}(t,function(e){return e.join(", ")})})(this.g),400==t&&n.indexOf("Unknown SID")>0?(this.m=3,ye(12)):(this.m=0,ye(13)),je(this),Fe(this)}}}catch(c){}},ke.prototype.cancel=function(){this.K=!0,je(this)},ke.prototype.aa=function(){this.D=null;const e=Date.now();e-this.T>=0?(function(e,t){e.info(function(){return"TIMEOUT: "+t})}(this.i,this.B),2!=this.M&&(me(),ye(17)),je(this),this.m=2,Fe(this)):Ue(this,this.T-e)};var qe=class{constructor(e,t){this.g=e,this.map=t}};function $e(e){this.l=e||10,i.PerformanceNavigationTiming?e=(e=i.performance.getEntriesByType("navigation")).length>0&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol):e=!!(i.chrome&&i.chrome.loadTimes&&i.chrome.loadTimes()&&i.chrome.loadTimes().wasFetchedViaSpdy),this.j=e?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function ze(e){return!!e.h||!!e.g&&e.g.size>=e.j}function He(e){return e.h?1:e.g?e.g.size:0}function Ge(e,t){return e.h?e.h==t:!!e.g&&e.g.has(t)}function Ke(e,t){e.g?e.g.add(t):e.h=t}function We(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}function Qe(e){if(null!=e.h)return e.i.concat(e.h.G);if(null!=e.g&&0!==e.g.size){let t=e.i;for(const n of e.g.values())t=t.concat(n.G);return t}return d(e.i)}$e.prototype.cancel=function(){if(this.i=Qe(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const e of this.g.values())e.cancel();this.g.clear()}};var Xe=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Ye(e){let t;this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1,e instanceof Ye?(this.l=e.l,Ze(this,e.j),this.o=e.o,this.g=e.g,et(this,e.u),this.h=e.h,tt(this,vt(e.i)),this.m=e.m):e&&(t=String(e).match(Xe))?(this.l=!1,Ze(this,t[1]||"",!0),this.o=st(t[2]||""),this.g=st(t[3]||"",!0),et(this,t[4]),this.h=st(t[5]||"",!0),tt(this,t[6]||"",!0),this.m=st(t[7]||"")):(this.l=!1,this.i=new dt(null,this.l))}function Je(e){return new Ye(e)}function Ze(e,t,n){e.j=n?st(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function et(e,t){if(t){if(t=Number(t),isNaN(t)||t<0)throw Error("Bad port number "+t);e.u=t}else e.u=null}function tt(e,t,n){t instanceof dt?(e.i=t,function(e,t){t&&!e.j&&(ft(e),e.i=null,e.g.forEach(function(e,t){const n=t.toLowerCase();t!=n&&(pt(this,t),yt(this,n,e))},e)),e.j=t}(e.i,e.l)):(n||(t=it(t,ht)),e.i=new dt(t,e.l))}function nt(e,t,n){e.i.set(t,n)}function rt(e){return nt(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function st(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function it(e,t,n){return"string"==typeof e?(e=encodeURI(e).replace(t,ot),n&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function ot(e){return"%"+((e=e.charCodeAt(0))>>4&15).toString(16)+(15&e).toString(16)}Ye.prototype.toString=function(){const e=[];var t=this.j;t&&e.push(it(t,at,!0),":");var n=this.g;return(n||"file"==t)&&(e.push("//"),(t=this.o)&&e.push(it(t,at,!0),"@"),e.push(Ce(n).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.u)&&e.push(":",String(n))),(n=this.h)&&(this.g&&"/"!=n.charAt(0)&&e.push("/"),e.push(it(n,"/"==n.charAt(0)?ut:ct,!0))),(n=this.i.toString())&&e.push("?",n),(n=this.m)&&e.push("#",it(n,lt)),e.join("")},Ye.prototype.resolve=function(e){const t=Je(this);let n=!!e.j;n?Ze(t,e.j):n=!!e.o,n?t.o=e.o:n=!!e.g,n?t.g=e.g:n=null!=e.u;var r=e.h;if(n)et(t,e.u);else if(n=!!e.h){if("/"!=r.charAt(0))if(this.g&&!this.h)r="/"+r;else{var s=t.h.lastIndexOf("/");-1!=s&&(r=t.h.slice(0,s+1)+r)}if(".."==(s=r)||"."==s)r="";else if(-1!=s.indexOf("./")||-1!=s.indexOf("/.")){r=0==s.lastIndexOf("/",0),s=s.split("/");const e=[];for(let t=0;t<s.length;){const n=s[t++];"."==n?r&&t==s.length&&e.push(""):".."==n?((e.length>1||1==e.length&&""!=e[0])&&e.pop(),r&&t==s.length&&e.push("")):(e.push(n),r=!0)}r=e.join("/")}else r=s}return n?t.h=r:n=""!==e.i.toString(),n?tt(t,vt(e.i)):n=!!e.m,n&&(t.m=e.m),t};var at=/[#\/\?@]/g,ct=/[#\?:]/g,ut=/[#\?]/g,ht=/[#\?@]/g,lt=/#/g;function dt(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function ft(e){e.g||(e.g=new Map,e.h=0,e.i&&function(e,t){if(e){e=e.split("&");for(let n=0;n<e.length;n++){const r=e[n].indexOf("=");let s,i=null;r>=0?(s=e[n].substring(0,r),i=e[n].substring(r+1)):s=e[n],t(s,i?decodeURIComponent(i.replace(/\+/g," ")):"")}}}(e.i,function(t,n){e.add(decodeURIComponent(t.replace(/\+/g," ")),n)}))}function pt(e,t){ft(e),t=wt(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function mt(e,t){return ft(e),t=wt(e,t),e.g.has(t)}function gt(e,t){ft(e);let n=[];if("string"==typeof t)mt(e,t)&&(n=n.concat(e.g.get(wt(e,t))));else for(e=Array.from(e.g.values()),t=0;t<e.length;t++)n=n.concat(e[t]);return n}function yt(e,t,n){pt(e,t),n.length>0&&(e.i=null,e.g.set(wt(e,t),d(n)),e.h+=n.length)}function vt(e){const t=new dt;return t.i=e.i,e.g&&(t.g=new Map(e.g),t.h=e.h),t}function wt(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}function _t(e,t,n,r,s){try{s&&(s.onload=null,s.onerror=null,s.onabort=null,s.ontimeout=null),r(n)}catch(i){}}function Et(){this.g=new ie}function Tt(e){this.i=e.Sb||null,this.h=e.ab||!1}function It(e,t){Q.call(this),this.H=e,this.o=t,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}function bt(e){e.j.read().then(e.Ma.bind(e)).catch(e.ga.bind(e))}function St(e){e.readyState=4,e.l=null,e.j=null,e.B=null,Ct(e)}function Ct(e){e.onreadystatechange&&e.onreadystatechange.call(e)}function At(e){let t="";return O(e,function(e,n){t+=n,t+=":",t+=e,t+="\r\n"}),t}function kt(e,t,n){e:{for(r in n){var r=!1;break e}r=!0}r||(n=At(n),"string"==typeof e?null!=n&&Ce(n):nt(e,t,n))}function Nt(e){Q.call(this),this.headers=new Map,this.L=e||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}(e=dt.prototype).add=function(e,t){ft(this),this.i=null,e=wt(this,e);let n=this.g.get(e);return n||this.g.set(e,n=[]),n.push(t),this.h+=1,this},e.forEach=function(e,t){ft(this),this.g.forEach(function(n,r){n.forEach(function(n){e.call(t,n,r,this)},this)},this)},e.set=function(e,t){return ft(this),this.i=null,mt(this,e=wt(this,e))&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},e.get=function(e,t){return e&&(e=gt(this,e)).length>0?String(e[0]):t},e.toString=function(){if(this.i)return this.i;if(!this.g)return"";const e=[],t=Array.from(this.g.keys());for(let r=0;r<t.length;r++){var n=t[r];const s=Ce(n);n=gt(this,n);for(let t=0;t<n.length;t++){let r=s;""!==n[t]&&(r+="="+Ce(n[t])),e.push(r)}}return this.i=e.join("&")},h(Tt,oe),Tt.prototype.g=function(){return new It(this.i,this.h)},h(It,Q),(e=It.prototype).open=function(e,t){if(0!=this.readyState)throw this.abort(),Error("Error reopening a connection");this.F=e,this.D=t,this.readyState=1,Ct(this)},e.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const t={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};e&&(t.body=e),(this.H||i).fetch(new Request(this.D,t)).then(this.Pa.bind(this),this.ga.bind(this))},e.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&4!=this.readyState&&(this.g=!1,St(this)),this.readyState=0},e.Pa=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,Ct(this)),this.g&&(this.readyState=3,Ct(this),this.g)))if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(void 0!==i.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;bt(this)}else e.text().then(this.Oa.bind(this),this.ga.bind(this))},e.Ma=function(e){if(this.g){if(this.o&&e.value)this.response.push(e.value);else if(!this.o){var t=e.value?e.value:new Uint8Array(0);(t=this.B.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?St(this):Ct(this),3==this.readyState&&bt(this)}},e.Oa=function(e){this.g&&(this.response=this.responseText=e,St(this))},e.Na=function(e){this.g&&(this.response=e,St(this))},e.ga=function(){this.g&&St(this)},e.setRequestHeader=function(e,t){this.A.append(e,t)},e.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},e.getAllResponseHeaders=function(){if(!this.h)return"";const e=[],t=this.h.entries();for(var n=t.next();!n.done;)n=n.value,e.push(n[0]+": "+n[1]),n=t.next();return e.join("\r\n")},Object.defineProperty(It.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}}),h(Nt,Q);var Rt=/^https?$/i,Dt=["POST","PUT"];function Ot(e,t){e.h=!1,e.g&&(e.j=!0,e.g.abort(),e.j=!1),e.l=t,e.o=5,Pt(e),Mt(e)}function Pt(e){e.A||(e.A=!0,X(e,"complete"),X(e,"error"))}function Lt(e){if(e.h&&void 0!==s)if(e.v&&4==xt(e))setTimeout(e.Ca.bind(e),0);else if(X(e,"readystatechange"),4==xt(e)){e.h=!1;try{const s=e.ca();e:switch(s){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t=!0;break e;default:t=!1}var n;if(!(n=t)){var r;if(r=0===s){let t=String(e.D).match(Xe)[1]||null;!t&&i.self&&i.self.location&&(t=i.self.location.protocol.slice(0,-1)),r=!Rt.test(t?t.toLowerCase():"")}n=r}if(n)X(e,"complete"),X(e,"success");else{e.o=6;try{var o=xt(e)>2?e.g.statusText:""}catch(a){o=""}e.l=o+" ["+e.ca()+"]",Pt(e)}}finally{Mt(e)}}}function Mt(e,t){if(e.g){e.m&&(clearTimeout(e.m),e.m=null);const r=e.g;e.g=null,t||X(e,"ready");try{r.onreadystatechange=null}catch(n){}}}function xt(e){return e.g?e.g.readyState:0}function Ut(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.F){case"":case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(t){return null}}function Vt(e,t,n){return n&&n.internalChannelParams&&n.internalChannelParams[e]||t}function Ft(e){this.za=0,this.i=[],this.j=new _e,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Vt("failFast",!1,e),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Vt("baseRetryDelayMs",5e3,e),this.Za=Vt("retryDelaySeedMs",1e4,e),this.Ta=Vt("forwardChannelMaxRetries",2,e),this.va=Vt("forwardChannelRequestTimeoutMs",2e4,e),this.ma=e&&e.xmlHttpFactory||void 0,this.Ua=e&&e.Rb||void 0,this.Aa=e&&e.useFetchStreams||!1,this.O=void 0,this.L=e&&e.supportsCrossDomainXhr||!1,this.M="",this.h=new $e(e&&e.concurrentRequestLimit),this.Ba=new Et,this.S=e&&e.fastHandshake||!1,this.R=e&&e.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=e&&e.Pb||!1,e&&e.ua&&this.j.ua(),e&&e.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&e&&e.detectBufferingProxy||!1,this.ia=void 0,e&&e.longPollingTimeout&&e.longPollingTimeout>0&&(this.ia=e.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}function jt(e){if(qt(e),3==e.I){var t=e.V++,n=Je(e.J);if(nt(n,"SID",e.M),nt(n,"RID",t),nt(n,"TYPE","terminate"),Ht(e,n),(t=new ke(e,e.j,t)).M=2,t.A=rt(Je(n)),n=!1,i.navigator&&i.navigator.sendBeacon)try{n=i.navigator.sendBeacon(t.A.toString(),"")}catch(r){}!n&&i.Image&&((new Image).src=t.A,n=!0),n||(t.g=rn(t.j,null),t.g.ea(t.A)),t.F=Date.now(),xe(t)}tn(e)}function Bt(e){e.g&&(Qt(e),e.g.cancel(),e.g=null)}function qt(e){Bt(e),e.v&&(i.clearTimeout(e.v),e.v=null),Yt(e),e.h.cancel(),e.m&&("number"==typeof e.m&&i.clearTimeout(e.m),e.m=null)}function $t(e){if(!ze(e.h)&&!e.m){e.m=!0;var t=e.Ea;v||E(),w||(v(),w=!0),_.add(t,e),e.D=0}}function zt(e,t){var n;n=t?t.l:e.V++;const r=Je(e.J);nt(r,"SID",e.M),nt(r,"RID",n),nt(r,"AID",e.K),Ht(e,r),e.u&&e.o&&kt(r,e.u,e.o),n=new ke(e,e.j,n,e.D+1),null===e.u&&(n.J=e.o),t&&(e.i=t.G.concat(e.i)),t=Gt(e,n,1e3),n.H=Math.round(.5*e.va)+Math.round(.5*e.va*Math.random()),Ke(e.h,n),Oe(n,r,t)}function Ht(e,t){e.H&&O(e.H,function(e,n){nt(t,n,e)}),e.l&&O({},function(e,n){nt(t,n,e)})}function Gt(e,t,n){n=Math.min(e.i.length,n);const r=e.l?c(e.l.Ka,e.l,e):null;e:{var s=e.i;let t=-1;for(;;){const e=["count="+n];-1==t?n>0?(t=s[0].g,e.push("ofs="+t)):t=0:e.push("ofs="+t);let c=!0;for(let h=0;h<n;h++){var i=s[h].g;const n=s[h].map;if((i-=t)<0)t=Math.max(0,s[h].g-100),c=!1;else try{i="req"+i+"_"||"";try{var a=n instanceof Map?n:Object.entries(n);for(const[t,n]of a){let r=n;o(n)&&(r=re(n)),e.push(i+t+"="+encodeURIComponent(r))}}catch(u){throw e.push(i+"type="+encodeURIComponent("_badmap")),u}}catch(u){r&&r(n)}}if(c){a=e.join("&");break e}}a=void 0}return e=e.i.splice(0,n),t.G=e,a}function Kt(e){if(!e.g&&!e.v){e.Y=1;var t=e.Da;v||E(),w||(v(),w=!0),_.add(t,e),e.A=0}}function Wt(e){return!(e.g||e.v||e.A>=3)&&(e.Y++,e.v=we(c(e.Da,e),Zt(e,e.A)),e.A++,!0)}function Qt(e){null!=e.B&&(i.clearTimeout(e.B),e.B=null)}function Xt(e){e.g=new ke(e,e.j,"rpc",e.Y),null===e.u&&(e.g.J=e.o),e.g.P=0;var t=Je(e.na);nt(t,"RID","rpc"),nt(t,"SID",e.M),nt(t,"AID",e.K),nt(t,"CI",e.F?"0":"1"),!e.F&&e.ia&&nt(t,"TO",e.ia),nt(t,"TYPE","xmlhttp"),Ht(e,t),e.u&&e.o&&kt(t,e.u,e.o),e.O&&(e.g.H=e.O);var n=e.g;e=e.ba,n.M=1,n.A=rt(Je(t)),n.u=null,n.R=!0,Pe(n,e)}function Yt(e){null!=e.C&&(i.clearTimeout(e.C),e.C=null)}function Jt(e,t){var n=null;if(e.g==t){Yt(e),Qt(e),e.g=null;var r=2}else{if(!Ge(e.h,t))return;n=t.G,We(e.h,t),r=1}if(0!=e.I)if(t.o)if(1==r){n=t.u?t.u.length:0,t=Date.now()-t.F;var s=e.D;X(r=fe(),new ve(r,n)),$t(e)}else Kt(e);else if(3==(s=t.m)||0==s&&t.X>0||!(1==r&&function(e,t){return!(He(e.h)>=e.h.j-(e.m?1:0)||(e.m?(e.i=t.G.concat(e.i),0):1==e.I||2==e.I||e.D>=(e.Sa?0:e.Ta)||(e.m=we(c(e.Ea,e,t),Zt(e,e.D)),e.D++,0)))}(e,t)||2==r&&Wt(e)))switch(n&&n.length>0&&(t=e.h,t.i=t.i.concat(n)),s){case 1:en(e,5);break;case 4:en(e,10);break;case 3:en(e,6);break;default:en(e,2)}}function Zt(e,t){let n=e.Qa+Math.floor(Math.random()*e.Za);return e.isActive()||(n*=2),n*t}function en(e,t){if(e.j.info("Error code "+t),2==t){var n=c(e.bb,e),r=e.Ua;const t=!r;r=new Ye(r||"//www.google.com/images/cleardot.gif"),i.location&&"http"==i.location.protocol||Ze(r,"https"),rt(r),t?function(e,t){const n=new _e;if(i.Image){const r=new Image;r.onload=u(_t,n,"TestLoadImage: loaded",!0,t,r),r.onerror=u(_t,n,"TestLoadImage: error",!1,t,r),r.onabort=u(_t,n,"TestLoadImage: abort",!1,t,r),r.ontimeout=u(_t,n,"TestLoadImage: timeout",!1,t,r),i.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=e}else t(!1)}(r.toString(),n):function(e,t){new _e;const n=new AbortController,r=setTimeout(()=>{n.abort(),_t(0,0,!1,t)},1e4);fetch(e,{signal:n.signal}).then(e=>{clearTimeout(r),e.ok?_t(0,0,!0,t):_t(0,0,!1,t)}).catch(()=>{clearTimeout(r),_t(0,0,!1,t)})}(r.toString(),n)}else ye(2);e.I=0,e.l&&e.l.pa(t),tn(e),qt(e)}function tn(e){if(e.I=0,e.ja=[],e.l){const t=Qe(e.h);0==t.length&&0==e.i.length||(f(e.ja,t),f(e.ja,e.i),e.h.i.length=0,d(e.i),e.i.length=0),e.l.oa()}}function nn(e,t,n){var r=n instanceof Ye?Je(n):new Ye(n);if(""!=r.g)t&&(r.g=t+"."+r.g),et(r,r.u);else{var s=i.location;r=s.protocol,t=t?t+"."+s.hostname:s.hostname,s=+s.port;const e=new Ye(null);r&&Ze(e,r),t&&(e.g=t),s&&et(e,s),n&&(e.h=n),r=e}return n=e.G,t=e.wa,n&&t&&nt(r,n,t),nt(r,"VER",e.ka),Ht(e,r),r}function rn(e,t,n){if(t&&!e.L)throw Error("Can't create secondary domain capable XhrIo object.");return(t=e.Aa&&!e.ma?new Nt(new Tt({ab:n})):new Nt(e.ma)).Fa(e.L),t}function sn(){}function on(){}function an(e,t){Q.call(this),this.g=new Ft(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.o=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.sa&&(e?e["X-WebChannel-Client-Profile"]=t.sa:e={"X-WebChannel-Client-Profile":t.sa}),this.g.U=e,(e=t&&t.Qb)&&!C(e)&&(this.g.u=e),this.A=t&&t.supportsCrossDomainXhr||!1,this.v=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!C(t)&&(this.g.G=t,null!==(e=this.h)&&t in e&&(t in(e=this.h)&&delete e[t])),this.j=new hn(this)}function cn(e){ue.call(this),e.__headers__&&(this.headers=e.__headers__,this.statusCode=e.__status__,delete e.__headers__,delete e.__status__);var t=e.__sm__;if(t){e:{for(const n in t){e=n;break e}e=void 0}(this.i=e)&&(e=this.i,t=null!==t&&e in t?t[e]:void 0),this.data=t}else this.data=e}function un(){he.call(this),this.status=1}function hn(e){this.g=e}(e=Nt.prototype).Fa=function(e){this.H=e},e.ea=function(e,t,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+e);t=t?t.toUpperCase():"GET",this.D=e,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Te.g(),this.g.onreadystatechange=l(c(this.Ca,this));try{this.B=!0,this.g.open(t,String(e),!0),this.B=!1}catch(o){return void Ot(this,o)}if(e=n||"",n=new Map(this.headers),r)if(Object.getPrototypeOf(r)===Object.prototype)for(var s in r)n.set(s,r[s]);else{if("function"!=typeof r.keys||"function"!=typeof r.get)throw Error("Unknown input type for opt_headers: "+String(r));for(const e of r.keys())n.set(e,r.get(e))}r=Array.from(n.keys()).find(e=>"content-type"==e.toLowerCase()),s=i.FormData&&e instanceof i.FormData,!(Array.prototype.indexOf.call(Dt,t,void 0)>=0)||r||s||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[i,a]of n)this.g.setRequestHeader(i,a);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(e),this.v=!1}catch(o){Ot(this,o)}},e.abort=function(e){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=e||7,X(this,"complete"),X(this,"abort"),Mt(this))},e.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Mt(this,!0)),Nt.Z.N.call(this)},e.Ca=function(){this.u||(this.B||this.v||this.j?Lt(this):this.Xa())},e.Xa=function(){Lt(this)},e.isActive=function(){return!!this.g},e.ca=function(){try{return xt(this)>2?this.g.status:-1}catch(e){return-1}},e.la=function(){try{return this.g?this.g.responseText:""}catch(e){return""}},e.La=function(e){if(this.g){var t=this.g.responseText;return e&&0==t.indexOf(e)&&(t=t.substring(e.length)),se(t)}},e.ya=function(){return this.o},e.Ha=function(){return"string"==typeof this.l?this.l:String(this.l)},(e=Ft.prototype).ka=8,e.I=1,e.connect=function(e,t,n,r){ye(0),this.W=e,this.H=t||{},n&&void 0!==r&&(this.H.OSID=n,this.H.OAID=r),this.F=this.X,this.J=nn(this,null,this.W),$t(this)},e.Ea=function(e){if(this.m)if(this.m=null,1==this.I){if(!e){this.V=Math.floor(1e5*Math.random()),e=this.V++;const s=new ke(this,this.j,e);let i=this.o;if(this.U&&(i?(i=P(i),M(i,this.U)):i=this.U),null!==this.u||this.R||(s.J=i,i=null),this.S)e:{for(var t=0,n=0;n<this.i.length;n++){var r=this.i[n];if(void 0===(r="__data__"in r.map&&"string"==typeof(r=r.map.__data__)?r.length:void 0))break;if((t+=r)>4096){t=n;break e}if(4096===t||n===this.i.length-1){t=n+1;break e}}t=1e3}else t=1e3;t=Gt(this,s,t),nt(n=Je(this.J),"RID",e),nt(n,"CVER",22),this.G&&nt(n,"X-HTTP-Session-Id",this.G),Ht(this,n),i&&(this.R?t="headers="+Ce(At(i))+"&"+t:this.u&&kt(n,this.u,i)),Ke(this.h,s),this.Ra&&nt(n,"TYPE","init"),this.S?(nt(n,"$req",t),nt(n,"SID","null"),s.U=!0,Oe(s,n,null)):Oe(s,n,t),this.I=2}}else 3==this.I&&(e?zt(this,e):0==this.i.length||ze(this.h)||zt(this))},e.Da=function(){if(this.v=null,Xt(this),this.aa&&!(this.P||null==this.g||this.T<=0)){var e=4*this.T;this.j.info("BP detection timer enabled: "+e),this.B=we(c(this.Wa,this),e)}},e.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,ye(10),Bt(this),Xt(this))},e.Va=function(){null!=this.C&&(this.C=null,Bt(this),Wt(this),ye(19))},e.bb=function(e){e?(this.j.info("Successfully pinged google.com"),ye(2)):(this.j.info("Failed to ping google.com"),ye(1))},e.isActive=function(){return!!this.l&&this.l.isActive(this)},(e=sn.prototype).ra=function(){},e.qa=function(){},e.pa=function(){},e.oa=function(){},e.isActive=function(){return!0},e.Ka=function(){},on.prototype.g=function(e,t){return new an(e,t)},h(an,Q),an.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},an.prototype.close=function(){jt(this.g)},an.prototype.o=function(e){var t=this.g;if("string"==typeof e){var n={};n.__data__=e,e=n}else this.v&&((n={}).__data__=re(e),e=n);t.i.push(new qe(t.Ya++,e)),3==t.I&&$t(t)},an.prototype.N=function(){this.g.l=null,delete this.j,jt(this.g),delete this.g,an.Z.N.call(this)},h(cn,ue),h(un,he),h(hn,sn),hn.prototype.ra=function(){X(this.g,"a")},hn.prototype.qa=function(e){X(this.g,new cn(e))},hn.prototype.pa=function(e){X(this.g,new un)},hn.prototype.oa=function(){X(this.g,"b")},on.prototype.createWebChannel=on.prototype.g,an.prototype.send=an.prototype.o,an.prototype.open=an.prototype.m,an.prototype.close=an.prototype.close,bs=function(){return new on},Is=function(){return fe()},Ts=le,Es={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Ie.NO_ERROR=0,Ie.TIMEOUT=8,Ie.HTTP_ERROR=6,_s=Ie,be.COMPLETE="complete",ws=be,ae.EventType=ce,ce.OPEN="a",ce.CLOSE="b",ce.ERROR="c",ce.MESSAGE="d",Q.prototype.listen=Q.prototype.J,vs=ae,Nt.prototype.listenOnce=Nt.prototype.K,Nt.prototype.getLastError=Nt.prototype.Ha,Nt.prototype.getLastErrorCode=Nt.prototype.ya,Nt.prototype.getStatus=Nt.prototype.ca,Nt.prototype.getResponseJson=Nt.prototype.La,Nt.prototype.getResponseText=Nt.prototype.la,Nt.prototype.send=Nt.prototype.ea,Nt.prototype.setWithCredentials=Nt.prototype.Fa,ys=Nt}).apply(void 0!==Ss?Ss:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});const Cs="@firebase/firestore",As="4.9.3";
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class ks{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ks.UNAUTHENTICATED=new ks(null),ks.GOOGLE_CREDENTIALS=new ks("google-credentials-uid"),ks.FIRST_PARTY=new ks("first-party-uid"),ks.MOCK_USER=new ks("mock-user");
/**
 * @license
 * Copyright 2017 Google LLC
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
let Ns="12.7.0";
/**
 * @license
 * Copyright 2017 Google LLC
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
 */const Rs=new q("@firebase/firestore");function Ds(){return Rs.logLevel}function Os(e,...t){if(Rs.logLevel<=x.DEBUG){const n=t.map(Ms);Rs.debug(`Firestore (${Ns}): ${e}`,...n)}}function Ps(e,...t){if(Rs.logLevel<=x.ERROR){const n=t.map(Ms);Rs.error(`Firestore (${Ns}): ${e}`,...n)}}function Ls(e,...t){if(Rs.logLevel<=x.WARN){const n=t.map(Ms);Rs.warn(`Firestore (${Ns}): ${e}`,...n)}}function Ms(e){if("string"==typeof e)return e;try{
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
return t=e,JSON.stringify(t)}catch(n){return e}var t}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */function xs(e,t,n){let r="Unexpected state";"string"==typeof t?r=t:n=t,Us(e,r,n)}function Us(e,t,n){let r=`FIRESTORE (${Ns}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;if(void 0!==n)try{r+=" CONTEXT: "+JSON.stringify(n)}catch(s){r+=" CONTEXT: "+n}throw Ps(r),new Error(r)}function Vs(e,t,n,r){let s="Unexpected state";"string"==typeof n?s=n:r=n,e||Us(t,s,r)}function Fs(e,t){return e}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */const js={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Bs extends E{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class qs{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class $s{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class zs{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(ks.UNAUTHENTICATED))}shutdown(){}}class Hs{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Gs{constructor(e){this.t=e,this.currentUser=ks.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Vs(void 0===this.o,42304);let n=this.i;const r=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve();let s=new qs;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new qs,e.enqueueRetryable(()=>r(this.currentUser))};const i=()=>{const t=s;e.enqueueRetryable(async()=>{await t.promise,await r(this.currentUser)})},o=e=>{Os("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.o&&(this.auth.addAuthTokenListener(this.o),i())};this.t.onInit(e=>o(e)),setTimeout(()=>{if(!this.auth){const e=this.t.getImmediate({optional:!0});e?o(e):(Os("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new qs)}},0),i()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(Os("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(Vs("string"==typeof t.accessToken,31837,{l:t}),new $s(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Vs(null===e||"string"==typeof e,2055,{h:e}),new ks(e)}}class Ks{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=ks.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Ws{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new Ks(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(ks.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Qs{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Xs{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,$e(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){Vs(void 0===this.o,3512);const n=e=>{null!=e.error&&Os("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);const n=e.token!==this.m;return this.m=e.token,Os("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>n(t))};const r=e=>{Os("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(e=>r(e)),setTimeout(()=>{if(!this.appCheck){const e=this.V.getImmediate({optional:!0});e?r(e):Os("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Qs(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?(Vs("string"==typeof e.token,44558,{tokenResult:e}),this.m=e.token,new Qs(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}
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
 */function Ys(e){const t="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(n);else for(let r=0;r<e;r++)n[r]=Math.floor(256*Math.random());return n}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class Js{static newId(){const e=62*Math.floor(256/62);let t="";for(;t.length<20;){const n=Ys(40);for(let r=0;r<n.length;++r)t.length<20&&n[r]<e&&(t+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(n[r]%62))}return t}}function Zs(e,t){return e<t?-1:e>t?1:0}function ei(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=e.charAt(r),s=t.charAt(r);if(n!==s)return ri(n)===ri(s)?Zs(n,s):ri(n)?1:-1}return Zs(e.length,t.length)}const ti=55296,ni=57343;function ri(e){const t=e.charCodeAt(0);return t>=ti&&t<=ni}function si(e,t,n){return e.length===t.length&&e.every((e,r)=>n(e,t[r]))}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */const ii="__name__";class oi{constructor(e,t,n){void 0===t?t=0:t>e.length&&xs(637,{offset:t,range:e.length}),void 0===n?n=e.length-t:n>e.length-t&&xs(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===oi.comparator(this,e)}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof oi?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=oi.compareSegments(e.get(r),t.get(r));if(0!==n)return n}return Zs(e.length,t.length)}static compareSegments(e,t){const n=oi.isNumericId(e),r=oi.isNumericId(t);return n&&!r?-1:!n&&r?1:n&&r?oi.extractNumericId(e).compare(oi.extractNumericId(t)):ei(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return ps.fromString(e.substring(4,e.length-2))}}class ai extends oi{construct(e,t,n){return new ai(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new Bs(js.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(e=>e.length>0))}return new ai(t)}static emptyPath(){return new ai([])}}const ci=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ui extends oi{construct(e,t,n){return new ui(e,t,n)}static isValidIdentifier(e){return ci.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ui.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===ii}static keyField(){return new ui([ii])}static fromServerFormat(e){const t=[];let n="",r=0;const s=()=>{if(0===n.length)throw new Bs(js.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let i=!1;for(;r<e.length;){const t=e[r];if("\\"===t){if(r+1===e.length)throw new Bs(js.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const t=e[r+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new Bs(js.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,r+=2}else"`"===t?(i=!i,r++):"."!==t||i?(n+=t,r++):(s(),r++)}if(s(),i)throw new Bs(js.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ui(t)}static emptyPath(){return new ui([])}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class hi{constructor(e){this.path=e}static fromPath(e){return new hi(ai.fromString(e))}static fromName(e){return new hi(ai.fromString(e).popFirst(5))}static empty(){return new hi(ai.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===ai.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return ai.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new hi(new ai(e.slice()))}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */function li(e,t,n){if(!n)throw new Bs(js.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function di(e){if(!hi.isDocumentKey(e))throw new Bs(js.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function fi(e){if(hi.isDocumentKey(e))throw new Bs(js.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function pi(e){return"object"==typeof e&&null!==e&&(Object.getPrototypeOf(e)===Object.prototype||null===Object.getPrototypeOf(e))}function mi(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{const n=(t=e).constructor?t.constructor.name:null;return n?`a custom ${n} object`:"an object"}}var t;return"function"==typeof e?"a function":xs(12329,{type:typeof e})}function gi(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new Bs(js.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=mi(e);throw new Bs(js.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}
/**
 * @license
 * Copyright 2025 Google LLC
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
function yi(e,t){const n={typeString:e};return t&&(n.value=t),n}function vi(e,t){if(!pi(e))throw new Bs(js.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in t)if(t[r]){const s=t[r].typeString,i="value"in t[r]?{value:t[r].value}:void 0;if(!(r in e)){n=`JSON missing required field: '${r}'`;break}const o=e[r];if(s&&typeof o!==s){n=`JSON field '${r}' must be a ${s}.`;break}if(void 0!==i&&o!==i.value){n=`Expected '${r}' field to equal '${i.value}'`;break}}if(n)throw new Bs(js.INVALID_ARGUMENT,n);return!0}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */const wi=-62135596800,_i=1e6;class Ei{static now(){return Ei.fromMillis(Date.now())}static fromDate(e){return Ei.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*_i);return new Ei(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new Bs(js.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new Bs(js.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<wi)throw new Bs(js.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new Bs(js.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/_i}_compareTo(e){return this.seconds===e.seconds?Zs(this.nanoseconds,e.nanoseconds):Zs(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Ei._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(vi(e,Ei._jsonSchema))return new Ei(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-wi;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Ei._jsonSchemaVersion="firestore/timestamp/1.0",Ei._jsonSchema={type:yi("string",Ei._jsonSchemaVersion),seconds:yi("number"),nanoseconds:yi("number")};
/**
 * @license
 * Copyright 2017 Google LLC
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
class Ti{static fromTimestamp(e){return new Ti(e)}static min(){return new Ti(new Ei(0,0))}static max(){return new Ti(new Ei(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
/**
 * @license
 * Copyright 2021 Google LLC
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
 */function Ii(e){return new bi(e.readTime,e.key,-1)}class bi{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new bi(Ti.min(),hi.empty(),-1)}static max(){return new bi(Ti.max(),hi.empty(),-1)}}function Si(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:(n=hi.comparator(e.documentKey,t.documentKey),0!==n?n:Zs(e.largestBatchId,t.largestBatchId)
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
 */)}class Ci{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */async function Ai(e){if(e.code!==js.FAILED_PRECONDITION||"The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab."!==e.message)throw e;Os("LocalStore","Unexpectedly lost primary lease")}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class ki{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&xs(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new ki((n,r)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,r)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof ki?t:ki.resolve(t)}catch(t){return ki.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):ki.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):ki.reject(t)}static resolve(e){return new ki((t,n)=>{t(e)})}static reject(e){return new ki((t,n)=>{n(e)})}static waitFor(e){return new ki((t,n)=>{let r=0,s=0,i=!1;e.forEach(e=>{++r,e.next(()=>{++s,i&&s===r&&t()},e=>n(e))}),i=!0,s===r&&t()})}static or(e){let t=ki.resolve(!1);for(const n of e)t=t.next(e=>e?ki.resolve(e):n());return t}static forEach(e,t){const n=[];return e.forEach((e,r)=>{n.push(t.call(this,e,r))}),this.waitFor(n)}static mapArray(e,t){return new ki((n,r)=>{const s=e.length,i=new Array(s);let o=0;for(let a=0;a<s;a++){const c=a;t(e[c]).next(e=>{i[c]=e,++o,o===s&&n(i)},e=>r(e))}})}static doWhile(e,t){return new ki((n,r)=>{const s=()=>{!0===e()?t().next(()=>{s()},r):n()};s()})}}function Ni(e){return"IndexedDbTransactionError"===e.name}
/**
 * @license
 * Copyright 2018 Google LLC
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
 */class Ri{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ae(e),this.ue=e=>t.writeSequenceNumber(e))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Ri.ce=-1;function Di(e){return null==e}function Oi(e){return 0===e&&1/e==-1/0}function Pi(e,t){let n=t;const r=e.length;for(let s=0;s<r;s++){const t=e.charAt(s);switch(t){case"\0":n+="";break;case"":n+="";break;default:n+=t}}return n}function Li(e){return e+""}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */function Mi(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function xi(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function Ui(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class Vi{constructor(e,t){this.comparator=e,this.root=t||ji.EMPTY}insert(e,t){return new Vi(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,ji.BLACK,null,null))}remove(e){return new Vi(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ji.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(0===r)return t+n.left.size;r<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Fi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Fi(this.root,e,this.comparator,!1)}getReverseIterator(){return new Fi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Fi(this.root,e,this.comparator,!0)}}class Fi{constructor(e,t,n,r){this.isReverse=r,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?n(e.key,t):1,t&&r&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(0===s){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class ji{constructor(e,t,n,r,s){this.key=e,this.value=t,this.color=null!=n?n:ji.RED,this.left=null!=r?r:ji.EMPTY,this.right=null!=s?s:ji.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,r,s){return new ji(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=s?s:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this;const s=n(e,r.key);return r=s<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===s?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return ji.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===t(e,r.key)){if(r.right.isEmpty())return ji.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,ji.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,ji.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw xs(43730,{key:this.key,value:this.value});if(this.right.isRed())throw xs(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw xs(27949);return e+(this.isRed()?0:1)}}ji.EMPTY=null,ji.RED=!0,ji.BLACK=!1,ji.EMPTY=new class{constructor(){this.size=0}get key(){throw xs(57766)}get value(){throw xs(16141)}get color(){throw xs(16727)}get left(){throw xs(29726)}get right(){throw xs(36894)}copy(e,t,n,r,s){return this}insert(e,t,n){return new ji(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
/**
 * @license
 * Copyright 2017 Google LLC
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
class Bi{constructor(e){this.comparator=e,this.data=new Vi(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new qi(this.data.getIterator())}getIteratorFrom(e){return new qi(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof Bi))return!1;if(this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(0!==this.comparator(e,r))return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Bi(this.comparator);return t.data=e,t}}class qi{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
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
 */class $i{constructor(e){this.fields=e,e.sort(ui.comparator)}static empty(){return new $i([])}unionWith(e){let t=new Bi(ui.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new $i(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return si(this.fields,e.fields,(e,t)=>e.isEqual(t))}}
/**
 * @license
 * Copyright 2023 Google LLC
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
 */class zi extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}
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
 */class Hi{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(e){try{return atob(e)}catch(t){throw"undefined"!=typeof DOMException&&t instanceof DOMException?new zi("Invalid base64 string: "+t):t}}(e);return new Hi(t)}static fromUint8Array(e){const t=function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e);return new Hi(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Zs(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Hi.EMPTY_BYTE_STRING=new Hi("");const Gi=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ki(e){if(Vs(!!e,39018),"string"==typeof e){let t=0;const n=Gi.exec(e);if(Vs(!!n,46558,{timestamp:e}),n[1]){let e=n[1];e=(e+"000000000").substr(0,9),t=Number(e)}const r=new Date(e);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:Wi(e.seconds),nanos:Wi(e.nanos)}}function Wi(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function Qi(e){return"string"==typeof e?Hi.fromBase64String(e):Hi.fromUint8Array(e)}
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
 */const Xi="server_timestamp",Yi="__type__",Ji="__previous_value__",Zi="__local_write_time__";function eo(e){var t,n;return(null==(n=((null==(t=null==e?void 0:e.mapValue)?void 0:t.fields)||{})[Yi])?void 0:n.stringValue)===Xi}function to(e){const t=e.mapValue.fields[Ji];return eo(t)?to(t):t}function no(e){const t=Ki(e.mapValue.fields[Zi].timestampValue);return new Ei(t.seconds,t.nanos)}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class ro{constructor(e,t,n,r,s,i,o,a,c,u){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=r,this.ssl=s,this.forceLongPolling=i,this.autoDetectLongPolling=o,this.longPollingOptions=a,this.useFetchStreams=c,this.isUsingEmulator=u}}const so="(default)";class io{constructor(e,t){this.projectId=e,this.database=t||so}static empty(){return new io("","")}get isDefaultDatabase(){return this.database===so}isEqual(e){return e instanceof io&&e.projectId===this.projectId&&e.database===this.database}}
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
 */const oo="__type__",ao="__max__",co={},uo="__vector__",ho="value";function lo(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?eo(e)?4:function(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue===ao}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */(e)?9007199254740991:function(e){var t,n;const r=null==(n=((null==(t=null==e?void 0:e.mapValue)?void 0:t.fields)||{})[oo])?void 0:n.stringValue;return r===uo}(e)?10:11:xs(28295,{value:e})}function fo(e,t){if(e===t)return!0;const n=lo(e);if(n!==lo(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return no(e).isEqual(no(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;const n=Ki(e.timestampValue),r=Ki(t.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return r=t,Qi(e.bytesValue).isEqual(Qi(r.bytesValue));case 7:return e.referenceValue===t.referenceValue;case 8:return function(e,t){return Wi(e.geoPointValue.latitude)===Wi(t.geoPointValue.latitude)&&Wi(e.geoPointValue.longitude)===Wi(t.geoPointValue.longitude)}(e,t);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return Wi(e.integerValue)===Wi(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){const n=Wi(e.doubleValue),r=Wi(t.doubleValue);return n===r?Oi(n)===Oi(r):isNaN(n)&&isNaN(r)}return!1}(e,t);case 9:return si(e.arrayValue.values||[],t.arrayValue.values||[],fo);case 10:case 11:return function(e,t){const n=e.mapValue.fields||{},r=t.mapValue.fields||{};if(Mi(n)!==Mi(r))return!1;for(const s in n)if(n.hasOwnProperty(s)&&(void 0===r[s]||!fo(n[s],r[s])))return!1;return!0}(e,t);default:return xs(52216,{left:e})}var r}function po(e,t){return void 0!==(e.values||[]).find(e=>fo(e,t))}function mo(e,t){if(e===t)return 0;const n=lo(e),r=lo(t);if(n!==r)return Zs(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return Zs(e.booleanValue,t.booleanValue);case 2:return function(e,t){const n=Wi(e.integerValue||e.doubleValue),r=Wi(t.integerValue||t.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(e,t);case 3:return go(e.timestampValue,t.timestampValue);case 4:return go(no(e),no(t));case 5:return ei(e.stringValue,t.stringValue);case 6:return function(e,t){const n=Qi(e),r=Qi(t);return n.compareTo(r)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){const n=e.split("/"),r=t.split("/");for(let s=0;s<n.length&&s<r.length;s++){const e=Zs(n[s],r[s]);if(0!==e)return e}return Zs(n.length,r.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){const n=Zs(Wi(e.latitude),Wi(t.latitude));return 0!==n?n:Zs(Wi(e.longitude),Wi(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return yo(e.arrayValue,t.arrayValue);case 10:return function(e,t){var n,r,s,i;const o=e.fields||{},a=t.fields||{},c=null==(n=o[ho])?void 0:n.arrayValue,u=null==(r=a[ho])?void 0:r.arrayValue,h=Zs((null==(s=null==c?void 0:c.values)?void 0:s.length)||0,(null==(i=null==u?void 0:u.values)?void 0:i.length)||0);return 0!==h?h:yo(c,u)}(e.mapValue,t.mapValue);case 11:return function(e,t){if(e===co&&t===co)return 0;if(e===co)return 1;if(t===co)return-1;const n=e.fields||{},r=Object.keys(n),s=t.fields||{},i=Object.keys(s);r.sort(),i.sort();for(let o=0;o<r.length&&o<i.length;++o){const e=ei(r[o],i[o]);if(0!==e)return e;const t=mo(n[r[o]],s[i[o]]);if(0!==t)return t}return Zs(r.length,i.length)}(e.mapValue,t.mapValue);default:throw xs(23264,{he:n})}}function go(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return Zs(e,t);const n=Ki(e),r=Ki(t),s=Zs(n.seconds,r.seconds);return 0!==s?s:Zs(n.nanos,r.nanos)}function yo(e,t){const n=e.values||[],r=t.values||[];for(let s=0;s<n.length&&s<r.length;++s){const e=mo(n[s],r[s]);if(e)return e}return Zs(n.length,r.length)}function vo(e){return wo(e)}function wo(e){return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){const t=Ki(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?Qi(e.bytesValue).toBase64():"referenceValue"in e?function(e){return hi.fromName(e).toString()}(e.referenceValue):"geoPointValue"in e?function(e){return`geo(${e.latitude},${e.longitude})`}(e.geoPointValue):"arrayValue"in e?function(e){let t="[",n=!0;for(const r of e.values||[])n?n=!1:t+=",",t+=wo(r);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){const t=Object.keys(e.fields||{}).sort();let n="{",r=!0;for(const s of t)r?r=!1:n+=",",n+=`${s}:${wo(e.fields[s])}`;return n+"}"}(e.mapValue):xs(61005,{value:e})}function _o(e){switch(lo(e)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=to(e);return t?16+_o(t):16;case 5:return 2*e.stringValue.length;case 6:return Qi(e.bytesValue).approximateByteSize();case 7:return e.referenceValue.length;case 9:return(e.arrayValue.values||[]).reduce((e,t)=>e+_o(t),0);case 10:case 11:return function(e){let t=0;return xi(e.fields,(e,n)=>{t+=e.length+_o(n)}),t}(e.mapValue);default:throw xs(13486,{value:e})}}function Eo(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function To(e){return!!e&&"integerValue"in e}function Io(e){return!!e&&"arrayValue"in e}function bo(e){return!!e&&"nullValue"in e}function So(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function Co(e){return!!e&&"mapValue"in e}function Ao(e){if(e.geoPointValue)return{geoPointValue:{...e.geoPointValue}};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:{...e.timestampValue}};if(e.mapValue){const t={mapValue:{fields:{}}};return xi(e.mapValue.fields,(e,n)=>t.mapValue.fields[e]=Ao(n)),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=Ao(e.arrayValue.values[n]);return t}return{...e}}class ko{constructor(e){this.value=e}static empty(){return new ko({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!Co(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ao(t)}setAll(e){let t=ui.emptyPath(),n={},r=[];e.forEach((e,s)=>{if(!t.isImmediateParentOf(s)){const e=this.getFieldsMap(t);this.applyChanges(e,n,r),n={},r=[],t=s.popLast()}e?n[s.lastSegment()]=Ao(e):r.push(s.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,n,r)}delete(e){const t=this.field(e.popLast());Co(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return fo(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let r=t.mapValue.fields[e.get(n)];Co(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,n){xi(t,(t,n)=>e[t]=n);for(const r of n)delete e[r]}clone(){return new ko(Ao(this.value))}}function No(e){const t=[];return xi(e.fields,(e,n)=>{const r=new ui([e]);if(Co(n)){const e=No(n.mapValue).fields;if(0===e.length)t.push(r);else for(const n of e)t.push(r.child(n))}else t.push(r)}),new $i(t)
/**
 * @license
 * Copyright 2017 Google LLC
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
 */}class Ro{constructor(e,t,n,r,s,i,o){this.key=e,this.documentType=t,this.version=n,this.readTime=r,this.createTime=s,this.data=i,this.documentState=o}static newInvalidDocument(e){return new Ro(e,0,Ti.min(),Ti.min(),Ti.min(),ko.empty(),0)}static newFoundDocument(e,t,n,r){return new Ro(e,1,t,Ti.min(),n,r,0)}static newNoDocument(e,t){return new Ro(e,2,t,Ti.min(),Ti.min(),ko.empty(),0)}static newUnknownDocument(e,t){return new Ro(e,3,t,Ti.min(),Ti.min(),ko.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(Ti.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ko.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ko.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Ti.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof Ro&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ro(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
/**
 * @license
 * Copyright 2022 Google LLC
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
 */class Do{constructor(e,t){this.position=e,this.inclusive=t}}function Oo(e,t,n){let r=0;for(let s=0;s<e.position.length;s++){const i=t[s],o=e.position[s];if(r=i.field.isKeyField()?hi.comparator(hi.fromName(o.referenceValue),n.key):mo(o,n.data.field(i.field)),"desc"===i.dir&&(r*=-1),0!==r)break}return r}function Po(e,t){if(null===e)return null===t;if(null===t)return!1;if(e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!fo(e.position[n],t.position[n]))return!1;return!0}
/**
 * @license
 * Copyright 2022 Google LLC
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
 */class Lo{constructor(e,t="asc"){this.field=e,this.dir=t}}function Mo(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}
/**
 * @license
 * Copyright 2022 Google LLC
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
 */class xo{}class Uo extends xo{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,n):new zo(e,t,n):"array-contains"===t?new Wo(e,n):"in"===t?new Qo(e,n):"not-in"===t?new Xo(e,n):"array-contains-any"===t?new Yo(e,n):new Uo(e,t,n)}static createKeyFieldInFilter(e,t,n){return"in"===t?new Ho(e,n):new Go(e,n)}matches(e){const t=e.data.field(this.field);return"!="===this.op?null!==t&&void 0===t.nullValue&&this.matchesComparison(mo(t,this.value)):null!==t&&lo(this.value)===lo(t)&&this.matchesComparison(mo(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return xs(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Vo extends xo{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new Vo(e,t)}matches(e){return Fo(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.Pe||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Fo(e){return"and"===e.op}function jo(e){return function(e){for(const t of e.filters)if(t instanceof Vo)return!1;return!0}(e)&&Fo(e)}function Bo(e){if(e instanceof Uo)return e.field.canonicalString()+e.op.toString()+vo(e.value);if(jo(e))return e.filters.map(e=>Bo(e)).join(",");{const t=e.filters.map(e=>Bo(e)).join(",");return`${e.op}(${t})`}}function qo(e,t){return e instanceof Uo?(n=e,(r=t)instanceof Uo&&n.op===r.op&&n.field.isEqual(r.field)&&fo(n.value,r.value)):e instanceof Vo?function(e,t){return t instanceof Vo&&e.op===t.op&&e.filters.length===t.filters.length&&e.filters.reduce((e,n,r)=>e&&qo(n,t.filters[r]),!0)}(e,t):void xs(19439);var n,r}function $o(e){return e instanceof Uo?`${(t=e).field.canonicalString()} ${t.op} ${vo(t.value)}`:e instanceof Vo?function(e){return e.op.toString()+" {"+e.getFilters().map($o).join(" ,")+"}"}(e):"Filter";var t}class zo extends Uo{constructor(e,t,n){super(e,t,n),this.key=hi.fromName(n.referenceValue)}matches(e){const t=hi.comparator(e.key,this.key);return this.matchesComparison(t)}}class Ho extends Uo{constructor(e,t){super(e,"in",t),this.keys=Ko("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Go extends Uo{constructor(e,t){super(e,"not-in",t),this.keys=Ko("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Ko(e,t){var n;return((null==(n=t.arrayValue)?void 0:n.values)||[]).map(e=>hi.fromName(e.referenceValue))}class Wo extends Uo{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Io(t)&&po(t.arrayValue,this.value)}}class Qo extends Uo{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return null!==t&&po(this.value.arrayValue,t)}}class Xo extends Uo{constructor(e,t){super(e,"not-in",t)}matches(e){if(po(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return null!==t&&void 0===t.nullValue&&!po(this.value.arrayValue,t)}}class Yo extends Uo{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Io(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>po(this.value.arrayValue,e))}}
/**
 * @license
 * Copyright 2019 Google LLC
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
 */class Jo{constructor(e,t=null,n=[],r=[],s=null,i=null,o=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=r,this.limit=s,this.startAt=i,this.endAt=o,this.Te=null}}function Zo(e,t=null,n=[],r=[],s=null,i=null,o=null){return new Jo(e,t,n,r,s,i,o)}function ea(e){const t=Fs(e);if(null===t.Te){let e=t.path.canonicalString();null!==t.collectionGroup&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(e=>Bo(e)).join(","),e+="|ob:",e+=t.orderBy.map(e=>{return(t=e).field.canonicalString()+t.dir;var t}).join(","),Di(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(e=>vo(e)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(e=>vo(e)).join(",")),t.Te=e}return t.Te}function ta(e,t){if(e.limit!==t.limit)return!1;if(e.orderBy.length!==t.orderBy.length)return!1;for(let n=0;n<e.orderBy.length;n++)if(!Mo(e.orderBy[n],t.orderBy[n]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!qo(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!Po(e.startAt,t.startAt)&&Po(e.endAt,t.endAt)}function na(e){return hi.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class ra{constructor(e,t=null,n=[],r=[],s=null,i="F",o=null,a=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=r,this.limit=s,this.limitType=i,this.startAt=o,this.endAt=a,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function sa(e){return new ra(e)}function ia(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function oa(e){return null!==e.collectionGroup}function aa(e){const t=Fs(e);if(null===t.Ie){t.Ie=[];const e=new Set;for(const r of t.explicitOrderBy)t.Ie.push(r),e.add(r.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(e){let t=new Bi(ui.comparator);return e.filters.forEach(e=>{e.getFlattenedFilters().forEach(e=>{e.isInequality()&&(t=t.add(e.field))})}),t})(t).forEach(r=>{e.has(r.canonicalString())||r.isKeyField()||t.Ie.push(new Lo(r,n))}),e.has(ui.keyField().canonicalString())||t.Ie.push(new Lo(ui.keyField(),n))}return t.Ie}function ca(e){const t=Fs(e);return t.Ee||(t.Ee=function(e,t){if("F"===e.limitType)return Zo(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map(e=>{const t="desc"===e.dir?"asc":"desc";return new Lo(e.field,t)});const n=e.endAt?new Do(e.endAt.position,e.endAt.inclusive):null,r=e.startAt?new Do(e.startAt.position,e.startAt.inclusive):null;return Zo(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}}(t,aa(e))),t.Ee}function ua(e,t){const n=e.filters.concat([t]);return new ra(e.path,e.collectionGroup,e.explicitOrderBy.slice(),n,e.limit,e.limitType,e.startAt,e.endAt)}function ha(e,t,n){return new ra(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function la(e,t){return ta(ca(e),ca(t))&&e.limitType===t.limitType}function da(e){return`${ea(ca(e))}|lt:${e.limitType}`}function fa(e){return`Query(target=${function(e){let t=e.path.canonicalString();return null!==e.collectionGroup&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map(e=>$o(e)).join(", ")}]`),Di(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map(e=>{return`${(t=e).field.canonicalString()} (${t.dir})`;var t}).join(", ")}]`),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(e=>vo(e)).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(e=>vo(e)).join(",")),`Target(${t})`}(ca(e))}; limitType=${e.limitType})`}function pa(e,t){return t.isFoundDocument()&&function(e,t){const n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):hi.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(const n of aa(e))if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(const n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&(r=t,!((n=e).startAt&&!function(e,t,n){const r=Oo(e,t,n);return e.inclusive?r<=0:r<0}(n.startAt,aa(n),r)||n.endAt&&!function(e,t,n){const r=Oo(e,t,n);return e.inclusive?r>=0:r>0}(n.endAt,aa(n),r)));var n,r}function ma(e){return(t,n)=>{let r=!1;for(const s of aa(e)){const e=ga(s,t,n);if(0!==e)return e;r=r||s.field.isKeyField()}return 0}}function ga(e,t,n){const r=e.field.isKeyField()?hi.comparator(t.key,n.key):function(e,t,n){const r=t.data.field(e),s=n.data.field(e);return null!==r&&null!==s?mo(r,s):xs(42886)}(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return-1*r;default:return xs(19790,{direction:e.dir})}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class ya{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n)for(const[r,s]of n)if(this.equalsFn(r,e))return s}has(e){return void 0!==this.get(e)}set(e,t){const n=this.mapKeyFn(e),r=this.inner[n];if(void 0===r)return this.inner[n]=[[e,t]],void this.innerSize++;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return void(r[s]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return 1===n.length?delete this.inner[t]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(e){xi(this.inner,(t,n)=>{for(const[r,s]of n)e(r,s)})}isEmpty(){return Ui(this.inner)}size(){return this.innerSize}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */const va=new Vi(hi.comparator);function wa(){return va}const _a=new Vi(hi.comparator);function Ea(...e){let t=_a;for(const n of e)t=t.insert(n.key,n);return t}function Ta(e){let t=_a;return e.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function Ia(){return Sa()}function ba(){return Sa()}function Sa(){return new ya(e=>e.toString(),(e,t)=>e.isEqual(t))}const Ca=new Vi(hi.comparator),Aa=new Bi(hi.comparator);function ka(...e){let t=Aa;for(const n of e)t=t.add(n);return t}const Na=new Bi(Zs);
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
function Ra(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Oi(t)?"-0":t}}function Da(e){return{integerValue:""+e}}function Oa(e,t){return function(e){return"number"==typeof e&&Number.isInteger(e)&&!Oi(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */(t)?Da(t):Ra(e,t)}
/**
 * @license
 * Copyright 2018 Google LLC
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
 */class Pa{constructor(){this._=void 0}}function La(e,t,n){return e instanceof Ua?function(e,t){const n={fields:{[Yi]:{stringValue:Xi},[Zi]:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&eo(t)&&(t=to(t)),t&&(n.fields[Ji]=t),{mapValue:n}}(n,t):e instanceof Va?Fa(e,t):e instanceof ja?Ba(e,t):function(e,t){const n=xa(e,t),r=$a(n)+$a(e.Ae);return To(n)&&To(e.Ae)?Da(r):Ra(e.serializer,r)}(e,t)}function Ma(e,t,n){return e instanceof Va?Fa(e,t):e instanceof ja?Ba(e,t):n}function xa(e,t){return e instanceof qa?To(n=t)||(r=n)&&"doubleValue"in r?t:{integerValue:0}:null;var n,r}class Ua extends Pa{}class Va extends Pa{constructor(e){super(),this.elements=e}}function Fa(e,t){const n=za(t);for(const r of e.elements)n.some(e=>fo(e,r))||n.push(r);return{arrayValue:{values:n}}}class ja extends Pa{constructor(e){super(),this.elements=e}}function Ba(e,t){let n=za(t);for(const r of e.elements)n=n.filter(e=>!fo(e,r));return{arrayValue:{values:n}}}class qa extends Pa{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function $a(e){return Wi(e.integerValue||e.doubleValue)}function za(e){return Io(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}class Ha{constructor(e,t){this.version=e,this.transformResults=t}}class Ga{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ga}static exists(e){return new Ga(void 0,e)}static updateTime(e){return new Ga(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ka(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class Wa{}function Qa(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new ic(e.key,Ga.none()):new ec(e.key,e.data,Ga.none());{const n=e.data,r=ko.empty();let s=new Bi(ui.comparator);for(let e of t.fields)if(!s.has(e)){let t=n.field(e);null===t&&e.length>1&&(e=e.popLast(),t=n.field(e)),null===t?r.delete(e):r.set(e,t),s=s.add(e)}return new tc(e.key,r,new $i(s.toArray()),Ga.none())}}function Xa(e,t,n){var r;e instanceof ec?function(e,t,n){const r=e.value.clone(),s=rc(e.fieldTransforms,t,n.transformResults);r.setAll(s),t.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(e,t,n):e instanceof tc?function(e,t,n){if(!Ka(e.precondition,t))return void t.convertToUnknownDocument(n.version);const r=rc(e.fieldTransforms,t,n.transformResults),s=t.data;s.setAll(nc(e)),s.setAll(r),t.convertToFoundDocument(n.version,s).setHasCommittedMutations()}(e,t,n):(r=n,t.convertToNoDocument(r.version).setHasCommittedMutations())}function Ya(e,t,n,r){return e instanceof ec?function(e,t,n,r){if(!Ka(e.precondition,t))return n;const s=e.value.clone(),i=sc(e.fieldTransforms,r,t);return s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null}(e,t,n,r):e instanceof tc?function(e,t,n,r){if(!Ka(e.precondition,t))return n;const s=sc(e.fieldTransforms,r,t),i=t.data;return i.setAll(nc(e)),i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null===n?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,n,r):(s=t,i=n,Ka(e.precondition,s)?(s.convertToNoDocument(s.version).setHasLocalMutations(),null):i);var s,i}function Ja(e,t){let n=null;for(const r of e.fieldTransforms){const e=t.data.field(r.field),s=xa(r.transform,e||null);null!=s&&(null===n&&(n=ko.empty()),n.set(r.field,s))}return n||null}function Za(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&(n=e.fieldTransforms,r=t.fieldTransforms,!!(void 0===n&&void 0===r||n&&r&&si(n,r,(e,t)=>function(e,t){return e.field.isEqual(t.field)&&(n=e.transform,r=t.transform,n instanceof Va&&r instanceof Va||n instanceof ja&&r instanceof ja?si(n.elements,r.elements,fo):n instanceof qa&&r instanceof qa?fo(n.Ae,r.Ae):n instanceof Ua&&r instanceof Ua);var n,r}(e,t)))&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask)));var n,r}class ec extends Wa{constructor(e,t,n,r=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class tc extends Wa{constructor(e,t,n,r,s=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=r,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function nc(e){const t=new Map;return e.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=e.data.field(n);t.set(n,r)}}),t}function rc(e,t,n){const r=new Map;Vs(e.length===n.length,32656,{Re:n.length,Ve:e.length});for(let s=0;s<n.length;s++){const i=e[s],o=i.transform,a=t.data.field(i.field);r.set(i.field,Ma(o,a,n[s]))}return r}function sc(e,t,n){const r=new Map;for(const s of e){const e=s.transform,i=n.data.field(s.field);r.set(s.field,La(e,i,t))}return r}class ic extends Wa{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class oc extends Wa{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class ac{constructor(e,t,n,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let r=0;r<this.mutations.length;r++){const t=this.mutations[r];t.key.isEqual(e.key)&&Xa(t,e,n[r])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=Ya(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=Ya(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=ba();return this.mutations.forEach(r=>{const s=e.get(r.key),i=s.overlayedDocument;let o=this.applyToLocalView(i,s.mutatedFields);o=t.has(r.key)?null:o;const a=Qa(i,o);null!==a&&n.set(r.key,a),i.isValidDocument()||i.convertToNoDocument(Ti.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),ka())}isEqual(e){return this.batchId===e.batchId&&si(this.mutations,e.mutations,(e,t)=>Za(e,t))&&si(this.baseMutations,e.baseMutations,(e,t)=>Za(e,t))}}class cc{constructor(e,t,n,r){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=r}static from(e,t,n){Vs(e.mutations.length===n.length,58842,{me:e.mutations.length,fe:n.length});let r=function(){return Ca}();const s=e.mutations;for(let i=0;i<s.length;i++)r=r.insert(s[i].key,n[i].version);return new cc(e,t,n,r)}}
/**
 * @license
 * Copyright 2022 Google LLC
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
 */class uc{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class hc{constructor(e,t){this.count=e,this.unchangedNames=t}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */var lc,dc;function fc(e){if(void 0===e)return Ps("GRPC error has no .code"),js.UNKNOWN;switch(e){case lc.OK:return js.OK;case lc.CANCELLED:return js.CANCELLED;case lc.UNKNOWN:return js.UNKNOWN;case lc.DEADLINE_EXCEEDED:return js.DEADLINE_EXCEEDED;case lc.RESOURCE_EXHAUSTED:return js.RESOURCE_EXHAUSTED;case lc.INTERNAL:return js.INTERNAL;case lc.UNAVAILABLE:return js.UNAVAILABLE;case lc.UNAUTHENTICATED:return js.UNAUTHENTICATED;case lc.INVALID_ARGUMENT:return js.INVALID_ARGUMENT;case lc.NOT_FOUND:return js.NOT_FOUND;case lc.ALREADY_EXISTS:return js.ALREADY_EXISTS;case lc.PERMISSION_DENIED:return js.PERMISSION_DENIED;case lc.FAILED_PRECONDITION:return js.FAILED_PRECONDITION;case lc.ABORTED:return js.ABORTED;case lc.OUT_OF_RANGE:return js.OUT_OF_RANGE;case lc.UNIMPLEMENTED:return js.UNIMPLEMENTED;case lc.DATA_LOSS:return js.DATA_LOSS;default:return xs(39323,{code:e})}}(dc=lc||(lc={}))[dc.OK=0]="OK",dc[dc.CANCELLED=1]="CANCELLED",dc[dc.UNKNOWN=2]="UNKNOWN",dc[dc.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",dc[dc.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",dc[dc.NOT_FOUND=5]="NOT_FOUND",dc[dc.ALREADY_EXISTS=6]="ALREADY_EXISTS",dc[dc.PERMISSION_DENIED=7]="PERMISSION_DENIED",dc[dc.UNAUTHENTICATED=16]="UNAUTHENTICATED",dc[dc.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",dc[dc.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",dc[dc.ABORTED=10]="ABORTED",dc[dc.OUT_OF_RANGE=11]="OUT_OF_RANGE",dc[dc.UNIMPLEMENTED=12]="UNIMPLEMENTED",dc[dc.INTERNAL=13]="INTERNAL",dc[dc.UNAVAILABLE=14]="UNAVAILABLE",dc[dc.DATA_LOSS=15]="DATA_LOSS";
/**
 * @license
 * Copyright 2022 Google LLC
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
const pc=new ps([4294967295,4294967295],0);function mc(e){const t=(new TextEncoder).encode(e),n=new ms;return n.update(t),new Uint8Array(n.digest())}function gc(e){const t=new DataView(e.buffer),n=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new ps([n,r],0),new ps([s,i],0)]}class yc{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new vc(`Invalid padding: ${t}`);if(n<0)throw new vc(`Invalid hash count: ${n}`);if(e.length>0&&0===this.hashCount)throw new vc(`Invalid hash count: ${n}`);if(0===e.length&&0!==t)throw new vc(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=ps.fromNumber(this.ge)}ye(e,t,n){let r=e.add(t.multiply(ps.fromNumber(n)));return 1===r.compare(pc)&&(r=new ps([r.getBits(0),r.getBits(1)],0)),r.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(0===this.ge)return!1;const t=mc(e),[n,r]=gc(t);for(let s=0;s<this.hashCount;s++){const e=this.ye(n,r,s);if(!this.we(e))return!1}return!0}static create(e,t,n){const r=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),i=new yc(s,r,t);return n.forEach(e=>i.insert(e)),i}insert(e){if(0===this.ge)return;const t=mc(e),[n,r]=gc(t);for(let s=0;s<this.hashCount;s++){const e=this.ye(n,r,s);this.Se(e)}}Se(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class vc extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class wc{constructor(e,t,n,r,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const r=new Map;return r.set(e,_c.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new wc(Ti.min(),r,new Vi(Zs),wa(),ka())}}class _c{constructor(e,t,n,r,s){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new _c(n,t,ka(),ka(),ka())}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class Ec{constructor(e,t,n,r){this.be=e,this.removedTargetIds=t,this.key=n,this.De=r}}class Tc{constructor(e,t){this.targetId=e,this.Ce=t}}class Ic{constructor(e,t,n=Hi.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=r}}class bc{constructor(){this.ve=0,this.Fe=Ac(),this.Me=Hi.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return 0!==this.ve}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=ka(),t=ka(),n=ka();return this.Fe.forEach((r,s)=>{switch(s){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:n=n.add(r);break;default:xs(38017,{changeType:s})}}),new _c(this.Me,this.xe,e,t,n)}qe(){this.Oe=!1,this.Fe=Ac()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,Vs(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class Sc{constructor(e){this.Ge=e,this.ze=new Map,this.je=wa(),this.Je=Cc(),this.He=Cc(),this.Ye=new Vi(Zs)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const n=this.nt(t);switch(e.state){case 0:this.rt(t)&&n.Le(e.resumeToken);break;case 1:n.Ke(),n.Ne||n.qe(),n.Le(e.resumeToken);break;case 2:n.Ke(),n.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(n.We(),n.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),n.Le(e.resumeToken));break;default:xs(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((e,n)=>{this.rt(n)&&t(n)})}st(e){const t=e.targetId,n=e.Ce.count,r=this.ot(t);if(r){const s=r.target;if(na(s))if(0===n){const e=new hi(s.path);this.et(t,e,Ro.newNoDocument(e,Ti.min()))}else Vs(1===n,20013,{expectedCount:n});else{const r=this._t(t);if(r!==n){const n=this.ut(e),s=n?this.ct(n,e,r):1;if(0!==s){this.it(t);const e=2===s?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,e)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:r=0},hashCount:s=0}=t;let i,o;try{i=Qi(n).toUint8Array()}catch(a){if(a instanceof zi)return Ls("Decoding the base64 bloom filter in existence filter failed ("+a.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw a}try{o=new yc(i,r,s)}catch(a){return Ls(a instanceof vc?"BloomFilter error: ":"Applying bloom filter failed: ",a),null}return 0===o.ge?null:o}ct(e,t,n){return t.Ce.count===n-this.Pt(e,t.targetId)?0:2}Pt(e,t){const n=this.Ge.getRemoteKeysForTarget(t);let r=0;return n.forEach(n=>{const s=this.Ge.ht(),i=`projects/${s.projectId}/databases/${s.database}/documents/${n.path.canonicalString()}`;e.mightContain(i)||(this.et(t,n,null),r++)}),r}Tt(e){const t=new Map;this.ze.forEach((n,r)=>{const s=this.ot(r);if(s){if(n.current&&na(s.target)){const t=new hi(s.target.path);this.It(t).has(r)||this.Et(r,t)||this.et(r,t,Ro.newNoDocument(t,e))}n.Be&&(t.set(r,n.ke()),n.qe())}});let n=ka();this.He.forEach((e,t)=>{let r=!0;t.forEachWhile(e=>{const t=this.ot(e);return!t||"TargetPurposeLimboResolution"===t.purpose||(r=!1,!1)}),r&&(n=n.add(e))}),this.je.forEach((t,n)=>n.setReadTime(e));const r=new wc(e,t,this.Ye,this.je,n);return this.je=wa(),this.Je=Cc(),this.He=Cc(),this.Ye=new Vi(Zs),r}Xe(e,t){if(!this.rt(e))return;const n=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,n),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,n){if(!this.rt(e))return;const r=this.nt(e);this.Et(e,t)?r.Qe(t,1):r.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),n&&(this.je=this.je.insert(t,n))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new bc,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new Bi(Zs),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new Bi(Zs),this.Je=this.Je.insert(e,t)),t}rt(e){const t=null!==this.ot(e);return t||Os("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new bc),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Cc(){return new Vi(hi.comparator)}function Ac(){return new Vi(hi.comparator)}const kc=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),Nc=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),Rc=(()=>({and:"AND",or:"OR"}))();class Dc{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Oc(e,t){return e.useProto3Json||Di(t)?t:{value:t}}function Pc(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Lc(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function Mc(e,t){return Pc(e,t.toTimestamp())}function xc(e){return Vs(!!e,49232),Ti.fromTimestamp(function(e){const t=Ki(e);return new Ei(t.seconds,t.nanos)}(e))}function Uc(e,t){return Vc(e,t).canonicalString()}function Vc(e,t){const n=(r=e,new ai(["projects",r.projectId,"databases",r.database])).child("documents");var r;return void 0===t?n:n.child(t)}function Fc(e){const t=ai.fromString(e);return Vs(ru(t),10190,{key:t.toString()}),t}function jc(e,t){return Uc(e.databaseId,t.path)}function Bc(e,t){const n=Fc(t);if(n.get(1)!==e.databaseId.projectId)throw new Bs(js.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new Bs(js.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new hi(zc(n))}function qc(e,t){return Uc(e.databaseId,t)}function $c(e){return new ai(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function zc(e){return Vs(e.length>4&&"documents"===e.get(4),29091,{key:e.toString()}),e.popFirst(5)}function Hc(e,t,n){return{name:jc(e,t),fields:n.value.mapValue.fields}}function Gc(e,t){return{documents:[qc(e,t.path)]}}function Kc(e,t){const n={structuredQuery:{}},r=t.path;let s;null!==t.collectionGroup?(s=r,n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=qc(e,s);const i=function(e){if(0!==e.length)return tu(Vo.create(e,"and"))}(t.filters);i&&(n.structuredQuery.where=i);const o=function(e){if(0!==e.length)return e.map(e=>{return{field:Zc((t=e).field),direction:Xc(t.dir)};var t})}(t.orderBy);o&&(n.structuredQuery.orderBy=o);const a=Oc(e,t.limit);return null!==a&&(n.structuredQuery.limit=a),t.startAt&&(n.structuredQuery.startAt={before:(c=t.startAt).inclusive,values:c.position}),t.endAt&&(n.structuredQuery.endAt=function(e){return{before:!e.inclusive,values:e.position}}(t.endAt)),{ft:n,parent:s};var c}function Wc(e){let t=function(e){const t=Fc(e);return 4===t.length?ai.emptyPath():zc(t)}(e.parent);const n=e.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){Vs(1===r,65062);const e=n.from[0];e.allDescendants?s=e.collectionId:t=t.child(e.collectionId)}let i=[];n.where&&(i=function(e){const t=Qc(e);return t instanceof Vo&&jo(t)?t.getFilters():[t]}(n.where));let o=[];n.orderBy&&(o=n.orderBy.map(e=>{return new Lo(eu((t=e).field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(t.direction));var t}));let a=null;n.limit&&(a=function(e){let t;return t="object"==typeof e?e.value:e,Di(t)?null:t}(n.limit));let c=null;n.startAt&&(c=function(e){const t=!!e.before,n=e.values||[];return new Do(n,t)}(n.startAt));let u=null;return n.endAt&&(u=function(e){const t=!e.before,n=e.values||[];return new Do(n,t)}(n.endAt)),function(e,t,n,r,s,i,o,a){return new ra(e,t,n,r,s,i,o,a)}(t,s,o,i,a,"F",c,u)}function Qc(e){return void 0!==e.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":const t=eu(e.unaryFilter.field);return Uo.create(t,"==",{doubleValue:NaN});case"IS_NULL":const n=eu(e.unaryFilter.field);return Uo.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=eu(e.unaryFilter.field);return Uo.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const s=eu(e.unaryFilter.field);return Uo.create(s,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return xs(61313);default:return xs(60726)}}(e):void 0!==e.fieldFilter?(t=e,Uo.create(eu(t.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return xs(58110);default:return xs(50506)}}(t.fieldFilter.op),t.fieldFilter.value)):void 0!==e.compositeFilter?function(e){return Vo.create(e.compositeFilter.filters.map(e=>Qc(e)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return xs(1026)}}(e.compositeFilter.op))}(e):xs(30097,{filter:e});var t}function Xc(e){return kc[e]}function Yc(e){return Nc[e]}function Jc(e){return Rc[e]}function Zc(e){return{fieldPath:e.canonicalString()}}function eu(e){return ui.fromServerFormat(e.fieldPath)}function tu(e){return e instanceof Uo?function(e){if("=="===e.op){if(So(e.value))return{unaryFilter:{field:Zc(e.field),op:"IS_NAN"}};if(bo(e.value))return{unaryFilter:{field:Zc(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(So(e.value))return{unaryFilter:{field:Zc(e.field),op:"IS_NOT_NAN"}};if(bo(e.value))return{unaryFilter:{field:Zc(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Zc(e.field),op:Yc(e.op),value:e.value}}}(e):e instanceof Vo?function(e){const t=e.getFilters().map(e=>tu(e));return 1===t.length?t[0]:{compositeFilter:{op:Jc(e.op),filters:t}}}(e):xs(54877,{filter:e})}function nu(e){const t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function ru(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class su{constructor(e,t,n,r,s=Ti.min(),i=Ti.min(),o=Hi.EMPTY_BYTE_STRING,a=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=i,this.resumeToken=o,this.expectedCount=a}withSequenceNumber(e){return new su(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new su(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new su(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new su(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class iu{constructor(e){this.yt=e}}function ou(e){const t=Wc({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?ha(t,t.limit,"L"):t}
/**
 * @license
 * Copyright 2019 Google LLC
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
 */class au{constructor(){this.Cn=new cu}addToCollectionParentIndex(e,t){return this.Cn.add(t),ki.resolve()}getCollectionParents(e,t){return ki.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return ki.resolve()}deleteFieldIndex(e,t){return ki.resolve()}deleteAllFieldIndexes(e){return ki.resolve()}createTargetIndexes(e,t){return ki.resolve()}getDocumentsMatchingTarget(e,t){return ki.resolve(null)}getIndexType(e,t){return ki.resolve(0)}getFieldIndexes(e,t){return ki.resolve([])}getNextCollectionGroupToUpdate(e){return ki.resolve(null)}getMinOffset(e,t){return ki.resolve(bi.min())}getMinOffsetFromCollectionGroup(e,t){return ki.resolve(bi.min())}updateCollectionGroup(e,t,n){return ki.resolve()}updateIndexEntries(e,t){return ki.resolve()}}class cu{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t]||new Bi(ai.comparator),s=!r.has(n);return this.index[t]=r.add(n),s}has(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t];return r&&r.has(n)}getEntries(e){return(this.index[e]||new Bi(ai.comparator)).toArray()}}
/**
 * @license
 * Copyright 2018 Google LLC
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
 */const uu={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},hu=41943040;class lu{static withCacheSize(e){return new lu(e,lu.DEFAULT_COLLECTION_PERCENTILE,lu.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */lu.DEFAULT_COLLECTION_PERCENTILE=10,lu.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,lu.DEFAULT=new lu(hu,lu.DEFAULT_COLLECTION_PERCENTILE,lu.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),lu.DISABLED=new lu(-1,0,0);
/**
 * @license
 * Copyright 2017 Google LLC
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
class du{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new du(0)}static cr(){return new du(-1)}}
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
 */const fu="LruGarbageCollector";function pu([e,t],[n,r]){const s=Zs(e,n);return 0===s?Zs(t,r):s}class mu{constructor(e){this.Ir=e,this.buffer=new Bi(pu),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const e=this.buffer.last();pu(t,e)<0&&(this.buffer=this.buffer.delete(e).add(t))}}get maxValue(){return this.buffer.last()[0]}}class gu{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Rr=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return null!==this.Rr}Vr(e){Os(fu,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Ni(e)?Os(fu,"Ignoring IndexedDB error during garbage collection: ",e):await Ai(e)}await this.Vr(3e5)})}}class yu{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next(e=>Math.floor(t/100*e))}nthSequenceNumber(e,t){if(0===t)return ki.resolve(Ri.ce);const n=new mu(t);return this.mr.forEachTarget(e,e=>n.Ar(e.sequenceNumber)).next(()=>this.mr.pr(e,e=>n.Ar(e))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.mr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return-1===this.params.cacheSizeCollectionThreshold?(Os("LruGarbageCollector","Garbage collection skipped; disabled"),ki.resolve(uu)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(Os("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),uu):this.yr(e,t))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let n,r,s,i,o,a,c;const u=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(t=>(t>this.params.maximumSequenceNumbersToCollect?(Os("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`),r=this.params.maximumSequenceNumbersToCollect):r=t,i=Date.now(),this.nthSequenceNumber(e,r))).next(r=>(n=r,o=Date.now(),this.removeTargets(e,n,t))).next(t=>(s=t,a=Date.now(),this.removeOrphanedDocuments(e,n))).next(e=>(c=Date.now(),Ds()<=x.DEBUG&&Os("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${i-u}ms\n\tDetermined least recently used ${r} in `+(o-i)+`ms\n\tRemoved ${s} targets in `+(a-o)+`ms\n\tRemoved ${e} documents in `+(c-a)+`ms\nTotal Duration: ${c-u}ms`),ki.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:s,documentsRemoved:e})))}}
/**
 * @license
 * Copyright 2017 Google LLC
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
class vu{constructor(){this.changes=new ya(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ro.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return void 0!==n?ki.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}
/**
 * @license
 * Copyright 2017 Google LLC
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
/**
 * @license
 * Copyright 2022 Google LLC
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
 */class wu{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class _u{constructor(e,t,n,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=r}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(n=r,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==n&&Ya(n.mutation,e,$i.empty(),Ei.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,ka()).next(()=>t))}getLocalViewOfDocuments(e,t,n=ka()){const r=Ia();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,n).next(e=>{let t=Ea();return e.forEach((e,n)=>{t=t.insert(e,n.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){const n=Ia();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,ka()))}populateOverlays(e,t,n){const r=[];return n.forEach(e=>{t.has(e)||r.push(e)}),this.documentOverlayCache.getOverlays(e,r).next(e=>{e.forEach((e,n)=>{t.set(e,n)})})}computeViews(e,t,n,r){let s=wa();const i=Sa(),o=Sa();return t.forEach((e,t)=>{const o=n.get(t.key);r.has(t.key)&&(void 0===o||o.mutation instanceof tc)?s=s.insert(t.key,t):void 0!==o?(i.set(t.key,o.mutation.getFieldMask()),Ya(o.mutation,t,o.mutation.getFieldMask(),Ei.now())):i.set(t.key,$i.empty())}),this.recalculateAndSaveOverlays(e,s).next(e=>(e.forEach((e,t)=>i.set(e,t)),t.forEach((e,t)=>o.set(e,new wu(t,i.get(e)??null))),o))}recalculateAndSaveOverlays(e,t){const n=Sa();let r=new Vi((e,t)=>e-t),s=ka();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(const s of e)s.keys().forEach(e=>{const i=t.get(e);if(null===i)return;let o=n.get(e)||$i.empty();o=s.applyToLocalView(i,o),n.set(e,o);const a=(r.get(s.batchId)||ka()).add(e);r=r.insert(s.batchId,a)})}).next(()=>{const i=[],o=r.getReverseIterator();for(;o.hasNext();){const r=o.getNext(),a=r.key,c=r.value,u=ba();c.forEach(e=>{if(!s.has(e)){const r=Qa(t.get(e),n.get(e));null!==r&&u.set(e,r),s=s.add(e)}}),i.push(this.documentOverlayCache.saveOverlays(e,a,u))}return ki.waitFor(i)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,n,r){return s=t,hi.isDocumentKey(s.path)&&null===s.collectionGroup&&0===s.filters.length?this.getDocumentsMatchingDocumentQuery(e,t.path):oa(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,r):this.getDocumentsMatchingCollectionQuery(e,t,n,r);var s}getNextDocuments(e,t,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,r).next(s=>{const i=r-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,r-s.size):ki.resolve(Ia());let o=-1,a=s;return i.next(t=>ki.forEach(t,(t,n)=>(o<n.largestBatchId&&(o=n.largestBatchId),s.get(t)?ki.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{a=a.insert(t,e)}))).next(()=>this.populateOverlays(e,t,s)).next(()=>this.computeViews(e,a,t,ka())).next(e=>({batchId:o,changes:Ta(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new hi(t)).next(e=>{let t=Ea();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,n,r){const s=t.collectionGroup;let i=Ea();return this.indexManager.getCollectionParents(e,s).next(o=>ki.forEach(o,o=>{const a=(c=t,u=o.child(s),new ra(u,null,c.explicitOrderBy.slice(),c.filters.slice(),c.limit,c.limitType,c.startAt,c.endAt));var c,u;return this.getDocumentsMatchingCollectionQuery(e,a,n,r).next(e=>{e.forEach((e,t)=>{i=i.insert(e,t)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(e,t,n,r){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(i=>(s=i,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,s,r))).next(e=>{s.forEach((t,n)=>{const r=n.getKey();null===e.get(r)&&(e=e.insert(r,Ro.newInvalidDocument(r)))});let n=Ea();return e.forEach((e,r)=>{const i=s.get(e);void 0!==i&&Ya(i.mutation,r,$i.empty(),Ei.now()),pa(t,r)&&(n=n.insert(e,r))}),n})}}
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
 */class Eu{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return ki.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,{id:(n=t).id,version:n.version,createTime:xc(n.createTime)}),ki.resolve();var n}getNamedQuery(e,t){return ki.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,{name:(n=t).name,query:ou(n.bundledQuery),readTime:xc(n.readTime)}),ki.resolve();var n}}
/**
 * @license
 * Copyright 2022 Google LLC
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
 */class Tu{constructor(){this.overlays=new Vi(hi.comparator),this.qr=new Map}getOverlay(e,t){return ki.resolve(this.overlays.get(t))}getOverlays(e,t){const n=Ia();return ki.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((n,r)=>{this.St(e,t,r)}),ki.resolve()}removeOverlaysForBatchId(e,t,n){const r=this.qr.get(n);return void 0!==r&&(r.forEach(e=>this.overlays=this.overlays.remove(e)),this.qr.delete(n)),ki.resolve()}getOverlaysForCollection(e,t,n){const r=Ia(),s=t.length+1,i=new hi(t.child("")),o=this.overlays.getIteratorFrom(i);for(;o.hasNext();){const e=o.getNext().value,i=e.getKey();if(!t.isPrefixOf(i.path))break;i.path.length===s&&e.largestBatchId>n&&r.set(e.getKey(),e)}return ki.resolve(r)}getOverlaysForCollectionGroup(e,t,n,r){let s=new Vi((e,t)=>e-t);const i=this.overlays.getIterator();for(;i.hasNext();){const e=i.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=s.get(e.largestBatchId);null===t&&(t=Ia(),s=s.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}const o=Ia(),a=s.getIterator();for(;a.hasNext()&&(a.getNext().value.forEach((e,t)=>o.set(e,t)),!(o.size()>=r)););return ki.resolve(o)}St(e,t,n){const r=this.overlays.get(n.key);if(null!==r){const e=this.qr.get(r.largestBatchId).delete(n.key);this.qr.set(r.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new uc(t,n));let s=this.qr.get(t);void 0===s&&(s=ka(),this.qr.set(t,s)),this.qr.set(t,s.add(n.key))}}
/**
 * @license
 * Copyright 2024 Google LLC
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
 */class Iu{constructor(){this.sessionToken=Hi.EMPTY_BYTE_STRING}getSessionToken(e){return ki.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,ki.resolve()}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class bu{constructor(){this.Qr=new Bi(Su.$r),this.Ur=new Bi(Su.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const n=new Su(e,t);this.Qr=this.Qr.add(n),this.Ur=this.Ur.add(n)}Wr(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.Gr(new Su(e,t))}zr(e,t){e.forEach(e=>this.removeReference(e,t))}jr(e){const t=new hi(new ai([])),n=new Su(t,e),r=new Su(t,e+1),s=[];return this.Ur.forEachInRange([n,r],e=>{this.Gr(e),s.push(e.key)}),s}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new hi(new ai([])),n=new Su(t,e),r=new Su(t,e+1);let s=ka();return this.Ur.forEachInRange([n,r],e=>{s=s.add(e.key)}),s}containsKey(e){const t=new Su(e,0),n=this.Qr.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class Su{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return hi.comparator(e.key,t.key)||Zs(e.Yr,t.Yr)}static Kr(e,t){return Zs(e.Yr,t.Yr)||hi.comparator(e.key,t.key)}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class Cu{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new Bi(Su.$r)}checkEmpty(e){return ki.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,r){const s=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const i=new ac(s,t,n,r);this.mutationQueue.push(i);for(const o of r)this.Zr=this.Zr.add(new Su(o.key,s)),this.indexManager.addToCollectionParentIndex(e,o.key.path.popLast());return ki.resolve(i)}lookupMutationBatch(e,t){return ki.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,r=this.ei(n),s=r<0?0:r;return ki.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return ki.resolve(0===this.mutationQueue.length?-1:this.tr-1)}getAllMutationBatches(e){return ki.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new Su(t,0),r=new Su(t,Number.POSITIVE_INFINITY),s=[];return this.Zr.forEachInRange([n,r],e=>{const t=this.Xr(e.Yr);s.push(t)}),ki.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new Bi(Zs);return t.forEach(e=>{const t=new Su(e,0),r=new Su(e,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([t,r],e=>{n=n.add(e.Yr)})}),ki.resolve(this.ti(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,r=n.length+1;let s=n;hi.isDocumentKey(s)||(s=s.child(""));const i=new Su(new hi(s),0);let o=new Bi(Zs);return this.Zr.forEachWhile(e=>{const t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===r&&(o=o.add(e.Yr)),!0)},i),ki.resolve(this.ti(o))}ti(e){const t=[];return e.forEach(e=>{const n=this.Xr(e);null!==n&&t.push(n)}),t}removeMutationBatch(e,t){Vs(0===this.ni(t.batchId,"removed"),55003),this.mutationQueue.shift();let n=this.Zr;return ki.forEach(t.mutations,r=>{const s=new Su(r.key,t.batchId);return n=n.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.Zr=n})}ir(e){}containsKey(e,t){const n=new Su(t,0),r=this.Zr.firstAfterOrEqual(n);return ki.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,ki.resolve()}ni(e,t){return this.ei(e)}ei(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class Au{constructor(e){this.ri=e,this.docs=new Vi(hi.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,r=this.docs.get(n),s=r?r.size:0,i=this.ri(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:i}),this.size+=i-s,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return ki.resolve(n?n.document.mutableCopy():Ro.newInvalidDocument(t))}getEntries(e,t){let n=wa();return t.forEach(e=>{const t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():Ro.newInvalidDocument(e))}),ki.resolve(n)}getDocumentsMatchingQuery(e,t,n,r){let s=wa();const i=t.path,o=new hi(i.child("__id-9223372036854775808__")),a=this.docs.getIteratorFrom(o);for(;a.hasNext();){const{key:e,value:{document:o}}=a.getNext();if(!i.isPrefixOf(e.path))break;e.path.length>i.length+1||Si(Ii(o),n)<=0||(r.has(o.key)||pa(t,o))&&(s=s.insert(o.key,o.mutableCopy()))}return ki.resolve(s)}getAllFromCollectionGroup(e,t,n,r){xs(9500)}ii(e,t){return ki.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new ku(this)}getSize(e){return ki.resolve(this.size)}}class ku extends vu{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach((n,r)=>{r.isValidDocument()?t.push(this.Nr.addEntry(e,r)):this.Nr.removeEntry(n)}),ki.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class Nu{constructor(e){this.persistence=e,this.si=new ya(e=>ea(e),ta),this.lastRemoteSnapshotVersion=Ti.min(),this.highestTargetId=0,this.oi=0,this._i=new bu,this.targetCount=0,this.ai=du.ur()}forEachTarget(e,t){return this.si.forEach((e,n)=>t(n)),ki.resolve()}getLastRemoteSnapshotVersion(e){return ki.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return ki.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),ki.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.oi&&(this.oi=t),ki.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new du(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,ki.resolve()}updateTargetData(e,t){return this.Pr(t),ki.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,ki.resolve()}removeTargets(e,t,n){let r=0;const s=[];return this.si.forEach((i,o)=>{o.sequenceNumber<=t&&null===n.get(o.targetId)&&(this.si.delete(i),s.push(this.removeMatchingKeysForTargetId(e,o.targetId)),r++)}),ki.waitFor(s).next(()=>r)}getTargetCount(e){return ki.resolve(this.targetCount)}getTargetData(e,t){const n=this.si.get(t)||null;return ki.resolve(n)}addMatchingKeys(e,t,n){return this._i.Wr(t,n),ki.resolve()}removeMatchingKeys(e,t,n){this._i.zr(t,n);const r=this.persistence.referenceDelegate,s=[];return r&&t.forEach(t=>{s.push(r.markPotentiallyOrphaned(e,t))}),ki.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),ki.resolve()}getMatchingKeysForTargetId(e,t){const n=this._i.Hr(t);return ki.resolve(n)}containsKey(e,t){return ki.resolve(this._i.containsKey(t))}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class Ru{constructor(e,t){this.ui={},this.overlays={},this.ci=new Ri(0),this.li=!1,this.li=!0,this.hi=new Iu,this.referenceDelegate=e(this),this.Pi=new Nu(this),this.indexManager=new au,this.remoteDocumentCache=new Au(e=>this.referenceDelegate.Ti(e)),this.serializer=new iu(t),this.Ii=new Eu(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Tu,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.ui[e.toKey()];return n||(n=new Cu(t,this.referenceDelegate),this.ui[e.toKey()]=n),n}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,n){Os("MemoryPersistence","Starting transaction:",e);const r=new Du(this.ci.next());return this.referenceDelegate.Ei(),n(r).next(e=>this.referenceDelegate.di(r).next(()=>e)).toPromise().then(e=>(r.raiseOnCommittedEvent(),e))}Ai(e,t){return ki.or(Object.values(this.ui).map(n=>()=>n.containsKey(e,t)))}}class Du extends Ci{constructor(e){super(),this.currentSequenceNumber=e}}class Ou{constructor(e){this.persistence=e,this.Ri=new bu,this.Vi=null}static mi(e){return new Ou(e)}get fi(){if(this.Vi)return this.Vi;throw xs(60996)}addReference(e,t,n){return this.Ri.addReference(n,t),this.fi.delete(n.toString()),ki.resolve()}removeReference(e,t,n){return this.Ri.removeReference(n,t),this.fi.add(n.toString()),ki.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),ki.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach(e=>this.fi.add(e.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.fi.add(e.toString()))}).next(()=>n.removeTargetData(e,t))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return ki.forEach(this.fi,n=>{const r=hi.fromPath(n);return this.gi(e,r).next(e=>{e||t.removeEntry(r,Ti.min())})}).next(()=>(this.Vi=null,t.apply(e)))}updateLimboDocument(e,t){return this.gi(e,t).next(e=>{e?this.fi.delete(t.toString()):this.fi.add(t.toString())})}Ti(e){return 0}gi(e,t){return ki.or([()=>ki.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class Pu{constructor(e,t){this.persistence=e,this.pi=new ya(e=>function(e){let t="";for(let n=0;n<e.length;n++)t.length>0&&(t=Li(t)),t=Pi(e.get(n),t);return Li(t)}(e.path),(e,t)=>e.isEqual(t)),this.garbageCollector=function(e,t){return new yu(e,t)}(this,t)}static mi(e,t){return new Pu(e,t)}Ei(){}di(e){return ki.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}wr(e){let t=0;return this.pr(e,e=>{t++}).next(()=>t)}pr(e,t){return ki.forEach(this.pi,(n,r)=>this.br(e,n,r).next(e=>e?ki.resolve():t(r)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const r=this.persistence.getRemoteDocumentCache(),s=r.newChangeBuffer();return r.ii(e,r=>this.br(e,r,t).next(e=>{e||(n++,s.removeEntry(r,Ti.min()))})).next(()=>s.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),ki.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.pi.set(n,e.currentSequenceNumber),ki.resolve()}removeReference(e,t,n){return this.pi.set(n,e.currentSequenceNumber),ki.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),ki.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=_o(e.data.value)),t}br(e,t,n){return ki.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const e=this.pi.get(t);return ki.resolve(void 0!==e&&e>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class Lu{constructor(e,t,n,r){this.targetId=e,this.fromCache=t,this.Es=n,this.ds=r}static As(e,t){let n=ka(),r=ka();for(const s of t.docChanges)switch(s.type){case 0:n=n.add(s.doc.key);break;case 1:r=r.add(s.doc.key)}return new Lu(e,t.fromCache,n,r)}}
/**
 * @license
 * Copyright 2023 Google LLC
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
 */class Mu{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}
/**
 * @license
 * Copyright 2019 Google LLC
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
 */class xu{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=_()?8:function(e){const t=e.match(/Android ([\d.]+)/i),n=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(n)}(w())>0?6:4}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,n,r){const s={result:null};return this.ys(e,t).next(e=>{s.result=e}).next(()=>{if(!s.result)return this.ws(e,t,r,n).next(e=>{s.result=e})}).next(()=>{if(s.result)return;const n=new Mu;return this.Ss(e,t,n).next(r=>{if(s.result=r,this.Vs)return this.bs(e,t,n,r.size)})}).next(()=>s.result)}bs(e,t,n,r){return n.documentReadCount<this.fs?(Ds()<=x.DEBUG&&Os("QueryEngine","SDK will not create cache indexes for query:",fa(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),ki.resolve()):(Ds()<=x.DEBUG&&Os("QueryEngine","Query:",fa(t),"scans",n.documentReadCount,"local documents and returns",r,"documents as results."),n.documentReadCount>this.gs*r?(Ds()<=x.DEBUG&&Os("QueryEngine","The SDK decides to create cache indexes for query:",fa(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ca(t))):ki.resolve())}ys(e,t){if(ia(t))return ki.resolve(null);let n=ca(t);return this.indexManager.getIndexType(e,n).next(r=>0===r?null:(null!==t.limit&&1===r&&(t=ha(t,null,"F"),n=ca(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(r=>{const s=ka(...r);return this.ps.getDocuments(e,s).next(r=>this.indexManager.getMinOffset(e,n).next(n=>{const i=this.Ds(t,r);return this.Cs(t,i,s,n.readTime)?this.ys(e,ha(t,null,"F")):this.vs(e,i,t,n)}))})))}ws(e,t,n,r){return ia(t)||r.isEqual(Ti.min())?ki.resolve(null):this.ps.getDocuments(e,n).next(s=>{const i=this.Ds(t,s);return this.Cs(t,i,n,r)?ki.resolve(null):(Ds()<=x.DEBUG&&Os("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),fa(t)),this.vs(e,i,t,function(e,t){const n=e.toTimestamp().seconds,r=e.toTimestamp().nanoseconds+1,s=Ti.fromTimestamp(1e9===r?new Ei(n+1,0):new Ei(n,r));return new bi(s,hi.empty(),t)}(r,-1)).next(e=>e))})}Ds(e,t){let n=new Bi(ma(e));return t.forEach((t,r)=>{pa(e,r)&&(n=n.add(r))}),n}Cs(e,t,n,r){if(null===e.limit)return!1;if(n.size!==t.size)return!0;const s="F"===e.limitType?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(r)>0)}Ss(e,t,n){return Ds()<=x.DEBUG&&Os("QueryEngine","Using full collection scan to execute query:",fa(t)),this.ps.getDocumentsMatchingQuery(e,t,bi.min(),n)}vs(e,t,n,r){return this.ps.getDocumentsMatchingQuery(e,n,r).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}
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
 */const Uu="LocalStore";class Vu{constructor(e,t,n,r){this.persistence=e,this.Fs=t,this.serializer=r,this.Ms=new Vi(Zs),this.xs=new ya(e=>ea(e),ta),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(n)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new _u(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ms))}}async function Fu(e,t){const n=Fs(e);return await n.persistence.runTransaction("Handle user change","readonly",e=>{let r;return n.mutationQueue.getAllMutationBatches(e).next(s=>(r=s,n.Bs(t),n.mutationQueue.getAllMutationBatches(e))).next(t=>{const s=[],i=[];let o=ka();for(const e of r){s.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}for(const e of t){i.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}return n.localDocuments.getDocuments(e,o).next(e=>({Ls:e,removedBatchIds:s,addedBatchIds:i}))})})}function ju(e){const t=Fs(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.Pi.getLastRemoteSnapshotVersion(e))}function Bu(e,t){const n=Fs(e),r=t.snapshotVersion;let s=n.Ms;return n.persistence.runTransaction("Apply remote event","readwrite-primary",e=>{const i=n.Ns.newChangeBuffer({trackRemovals:!0});s=n.Ms;const o=[];t.targetChanges.forEach((i,a)=>{const c=s.get(a);if(!c)return;o.push(n.Pi.removeMatchingKeys(e,i.removedDocuments,a).next(()=>n.Pi.addMatchingKeys(e,i.addedDocuments,a)));let u=c.withSequenceNumber(e.currentSequenceNumber);null!==t.targetMismatches.get(a)?u=u.withResumeToken(Hi.EMPTY_BYTE_STRING,Ti.min()).withLastLimboFreeSnapshotVersion(Ti.min()):i.resumeToken.approximateByteSize()>0&&(u=u.withResumeToken(i.resumeToken,r)),s=s.insert(a,u),function(e,t,n){if(0===e.resumeToken.approximateByteSize())return!0;if(t.snapshotVersion.toMicroseconds()-e.snapshotVersion.toMicroseconds()>=3e8)return!0;return n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size>0}(c,u,i)&&o.push(n.Pi.updateTargetData(e,u))});let a=wa(),c=ka();if(t.documentUpdates.forEach(r=>{t.resolvedLimboDocuments.has(r)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(e,r))}),o.push(function(e,t,n){let r=ka(),s=ka();return n.forEach(e=>r=r.add(e)),t.getEntries(e,r).next(e=>{let r=wa();return n.forEach((n,i)=>{const o=e.get(n);i.isFoundDocument()!==o.isFoundDocument()&&(s=s.add(n)),i.isNoDocument()&&i.version.isEqual(Ti.min())?(t.removeEntry(n,i.readTime),r=r.insert(n,i)):!o.isValidDocument()||i.version.compareTo(o.version)>0||0===i.version.compareTo(o.version)&&o.hasPendingWrites?(t.addEntry(i),r=r.insert(n,i)):Os(Uu,"Ignoring outdated watch update for ",n,". Current version:",o.version," Watch version:",i.version)}),{ks:r,qs:s}})}(e,i,t.documentUpdates).next(e=>{a=e.ks,c=e.qs})),!r.isEqual(Ti.min())){const t=n.Pi.getLastRemoteSnapshotVersion(e).next(t=>n.Pi.setTargetsMetadata(e,e.currentSequenceNumber,r));o.push(t)}return ki.waitFor(o).next(()=>i.apply(e)).next(()=>n.localDocuments.getLocalViewOfDocuments(e,a,c)).next(()=>a)}).then(e=>(n.Ms=s,e))}function qu(e,t){const n=Fs(e);return n.persistence.runTransaction("Get next mutation batch","readonly",e=>(void 0===t&&(t=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(e,t)))}async function $u(e,t,n){const r=Fs(e),s=r.Ms.get(t),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,e=>r.persistence.referenceDelegate.removeTarget(e,s))}catch(o){if(!Ni(o))throw o;Os(Uu,`Failed to update sequence numbers for target ${t}: ${o}`)}r.Ms=r.Ms.remove(t),r.xs.delete(s.target)}function zu(e,t,n){const r=Fs(e);let s=Ti.min(),i=ka();return r.persistence.runTransaction("Execute query","readwrite",e=>function(e,t,n){const r=Fs(e),s=r.xs.get(n);return void 0!==s?ki.resolve(r.Ms.get(s)):r.Pi.getTargetData(t,n)}(r,e,ca(t)).next(t=>{if(t)return s=t.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(e,t.targetId).next(e=>{i=e})}).next(()=>r.Fs.getDocumentsMatchingQuery(e,t,n?s:Ti.min(),n?i:ka())).next(e=>(function(e,t,n){let r=e.Os.get(t)||Ti.min();n.forEach((e,t)=>{t.readTime.compareTo(r)>0&&(r=t.readTime)}),e.Os.set(t,r)}(r,function(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}(t),e),{documents:e,Qs:i})))}class Hu{constructor(){this.activeTargetIds=Na}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Gu{constructor(){this.Mo=new Hu,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,n){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new Hu,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}
/**
 * @license
 * Copyright 2019 Google LLC
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
 */class Ku{Oo(e){}shutdown(){}}
/**
 * @license
 * Copyright 2019 Google LLC
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
 */const Wu="ConnectivityMonitor";class Qu{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){Os(Wu,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){Os(Wu,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
/**
 * @license
 * Copyright 2023 Google LLC
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
 */let Xu=null;function Yu(){return null===Xu?Xu=268435456+Math.round(2147483648*Math.random()):Xu++,"0x"+Xu.toString(16)
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
 */}const Ju="RestConnection",Zu={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class eh{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${n}/databases/${r}`,this.Wo=this.databaseId.database===so?`project_id=${n}`:`project_id=${n}&database_id=${r}`}Go(e,t,n,r,s){const i=Yu(),o=this.zo(e,t.toUriEncodedString());Os(Ju,`Sending RPC '${e}' ${i}:`,o,n);const a={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(a,r,s);const{host:c}=new URL(o),u=f(c);return this.Jo(e,o,a,n,u).then(t=>(Os(Ju,`Received RPC '${e}' ${i}: `,t),t),t=>{throw Ls(Ju,`RPC '${e}' ${i} failed with error: `,t,"url: ",o,"request:",n),t})}Ho(e,t,n,r,s,i){return this.Go(e,t,n,r,s)}jo(e,t,n){e["X-Goog-Api-Client"]="gl-js/ fire/"+Ns,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,n)=>e[n]=t),n&&n.headers.forEach((t,n)=>e[n]=t)}zo(e,t){const n=Zu[e];return`${this.Uo}/v1/${t}:${n}`}terminate(){}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class th{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */const nh="WebChannelConnection";class rh extends eh{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,n,r,s){const i=Yu();return new Promise((s,o)=>{const a=new ys;a.setWithCredentials(!0),a.listenOnce(ws.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case _s.NO_ERROR:const t=a.getResponseJson();Os(nh,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(t)),s(t);break;case _s.TIMEOUT:Os(nh,`RPC '${e}' ${i} timed out`),o(new Bs(js.DEADLINE_EXCEEDED,"Request time out"));break;case _s.HTTP_ERROR:const n=a.getStatus();if(Os(nh,`RPC '${e}' ${i} failed with status:`,n,"response text:",a.getResponseText()),n>0){let e=a.getResponseJson();Array.isArray(e)&&(e=e[0]);const t=null==e?void 0:e.error;if(t&&t.status&&t.message){const e=function(e){const t=e.toLowerCase().replace(/_/g,"-");return Object.values(js).indexOf(t)>=0?t:js.UNKNOWN}(t.status);o(new Bs(e,t.message))}else o(new Bs(js.UNKNOWN,"Server responded with status "+a.getStatus()))}else o(new Bs(js.UNAVAILABLE,"Connection failed."));break;default:xs(9055,{l_:e,streamId:i,h_:a.getLastErrorCode(),P_:a.getLastError()})}}finally{Os(nh,`RPC '${e}' ${i} completed.`)}});const c=JSON.stringify(r);Os(nh,`RPC '${e}' ${i} sending request:`,r),a.send(t,"POST",c,n,15)})}T_(e,t,n){const r=Yu(),s=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],i=bs(),o=Is(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;void 0!==c&&(a.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(a.useFetchStreams=!0),this.jo(a.initMessageHeaders,t,n),a.encodeInitMessageHeaders=!0;const u=s.join("");Os(nh,`Creating RPC '${e}' stream ${r}: ${u}`,a);const h=i.createWebChannel(u,a);this.I_(h);let l=!1,d=!1;const f=new th({Yo:t=>{d?Os(nh,`Not sending because RPC '${e}' stream ${r} is closed:`,t):(l||(Os(nh,`Opening RPC '${e}' stream ${r} transport.`),h.open(),l=!0),Os(nh,`RPC '${e}' stream ${r} sending:`,t),h.send(t))},Zo:()=>h.close()}),p=(e,t,n)=>{e.listen(t,e=>{try{n(e)}catch(t){setTimeout(()=>{throw t},0)}})};return p(h,vs.EventType.OPEN,()=>{d||(Os(nh,`RPC '${e}' stream ${r} transport opened.`),f.o_())}),p(h,vs.EventType.CLOSE,()=>{d||(d=!0,Os(nh,`RPC '${e}' stream ${r} transport closed`),f.a_(),this.E_(h))}),p(h,vs.EventType.ERROR,t=>{d||(d=!0,Ls(nh,`RPC '${e}' stream ${r} transport errored. Name:`,t.name,"Message:",t.message),f.a_(new Bs(js.UNAVAILABLE,"The operation could not be completed")))}),p(h,vs.EventType.MESSAGE,t=>{var n;if(!d){const s=t.data[0];Vs(!!s,16349);const i=s,o=(null==i?void 0:i.error)||(null==(n=i[0])?void 0:n.error);if(o){Os(nh,`RPC '${e}' stream ${r} received error:`,o);const t=o.status;let n=function(e){const t=lc[e];if(void 0!==t)return fc(t)}(t),s=o.message;void 0===n&&(n=js.INTERNAL,s="Unknown error status: "+t+" with message "+o.message),d=!0,f.a_(new Bs(n,s)),h.close()}else Os(nh,`RPC '${e}' stream ${r} received:`,s),f.u_(s)}}),p(o,Ts.STAT_EVENT,t=>{t.stat===Es.PROXY?Os(nh,`RPC '${e}' stream ${r} detected buffering proxy`):t.stat===Es.NOPROXY&&Os(nh,`RPC '${e}' stream ${r} detected no buffering proxy`)}),setTimeout(()=>{f.__()},0),f}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(t=>t===e)}}function sh(){return"undefined"!=typeof document?document:null}
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
 */function ih(e){return new Dc(e,!0)}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class oh{constructor(e,t,n=1e3,r=1.5,s=6e4){this.Mi=e,this.timerId=t,this.d_=n,this.A_=r,this.R_=s,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),n=Math.max(0,Date.now()-this.f_),r=Math.max(0,t-n);r>0&&Os("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,r,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){null!==this.m_&&(this.m_.skipDelay(),this.m_=null)}cancel(){null!==this.m_&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */const ah="PersistentStream";class ch{constructor(e,t,n,r,s,i,o,a){this.Mi=e,this.S_=n,this.b_=r,this.connection=s,this.authCredentialsProvider=i,this.appCheckCredentialsProvider=o,this.listener=a,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new oh(e,t)}x_(){return 1===this.state||5===this.state||this.O_()}O_(){return 2===this.state||3===this.state}start(){this.F_=0,4!==this.state?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&null===this.C_&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,4!==e?this.M_.reset():t&&t.code===js.RESOURCE_EXHAUSTED?(Ps(t.toString()),Ps("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===js.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,n])=>{this.D_===t&&this.G_(e,n)},t=>{e(()=>{const e=new Bs(js.UNKNOWN,"Fetching auth token failed: "+t.message);return this.z_(e)})})}G_(e,t){const n=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo(()=>{n(()=>this.listener.Xo())}),this.stream.t_(()=>{n(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(e=>{n(()=>this.z_(e))}),this.stream.onMessage(e=>{n(()=>1==++this.F_?this.J_(e):this.onNext(e))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return Os(ah,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget(()=>this.D_===e?t():(Os(ah,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class uh extends ch{constructor(e,t,n,r,s,i){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,r,i),this.serializer=s}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=function(e,t){let n;if("targetChange"in t){t.targetChange;const s="NO_CHANGE"===(r=t.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===r?1:"REMOVE"===r?2:"CURRENT"===r?3:"RESET"===r?4:xs(39313,{state:r}),i=t.targetChange.targetIds||[],o=function(e,t){return e.useProto3Json?(Vs(void 0===t||"string"==typeof t,58123),Hi.fromBase64String(t||"")):(Vs(void 0===t||t instanceof Buffer||t instanceof Uint8Array,16193),Hi.fromUint8Array(t||new Uint8Array))}(e,t.targetChange.resumeToken),a=t.targetChange.cause,c=a&&function(e){const t=void 0===e.code?js.UNKNOWN:fc(e.code);return new Bs(t,e.message||"")}(a);n=new Ic(s,i,o,c||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=Bc(e,r.document.name),i=xc(r.document.updateTime),o=r.document.createTime?xc(r.document.createTime):Ti.min(),a=new ko({mapValue:{fields:r.document.fields}}),c=Ro.newFoundDocument(s,i,o,a),u=r.targetIds||[],h=r.removedTargetIds||[];n=new Ec(u,h,c.key,c)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=Bc(e,r.document),i=r.readTime?xc(r.readTime):Ti.min(),o=Ro.newNoDocument(s,i),a=r.removedTargetIds||[];n=new Ec([],a,o.key,o)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=Bc(e,r.document),i=r.removedTargetIds||[];n=new Ec([],i,s,null)}else{if(!("filter"in t))return xs(11601,{Rt:t});{t.filter;const e=t.filter;e.targetId;const{count:r=0,unchangedNames:s}=e,i=new hc(r,s),o=e.targetId;n=new Tc(o,i)}}var r;return n}(this.serializer,e),n=function(e){if(!("targetChange"in e))return Ti.min();const t=e.targetChange;return t.targetIds&&t.targetIds.length?Ti.min():t.readTime?xc(t.readTime):Ti.min()}(e);return this.listener.H_(t,n)}Y_(e){const t={};t.database=$c(this.serializer),t.addTarget=function(e,t){let n;const r=t.target;if(n=na(r)?{documents:Gc(e,r)}:{query:Kc(e,r).ft},n.targetId=t.targetId,t.resumeToken.approximateByteSize()>0){n.resumeToken=Lc(e,t.resumeToken);const r=Oc(e,t.expectedCount);null!==r&&(n.expectedCount=r)}else if(t.snapshotVersion.compareTo(Ti.min())>0){n.readTime=Pc(e,t.snapshotVersion.toTimestamp());const r=Oc(e,t.expectedCount);null!==r&&(n.expectedCount=r)}return n}(this.serializer,e);const n=function(e,t){const n=function(e){switch(e){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return xs(28987,{purpose:e})}}(t.purpose);return null==n?null:{"goog-listen-tags":n}}(this.serializer,e);n&&(t.labels=n),this.q_(t)}Z_(e){const t={};t.database=$c(this.serializer),t.removeTarget=e,this.q_(t)}}class hh extends ch{constructor(e,t,n,r,s,i){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,r,i),this.serializer=s}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return Vs(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Vs(!e.writeResults||0===e.writeResults.length,55816),this.listener.ta()}onNext(e){Vs(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=function(e,t){return e&&e.length>0?(Vs(void 0!==t,14353),e.map(e=>function(e,t){let n=e.updateTime?xc(e.updateTime):xc(t);return n.isEqual(Ti.min())&&(n=xc(t)),new Ha(n,e.transformResults||[])}(e,t))):[]}(e.writeResults,e.commitTime),n=xc(e.commitTime);return this.listener.na(n,t)}ra(){const e={};e.database=$c(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(e=>function(e,t){let n;if(t instanceof ec)n={update:Hc(e,t.key,t.value)};else if(t instanceof ic)n={delete:jc(e,t.key)};else if(t instanceof tc)n={update:Hc(e,t.key,t.data),updateMask:nu(t.fieldMask)};else{if(!(t instanceof oc))return xs(16599,{Vt:t.type});n={verify:jc(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map(e=>function(e,t){const n=t.transform;if(n instanceof Ua)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof Va)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof ja)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof qa)return{fieldPath:t.field.canonicalString(),increment:n.Ae};throw xs(20930,{transform:t.transform})}(0,e))),t.precondition.isNone||(n.currentDocument=(r=e,void 0!==(s=t.precondition).updateTime?{updateTime:Mc(r,s.updateTime)}:void 0!==s.exists?{exists:s.exists}:xs(27497))),n;var r,s}(this.serializer,e))};this.q_(t)}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class lh{}class dh extends lh{constructor(e,t,n,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=r,this.ia=!1}sa(){if(this.ia)throw new Bs(js.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,n,r){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,i])=>this.connection.Go(e,Vc(t,n),r,s,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===js.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new Bs(js.UNKNOWN,e.toString())})}Ho(e,t,n,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Ho(e,Vc(t,n),r,i,o,s)).catch(e=>{throw"FirebaseError"===e.name?(e.code===js.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new Bs(js.UNKNOWN,e.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class fh{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){0===this.oa&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){"Online"===this.state?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,"Online"===e&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Ps(t),this.aa=!1):Os("OnlineStateTracker",t)}Pa(){null!==this._a&&(this._a.cancel(),this._a=null)}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */const ph="RemoteStore";class mh{constructor(e,t,n,r,s){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=s,this.Aa.Oo(e=>{n.enqueueAndForget(async()=>{bh(this)&&(Os(ph,"Restarting streams for network reachability change."),await async function(e){const t=Fs(e);t.Ea.add(4),await yh(t),t.Ra.set("Unknown"),t.Ea.delete(4),await gh(t)}(this))})}),this.Ra=new fh(n,r)}}async function gh(e){if(bh(e))for(const t of e.da)await t(!0)}async function yh(e){for(const t of e.da)await t(!1)}function vh(e,t){const n=Fs(e);n.Ia.has(t.targetId)||(n.Ia.set(t.targetId,t),Ih(n)?Th(n):qh(n).O_()&&_h(n,t))}function wh(e,t){const n=Fs(e),r=qh(n);n.Ia.delete(t),r.O_()&&Eh(n,t),0===n.Ia.size&&(r.O_()?r.L_():bh(n)&&n.Ra.set("Unknown"))}function _h(e,t){if(e.Va.Ue(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(Ti.min())>0){const n=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(n)}qh(e).Y_(t)}function Eh(e,t){e.Va.Ue(t),qh(e).Z_(t)}function Th(e){e.Va=new Sc({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),At:t=>e.Ia.get(t)||null,ht:()=>e.datastore.serializer.databaseId}),qh(e).start(),e.Ra.ua()}function Ih(e){return bh(e)&&!qh(e).x_()&&e.Ia.size>0}function bh(e){return 0===Fs(e).Ea.size}function Sh(e){e.Va=void 0}async function Ch(e){e.Ra.set("Online")}async function Ah(e){e.Ia.forEach((t,n)=>{_h(e,t)})}async function kh(e,t){Sh(e),Ih(e)?(e.Ra.ha(t),Th(e)):e.Ra.set("Unknown")}async function Nh(e,t,n){if(e.Ra.set("Online"),t instanceof Ic&&2===t.state&&t.cause)try{await async function(e,t){const n=t.cause;for(const r of t.targetIds)e.Ia.has(r)&&(await e.remoteSyncer.rejectListen(r,n),e.Ia.delete(r),e.Va.removeTarget(r))}(e,t)}catch(r){Os(ph,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await Rh(e,r)}else if(t instanceof Ec?e.Va.Ze(t):t instanceof Tc?e.Va.st(t):e.Va.tt(t),!n.isEqual(Ti.min()))try{const t=await ju(e.localStore);n.compareTo(t)>=0&&await function(e,t){const n=e.Va.Tt(t);return n.targetChanges.forEach((n,r)=>{if(n.resumeToken.approximateByteSize()>0){const s=e.Ia.get(r);s&&e.Ia.set(r,s.withResumeToken(n.resumeToken,t))}}),n.targetMismatches.forEach((t,n)=>{const r=e.Ia.get(t);if(!r)return;e.Ia.set(t,r.withResumeToken(Hi.EMPTY_BYTE_STRING,r.snapshotVersion)),Eh(e,t);const s=new su(r.target,t,n,r.sequenceNumber);_h(e,s)}),e.remoteSyncer.applyRemoteEvent(n)}(e,n)}catch(s){Os(ph,"Failed to raise snapshot:",s),await Rh(e,s)}}async function Rh(e,t,n){if(!Ni(t))throw t;e.Ea.add(1),await yh(e),e.Ra.set("Offline"),n||(n=()=>ju(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{Os(ph,"Retrying IndexedDB access"),await n(),e.Ea.delete(1),await gh(e)})}function Dh(e,t){return t().catch(n=>Rh(e,n,t))}async function Oh(e){const t=Fs(e),n=$h(t);let r=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:-1;for(;Ph(t);)try{const e=await qu(t.localStore,r);if(null===e){0===t.Ta.length&&n.L_();break}r=e.batchId,Lh(t,e)}catch(s){await Rh(t,s)}Mh(t)&&xh(t)}function Ph(e){return bh(e)&&e.Ta.length<10}function Lh(e,t){e.Ta.push(t);const n=$h(e);n.O_()&&n.X_&&n.ea(t.mutations)}function Mh(e){return bh(e)&&!$h(e).x_()&&e.Ta.length>0}function xh(e){$h(e).start()}async function Uh(e){$h(e).ra()}async function Vh(e){const t=$h(e);for(const n of e.Ta)t.ea(n.mutations)}async function Fh(e,t,n){const r=e.Ta.shift(),s=cc.from(r,t,n);await Dh(e,()=>e.remoteSyncer.applySuccessfulWrite(s)),await Oh(e)}async function jh(e,t){t&&$h(e).X_&&await async function(e,t){if(function(e){switch(e){case js.OK:return xs(64938);case js.CANCELLED:case js.UNKNOWN:case js.DEADLINE_EXCEEDED:case js.RESOURCE_EXHAUSTED:case js.INTERNAL:case js.UNAVAILABLE:case js.UNAUTHENTICATED:return!1;case js.INVALID_ARGUMENT:case js.NOT_FOUND:case js.ALREADY_EXISTS:case js.PERMISSION_DENIED:case js.FAILED_PRECONDITION:case js.ABORTED:case js.OUT_OF_RANGE:case js.UNIMPLEMENTED:case js.DATA_LOSS:return!0;default:return xs(15467,{code:e})}}(n=t.code)&&n!==js.ABORTED){const n=e.Ta.shift();$h(e).B_(),await Dh(e,()=>e.remoteSyncer.rejectFailedWrite(n.batchId,t)),await Oh(e)}var n}(e,t),Mh(e)&&xh(e)}async function Bh(e,t){const n=Fs(e);n.asyncQueue.verifyOperationInProgress(),Os(ph,"RemoteStore received new credentials");const r=bh(n);n.Ea.add(3),await yh(n),r&&n.Ra.set("Unknown"),await n.remoteSyncer.handleCredentialChange(t),n.Ea.delete(3),await gh(n)}function qh(e){return e.ma||(e.ma=function(e,t,n){const r=Fs(e);return r.sa(),new uh(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}(e.datastore,e.asyncQueue,{Xo:Ch.bind(null,e),t_:Ah.bind(null,e),r_:kh.bind(null,e),H_:Nh.bind(null,e)}),e.da.push(async t=>{t?(e.ma.B_(),Ih(e)?Th(e):e.Ra.set("Unknown")):(await e.ma.stop(),Sh(e))})),e.ma}function $h(e){return e.fa||(e.fa=function(e,t,n){const r=Fs(e);return r.sa(),new hh(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}(e.datastore,e.asyncQueue,{Xo:()=>Promise.resolve(),t_:Uh.bind(null,e),r_:jh.bind(null,e),ta:Vh.bind(null,e),na:Fh.bind(null,e)}),e.da.push(async t=>{t?(e.fa.B_(),await Oh(e)):(await e.fa.stop(),e.Ta.length>0&&(Os(ph,`Stopping write stream with ${e.Ta.length} pending writes`),e.Ta=[]))})),e.fa
/**
 * @license
 * Copyright 2017 Google LLC
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
 */}class zh{constructor(e,t,n,r,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=r,this.removalCallback=s,this.deferred=new qs,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,r,s){const i=Date.now()+n,o=new zh(e,t,i,r,s);return o.start(n),o}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new Bs(js.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Hh(e,t){if(Ps("AsyncQueue",`${t}: ${e}`),Ni(e))return new Bs(js.UNAVAILABLE,`${t}: ${e}`);throw e}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class Gh{static emptySet(e){return new Gh(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||hi.comparator(t.key,n.key):(e,t)=>hi.comparator(e.key,t.key),this.keyedMap=Ea(),this.sortedSet=new Vi(this.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Gh))return!1;if(this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(!e.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){const n=new Gh;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class Kh{constructor(){this.ga=new Vi(hi.comparator)}track(e){const t=e.doc.key,n=this.ga.get(t);n?0!==e.type&&3===n.type?this.ga=this.ga.insert(t,e):3===e.type&&1!==n.type?this.ga=this.ga.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.ga=this.ga.remove(t):1===e.type&&2===n.type?this.ga=this.ga.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):xs(63341,{Rt:e,pa:n}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,n)=>{e.push(n)}),e}}class Wh{constructor(e,t,n,r,s,i,o,a,c){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=s,this.fromCache=i,this.syncStateChanged=o,this.excludesMetadataChanges=a,this.hasCachedResults=c}static fromInitialDocuments(e,t,n,r,s){const i=[];return t.forEach(e=>{i.push({type:0,doc:e})}),new Wh(e,t,Gh.emptySet(t),i,n,r,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&la(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let r=0;r<t.length;r++)if(t[r].type!==n[r].type||!t[r].doc.isEqual(n[r].doc))return!1;return!0}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class Qh{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class Xh{constructor(){this.queries=Yh(),this.onlineState="Unknown",this.Ca=new Set}terminate(){!function(e,t){const n=Fs(e),r=n.queries;n.queries=Yh(),r.forEach((e,n)=>{for(const r of n.Sa)r.onError(t)})}(this,new Bs(js.ABORTED,"Firestore shutting down"))}}function Yh(){return new ya(e=>da(e),la)}async function Jh(e,t){const n=Fs(e);let r=3;const s=t.query;let i=n.queries.get(s);i?!i.ba()&&t.Da()&&(r=2):(i=new Qh,r=t.Da()?0:1);try{switch(r){case 0:i.wa=await n.onListen(s,!0);break;case 1:i.wa=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(o){const e=Hh(o,`Initialization of query '${fa(t.query)}' failed`);return void t.onError(e)}n.queries.set(s,i),i.Sa.push(t),t.va(n.onlineState),i.wa&&t.Fa(i.wa)&&nl(n)}async function Zh(e,t){const n=Fs(e),r=t.query;let s=3;const i=n.queries.get(r);if(i){const e=i.Sa.indexOf(t);e>=0&&(i.Sa.splice(e,1),0===i.Sa.length?s=t.Da()?0:1:!i.ba()&&t.Da()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function el(e,t){const n=Fs(e);let r=!1;for(const s of t){const e=s.query,t=n.queries.get(e);if(t){for(const e of t.Sa)e.Fa(s)&&(r=!0);t.wa=s}}r&&nl(n)}function tl(e,t,n){const r=Fs(e),s=r.queries.get(t);if(s)for(const i of s.Sa)i.onError(n);r.queries.delete(t)}function nl(e){e.Ca.forEach(e=>{e.next()})}var rl,sl;(sl=rl||(rl={})).Ma="default",sl.Cache="cache";class il{constructor(e,t,n){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(e){if(!this.options.includeMetadataChanges){const t=[];for(const n of e.docChanges)3!==n.type&&t.push(n);e=new Wh(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache)return!0;if(!this.Da())return!0;const n="Offline"!==t;return(!this.options.qa||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}ka(e){e=Wh.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==rl.Cache}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class ol{constructor(e){this.key=e}}class al{constructor(e){this.key=e}}class cl{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=ka(),this.mutatedKeys=ka(),this.eu=ma(e),this.tu=new Gh(this.eu)}get nu(){return this.Ya}ru(e,t){const n=t?t.iu:new Kh,r=t?t.tu:this.tu;let s=t?t.mutatedKeys:this.mutatedKeys,i=r,o=!1;const a="F"===this.query.limitType&&r.size===this.query.limit?r.last():null,c="L"===this.query.limitType&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((e,t)=>{const u=r.get(e),h=pa(this.query,t)?t:null,l=!!u&&this.mutatedKeys.has(u.key),d=!!h&&(h.hasLocalMutations||this.mutatedKeys.has(h.key)&&h.hasCommittedMutations);let f=!1;u&&h?u.data.isEqual(h.data)?l!==d&&(n.track({type:3,doc:h}),f=!0):this.su(u,h)||(n.track({type:2,doc:h}),f=!0,(a&&this.eu(h,a)>0||c&&this.eu(h,c)<0)&&(o=!0)):!u&&h?(n.track({type:0,doc:h}),f=!0):u&&!h&&(n.track({type:1,doc:u}),f=!0,(a||c)&&(o=!0)),f&&(h?(i=i.add(h),s=d?s.add(e):s.delete(e)):(i=i.delete(e),s=s.delete(e)))}),null!==this.query.limit)for(;i.size>this.query.limit;){const e="F"===this.query.limitType?i.last():i.first();i=i.delete(e.key),s=s.delete(e.key),n.track({type:1,doc:e})}return{tu:i,iu:n,Cs:o,mutatedKeys:s}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,r){const s=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const i=e.iu.ya();i.sort((e,t)=>function(e,t){const n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return xs(20277,{Rt:e})}};return n(e)-n(t)}(e.type,t.type)||this.eu(e.doc,t.doc)),this.ou(n),r=r??!1;const o=t&&!r?this._u():[],a=0===this.Xa.size&&this.current&&!r?1:0,c=a!==this.Za;return this.Za=a,0!==i.length||c?{snapshot:new Wh(this.query,e.tu,s,i,e.mutatedKeys,0===a,c,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:o}:{au:o}}va(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Kh,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(e=>this.Ya=this.Ya.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.Ya=this.Ya.delete(e)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=ka(),this.tu.forEach(e=>{this.uu(e.key)&&(this.Xa=this.Xa.add(e.key))});const t=[];return e.forEach(e=>{this.Xa.has(e)||t.push(new al(e))}),this.Xa.forEach(n=>{e.has(n)||t.push(new ol(n))}),t}cu(e){this.Ya=e.Qs,this.Xa=ka();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Wh.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,0===this.Za,this.hasCachedResults)}}const ul="SyncEngine";class hl{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class ll{constructor(e){this.key=e,this.hu=!1}}class dl{constructor(e,t,n,r,s,i){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=r,this.currentUser=s,this.maxConcurrentLimboResolutions=i,this.Pu={},this.Tu=new ya(e=>da(e),la),this.Iu=new Map,this.Eu=new Set,this.du=new Vi(hi.comparator),this.Au=new Map,this.Ru=new bu,this.Vu={},this.mu=new Map,this.fu=du.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return!0===this.gu}}async function fl(e,t,n=!0){const r=Ll(e);let s;const i=r.Tu.get(t);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await ml(r,t,n,!0),s}async function pl(e,t){const n=Ll(e);await ml(n,t,!0,!1)}async function ml(e,t,n,r){const s=await function(e,t){const n=Fs(e);return n.persistence.runTransaction("Allocate target","readwrite",e=>{let r;return n.Pi.getTargetData(e,t).next(s=>s?(r=s,ki.resolve(r)):n.Pi.allocateTargetId(e).next(s=>(r=new su(t,s,"TargetPurposeListen",e.currentSequenceNumber),n.Pi.addTargetData(e,r).next(()=>r))))}).then(e=>{const r=n.Ms.get(e.targetId);return(null===r||e.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.Ms=n.Ms.insert(e.targetId,e),n.xs.set(t,e.targetId)),e})}(e.localStore,ca(t)),i=s.targetId,o=e.sharedClientState.addLocalQueryTarget(i,n);let a;return r&&(a=await async function(e,t,n,r,s){e.pu=(t,n,r)=>async function(e,t,n,r){let s=t.view.ru(n);s.Cs&&(s=await zu(e.localStore,t.query,!1).then(({documents:e})=>t.view.ru(e,s)));const i=r&&r.targetChanges.get(t.targetId),o=r&&null!=r.targetMismatches.get(t.targetId),a=t.view.applyChanges(s,e.isPrimaryClient,i,o);return kl(e,t.targetId,a.au),a.snapshot}(e,t,n,r);const i=await zu(e.localStore,t,!0),o=new cl(t,i.Qs),a=o.ru(i.documents),c=_c.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==e.onlineState,s),u=o.applyChanges(a,e.isPrimaryClient,c);kl(e,n,u.au);const h=new hl(t,n,o);return e.Tu.set(t,h),e.Iu.has(n)?e.Iu.get(n).push(t):e.Iu.set(n,[t]),u.snapshot}(e,t,i,"current"===o,s.resumeToken)),e.isPrimaryClient&&n&&vh(e.remoteStore,s),a}async function gl(e,t,n){const r=Fs(e),s=r.Tu.get(t),i=r.Iu.get(s.targetId);if(i.length>1)return r.Iu.set(s.targetId,i.filter(e=>!la(e,t))),void r.Tu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await $u(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&wh(r.remoteStore,s.targetId),Cl(r,s.targetId)}).catch(Ai)):(Cl(r,s.targetId),await $u(r.localStore,s.targetId,!0))}async function yl(e,t){const n=Fs(e),r=n.Tu.get(t),s=n.Iu.get(r.targetId);n.isPrimaryClient&&1===s.length&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),wh(n.remoteStore,r.targetId))}async function vl(e,t,n){const r=function(e){const t=Fs(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Tl.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Il.bind(null,t),t}(e);try{const e=await function(e,t){const n=Fs(e),r=Ei.now(),s=t.reduce((e,t)=>e.add(t.key),ka());let i,o;return n.persistence.runTransaction("Locally write mutations","readwrite",e=>{let a=wa(),c=ka();return n.Ns.getEntries(e,s).next(e=>{a=e,a.forEach((e,t)=>{t.isValidDocument()||(c=c.add(e))})}).next(()=>n.localDocuments.getOverlayedDocuments(e,a)).next(s=>{i=s;const o=[];for(const e of t){const t=Ja(e,i.get(e.key).overlayedDocument);null!=t&&o.push(new tc(e.key,t,No(t.value.mapValue),Ga.exists(!0)))}return n.mutationQueue.addMutationBatch(e,r,o,t)}).next(t=>{o=t;const r=t.applyToLocalDocumentSet(i,c);return n.documentOverlayCache.saveOverlays(e,t.batchId,r)})}).then(()=>({batchId:o.batchId,changes:Ta(i)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(e.batchId),function(e,t,n){let r=e.Vu[e.currentUser.toKey()];r||(r=new Vi(Zs)),r=r.insert(t,n),e.Vu[e.currentUser.toKey()]=r}(r,e.batchId,n),await Dl(r,e.changes),await Oh(r.remoteStore)}catch(s){const e=Hh(s,"Failed to persist write");n.reject(e)}}async function wl(e,t){const n=Fs(e);try{const e=await Bu(n.localStore,t);t.targetChanges.forEach((e,t)=>{const r=n.Au.get(t);r&&(Vs(e.addedDocuments.size+e.modifiedDocuments.size+e.removedDocuments.size<=1,22616),e.addedDocuments.size>0?r.hu=!0:e.modifiedDocuments.size>0?Vs(r.hu,14607):e.removedDocuments.size>0&&(Vs(r.hu,42227),r.hu=!1))}),await Dl(n,e,t)}catch(r){await Ai(r)}}function _l(e,t,n){const r=Fs(e);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const e=[];r.Tu.forEach((n,r)=>{const s=r.view.va(t);s.snapshot&&e.push(s.snapshot)}),function(e,t){const n=Fs(e);n.onlineState=t;let r=!1;n.queries.forEach((e,n)=>{for(const s of n.Sa)s.va(t)&&(r=!0)}),r&&nl(n)}(r.eventManager,t),e.length&&r.Pu.H_(e),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function El(e,t,n){const r=Fs(e);r.sharedClientState.updateQueryState(t,"rejected",n);const s=r.Au.get(t),i=s&&s.key;if(i){let e=new Vi(hi.comparator);e=e.insert(i,Ro.newNoDocument(i,Ti.min()));const n=ka().add(i),s=new wc(Ti.min(),new Map,new Vi(Zs),e,n);await wl(r,s),r.du=r.du.remove(i),r.Au.delete(t),Rl(r)}else await $u(r.localStore,t,!1).then(()=>Cl(r,t,n)).catch(Ai)}async function Tl(e,t){const n=Fs(e),r=t.batch.batchId;try{const e=await function(e,t){const n=Fs(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{const r=t.batch.keys(),s=n.Ns.newChangeBuffer({trackRemovals:!0});return function(e,t,n,r){const s=n.batch,i=s.keys();let o=ki.resolve();return i.forEach(e=>{o=o.next(()=>r.getEntry(t,e)).next(t=>{const i=n.docVersions.get(e);Vs(null!==i,48541),t.version.compareTo(i)<0&&(s.applyToRemoteDocument(t,n),t.isValidDocument()&&(t.setReadTime(n.commitVersion),r.addEntry(t)))})}),o.next(()=>e.mutationQueue.removeMutationBatch(t,s))}(n,e,t,s).next(()=>s.apply(e)).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=ka();for(let n=0;n<e.mutationResults.length;++n)e.mutationResults[n].transformResults.length>0&&(t=t.add(e.batch.mutations[n].key));return t}(t))).next(()=>n.localDocuments.getDocuments(e,r))})}(n.localStore,t);Sl(n,r,null),bl(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Dl(n,e)}catch(s){await Ai(s)}}async function Il(e,t,n){const r=Fs(e);try{const e=await function(e,t){const n=Fs(e);return n.persistence.runTransaction("Reject batch","readwrite-primary",e=>{let r;return n.mutationQueue.lookupMutationBatch(e,t).next(t=>(Vs(null!==t,37113),r=t.keys(),n.mutationQueue.removeMutationBatch(e,t))).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,r)).next(()=>n.localDocuments.getDocuments(e,r))})}(r.localStore,t);Sl(r,t,n),bl(r,t),r.sharedClientState.updateMutationState(t,"rejected",n),await Dl(r,e)}catch(s){await Ai(s)}}function bl(e,t){(e.mu.get(t)||[]).forEach(e=>{e.resolve()}),e.mu.delete(t)}function Sl(e,t,n){const r=Fs(e);let s=r.Vu[r.currentUser.toKey()];if(s){const e=s.get(t);e&&(n?e.reject(n):e.resolve(),s=s.remove(t)),r.Vu[r.currentUser.toKey()]=s}}function Cl(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(const r of e.Iu.get(t))e.Tu.delete(r),n&&e.Pu.yu(r,n);e.Iu.delete(t),e.isPrimaryClient&&e.Ru.jr(t).forEach(t=>{e.Ru.containsKey(t)||Al(e,t)})}function Al(e,t){e.Eu.delete(t.path.canonicalString());const n=e.du.get(t);null!==n&&(wh(e.remoteStore,n),e.du=e.du.remove(t),e.Au.delete(n),Rl(e))}function kl(e,t,n){for(const r of n)r instanceof ol?(e.Ru.addReference(r.key,t),Nl(e,r)):r instanceof al?(Os(ul,"Document no longer in limbo: "+r.key),e.Ru.removeReference(r.key,t),e.Ru.containsKey(r.key)||Al(e,r.key)):xs(19791,{wu:r})}function Nl(e,t){const n=t.key,r=n.path.canonicalString();e.du.get(n)||e.Eu.has(r)||(Os(ul,"New document in limbo: "+n),e.Eu.add(r),Rl(e))}function Rl(e){for(;e.Eu.size>0&&e.du.size<e.maxConcurrentLimboResolutions;){const t=e.Eu.values().next().value;e.Eu.delete(t);const n=new hi(ai.fromString(t)),r=e.fu.next();e.Au.set(r,new ll(n)),e.du=e.du.insert(n,r),vh(e.remoteStore,new su(ca(sa(n.path)),r,"TargetPurposeLimboResolution",Ri.ce))}}async function Dl(e,t,n){const r=Fs(e),s=[],i=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach((e,a)=>{o.push(r.pu(a,t,n).then(e=>{var t;if((e||n)&&r.isPrimaryClient){const s=e?!e.fromCache:null==(t=null==n?void 0:n.targetChanges.get(a.targetId))?void 0:t.current;r.sharedClientState.updateQueryState(a.targetId,s?"current":"not-current")}if(e){s.push(e);const t=Lu.As(a.targetId,e);i.push(t)}}))}),await Promise.all(o),r.Pu.H_(s),await async function(e,t){const n=Fs(e);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",e=>ki.forEach(t,t=>ki.forEach(t.Es,r=>n.persistence.referenceDelegate.addReference(e,t.targetId,r)).next(()=>ki.forEach(t.ds,r=>n.persistence.referenceDelegate.removeReference(e,t.targetId,r)))))}catch(r){if(!Ni(r))throw r;Os(Uu,"Failed to update sequence numbers: "+r)}for(const s of t){const e=s.targetId;if(!s.fromCache){const t=n.Ms.get(e),r=t.snapshotVersion,s=t.withLastLimboFreeSnapshotVersion(r);n.Ms=n.Ms.insert(e,s)}}}(r.localStore,i))}async function Ol(e,t){const n=Fs(e);if(!n.currentUser.isEqual(t)){Os(ul,"User change. New user:",t.toKey());const e=await Fu(n.localStore,t);n.currentUser=t,s="'waitForPendingWrites' promise is rejected due to a user change.",(r=n).mu.forEach(e=>{e.forEach(e=>{e.reject(new Bs(js.CANCELLED,s))})}),r.mu.clear(),n.sharedClientState.handleUserChange(t,e.removedBatchIds,e.addedBatchIds),await Dl(n,e.Ls)}var r,s}function Pl(e,t){const n=Fs(e),r=n.Au.get(t);if(r&&r.hu)return ka().add(r.key);{let e=ka();const r=n.Iu.get(t);if(!r)return e;for(const t of r){const r=n.Tu.get(t);e=e.unionWith(r.view.nu)}return e}}function Ll(e){const t=Fs(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=wl.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Pl.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=El.bind(null,t),t.Pu.H_=el.bind(null,t.eventManager),t.Pu.yu=tl.bind(null,t.eventManager),t}class Ml{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ih(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return function(e,t,n,r){return new Vu(e,t,n,r)}(this.persistence,new xu,e.initialUser,this.serializer)}Cu(e){return new Ru(Ou.mi,this.serializer)}Du(e){return new Gu}async terminate(){var e,t;null==(e=this.gcScheduler)||e.stop(),null==(t=this.indexBackfillerScheduler)||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ml.provider={build:()=>new Ml};class xl extends Ml{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){Vs(this.persistence.referenceDelegate instanceof Pu,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new gu(n,e.asyncQueue,t)}Cu(e){const t=void 0!==this.cacheSizeBytes?lu.withCacheSize(this.cacheSizeBytes):lu.DEFAULT;return new Ru(e=>Pu.mi(e,t),this.serializer)}}class Ul{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>_l(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=Ol.bind(null,this.syncEngine),await async function(e,t){const n=Fs(e);t?(n.Ea.delete(2),await gh(n)):t||(n.Ea.add(2),await yh(n),n.Ra.set("Unknown"))}(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new Xh}createDatastore(e){const t=ih(e.databaseInfo.databaseId),n=(r=e.databaseInfo,new rh(r));var r;return function(e,t,n,r){return new dh(e,t,n,r)}(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return t=this.localStore,n=this.datastore,r=e.asyncQueue,s=e=>_l(this.syncEngine,e,0),i=Qu.v()?new Qu:new Ku,new mh(t,n,r,s,i);var t,n,r,s,i}createSyncEngine(e,t){return function(e,t,n,r,s,i,o){const a=new dl(e,t,n,r,s,i);return o&&(a.gu=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(e){const t=Fs(e);Os(ph,"RemoteStore shutting down."),t.Ea.add(5),await yh(t),t.Aa.shutdown(),t.Ra.set("Unknown")}(this.remoteStore),null==(e=this.datastore)||e.terminate(),null==(t=this.eventManager)||t.terminate()}}Ul.provider={build:()=>new Ul};
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
/**
 * @license
 * Copyright 2017 Google LLC
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
class Vl{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):Ps("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */const Fl="FirestoreClient";class jl{constructor(e,t,n,r,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=r,this.user=ks.UNAUTHENTICATED,this.clientId=Js.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(n,async e=>{Os(Fl,"Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(n,e=>(Os(Fl,"Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new qs;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=Hh(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function Bl(e,t){e.asyncQueue.verifyOperationInProgress(),Os(Fl,"Initializing OfflineComponentProvider");const n=e.configuration;await t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener(async e=>{r.isEqual(e)||(await Fu(t.localStore,e),r=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e._offlineComponents=t}async function ql(e,t){e.asyncQueue.verifyOperationInProgress();const n=await async function(e){if(!e._offlineComponents)if(e._uninitializedComponentsProvider){Os(Fl,"Using user provided OfflineComponentProvider");try{await Bl(e,e._uninitializedComponentsProvider._offline)}catch(t){const s=t;if(!("FirebaseError"===(n=s).name?n.code===js.FAILED_PRECONDITION||n.code===js.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&n instanceof DOMException)||22===n.code||20===n.code||11===n.code))throw s;Ls("Error using user provided cache. Falling back to memory cache: "+s),await Bl(e,new Ml)}}else Os(Fl,"Using default OfflineComponentProvider"),await Bl(e,new xl(void 0));var n;return e._offlineComponents}(e);Os(Fl,"Initializing OnlineComponentProvider"),await t.initialize(n,e.configuration),e.setCredentialChangeListener(e=>Bh(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,n)=>Bh(t.remoteStore,n)),e._onlineComponents=t}async function $l(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(Os(Fl,"Using user provided OnlineComponentProvider"),await ql(e,e._uninitializedComponentsProvider._online)):(Os(Fl,"Using default OnlineComponentProvider"),await ql(e,new Ul))),e._onlineComponents}async function zl(e){const t=await $l(e),n=t.eventManager;return n.onListen=fl.bind(null,t.syncEngine),n.onUnlisten=gl.bind(null,t.syncEngine),n.onFirstRemoteStoreListen=pl.bind(null,t.syncEngine),n.onLastRemoteStoreUnlisten=yl.bind(null,t.syncEngine),n}
/**
 * @license
 * Copyright 2023 Google LLC
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
function Hl(e){const t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t
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
 */}const Gl=new Map,Kl="firestore.googleapis.com",Wl=!0;
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
 */class Ql{constructor(e){if(void 0===e.host){if(void 0!==e.ssl)throw new Bs(js.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Kl,this.ssl=Wl}else this.host=e.host,this.ssl=e.ssl??Wl;if(this.isUsingEmulator=void 0!==e.emulatorOptions,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=hu;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new Bs(js.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(e,t,n,r){if(!0===t&&!0===r)throw new Bs(js.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Hl(e.experimentalLongPollingOptions??{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new Bs(js.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new Bs(js.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new Bs(js.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(t=this.experimentalLongPollingOptions,n=e.experimentalLongPollingOptions,t.timeoutSeconds===n.timeoutSeconds)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams;var t,n}}class Xl{constructor(e,t,n,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ql({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new Bs(js.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new Bs(js.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ql(e),this._emulatorOptions=e.emulatorOptions||{},void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new zs;switch(e.type){case"firstParty":return new Ws(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new Bs(js.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=Gl.get(e);t&&(Os("ComponentProvider","Removing Datastore"),Gl.delete(e),t.terminate())}(this),Promise.resolve()}}
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
class Yl{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new Yl(this.firestore,e,this._query)}}class Jl{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Zl(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Jl(this.firestore,e,this._key)}toJSON(){return{type:Jl._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(vi(t,Jl._jsonSchema))return new Jl(e,n||null,new hi(ai.fromString(t.referencePath)))}}Jl._jsonSchemaVersion="firestore/documentReference/1.0",Jl._jsonSchema={type:yi("string",Jl._jsonSchemaVersion),referencePath:yi("string")};class Zl extends Yl{constructor(e,t,n){super(e,t,sa(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Jl(this.firestore,null,new hi(e))}withConverter(e){return new Zl(this.firestore,e,this._path)}}function ed(e,t,...n){if(e=D(e),li("collection","path",t),e instanceof Xl){const r=ai.fromString(t,...n);return fi(r),new Zl(e,null,r)}{if(!(e instanceof Jl||e instanceof Zl))throw new Bs(js.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(ai.fromString(t,...n));return fi(r),new Zl(e.firestore,null,r)}}function td(e,t,...n){if(e=D(e),1===arguments.length&&(t=Js.newId()),li("doc","path",t),e instanceof Xl){const r=ai.fromString(t,...n);return di(r),new Jl(e,null,new hi(r))}{if(!(e instanceof Jl||e instanceof Zl))throw new Bs(js.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(ai.fromString(t,...n));return di(r),new Jl(e.firestore,e instanceof Zl?e.converter:null,new hi(r))}}
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
 */const nd="AsyncQueue";class rd{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new oh(this,"async_queue_retry"),this._c=()=>{const e=sh();e&&Os(nd,"Visibility state changed to "+e.visibilityState),this.M_.w_()},this.ac=e;const t=sh();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=sh();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new qs;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(0!==this.Xu.length){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!Ni(e))throw e;Os(nd,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(e=>{throw this.nc=e,this.rc=!1,Ps("INTERNAL UNHANDLED ERROR: ",sd(e)),e}).then(e=>(this.rc=!1,e))));return this.ac=t,t}enqueueAfterDelay(e,t,n){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const r=zh.createAndSchedule(this,e,t,n,e=>this.hc(e));return this.tc.push(r),r}uc(){this.nc&&xs(47125,{Pc:sd(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do{e=this.ac,await e}while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((e,t)=>e.targetTimeMs-t.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function sd(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t
/**
 * @license
 * Copyright 2017 Google LLC
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
 */}function id(e){return function(e,t){if("object"!=typeof e||null===e)return!1;const n=e;for(const r of t)if(r in n&&"function"==typeof n[r])return!0;return!1}(e,["next","error","complete"])}class od extends Xl{constructor(e,t,n,r){super(e,t,n,r),this.type="firestore",this._queue=new rd,this._persistenceKey=(null==r?void 0:r.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new rd(e),this._firestoreClient=void 0,await e}}}function ad(e,t){const n="object"==typeof e?e:We(),r="string"==typeof e?e:so,s=qe(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const e=u("firestore");e&&function(e,t,n,r={}){var s;e=gi(e,Xl);const i=f(t),o=e._getSettings(),a={...o,emulatorOptions:e._getEmulatorOptions()},c=`${t}:${n}`;i&&(p(`https://${c}`),v("Firestore",!0)),o.host!==Kl&&o.host!==c&&Ls("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...o,host:c,ssl:i,emulatorOptions:r};if(!b(u,a)&&(e._setSettings(u),r.mockUserToken)){let t,n;if("string"==typeof r.mockUserToken)t=r.mockUserToken,n=ks.MOCK_USER;else{t=m(r.mockUserToken,null==(s=e._app)?void 0:s.options.projectId);const i=r.mockUserToken.sub||r.mockUserToken.user_id;if(!i)throw new Bs(js.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new ks(i)}e._authCredentials=new Hs(new $s(t,n))}}(s,...e)}return s}function cd(e){if(e._terminated)throw new Bs(js.FAILED_PRECONDITION,"The client has already been terminated.");return e._firestoreClient||function(e){var t,n,r;const s=e._freezeSettings(),i=(o=e._databaseId,a=(null==(t=e._app)?void 0:t.options.appId)||"",c=e._persistenceKey,u=s,new ro(o,a,c,u.host,u.ssl,u.experimentalForceLongPolling,u.experimentalAutoDetectLongPolling,Hl(u.experimentalLongPollingOptions),u.useFetchStreams,u.isUsingEmulator));var o,a,c,u;e._componentsProvider||(null==(n=s.localCache)?void 0:n._offlineComponentProvider)&&(null==(r=s.localCache)?void 0:r._onlineComponentProvider)&&(e._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),e._firestoreClient=new jl(e._authCredentials,e._appCheckCredentials,e._queue,i,e._componentsProvider&&function(e){const t=null==e?void 0:e._online.build();return{_offline:null==e?void 0:e._offline.build(t),_online:t}}(e._componentsProvider))}
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
 */(e),e._firestoreClient}class ud{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ud(Hi.fromBase64String(e))}catch(t){throw new Bs(js.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new ud(Hi.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:ud._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(vi(e,ud._jsonSchema))return ud.fromBase64String(e.bytes)}}ud._jsonSchemaVersion="firestore/bytes/1.0",ud._jsonSchema={type:yi("string",ud._jsonSchemaVersion),bytes:yi("string")};
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
class hd{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new Bs(js.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ui(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}
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
 */class ld{constructor(e){this._methodName=e}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class dd{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new Bs(js.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new Bs(js.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Zs(this._lat,e._lat)||Zs(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:dd._jsonSchemaVersion}}static fromJSON(e){if(vi(e,dd._jsonSchema))return new dd(e.latitude,e.longitude)}}dd._jsonSchemaVersion="firestore/geoPoint/1.0",dd._jsonSchema={type:yi("string",dd._jsonSchemaVersion),latitude:yi("number"),longitude:yi("number")};
/**
 * @license
 * Copyright 2024 Google LLC
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
class fd{constructor(e){this._values=(e||[]).map(e=>e)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}(this._values,e._values)}toJSON(){return{type:fd._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(vi(e,fd._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(e=>"number"==typeof e))return new fd(e.vectorValues);throw new Bs(js.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}fd._jsonSchemaVersion="firestore/vectorValue/1.0",fd._jsonSchema={type:yi("string",fd._jsonSchemaVersion),vectorValues:yi("object")};
/**
 * @license
 * Copyright 2017 Google LLC
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
const pd=/^__.*__$/;class md{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return null!==this.fieldMask?new tc(e,this.data,this.fieldMask,t,this.fieldTransforms):new ec(e,this.data,t,this.fieldTransforms)}}class gd{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new tc(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function yd(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw xs(40011,{Ac:e})}}class vd{constructor(e,t,n,r,s,i){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=r,void 0===s&&this.Rc(),this.fieldTransforms=s||[],this.fieldMask=i||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new vd({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){var t;const n=null==(t=this.path)?void 0:t.child(e),r=this.Vc({path:n,fc:!1});return r.gc(e),r}yc(e){var t;const n=null==(t=this.path)?void 0:t.child(e),r=this.Vc({path:n,fc:!1});return r.Rc(),r}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return Rd(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(0===e.length)throw this.Sc("Document fields must not be empty");if(yd(this.Ac)&&pd.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class wd{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||ih(e)}Cc(e,t,n,r=!1){return new vd({Ac:e,methodName:t,Dc:n,path:ui.emptyPath(),fc:!1,bc:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function _d(e){const t=e._freezeSettings(),n=ih(e._databaseId);return new wd(e._databaseId,!!t.ignoreUndefinedProperties,n)}function Ed(e,t,n,r,s,i={}){const o=e.Cc(i.merge||i.mergeFields?2:0,t,n,s);Cd("Data must be an object, but it was:",o,r);const a=bd(r,o);let c,u;if(i.merge)c=new $i(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const e=[];for(const r of i.mergeFields){const s=Ad(t,r,n);if(!o.contains(s))throw new Bs(js.INVALID_ARGUMENT,`Field '${s}' is specified in your field mask but missing from your input data.`);Dd(e,s)||e.push(s)}c=new $i(e),u=o.fieldTransforms.filter(e=>c.covers(e.field))}else c=null,u=o.fieldTransforms;return new md(new ko(a),c,u)}class Td extends ld{_toFieldTransform(e){if(2!==e.Ac)throw 1===e.Ac?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Td}}function Id(e,t){if(Sd(e=D(e)))return Cd("Unsupported field value:",t,e),bd(e,t);if(e instanceof ld)return function(e,t){if(!yd(t.Ac))throw t.Sc(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.Sc(`${e._methodName}() is not currently supported inside arrays`);const n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.fc&&4!==t.Ac)throw t.Sc("Nested arrays are not supported");return function(e,t){const n=[];let r=0;for(const s of e){let e=Id(s,t.wc(r));null==e&&(e={nullValue:"NULL_VALUE"}),n.push(e),r++}return{arrayValue:{values:n}}}(e,t)}return function(e,t){if(null===(e=D(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return Oa(t.serializer,e);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){const n=Ei.fromDate(e);return{timestampValue:Pc(t.serializer,n)}}if(e instanceof Ei){const n=new Ei(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:Pc(t.serializer,n)}}if(e instanceof dd)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof ud)return{bytesValue:Lc(t.serializer,e._byteString)};if(e instanceof Jl){const n=t.databaseId,r=e.firestore._databaseId;if(!r.isEqual(n))throw t.Sc(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:Uc(e.firestore._databaseId||t.databaseId,e._key.path)}}if(e instanceof fd)return n=e,r=t,{mapValue:{fields:{[oo]:{stringValue:uo},[ho]:{arrayValue:{values:n.toArray().map(e=>{if("number"!=typeof e)throw r.Sc("VectorValues must only contain numeric values.");return Ra(r.serializer,e)})}}}}};var n,r;throw t.Sc(`Unsupported field value: ${mi(e)}`)}(e,t)}function bd(e,t){const n={};return Ui(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):xi(e,(e,r)=>{const s=Id(r,t.mc(e));null!=s&&(n[e]=s)}),{mapValue:{fields:n}}}function Sd(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof Ei||e instanceof dd||e instanceof ud||e instanceof Jl||e instanceof ld||e instanceof fd)}function Cd(e,t,n){if(!Sd(n)||!pi(n)){const r=mi(n);throw"an object"===r?t.Sc(e+" a custom object"):t.Sc(e+" "+r)}}function Ad(e,t,n){if((t=D(t))instanceof hd)return t._internalPath;if("string"==typeof t)return Nd(e,t);throw Rd("Field path arguments must be of type string or ",e,!1,void 0,n)}const kd=new RegExp("[~\\*/\\[\\]]");function Nd(e,t,n){if(t.search(kd)>=0)throw Rd(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new hd(...t.split("."))._internalPath}catch(r){throw Rd(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function Rd(e,t,n,r,s){const i=r&&!r.isEmpty(),o=void 0!==s;let a=`Function ${t}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${r}`),o&&(c+=` in document ${s}`),c+=")"),new Bs(js.INVALID_ARGUMENT,a+e+c)}function Dd(e,t){return e.some(e=>e.isEqual(t))}
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
 */class Od{constructor(e,t,n,r,s){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=r,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Jl(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const e=new Pd(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Ld("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class Pd extends Od{data(){return super.data()}}function Ld(e,t){return"string"==typeof t?Nd(e,t):t instanceof hd?t._internalPath:t._delegate._internalPath}
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
 */function Md(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new Bs(js.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class xd{}class Ud extends xd{}function Vd(e,t,...n){let r=[];t instanceof xd&&r.push(t),r=r.concat(n),function(e){const t=e.filter(e=>e instanceof Bd).length,n=e.filter(e=>e instanceof Fd).length;if(t>1||t>0&&n>0)throw new Bs(js.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)e=s._apply(e);return e}class Fd extends Ud{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new Fd(e,t,n)}_apply(e){const t=this._parse(e);return Wd(e._query,t),new Yl(e.firestore,e.converter,ua(e._query,t))}_parse(e){const t=_d(e.firestore),n=function(e,t,n,r,s,i,o){let a;if(s.isKeyField()){if("array-contains"===i||"array-contains-any"===i)throw new Bs(js.INVALID_ARGUMENT,`Invalid Query. You can't perform '${i}' queries on documentId().`);if("in"===i||"not-in"===i){Kd(o,i);const t=[];for(const n of o)t.push(Gd(r,e,n));a={arrayValue:{values:t}}}else a=Gd(r,e,o)}else"in"!==i&&"not-in"!==i&&"array-contains-any"!==i||Kd(o,i),a=function(e,t,n,r=!1){return Id(n,e.Cc(r?4:3,t))}(n,t,o,"in"===i||"not-in"===i);return Uo.create(s,i,a)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value);return n}}function jd(e,t,n){const r=t,s=Ld("where",e);return Fd._create(s,r,n)}class Bd extends xd{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Bd(e,t)}_parse(e){const t=this._queryConstraints.map(t=>t._parse(e)).filter(e=>e.getFilters().length>0);return 1===t.length?t[0]:Vo.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return 0===t.getFilters().length?e:(function(e,t){let n=e;const r=t.getFlattenedFilters();for(const s of r)Wd(n,s),n=ua(n,s)}(e._query,t),new Yl(e.firestore,e.converter,ua(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}}class qd extends Ud{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new qd(e,t)}_apply(e){const t=function(e,t,n){if(null!==e.startAt)throw new Bs(js.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==e.endAt)throw new Bs(js.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Lo(t,n)}(e._query,this._field,this._direction);return new Yl(e.firestore,e.converter,function(e,t){const n=e.explicitOrderBy.concat([t]);return new ra(e.path,e.collectionGroup,n,e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(e._query,t))}}function $d(e,t="asc"){const n=t,r=Ld("orderBy",e);return qd._create(r,n)}class zd extends Ud{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new zd(e,t,n)}_apply(e){return new Yl(e.firestore,e.converter,ha(e._query,this._limit,this._limitType))}}function Hd(e){return function(e,t){if(t<=0)throw new Bs(js.INVALID_ARGUMENT,`Function ${e}() requires a positive number, but it was: ${t}.`)}("limit",e),zd._create("limit",e,"F")}function Gd(e,t,n){if("string"==typeof(n=D(n))){if(""===n)throw new Bs(js.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!oa(t)&&-1!==n.indexOf("/"))throw new Bs(js.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=t.path.child(ai.fromString(n));if(!hi.isDocumentKey(r))throw new Bs(js.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Eo(e,new hi(r))}if(n instanceof Jl)return Eo(e,n._key);throw new Bs(js.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${mi(n)}.`)}function Kd(e,t){if(!Array.isArray(e)||0===e.length)throw new Bs(js.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function Wd(e,t){const n=function(e,t){for(const n of e)for(const e of n.getFlattenedFilters())if(t.indexOf(e.op)>=0)return e.op;return null}(e.filters,function(e){switch(e){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(null!==n)throw n===t.op?new Bs(js.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new Bs(js.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${n.toString()}' filters.`)}class Qd{convertValue(e,t="none"){switch(lo(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Wi(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Qi(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw xs(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return xi(e,(e,r)=>{n[e]=this.convertValue(r,t)}),n}convertVectorValue(e){var t,n,r;const s=null==(r=null==(n=null==(t=e.fields)?void 0:t[ho].arrayValue)?void 0:n.values)?void 0:r.map(e=>Wi(e.doubleValue));return new fd(s)}convertGeoPoint(e){return new dd(Wi(e.latitude),Wi(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=to(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(no(e));default:return null}}convertTimestamp(e){const t=Ki(e);return new Ei(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=ai.fromString(e);Vs(ru(n),9688,{name:e});const r=new io(n.get(1),n.get(3)),s=new hi(n.popFirst(5));return r.isEqual(t)||Ps(`Document ${s} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}
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
 */function Xd(e,t,n){let r;return r=e?e.toFirestore(t):t,r}class Yd{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Jd extends Od{constructor(e,t,n,r,s,i){super(e,t,n,r,i),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Zd(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(Ld("DocumentSnapshot.get",e));if(null!==n)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new Bs(js.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Jd._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),e&&e.isValidDocument()&&e.isFoundDocument()?(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t):t}}Jd._jsonSchemaVersion="firestore/documentSnapshot/1.0",Jd._jsonSchema={type:yi("string",Jd._jsonSchemaVersion),bundleSource:yi("string","DocumentSnapshot"),bundleName:yi("string"),bundle:yi("string")};class Zd extends Jd{data(e={}){return super.data(e)}}class ef{constructor(e,t,n,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new Yd(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new Zd(this._firestore,this._userDataWriter,n.key,n,new Yd(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new Bs(js.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map(n=>{const r=new Zd(e._firestore,e._userDataWriter,n.doc.key,n.doc,new Yd(e._snapshot.mutatedKeys.has(n.doc.key),e._snapshot.fromCache),e.query.converter);return n.doc,{type:"added",doc:r,oldIndex:-1,newIndex:t++}})}{let n=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{const r=new Zd(e._firestore,e._userDataWriter,t.doc.key,t.doc,new Yd(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter);let s=-1,i=-1;return 0!==t.type&&(s=n.indexOf(t.doc.key),n=n.delete(t.doc.key)),1!==t.type&&(n=n.add(t.doc),i=n.indexOf(t.doc.key)),{type:tf(t.type),doc:r,oldIndex:s,newIndex:i}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new Bs(js.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=ef._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Js.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],r=[];return this.docs.forEach(e=>{null!==e._document&&(t.push(e._document),n.push(this._userDataWriter.convertObjectMap(e._document.data.value.mapValue.fields,"previous")),r.push(e.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function tf(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return xs(61501,{type:e})}}
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
 */function nf(e){e=gi(e,Jl);const t=gi(e.firestore,od);return function(e,t,n={}){const r=new qs;return e.asyncQueue.enqueueAndForget(async()=>function(e,t,n,r,s){const i=new Vl({next:a=>{i.Nu(),t.enqueueAndForget(()=>Zh(e,o));const c=a.docs.has(n);!c&&a.fromCache?s.reject(new Bs(js.UNAVAILABLE,"Failed to get document because the client is offline.")):c&&a.fromCache&&r&&"server"===r.source?s.reject(new Bs(js.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):s.resolve(a)},error:e=>s.reject(e)}),o=new il(sa(n.path),i,{includeMetadataChanges:!0,qa:!0});return Jh(e,o)}(await zl(e),e.asyncQueue,t,n,r)),r.promise}(cd(t),e._key).then(n=>df(t,e,n))}ef._jsonSchemaVersion="firestore/querySnapshot/1.0",ef._jsonSchema={type:yi("string",ef._jsonSchemaVersion),bundleSource:yi("string","QuerySnapshot"),bundleName:yi("string"),bundle:yi("string")};class rf extends Qd{constructor(e){super(),this.firestore=e}convertBytes(e){return new ud(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Jl(this.firestore,null,t)}}function sf(e){e=gi(e,Yl);const t=gi(e.firestore,od),n=cd(t),r=new rf(t);return Md(e._query),function(e,t,n={}){const r=new qs;return e.asyncQueue.enqueueAndForget(async()=>function(e,t,n,r,s){const i=new Vl({next:n=>{i.Nu(),t.enqueueAndForget(()=>Zh(e,o)),n.fromCache&&"server"===r.source?s.reject(new Bs(js.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):s.resolve(n)},error:e=>s.reject(e)}),o=new il(n,i,{includeMetadataChanges:!0,qa:!0});return Jh(e,o)}(await zl(e),e.asyncQueue,t,n,r)),r.promise}(n,e._query).then(n=>new ef(t,r,e,n))}function of(e,t,n){e=gi(e,Jl);const r=gi(e.firestore,od),s=Xd(e.converter,t);return lf(r,[Ed(_d(r),"setDoc",e._key,s,null!==e.converter,n).toMutation(e._key,Ga.none())])}function af(e,t,n,...r){e=gi(e,Jl);const s=gi(e.firestore,od),i=_d(s);let o;return o="string"==typeof(t=D(t))||t instanceof hd?function(e,t,n,r,s,i){const o=e.Cc(1,t,n),a=[Ad(t,r,n)],c=[s];if(i.length%2!=0)throw new Bs(js.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let d=0;d<i.length;d+=2)a.push(Ad(t,i[d])),c.push(i[d+1]);const u=[],h=ko.empty();for(let d=a.length-1;d>=0;--d)if(!Dd(u,a[d])){const e=a[d];let t=c[d];t=D(t);const n=o.yc(e);if(t instanceof Td)u.push(e);else{const r=Id(t,n);null!=r&&(u.push(e),h.set(e,r))}}const l=new $i(u);return new gd(h,l,o.fieldTransforms)}(i,"updateDoc",e._key,t,n,r):function(e,t,n,r){const s=e.Cc(1,t,n);Cd("Data must be an object, but it was:",s,r);const i=[],o=ko.empty();xi(r,(e,r)=>{const a=Nd(t,e,n);r=D(r);const c=s.yc(a);if(r instanceof Td)i.push(a);else{const e=Id(r,c);null!=e&&(i.push(a),o.set(a,e))}});const a=new $i(i);return new gd(o,a,s.fieldTransforms)}(i,"updateDoc",e._key,t),lf(s,[o.toMutation(e._key,Ga.exists(!0))])}function cf(e){return lf(gi(e.firestore,od),[new ic(e._key,Ga.none())])}function uf(e,t){const n=gi(e.firestore,od),r=td(e),s=Xd(e.converter,t);return lf(n,[Ed(_d(e.firestore),"addDoc",r._key,s,null!==e.converter,{}).toMutation(r._key,Ga.exists(!1))]).then(()=>r)}function hf(e,...t){var n,r,s;e=D(e);let i={includeMetadataChanges:!1,source:"default"},o=0;"object"!=typeof t[o]||id(t[o])||(i=t[o++]);const a={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(id(t[o])){const e=t[o];t[o]=null==(n=e.next)?void 0:n.bind(e),t[o+1]=null==(r=e.error)?void 0:r.bind(e),t[o+2]=null==(s=e.complete)?void 0:s.bind(e)}let c,u,h;if(e instanceof Jl)u=gi(e.firestore,od),h=sa(e._key.path),c={next:n=>{t[o]&&t[o](df(u,e,n))},error:t[o+1],complete:t[o+2]};else{const n=gi(e,Yl);u=gi(n.firestore,od),h=n._query;const r=new rf(u);c={next:e=>{t[o]&&t[o](new ef(u,r,n,e))},error:t[o+1],complete:t[o+2]},Md(e._query)}return function(e,t,n,r){const s=new Vl(r),i=new il(t,s,n);return e.asyncQueue.enqueueAndForget(async()=>Jh(await zl(e),i)),()=>{s.Nu(),e.asyncQueue.enqueueAndForget(async()=>Zh(await zl(e),i))}}(cd(u),h,a,c)}function lf(e,t){return function(e,t){const n=new qs;return e.asyncQueue.enqueueAndForget(async()=>vl(await function(e){return $l(e).then(e=>e.syncEngine)}(e),t,n)),n.promise}(cd(e),t)}function df(e,t,n){const r=n.docs.get(t._key),s=new rf(e);return new Jd(e,s,t._key,r,new Yd(n.hasPendingWrites,n.fromCache),t.converter)}
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
 */function ff(){return new Td("deleteField")}!function(e,t=!0){Ns=Ge,Be(new O("firestore",(e,{instanceIdentifier:n,options:r})=>{const s=e.getProvider("app").getImmediate(),i=new od(new Gs(e.getProvider("auth-internal")),new Xs(s,e.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new Bs(js.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new io(e.options.projectId,t)}(s,n),s);return r={useFetchStreams:t,...r},i._setSettings(r),i},"PUBLIC").setMultipleInstances(!0)),Qe(Cs,As,e),Qe(Cs,As,"esm2020")}();
/**
 * @license
 * Copyright 2017 Google LLC
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
const pf="firebasestorage.googleapis.com";
/**
 * @license
 * Copyright 2017 Google LLC
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
class mf extends E{constructor(e,t,n=0){super(_f(e),`Firebase Storage: ${t} (${_f(e)})`),this.status_=n,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,mf.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return _f(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}\n${this.customData.serverResponse}`:this.message=this._baseMessage}}var gf,yf,vf,wf;function _f(e){return"storage/"+e}function Ef(e){return new mf(gf.INVALID_ARGUMENT,e)}function Tf(){return new mf(gf.APP_DELETED,"The Firebase app was deleted.")}(yf=gf||(gf={})).UNKNOWN="unknown",yf.OBJECT_NOT_FOUND="object-not-found",yf.BUCKET_NOT_FOUND="bucket-not-found",yf.PROJECT_NOT_FOUND="project-not-found",yf.QUOTA_EXCEEDED="quota-exceeded",yf.UNAUTHENTICATED="unauthenticated",yf.UNAUTHORIZED="unauthorized",yf.UNAUTHORIZED_APP="unauthorized-app",yf.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",yf.INVALID_CHECKSUM="invalid-checksum",yf.CANCELED="canceled",yf.INVALID_EVENT_NAME="invalid-event-name",yf.INVALID_URL="invalid-url",yf.INVALID_DEFAULT_BUCKET="invalid-default-bucket",yf.NO_DEFAULT_BUCKET="no-default-bucket",yf.CANNOT_SLICE_BLOB="cannot-slice-blob",yf.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",yf.NO_DOWNLOAD_URL="no-download-url",yf.INVALID_ARGUMENT="invalid-argument",yf.INVALID_ARGUMENT_COUNT="invalid-argument-count",yf.APP_DELETED="app-deleted",yf.INVALID_ROOT_OPERATION="invalid-root-operation",yf.INVALID_FORMAT="invalid-format",yf.INTERNAL_ERROR="internal-error",yf.UNSUPPORTED_ENVIRONMENT="unsupported-environment";
/**
 * @license
 * Copyright 2017 Google LLC
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
class If{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let n;try{n=If.makeFromUrl(e,t)}catch(s){return new If(e,"")}if(""===n.path)return n;throw r=e,new mf(gf.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+r+"'.");var r}static makeFromUrl(e,t){let n=null;const r="([A-Za-z0-9.\\-_]+)";const s=new RegExp("^gs://"+r+"(/(.*))?$","i");function i(e){e.path_=decodeURIComponent(e.path)}const o=t.replace(/[.]/g,"\\."),a=[{regex:s,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:new RegExp(`^https?://${o}/v[A-Za-z0-9_]+/b/${r}/o(/([^?#]*).*)?$`,"i"),indices:{bucket:1,path:3},postModify:i},{regex:new RegExp(`^https?://${t===pf?"(?:storage.googleapis.com|storage.cloud.google.com)":t}/${r}/([^?#]*)`,"i"),indices:{bucket:1,path:2},postModify:i}];for(let c=0;c<a.length;c++){const t=a[c],r=t.regex.exec(e);if(r){const e=r[t.indices.bucket];let s=r[t.indices.path];s||(s=""),n=new If(e,s),t.postModify(n);break}}if(null==n)throw function(e){return new mf(gf.INVALID_URL,"Invalid URL '"+e+"'.")}(e);return n}}class bf{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */function Sf(e,t,n,r){if(r<t)throw Ef(`Invalid value for '${e}'. Expected ${t} or greater.`);if(r>n)throw Ef(`Invalid value for '${e}'. Expected ${n} or less.`)}(wf=vf||(vf={}))[wf.NO_ERROR=0]="NO_ERROR",wf[wf.NETWORK_ERROR=1]="NETWORK_ERROR",wf[wf.ABORT=2]="ABORT";
/**
 * @license
 * Copyright 2017 Google LLC
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
class Cf{constructor(e,t,n,r,s,i,o,a,c,u,h,l=!0,d=!1){this.url_=e,this.method_=t,this.headers_=n,this.body_=r,this.successCodes_=s,this.additionalRetryCodes_=i,this.callback_=o,this.errorCallback_=a,this.timeout_=c,this.progressCallback_=u,this.connectionFactory_=h,this.retry=l,this.isUsingEmulator=d,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((e,t)=>{this.resolve_=e,this.reject_=t,this.start_()})}start_(){const e=(e,t)=>{if(t)return void e(!1,new Af(!1,null,!0));const n=this.connectionFactory_();this.pendingConnection_=n;const r=e=>{const t=e.loaded,n=e.lengthComputable?e.total:-1;null!==this.progressCallback_&&this.progressCallback_(t,n)};null!==this.progressCallback_&&n.addUploadProgressListener(r),n.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{null!==this.progressCallback_&&n.removeUploadProgressListener(r),this.pendingConnection_=null;const t=n.getErrorCode()===vf.NO_ERROR,s=n.getStatus();if(!t||
/**
 * @license
 * Copyright 2022 Google LLC
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
function(e,t){const n=e>=500&&e<600,r=-1!==[408,429].indexOf(e),s=-1!==t.indexOf(e);return n||r||s}(s,this.additionalRetryCodes_)&&this.retry){const t=n.getErrorCode()===vf.ABORT;return void e(!1,new Af(!1,null,t))}const i=-1!==this.successCodes_.indexOf(s);e(!0,new Af(i,n))})},t=(e,t)=>{const n=this.resolve_,r=this.reject_,s=t.connection;if(t.wasSuccessCode)try{const e=this.callback_(s,s.getResponse());!
/**
 * @license
 * Copyright 2017 Google LLC
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
function(e){return void 0!==e}(e)?n():n(e)}catch(i){r(i)}else if(null!==s){const e=new mf(gf.UNKNOWN,"An unknown error occurred, please check the error payload for server response.");e.serverResponse=s.getErrorText(),this.errorCallback_?r(this.errorCallback_(s,e)):r(e)}else if(t.canceled){r(this.appDelete_?Tf():new mf(gf.CANCELED,"User canceled the upload/download."))}else{r(new mf(gf.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again."))}};this.canceled_?t(0,new Af(!1,null,!0)):this.backoffId_=function(e,t,n){let r=1,s=null,i=null,o=!1,a=0;function c(){return 2===a}let u=!1;function h(...e){u||(u=!0,t.apply(null,e))}function l(t){s=setTimeout(()=>{s=null,e(f,c())},t)}function d(){i&&clearTimeout(i)}function f(e,...t){if(u)return void d();if(e)return d(),void h.call(null,e,...t);if(c()||o)return d(),void h.call(null,e,...t);let n;r<64&&(r*=2),1===a?(a=2,n=0):n=1e3*(r+Math.random()),l(n)}let p=!1;function m(e){p||(p=!0,d(),u||(null!==s?(e||(a=2),clearTimeout(s),l(0)):e||(a=1)))}return l(0),i=setTimeout(()=>{o=!0,m(!0)},n),m}(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingConnection_&&this.pendingConnection_.abort()}}class Af{constructor(e,t,n){this.wasSuccessCode=e,this.connection=t,this.canceled=!!n}}function kf(e,t,n,r,s,i,o=!0,a=!1){const c=function(e){const t=encodeURIComponent;let n="?";for(const r in e)e.hasOwnProperty(r)&&(n=n+(t(r)+"=")+t(e[r])+"&");return n=n.slice(0,-1),n}(e.urlParams),u=e.url+c,h=Object.assign({},e.headers);return function(e,t){t&&(e["X-Firebase-GMPID"]=t)}(h,t),function(e,t){null!==t&&t.length>0&&(e.Authorization="Firebase "+t)}(h,n),function(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}(h,i),function(e,t){null!==t&&(e["X-Firebase-AppCheck"]=t)}(h,r),new Cf(u,e.method,h,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,s,o,a)}
/**
 * @license
 * Copyright 2017 Google LLC
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
/**
 * @license
 * Copyright 2019 Google LLC
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
class Nf{constructor(e,t){this._service=e,this._location=t instanceof If?t:If.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new Nf(e,t)}get root(){const e=new If(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return function(e){const t=e.lastIndexOf("/",e.length-2);return-1===t?e:e.slice(t+1)}(this._location.path)}get storage(){return this._service}get parent(){const e=function(e){if(0===e.length)return null;const t=e.lastIndexOf("/");return-1===t?"":e.slice(0,t)}(this._location.path);if(null===e)return null;const t=new If(this._location.bucket,e);return new Nf(this._service,t)}_throwIfRoot(e){if(""===this._location.path)throw function(e){return new mf(gf.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}(e)}}function Rf(e,t){const n=null==t?void 0:t.storageBucket;return null==n?null:If.makeFromBucketSpec(n,e)}class Df{constructor(e,t,n,r,s,i=!1){this.app=e,this._authProvider=t,this._appCheckProvider=n,this._url=r,this._firebaseVersion=s,this._isUsingEmulator=i,this._bucket=null,this._host=pf,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,this._bucket=null!=r?If.makeFromBucketSpec(r,this._host):Rf(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,null!=this._url?this._bucket=If.makeFromBucketSpec(this._url,e):this._bucket=Rf(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Sf("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Sf("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(null!==t)return t.accessToken}return null}async _getAppCheckToken(){if($e(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});if(e){return(await e.getToken()).token}return null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Nf(this,e)}_makeRequest(e,t,n,r,s=!0){if(this._deleted)return new bf(Tf());{const i=kf(e,this._appId,n,r,t,this._firebaseVersion,s,this._isUsingEmulator);return this._requests.add(i),i.getPromise().then(()=>this._requests.delete(i),()=>this._requests.delete(i)),i}}async makeRequestWithTokens(e,t){const[n,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,n,r).getPromise()}}const Of="@firebase/storage",Pf="0.14.0",Lf="storage";function Mf(e=We(),t){const n=qe(e=D(e),Lf).getImmediate({identifier:t}),r=u("storage");return r&&function(e,t,n,r={}){!function(e,t,n,r={}){e.host=`${t}:${n}`;const s=f(t);s&&(p(`https://${e.host}/b`),v("Storage",!0)),e._isUsingEmulator=!0,e._protocol=s?"https":"http";const{mockUserToken:i}=r;i&&(e._overrideAuthToken="string"==typeof i?i:m(i,e.app.options.projectId))}(e,t,n,r)}(n,...r),n}function xf(e,{instanceIdentifier:t}){const n=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return new Df(n,r,s,t,Ge)}Be(new O(Lf,xf,"PUBLIC").setMultipleInstances(!0)),Qe(Of,Pf,""),Qe(Of,Pf,"esm2020");export{cf as A,af as B,O as C,uf as D,hf as E,E as F,ff as G,Ei as T,Be as _,$e as a,qe as b,D as c,u as d,Ke as e,ds as f,We as g,ad as h,f as i,Mf as j,td as k,nr as l,Zn as m,er as n,tr as o,p,Vd as q,Qe as r,of as s,ed as t,v as u,sf as v,jd as w,$d as x,Hd as y,nf as z};
