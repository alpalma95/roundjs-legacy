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

export let track = [];

const eventIsRegistered = (node, event) =>
  track.some(
    (registry) =>
      registry.node == node &&
      registry.event.type == event.type &&
      registry.event.target === event.target
  );

/**
 *
 * @param {HTMLElement} node HTMLElement to which we want to add the event listener
 * @param {{type: string, cb: ()=> {}, target: string}} event Object containing type of event, callback and target
 * @param {object} options
 * @returns
 */
export const registerEvent = (node, event, options = {}) => {
  const isRegistered = eventIsRegistered(node, event);

  if (isRegistered) {
    return;
  }

  // console.log(`${node.tagName.toLocaleLowerCase()} ${event.target}`);
  const handler = ($event) => {
    if ($event.originalTarget.getAttribute("e-key") == event.target)
      event.cb($event);
  };

  track.push({ node, event, handler });
  node.addEventListener(event.type, handler, options);
  return event.cb;
};

export const unregisterEvents = (node) => {
  track.forEach((registry) => {
    node.removeEventListener(registry.event.type, registry.handler);
  });
  track = [...track.filter((registry) => registry.node != node)];
  return;
};
