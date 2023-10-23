import htm from "htm/mini";
import { html } from "./src/round-html";
function h(element, attributes, ...children) {
    console.log(element, attributes, children)
    return {element, attributes, children}
}
const test = htm.bind(h)

const markup = html`    <h1>Hello world
    ${html`     <strong> 2</strong> `}
</h1>    `

const body = document.querySelector('body')

if(Array.isArray(markup)) {
    const sanitizedArray = markup.filter(el => {
        if (typeof el === 'string') {
            if (el.trim() !== "") return el 
        } else {
            return el
        }
    })

    sanitizedArray.forEach(el => body.appendChild(el))
} else {
    body.appendChild(markup)
}




console.log(markup.map(el => typeof el))