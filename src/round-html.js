export const html = (strings, ...args) => {
  const sanitizedArray = args.map((arg) => {
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
