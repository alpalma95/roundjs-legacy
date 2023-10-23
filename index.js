import htm from "htm/mini";
import { html } from "./src/round-html";
import { ReactiveWC } from "./src/round";

function h(element, attributes, ...children) {
    console.log(element, attributes, children)
    return {element, attributes, children}
}
const test = htm.bind(h)

class Test extends ReactiveWC {
    constructor() {
        super()
        this.state = this.defineState({
            count: 0,
            items: [
                {
                    id: 1,
                    text: 'Item 1'
                },
                {
                    id: 2,
                    text: 'Item 2'
                }
            ]
        })
        this.attachShadow({mode: "open"})
    }

    onInit() {
        const test = this.shadowRoot.innerHTML
        console.log(test)

    }

    // This must be a fat arrow function, otherwise we'll need to remember
    // to bind the method to this.
    inc = (num) => {
        this.state.count += num
               
    }

    render() {
        return html`
            <h1>Hi there</h1>
            <p>This is a counter: ${this.state.count}</p>
            <button @click=${()=>this.inc(3)}>Inc</button>
            <slot name="test"></slot>
            <!-- check why this doesn't work outside outter element -->
            ${ this.state.items.map(item => html`<li>No: ${item.id}, ${item.text} </li>`) }

            <ul>
            </ul>
            

        `
    }
}

window.customElements.define('test-test', Test)

const t = new Test()
console.log(t.render())