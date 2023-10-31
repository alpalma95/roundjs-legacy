import { html } from "./src/round-html";
import { ReactiveWC } from "./src/round";
import { delegate } from "./src/";
import { itemService } from "./itemService";

class Test extends ReactiveWC {
  constructor() {
    super();
    this.state = this.defineState({
      count: 2,
      items: [],
      text: ""
    });

  }

  onInit() {
    itemService.items.connect(this, (items) => this.state.items = items)
    itemService.currentItem.connect(this, (val) => this.state.text = val)
    
  }

  inc() {
    this.state.count++;
    console.log({id: this.state.count, text: "New item "})
    itemService.addItem({id: this.state.count, text: "New item "})
  }

  rm(item) {
    itemService.removeItem(item)
  }

  render() {
    return html`
      <h1 :text=${this.state.count}>Hi there</h1>
      <b-b :test="${this.state.count}"></b-b>
      <p>Text from service: ${this.state.text}</p>
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
                  //   console.log($event);
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
      newItem: {
        text: "",
        id: self.crypto.randomUUID()
      }
    });
    this.newItem = {
      text: "",
      id: self.crypto.randomUUID()
    }
  }

  onInit() {
    itemService.currentItem.connect(this, (val) => this.state.newItem.text = val)
  }

  watchAttributes(n, nv) {
    if (n == "test") {
      this.state.count = nv;
    }
  }
  render() {
    return html`
      <div style="background-color: ${this.test % 2 == 0 ? 'blue' : 'red'};">
        <h1 style="background-color: ${this.test % 2 == 0 ? 'red' : 'blue'};">Hello from B component <i>${this.state.count}</i></h1>
        
        <input type="text" @input="${delegate(this, ($event)=> {
          itemService.editItem($event.target.value);
        })}"
        >
        <button >Add</button>
      </div>
    `;
  }
}
window.customElements.define("b-b", B);
