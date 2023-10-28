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

  // check if node has any attribute "@"

  // For each of the @attributes:
  // get the on`` property
  // set the on`` property of the clone to be equal ex: clone[`onclick`] = vdomNode[`onclick`];

  // children.forEach => rehydratedNode child

  return clone;
};

const track = [];
/**
 *
 * @param {HTMLElement} node HTMLElement to which we want to add the event listener
 * @param {{type: string, cb: ()=> {}, target: string}} event Object containing type of event and callback
 * @param {object} options
 * @returns
 */
export const registerEvent = (node, event, options = {}) => {
  const eventIsRegistered = track.some(
    (registry) =>
      registry.node == node &&
      registry.event.type == event.type &&
      registry.event.target === event.target
  );

  if (eventIsRegistered) return;

  track.push({ node, event });
  console.log(track);
  // console.log(event.target);
  // console.log(track);
  // console.log(`${node.tagName.toLocaleLowerCase()} ${event.target}`);
  const handler = ($event) => {
    if ($event.target.getAttribute(":key") == event.target) event.cb();
  };
  return node.addEventListener(event.type, handler, options);
};
