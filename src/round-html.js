/**
 *
 * @param {string} string String located at same poisition as the argument
 */
const extractEventType = (string) => {
  const stringToArray = string.split(" ");
  const fullEventType = stringToArray.at(-1).split("=", 1);
  const sanitizedEventType = fullEventType[0].slice(3);
  return sanitizedEventType;
};

export const html = (strings, ...args) => {
  const sanitizedArray = args.map((arg, i) => {
    if (typeof arg === "function") {
      const eventType = extractEventType(strings[i]);
      return arg(eventType);
    }
    if (Array.isArray(arg)) return arg.join(" ");

    if (typeof arg === "object") return JSON.stringify(arg);

    return arg;
  });

  return strings.reduce(
    (acc, currentString, index) =>
      acc + currentString + (sanitizedArray[index] ?? ""),
    ""
  );
};

export function buildDOM(htmlString) {
  const parser = new DOMParser();
  const body = parser.parseFromString(htmlString, "text/html").body;
  const fragment = new DocumentFragment();
  const nodes = [...body.childNodes];
  nodes.forEach((node) => fragment.appendChild(node));
  return fragment;
}
