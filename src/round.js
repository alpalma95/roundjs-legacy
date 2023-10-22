export class ReactiveWC extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.getProps();
    this.onInit();
    this.update();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    name.startsWith(":")
      ? (this[name.slice(1)] = newValue)
      : (this[name] = newValue);
    this.watchAttributes(
      name.slice(1),
      JSON.parse(oldValue),
      JSON.parse(newValue)
    );
    this.update();
  }
  disconnectedCallback() {
    this.onDestroy();
  }
  update() {
    const root = this.shadowRoot ? this.shadowRoot : this;
    root.innerHTML = "";

    const innerHTML = this.render();
    if (Array.isArray(innerHTML)) {
      innerHTML.forEach((el) => root.appendChild(el));
    } else {
      root.appendChild(innerHTML);
    }
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
  onInit() {}
  onDestroy() {}
  render() {}
}
