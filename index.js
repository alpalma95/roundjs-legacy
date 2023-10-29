import { html } from "./src/round-html";
import { ReactiveWC } from "./src/round";
import { registerEvent } from "./src/";

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
      <b-b test="${this.state.count}"></b-b>

      <p>This is a counter: ${this.state.count}</p>
      <button
        id="inc_button"
        click="${registerEvent(this, {
          type: "click",
          cb: this.inc,
          target: "inc_button",
        })}"
        mouseover="${registerEvent(this, {
          type: "mouseover",
          cb: () => this.inc(),
          target: "inc_button",
        })}"
      >
        Inc + 3
      </button>
      <ul>
        ${this.state.items.map(
          (item) =>
            html`<li style="${item.id % 2 === 0 ? "color: red;" : ""}">
              No: ${item.id}, ${item.text}
              <button
                :key="${item.id}"
                @click="${registerEvent(this, {
                  type: "click",
                  cb: ($event) => {
                    this.rm(item);
                    console.log($event);
                  },
                  target: item.id,
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
