export const setContent = (selector, content) => {
  const element = document.querySelector(selector);

  element.appendChild(content);
};
