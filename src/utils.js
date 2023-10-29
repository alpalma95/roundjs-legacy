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
