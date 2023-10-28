import htm from "htm/mini";
import { html } from "./src/round-html";
import { ReactiveWC } from "./src/round";
import { getVDOM } from "./src/diff";
import { registerEvent } from "./src/utils";

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

  test() {
    return (e) => console.log(e.target);
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
      <button
        :key="inc_button"
        click=${registerEvent(this, {
          type: "click",
          cb: () => this.inc(3),
          target: "inc_button",
        })}
        mouseover=${registerEvent(this, {
          type: "mouseover",
          cb: () => this.inc(3),
          target: "inc_button",
        })}
      >
        Inc + 3
      </button>
      <b-b test="${this.state.count}"></b-b>
      <ul>
        ${this.state.items.map(
          (item) =>
            html`<li
              :key="${item.id}"
              click="${registerEvent(this, {
                type: "click",
                cb: () => console.log(item.id),
                target: item.id,
              })}"
              style="${item.id % 2 === 0 ? "color: red;" : ""}"
            >
              No: ${item.id}, ${item.text}
              <button
                :key="${item.id * 0.1}"
                click="${registerEvent(this, {
                  type: "click",
                  cb: () => console.log(item.id + "From button!"),
                  target: item.id * 0.1,
                })}"
                style="${item.id % 2 === 0 ? "color: red;" : ""}"
              >
                log item ${item.id}
              </button>
            </li>`
        )}
      </ul>
    `;
  }
}

window.customElements.define("test-test", Test);

class B extends ReactiveWC {
  constructor() {
    super();
  }

  render() {
    return html`
      <div style="background-color: red;">
        <h1>Hello from B component <i>ss</i></h1>
      </div>
    `;
  }
}
window.customElements.define("b-b", B);

const t = new Test();
const test1 = t.render();
const test2 = t.render();
