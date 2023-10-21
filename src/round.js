export class ReactiveWC extends HTMLElement {
  static get observedAttributes() {
    return [];
  }
  connectedCallback() {
    this.getProps();
    this.onInit();
    this.update();
  }
  attributeChangedCallback(name, _oldValue, newValue) {
    this[name] = newValue;
    this.watchAttributes(name, JSON.parse(_oldValue), JSON.parse(newValue));
    this.update();
  }
  disconnectedCallback() {
    this.onDestroy();
  }
  update() {
    this.innerHTML = "";

    const innerHTML = this.render();
    if (Array.isArray(innerHTML)) {
      innerHTML.forEach((el) => this.appendChild(el));
    } else {
      this.appendChild(innerHTML);
    }
  }
  getProps() {
    this.getAttributeNames().forEach((attr) => {
      if (!attr.startsWith("data_")) return;
      this[attr] = JSON.parse(this.getAttribute(attr));
    });
  }
  watchAttributes(name, _oldValue, newValue) {}
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
