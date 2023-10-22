export class ReactiveWC extends HTMLElement {
  /** For custom attributes, remember to use ":attr" */
  static get observedAttributes() {
    return [];
  }
  constructor() {
    super();
  }
  /**
   * This will ensure that the component performs all the basic
   * opperations when connected to the DOM. Any additional logic
   * must be called within this.onInit() method.
   *
   * IMPORTANT: When overriding the connectedCallback(), remember to always call inside:
   * - this.getProps()
   * - this.onInit() // *ideally custom logic goes here*
   * - this.render()
   * - ... your custom logic
   */
  connectedCallback() {
    this.getProps();
    this.onInit();
    this.update();
  }
  /**
   * By default, this will watch any custom attribute starting
   * with ":" (thought for using in conjunction with other frameworks or dynamic data).
   *
   * It will automatically set the name of the attribute without the colon (in case
   * of custom attributes) and keep the original name of the attribute for standard
   * HTML attributes.
   */
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

  /** Same use case as for connectedCallback. This calls a custom method
   * so we can use the default disconnected callback to perform default logic.
   *
   * At the moment, I couldn't come up with anything. However, I'd like to reserve
   * the space in case something comes up (also for coherence)
   */
  disconnectedCallback() {
    this.onDestroy();
  }

  /**
   * This method is called during:
   * - connectedCallback
   * - attributesChangedCallback
   * - re-render within the reactive data
   *
   * Within the constructor, we can easily opt-in to use shadow root mode. If that's
   * the case, the inner nodes will be appended to the shadow root.
   */
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

  /**
   * It will automatically set the property of the component to be the same as
   * the custom attribute without the initial colon.
   *
   * Eg: **:name** => **this.name**
   *
   * **Important**: In case of standard attributes (eg: *class*, *id*, *src*...), we still
   * will need to get them manually.
   */
  getProps() {
    this.getAttributeNames().forEach((attr) => {
      if (!attr.startsWith(":")) return;
      this[attr.slice(1)] = JSON.parse(this.getAttribute(attr));
    });
  }

  /**
   * Method called within the attributesChangedCallback. It will get the same
   * parameters as passed by default to the attributesChangedCallback.
   *
   * @param {any} name name of the attribute that triggered the attributesChanged callbadk
   * @param {any} oldValue old value of the changed attribute
   * @param {any} newValue new value of the changed attribute
   */
  watchAttributes(name, oldValue, newValue) {}

  /**
   * Define reactive state within the component. It must be an object.
   * @param {object} object
   */
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
   * Function to be called on the **connectedCallback** method. It's
   * advisable to use this method instead of overwriting the
   * connectedCallback method.
   */
  onInit() {}

  /**
   * Function to be called on the **disconnectedCallback** method. It's
   * advisable to use this method instead of overwriting the
   * disconnectedCallback method.
   */
  onDestroy() {}

  /**
   * Returns the html the component to be appended to its root or shadow root.
   * @returns {HTMLElement}
   */
  render() {}
}
