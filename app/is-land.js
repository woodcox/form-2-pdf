(() => {
  // node_modules/@11ty/is-land/is-land.js
  var Island = class _Island extends HTMLElement {
    static tagName = "is-land";
    static prefix = "is-land--";
    static attr = {
      template: "data-island",
      ready: "ready",
      defer: "defer-hydration"
    };
    static onceCache = /* @__PURE__ */ new Map();
    static onReady = /* @__PURE__ */ new Map();
    static fallback = {
      ":not(is-land,:defined,[defer-hydration])": (readyPromise, node, prefix) => {
        let cloned = document.createElement(prefix + node.localName);
        for (let attr of node.getAttributeNames()) {
          cloned.setAttribute(attr, node.getAttribute(attr));
        }
        let shadowroot = node.shadowRoot;
        if (!shadowroot) {
          let tmpl = node.querySelector(":scope > template:is([shadowrootmode], [shadowroot])");
          if (tmpl) {
            let mode = tmpl.getAttribute("shadowrootmode") || tmpl.getAttribute("shadowroot") || "closed";
            shadowroot = node.attachShadow({ mode });
            shadowroot.appendChild(tmpl.content.cloneNode(true));
          }
        }
        if (shadowroot) {
          cloned.attachShadow({ mode: shadowroot.mode }).append(...shadowroot.childNodes);
        }
        cloned.append(...node.childNodes);
        node.replaceWith(cloned);
        return readyPromise.then(() => {
          if (cloned.shadowRoot) {
            node.shadowRoot.append(...cloned.shadowRoot.childNodes);
          }
          node.append(...cloned.childNodes);
          cloned.replaceWith(node);
        });
      }
    };
    constructor() {
      super();
      this.ready = new Promise((resolve) => {
        this.readyResolve = resolve;
      });
    }
    // any parents of `el` that are <is-land> (with conditions)
    static getParents(el, stopAt = false) {
      let nodes = [];
      while (el) {
        if (el.matches && el.matches(_Island.tagName)) {
          if (stopAt && el === stopAt) {
            break;
          }
          if (Conditions.hasConditions(el)) {
            nodes.push(el);
          }
        }
        el = el.parentNode;
      }
      return nodes;
    }
    static async ready(el, parents) {
      if (!parents) {
        parents = _Island.getParents(el);
      }
      if (parents.length === 0) {
        return;
      }
      let imports = await Promise.all(parents.map((p) => p.wait()));
      if (imports.length) {
        return imports[0];
      }
    }
    forceFallback() {
      if (window.Island) {
        Object.assign(_Island.fallback, window.Island.fallback);
      }
      for (let selector in _Island.fallback) {
        let components = Array.from(this.querySelectorAll(selector)).reverse();
        for (let node of components) {
          if (!node.isConnected) {
            continue;
          }
          let parents = _Island.getParents(node);
          if (parents.length === 1) {
            let p = _Island.ready(node, parents);
            _Island.fallback[selector](p, node, _Island.prefix);
          }
        }
      }
    }
    wait() {
      return this.ready;
    }
    async connectedCallback() {
      if (Conditions.hasConditions(this)) {
        this.forceFallback();
      }
      await this.hydrate();
    }
    getTemplates() {
      return this.querySelectorAll(`template[${_Island.attr.template}]`);
    }
    replaceTemplates(templates) {
      for (let node of templates) {
        if (_Island.getParents(node, this).length > 0) {
          continue;
        }
        let value = node.getAttribute(_Island.attr.template);
        if (value === "replace") {
          let children = Array.from(this.childNodes);
          for (let child of children) {
            this.removeChild(child);
          }
          this.appendChild(node.content);
          break;
        } else {
          let html = node.innerHTML;
          if (value === "once" && html) {
            if (_Island.onceCache.has(html)) {
              node.remove();
              return;
            }
            _Island.onceCache.set(html, true);
          }
          node.replaceWith(node.content);
        }
      }
    }
    async hydrate() {
      let conditions = [];
      if (this.parentNode) {
        conditions.push(_Island.ready(this.parentNode));
      }
      let attrs = Conditions.getConditions(this);
      for (let condition in attrs) {
        if (Conditions.map[condition]) {
          conditions.push(Conditions.map[condition](attrs[condition], this));
        }
      }
      await Promise.all(conditions);
      this.replaceTemplates(this.getTemplates());
      for (let fn of _Island.onReady.values()) {
        await fn.call(this, _Island);
      }
      this.readyResolve();
      this.setAttribute(_Island.attr.ready, "");
      this.querySelectorAll(`[${_Island.attr.defer}]`).forEach((node) => node.removeAttribute(_Island.attr.defer));
    }
  };
  var Conditions = class _Conditions {
    static map = {
      visible: _Conditions.visible,
      idle: _Conditions.idle,
      interaction: _Conditions.interaction,
      media: _Conditions.media,
      "save-data": _Conditions.saveData
    };
    static hasConditions(node) {
      return Object.keys(_Conditions.getConditions(node)).length > 0;
    }
    static getConditions(node) {
      let map = {};
      for (let key of Object.keys(_Conditions.map)) {
        if (node.hasAttribute(`on:${key}`)) {
          map[key] = node.getAttribute(`on:${key}`);
        }
      }
      return map;
    }
    static visible(noop, el) {
      if (!("IntersectionObserver" in window)) {
        return;
      }
      return new Promise((resolve) => {
        let observer = new IntersectionObserver((entries) => {
          let [entry] = entries;
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            resolve();
          }
        });
        observer.observe(el);
      });
    }
    // Warning: on:idle is not very useful with other conditions as it may resolve long before.
    static idle() {
      let onload = new Promise((resolve) => {
        if (document.readyState !== "complete") {
          window.addEventListener("load", () => resolve(), { once: true });
        } else {
          resolve();
        }
      });
      if (!("requestIdleCallback" in window)) {
        return onload;
      }
      return Promise.all([
        new Promise((resolve) => {
          requestIdleCallback(() => {
            resolve();
          });
        }),
        onload
      ]);
    }
    static interaction(eventOverrides, el) {
      let events = ["click", "touchstart"];
      if (eventOverrides) {
        events = (eventOverrides || "").split(",").map((entry) => entry.trim());
      }
      return new Promise((resolve) => {
        function resolveFn(e) {
          resolve();
          for (let name of events) {
            el.removeEventListener(name, resolveFn);
          }
        }
        for (let name of events) {
          el.addEventListener(name, resolveFn, { once: true });
        }
      });
    }
    static media(query) {
      let mm = {
        matches: true
      };
      if (query && "matchMedia" in window) {
        mm = window.matchMedia(query);
      }
      if (mm.matches) {
        return;
      }
      return new Promise((resolve) => {
        mm.addListener((e) => {
          if (e.matches) {
            resolve();
          }
        });
      });
    }
    static saveData(expects) {
      if (!("connection" in navigator) || navigator.connection.saveData === (expects !== "false")) {
        return;
      }
      return new Promise(() => {
      });
    }
  };
  if ("customElements" in window) {
    window.customElements.define(Island.tagName, Island);
    window.Island = Island;
  }
  var ready = Island.ready;
})();
//# sourceMappingURL=is-land.js.map
