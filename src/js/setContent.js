export const setContent = (selector, content) => {
  const element = document.querySelector(selector);
  console.log(element);
  console.log(content);
  element.appendChild(content);
};
