import { appendDOM } from "./utils";

export const getVDOM = (element) => {
  const parser = new DOMParser();
  const root = parser.parseFromString("", "text/html").body;
  const innerHTML = element.render();
  appendDOM(root, innerHTML);
  return root;
};

export const getVDOMAsync = (element) => {
  return new Promise((resolve, _reject) => {
    const vdom = getVDOM(element);
    resolve(vdom);
  });
};

export const isCustomElement = function (node) {
  return node?.tagName?.includes("-");
};

const getNodeType = function (node) {
  if (node.nodeType === 3) return "text";
  if (node.nodeType === 8) return "comment";
  return node.tagName.toLowerCase();
};

const getNodeContent = function (node) {
  if (node.childNodes && node.childNodes.length > 0) return null;
  return node.textContent;
};

const attrbutesIndex = function (el) {
  var attributes = {};
  console.log(el)
  if (el.attributes == undefined) return attributes;
  for (var i = 0, atts = el.attributes, n = atts.length; i < n; i++) {
    attributes[atts[i].name] = atts[i].value;
  }
  return attributes;
};

/** Credits: [Joydeep](https://dev.to/joydeep-bhowmik/virtual-dom-diffing-algorithm-implementation-in-vanilla-javascript-2324) */
const patchAttributes = function (vdom, dom) {
  let vdomAttributes = attrbutesIndex(vdom);
  let domAttributes = attrbutesIndex(dom);
  console.log(domAttributes)
  console.log(vdomAttributes)
  if (vdomAttributes == domAttributes) return;
  Object.keys(vdomAttributes).forEach((key) => {
    if (!dom.getAttribute(key) && !key.startsWith("@")) {
      dom.setAttribute(key, vdomAttributes[key]);
    } else if (dom.getAttribute(key) && !key.startsWith("@")) {
      if (vdomAttributes[key] != domAttributes[key]) {
        dom.setAttribute(key, vdomAttributes[key]);
      }
    }
  });
  Object.keys(domAttributes).forEach((key) => {
    if (!vdom.getAttribute(key)) {
      dom.removeAttribute(key);
    }
  });
};

/** Credits: [Go Make Things](https://gomakethings.com/dom-diffing-with-vanilla-js/)
 * Tweaked to account for custom elements and to diff attributes.
 */
export const diff = function (template, elem) {
  const domNodes = [...elem.childNodes];
  const templateNodes = [...template.childNodes];

  let count = domNodes.length - templateNodes.length;
  if (count > 0) {
    for (; count > 0; count--) {
      domNodes[domNodes.length - count].parentNode.removeChild(
        domNodes[domNodes.length - count]
      );
    }
  }

  templateNodes.forEach(function (node, index) {
    if (isCustomElement(domNodes[index]))
      patchAttributes(node, domNodes[index]);
    if (!domNodes[index]) {
      elem.appendChild(node.cloneNode(true));
      return;
    }

    if (getNodeType(node) !== getNodeType(domNodes[index])) {
      domNodes[index].parentNode.replaceChild(
        node.cloneNode(true),
        domNodes[index]
      );
      return;
    }

    const templateContent = getNodeContent(node);
    if (
      templateContent &&
      templateContent !== getNodeContent(domNodes[index])
    ) {
      domNodes[index].textContent = templateContent;
    }

    
    if (
      domNodes[index].childNodes.length > 0 &&
      node.childNodes.length < 1 &&
      !isCustomElement(domNodes[index])
    ) {
      domNodes[index].innerHTML = "";
      return;
    }

    if (domNodes[index].childNodes.length < 1 && node.childNodes.length > 0) {
      const fragment = document.createDocumentFragment();
      diff(node, fragment);
      domNodes[index].appendChild(fragment);
      return;
    }

    if (node.childNodes.length > 0) {
      diff(node, domNodes[index]);
      patchAttributes(node, domNodes[index]);
    }
  });
};

export const diffAsync = function (template, elem) {
  return new Promise((resolve, _reject) => {
    diff(template, elem);
    resolve();
  });
};
