import { diffAsync } from "./diff";
import { buildDOM } from "./round-html";
import { appendDOM } from "./utils";
import { hydrate, unregisterEvents } from "./eventsManager";

export class ReactiveWC extends HTMLElement {
  constructor() {
    super();
    this._componentDidRender = false;
  }
  connectedCallback() {
    this.getProps();
    this.onInit();
    this.firstRender();

    hydrate(this);
  }
  attributeChangedCallback(name, oldValue, newValue) {
    name.startsWith(":")
      ? (this[name.slice(1)] = newValue)
      : (this[name] = newValue);
    this.watchAttributes(
      name.slice(1),
      JSON.parse(newValue),
      JSON.parse(oldValue)
    );
  }
  disconnectedCallback() {
    this.onDestroy();
  }
  firstRender() {
    const root = this.shadowRoot ? this.shadowRoot : this;

    const innerHTML = buildDOM(this.render());
    appendDOM(root, innerHTML);
    this._componentDidRender = true;
  }
  async update() {
    if (!this._componentDidRender) return;
    unregisterEvents(this);

    const vdom = buildDOM(this.render());
    const dom = this.shadowRoot ? this.shadowRoot : this;
    await diffAsync(vdom, dom);
    hydrate(this);
  }

  getProps() {
    this.getAttributeNames().forEach((attr) => {
      if (!attr.startsWith(":")) return;
      this[attr.slice(1)] = JSON.parse(this.getAttribute(attr));
    });
  }

  defineState(object) {
    if (object === null || typeof object !== "object") {
      return object;
    }
    for (const property in object) {
      object[property] = this.defineState(object[property]);
    }
    return new Proxy(object, {
      get(target, property) {
        return target[property];
      },
      set: (target, property, value) => {
        if (target[property] !== value) {
          target[property] = value;
          this.update();
        }
        return true;
      },
    });
  }
  /**
   *
   * @param {string} name Name of the attribute that is triggering the change callback
   * @param {any} oldValue Old value previous to the change
   * @param {any} newValue Value after the change
   */
  watchAttributes(name, oldValue, newValue) {}
  onInit() {}
  onDestroy() {}
  render() {}
}
