import { html } from "./src/round-html";
import { ReactiveWC } from "./src/round";
import { delegate } from "./src/";

class Test extends ReactiveWC {
  constructor() {
    super();
    this.state = this.defineState({
      count: 0,
      items: [
        {
          id: 1,
          text: "Item 1",
        },
        {
          id: 2,
          text: "Item 2",
        },
      ],
    });
  }
  onInit() {
    console.log(this.querySelector("[click]"));
  }

  inc(num) {
    this.state.count++;
    const newItem = {
      id: this.state.count,
      text: `Item ${this.state.count}`,
    };
    this.state.items = [...this.state.items, newItem];
  }

  rm(item) {
    this.state.items = [...this.state.items.filter((i) => i.id != item.id)];
  }

  render() {
    return html`
      <h1 :text=${this.state.count}>Hi there</h1>
      <b-b :test="${this.state.count}"></b-b>

      <p>This is a counter: ${this.state.count}</p>
      <button
        @click="${delegate(this, this.inc)}"
        @mouseover="${delegate(this, () => this.inc())}"
      >
        Increment
      </button>
      <ul>
        ${this.state.items.map(
          (item) =>
            html` <li>
              No: ${item.id}, ${item.text}
              <button
                @click="${delegate(this, ($event) => {
                  this.rm(item);
                  console.log($event);
                })}"
              >
                Remove item ${item.id}
              </button>
            </li>`
        )}
      </ul>
    `;
  }
}

window.customElements.define("test-test", Test);

class B extends ReactiveWC {
  static get observedAttributes() {
    return [":test"];
  }
  constructor() {
    super();
    this.state = this.defineState({
      count: "",
    });
  }

  watchAttributes(n, nv) {
    if (n == "test") {
      this.state.count = nv;
    }
  }
  render() {
    return html`
      <div style="background-color: red;">
        <h1>Hello from B component <i>${this.state.count}</i></h1>
      </div>
    `;
  }
}
window.customElements.define("b-b", B);
