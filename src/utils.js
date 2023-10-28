export const filterEmptyStrings = (arr) => {
  const sanitizedArray = arr.filter((el) => {
    if (typeof el === "string") {
      if (el.trim() !== "") return el;
    } else {
      return el;
    }
  });
  return sanitizedArray;
};

export const appendDOM = (root, innerHTML) => {
  if (Array.isArray(innerHTML)) {
    const sanitizedArray = filterEmptyStrings(innerHTML);
    sanitizedArray.forEach((el) => {
      if (Array.isArray(el)) {
        el.forEach((el) => root.appendChild(el));
      } else {
        root.appendChild(el);
      }
    });
  } else {
    root.appendChild(innerHTML);
  }
};
/**
 * Takes a virtual node as parameter and returns a clone with events rehydrated
 * @param {HTMLElement} vdomNode
 * @param {HTMLElement} domNode
 * @returns {HTMLElement}
 */
export const rehydratedNode = (vdomNode) => {
  const clone = vdomNode.cloneNode(true);
  const virtualNodeChildren = Array.prototype.slice.call(vdomNode.childNodes);

  // check if node has any attribute "@"

  // For each of the @attributes:
  // get the on`` property
  // set the on`` property of the clone to be equal ex: clone[`onclick`] = vdomNode[`onclick`];

  // children.forEach => rehydratedNode child

  return clone;
};
