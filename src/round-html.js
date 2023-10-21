import htm from "htm/mini";

function parseDOM(element, attributes, ...children) {
  const newElement = document.createElement(element);
  if (attributes) {
    for (const [key, value] of Object.entries(attributes)) {
      if (typeof value === "object") {
        newElement.setAttribute(
          key,
          JSON.stringify(value).replaceAll('"', "'")
        );
      } else if (typeof value === "function") {
        newElement.addEventListener(key.slice(1), value);
        newElement.setAttribute(`${key.slice(1)}`, value.name);
      } else {
        newElement.setAttribute(key, value);
      }
    }
  }
  if (children) {
    children.forEach((ch) => {
      if (Array.isArray(ch)) {
        const sanitizedArray = ch.filter((el) => el != " ");

        sanitizedArray.forEach((el) => newElement.appendChild(el));
        return;
      }

      if (typeof ch !== "object") {
        console.log(ch);

        const text = document.createTextNode(ch);
        newElement.appendChild(text);
        return;
      }

      newElement.appendChild(ch);
    });
  }

  console.log(newElement.outerHTML);
  return newElement;
}
export const html = htm.bind(parseDOM);
