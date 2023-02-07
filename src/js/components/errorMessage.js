export const ErrorMessage = () => {
  const errorMessage = document.createElement("div");
  const errorMessageContent = `
        <h2>Something went wrong!</h2>
        <p>Please refresh the page</p>
    `;

  errorMessage.classList.add("error-message");
  errorMessage.innerHTML = errorMessageContent;

  return errorMessage;
};
