class p extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.getProps(), this.onInit(), this.update();
  }
  attributeChangedCallback(e, i, r) {
    e.startsWith(":") ? this[e.slice(1)] = r : this[e] = r, this.watchAttributes(
      e.slice(1),
      JSON.parse(i),
      JSON.parse(r)
    ), this.update();
  }
  disconnectedCallback() {
    this.onDestroy();
  }
  update() {
    const e = this.shadowRoot ? this.shadowRoot : this;
    e.innerHTML = "";
    const i = this.render();
    Array.isArray(i) ? i.forEach((r) => e.appendChild(r)) : e.appendChild(i);
  }
  getProps() {
    this.getAttributeNames().forEach((e) => {
      e.startsWith(":") && (this[e.slice(1)] = JSON.parse(this.getAttribute(e)));
    });
  }
  defineState(e) {
    if (e === null || typeof e != "object")
      return e;
    for (const i in e)
      e[i] = this.defineState(e[i]);
    return new Proxy(e, {
      get(i, r) {
        return i[r];
      },
      set: (i, r, t) => (i[r] !== t && (i[r] = t, this.update()), !0)
    });
  }
  onInit() {
  }
  onDestroy() {
  }
  render() {
  }
}
class b {
  constructor(e) {
    this._initialValue = e, this._subscribers = [];
  }
  get value() {
    return this._initialValue;
  }
  set value(e) {
    this._initialValue = e, this._subscribers.forEach(({ cb: i }) => i(this.value));
  }
  connect(e, i) {
    this.value = this._initialValue, this._subscribers.push({ component: e, cb: i });
  }
  disconnect(e) {
    this._subscribers = this._subscribers.filter(
      ({ component: i }) => i === e
    );
  }
}
function f(u) {
  for (var e, i, r = arguments, t = 1, s = "", h = "", n = [0], c = function(o) {
    t === 1 && (o || (s = s.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? n.push(o ? r[o] : s) : t === 3 && (o || s) ? (n[1] = o ? r[o] : s, t = 2) : t === 2 && s === "..." && o ? n[2] = Object.assign(n[2] || {}, r[o]) : t === 2 && s && !o ? (n[2] = n[2] || {})[s] = !0 : t >= 5 && (t === 5 ? ((n[2] = n[2] || {})[i] = o ? s ? s + r[o] : r[o] : s, t = 6) : (o || s) && (n[2][i] += o ? s + r[o] : s)), s = "";
  }, a = 0; a < u.length; a++) {
    a && (t === 1 && c(), c(a));
    for (var d = 0; d < u[a].length; d++)
      e = u[a][d], t === 1 ? e === "<" ? (c(), n = [n, "", null], t = 3) : s += e : t === 4 ? s === "--" && e === ">" ? (t = 1, s = "") : s = e + s[0] : h ? e === h ? h = "" : s += e : e === '"' || e === "'" ? h = e : e === ">" ? (c(), t = 1) : t && (e === "=" ? (t = 5, i = s, s = "") : e === "/" && (t < 5 || u[a][d + 1] === ">") ? (c(), t === 3 && (n = n[0]), t = n, (n = n[0]).push(this.apply(null, t.slice(1))), t = 0) : e === " " || e === "	" || e === `
` || e === "\r" ? (c(), t = 2) : s += e), t === 3 && s === "!--" && (t = 4, n = n[0]);
  }
  return c(), n.length > 2 ? n.slice(1) : n[1];
}
function l(u, e, ...i) {
  const r = document.createElement(u);
  if (e)
    for (const [t, s] of Object.entries(e))
      typeof s == "object" ? r.setAttribute(t, JSON.stringify(s)) : typeof s == "function" ? (r.addEventListener(t.slice(1), s), r.setAttribute(`${t.slice(1)}`, s.name)) : r.setAttribute(t, s);
  return i && i.forEach((t) => {
    if (Array.isArray(t)) {
      t.filter((h) => h != " ").forEach((h) => r.appendChild(h));
      return;
    }
    if (typeof t != "object") {
      const s = document.createTextNode(t);
      r.appendChild(s);
      return;
    }
    r.appendChild(t);
  }), r;
}
const y = f.bind(l);
export {
  p as ReactiveWC,
  b as Stream,
  y as html
};
