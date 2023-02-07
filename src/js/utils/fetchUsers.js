import { setContent } from "./setContent.js";
import { Card } from "../components/cardComponent.js";
import { removeElement } from "./removeElement.js";
import { ErrorMessage } from "../components/errorMessage.js";

export const fetchUsers = async () => {
  try {
    const users = await (
      await fetch("https://jsonplaceholder.typicode.com/users")
    ).json();

    if (users.length) removeElement("div.spinner");
    users.forEach((user) => setContent("#cards-content", Card(user)));
  } catch (err) {
    removeElement("div.spinner");
    setContent("#cards-content", ErrorMessage());
  }
};
