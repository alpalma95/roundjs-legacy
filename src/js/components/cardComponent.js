import { ReactiveWC } from "../../../assets/reactive-wc.js";
import { userService } from "../services/userService.js";

export class CardComponent extends ReactiveWC {
  static get observedAttributes() {
    return ["data_user"];
  }

  constructor() {
    super();

    this.count = 0;
    this.state = this.defineState({
      user: {},
      count: 0,
    });
  }

  onInit() {
    this.classList.add("card");
    this.state.user = { ...this.data_user };

    userService.count.subscribe((val) => {
      this.state.count = val;
    });
  }

  watchAttributes(name, _oldValue, newValue) {
    if (name == "data_user") {
      this.state.user = newValue;
    }
  }

  formatAddress({ street, suite, city, zipcode }) {
    return `${street}, ${suite}, ${city} ${zipcode}`;
  }

  render() {
    return /*html*/ `
      <table>
          <tbody>
            <tr>
              <td><i class="fa-solid fa-id-card"></i></td>
              <td>Name <strong> ${this.state.count} </strong></td>
              <td class="card__name">${this.state.user.name}</td>
            </tr>
            <tr>
              <td><i class="fa-solid fa-user-large"></i></td>
              <td>Username</td>
              <td>${this.state.user.username}</td>
            </tr>
            <tr>
              <td><i class="fa-solid fa-at"></i></td>
              <td>Email</td>
              <td><a href="#"> ${this.state.user.email} </a></td>
            </tr>
            <tr>
              <td><i class="fa-solid fa-phone"></i></td>
              <td>Phone</td>
              <td>${this.state.user.phone}</td>
            </tr>
            <tr>
              <td><i class="fa-solid fa-location-dot"></i></td>
              <td>Address</td>
              <td>${this.formatAddress(this.state.user.address)}</td>
            </tr>
          </tbody>
      </table>
    `;
  }
}
