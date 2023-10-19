class n extends HTMLElement {
  static get observedAttributes() {
    return [];
  }
  connectedCallback() {
    this.getProps(), this.onInit(), this.innerHTML = this.render();
  }
  attributeChangedCallback(t, e, s) {
    this[t] = s, this.watchAttributes(t, JSON.parse(e), JSON.parse(s)), this.innerHTML = this.render();
  }
  disconnectedCallback() {
    this.onDestroy();
  }
  getProps() {
    this.getAttributeNames().forEach((t) => {
      t.startsWith("data_") && (this[t] = JSON.parse(this.getAttribute(t)));
    });
  }
  watchAttributes(t, e, s) {
  }
  defineState(t) {
    if (t === null || typeof t != "object")
      return t;
    for (const e in t)
      t[e] = this.defineState(t[e]);
    return new Proxy(t, {
      get(e, s) {
        return e[s];
      },
      set: (e, s, i) => (e[s] !== i && (e[s] = i, this.innerHTML = this.render()), !0)
    });
  }
  onInit() {
  }
  onDestroy() {
  }
  render() {
  }
}
class a {
  constructor(t) {
    this._initialValue = t, this._subscribers = [];
  }
  get value() {
    return this._initialValue;
  }
  set value(t) {
    this._initialValue = t, this._subscribers.forEach(({ cb: e }) => e(this.value));
  }
  connect(t, e) {
    this.value = this._initialValue, this._subscribers.push({ component: t, cb: e });
  }
  disconnect(t) {
    this._subscribers = this._subscribers.filter(
      ({ component: e }) => e === t
    );
  }
}
export {
  n as ReactiveWC,
  a as Stream
};
