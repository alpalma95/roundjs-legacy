import htm from "htm/mini";
import { filterEmptyStrings } from "./utils";

function buildDOM(element, attributes, ...children) {
  const newElement = document.createElement(element);
  if (attributes) {
    for (const [key, value] of Object.entries(attributes)) {
      if (typeof value === "object") {
        newElement.setAttribute(key, JSON.stringify(value));
      } else if (typeof value === "function") {
        // newElement.addEventListener(key.slice(1), value);
        newElement[`on${key.slice(1)}`] = value;
        newElement.setAttribute(`${key.slice(1)}`, value);
      } else {
        newElement.setAttribute(key, value);
      }
    }
  }
  if (children) {
    children.forEach((ch) => {
      if (Array.isArray(ch)) {
        const sanitizedArray = filterEmptyStrings(ch);
        sanitizedArray.forEach((el) => newElement.appendChild(el));
        return;
      }
      if (typeof ch !== "object") {
        const text = document.createTextNode(ch);
        newElement.appendChild(text);
        return;
      }
      newElement.appendChild(ch);
    });
  }
  return newElement;
}

export const html = htm.bind(buildDOM);
