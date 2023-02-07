import { formatAddress } from "./formatAddress.js";

export const Card = ({ name, username, email, phone, address }) => {
  const cardContent = `
            <table>
                <tbody>
                  <tr>
                    <td><i class="fa-solid fa-id-card"></i></td>
                    <td>Name</td>
                    <td class="card__name">${name}</td>
                  </tr>
                  <tr>
                    <td><i class="fa-solid fa-user-large"></i></td>
                    <td>Username</td>
                    <td>${username}</td>
                  </tr>
                  <tr>
                    <td><i class="fa-solid fa-at"></i></td>
                    <td>Email</td>
                    <td><a href="#"> ${email} </a></td>
                  </tr>
                  <tr>
                    <td><i class="fa-solid fa-phone"></i></td>

                    <td>Phone</td>
                    <td>${phone}</td>
                  </tr>
                  <tr>
                    <td><i class="fa-solid fa-location-dot"></i></td>

                    <td>Address</td>
                    <td>${formatAddress(address)}</td>
                  </tr>
                </tbody>
            </table>
  `;

  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = cardContent;

  return card;
};
