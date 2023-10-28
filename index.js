import htm from "htm/mini";
import { html } from "./src/round-html";
import { ReactiveWC } from "./src/round";
import { getVDOM } from "./src/diff";

function h(element, attributes, ...children) {
  console.log(element, attributes, children);
  return { element, attributes, children };
}
const test = htm.bind(h);

class Test extends ReactiveWC {
  constructor() {
    super();
    this.state = this.defineState({
      count: 0,
      items: [],
    });
  }

  // This must be a fat arrow function, otherwise we'll need to remember
  // to bind the method to this.
  inc = (num) => {
    this.state.count += num;
    const newItem = {
      id: this.state.count,
      text: `Item ${this.state.count}`,
    };
    this.state.items = [...this.state.items, newItem];
  };

  render() {
    return html`
      <h1 :text=${this.state.count}>Hi there</h1>
      <p>This is a counter: ${this.state.count}</p>
      <button @click=${() => this.inc(3)}>Inc</button>

      <ul>
        ${this.state.items.map(
          (item) =>
            html`<li
              @click="${() => console.log(item)}"
              style="${item.id % 2 === 0 ? "color: red;" : ""}"
            >
              No: ${item.id}, ${item.text}
              <button>log item ${item.id}</button>
            </li>`
        )}
      </ul>
    `;
  }
}

window.customElements.define("test-test", Test);

const t = new Test();
const test1 = t.render();
const test2 = t.render();
