(()=>{var w=Object.defineProperty;var b=(c,t,e)=>t in c?w(c,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):c[t]=e;var l=(c,t,e)=>(b(c,typeof t!="symbol"?t+"":t,e),e);var p=(c,t,e)=>new Promise((a,i)=>{var o=h=>{try{d(e.next(h))}catch(u){i(u)}},n=h=>{try{d(e.throw(h))}catch(u){i(u)}},d=h=>h.done?a(h.value):Promise.resolve(h.value).then(o,n);d((e=e.apply(c,t)).next())});var r=class r extends HTMLElement{constructor(){super(),this.ready=new Promise(t=>{this.readyResolve=t})}static getParents(t,e=!1){let a=[];for(;t;){if(t.matches&&t.matches(r.tagName)){if(e&&t===e)break;f.hasConditions(t)&&a.push(t)}t=t.parentNode}return a}static ready(t,e){return p(this,null,function*(){if(e||(e=r.getParents(t)),e.length===0)return;let a=yield Promise.all(e.map(i=>i.wait()));if(a.length)return a[0]})}forceFallback(){window.Island&&Object.assign(r.fallback,window.Island.fallback);for(let t in r.fallback){let e=Array.from(this.querySelectorAll(t)).reverse();for(let a of e){if(!a.isConnected)continue;let i=r.getParents(a);if(i.length===1){let o=r.ready(a,i);r.fallback[t](o,a,r.prefix)}}}}wait(){return this.ready}connectedCallback(){return p(this,null,function*(){f.hasConditions(this)&&this.forceFallback(),yield this.hydrate()})}getTemplates(){return this.querySelectorAll(`template[${r.attr.template}]`)}replaceTemplates(t){for(let e of t){if(r.getParents(e,this).length>0)continue;let a=e.getAttribute(r.attr.template);if(a==="replace"){let i=Array.from(this.childNodes);for(let o of i)this.removeChild(o);this.appendChild(e.content);break}else{let i=e.innerHTML;if(a==="once"&&i){if(r.onceCache.has(i)){e.remove();return}r.onceCache.set(i,!0)}e.replaceWith(e.content)}}}hydrate(){return p(this,null,function*(){let t=[];this.parentNode&&t.push(r.ready(this.parentNode));let e=f.getConditions(this);for(let a in e)f.map[a]&&t.push(f.map[a](e[a],this));yield Promise.all(t),this.replaceTemplates(this.getTemplates());for(let a of r.onReady.values())yield a.call(this,r);this.readyResolve(),this.setAttribute(r.attr.ready,""),this.querySelectorAll(`[${r.attr.defer}]`).forEach(a=>a.removeAttribute(r.attr.defer))})}};l(r,"tagName","is-land"),l(r,"prefix","is-land--"),l(r,"attr",{template:"data-island",ready:"ready",defer:"defer-hydration"}),l(r,"onceCache",new Map),l(r,"onReady",new Map),l(r,"fallback",{":not(is-land,:defined,[defer-hydration])":(t,e,a)=>{let i=document.createElement(a+e.localName);for(let n of e.getAttributeNames())i.setAttribute(n,e.getAttribute(n));let o=e.shadowRoot;if(!o){let n=e.querySelector(":scope > template:is([shadowrootmode], [shadowroot])");if(n){let d=n.getAttribute("shadowrootmode")||n.getAttribute("shadowroot")||"closed";o=e.attachShadow({mode:d}),o.appendChild(n.content.cloneNode(!0))}}return o&&i.attachShadow({mode:o.mode}).append(...o.childNodes),i.append(...e.childNodes),e.replaceWith(i),t.then(()=>{i.shadowRoot&&e.shadowRoot.append(...i.shadowRoot.childNodes),e.append(...i.childNodes),i.replaceWith(e)})}});var m=r,s=class s{static hasConditions(t){return Object.keys(s.getConditions(t)).length>0}static getConditions(t){let e={};for(let a of Object.keys(s.map))t.hasAttribute(`on:${a}`)&&(e[a]=t.getAttribute(`on:${a}`));return e}static visible(t,e){if("IntersectionObserver"in window)return new Promise(a=>{let i=new IntersectionObserver(o=>{let[n]=o;n.isIntersecting&&(i.unobserve(n.target),a())});i.observe(e)})}static idle(){let t=new Promise(e=>{document.readyState!=="complete"?window.addEventListener("load",()=>e(),{once:!0}):e()});return"requestIdleCallback"in window?Promise.all([new Promise(e=>{requestIdleCallback(()=>{e()})}),t]):t}static interaction(t,e){let a=["click","touchstart"];return t&&(a=(t||"").split(",").map(i=>i.trim())),new Promise(i=>{function o(n){i();for(let d of a)e.removeEventListener(d,o)}for(let n of a)e.addEventListener(n,o,{once:!0})})}static media(t){let e={matches:!0};if(t&&"matchMedia"in window&&(e=window.matchMedia(t)),!e.matches)return new Promise(a=>{e.addListener(i=>{i.matches&&a()})})}static saveData(t){if(!(!("connection"in navigator)||navigator.connection.saveData===(t!=="false")))return new Promise(()=>{})}};l(s,"map",{visible:s.visible,idle:s.idle,interaction:s.interaction,media:s.media,"save-data":s.saveData});var f=s;"customElements"in window&&(window.customElements.define(m.tagName,m),window.Island=m);var g=m.ready;})();
