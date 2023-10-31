const findKey = (string) => {
  console.log(string)
  const indexOfkey = string.indexOf('_key="');
  if (indexOfkey < 0) return null;

  const foundKeySegment = string.slice(indexOfkey);
  const foundKey = foundKeySegment.slice(
    foundKeySegment.indexOf('"') + 1,
    foundKeySegment.indexOf('"') + 37
  );
  return foundKey;
};

const insertKey = (string, key) => {
  const openingIndex = string.lastIndexOf("<");
  if (openingIndex === -1) return null;

  let closingIndex;

  for (let i = openingIndex + 1; i < string.length; i++) {
    if (string[i] == " ") {
      closingIndex = i;
      break;
    }
  }

  const stringWithKey = `${string.slice(
    0,
    closingIndex
  )} _key="${key}" ${string.slice(closingIndex)}`;

  return stringWithKey;
};

const extractEventType = (string) => {
  const stringToArray = string.split(" ");
  const fullEventType = stringToArray.at(-1).split("=", 1);
  const sanitizedEventType = fullEventType[0].slice(1);
  return sanitizedEventType;
};

export const html = (strings, ...args) => {
  let transformedStrings = [...strings];
  const sanitizedArray = args.map((arg, i) => {
    if (typeof arg === "function") {
      const eventType = extractEventType(transformedStrings[i]);

      let _key = self.crypto.randomUUID();
      let stringWithKey = insertKey(transformedStrings[i], _key);
      if(eventType == 'input') {
        console.log(_key)
        console.log(stringWithKey)
      }
    
      let index = i;
      while (stringWithKey === null) {
        index--;
        const foundKey = findKey(transformedStrings[index]);
        if (foundKey !== null) {
          _key = foundKey;
          stringWithKey = insertKey(transformedStrings[index], _key);
          break;
        }
      }
      transformedStrings[index] = stringWithKey;
      return arg(eventType, _key);
    }
    if (Array.isArray(arg)) return arg.join(" ");

    if (typeof arg === "object") return JSON.stringify(arg);

    return arg;
  });

  return transformedStrings.reduce(
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
