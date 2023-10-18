import { Observable } from "../../../assets/reactive-wc.js";

class UserService {
  constructor() {
    this.users = new Observable([]);
    this.count = new Observable(0);
  }

  async getUsers() {
    try {
      const data = await fetch("https://jsonplaceholder.typicode.com/users");
      const res = await data.json();
      this.users.value = res;

      /* Hardcoded events just to show reactivity in the component using this user list */
      setTimeout(() => {
        const newUsers = [
          ...this.users.value.map((user) => {
            return user.id === 1
              ? { ...user, name: "Modified from the service 😉" }
              : user;
          }),
        ];

        this.users.value = newUsers;
      }, 2000);

      setTimeout(() => {
        const newUsers = this.users.value.map((user) => {
          return user.id === 2 ? { ...user, name: "This as well! 😉" } : user;
        });

        this.users.value = newUsers;
      }, 4000);
      /******************************************************************* */
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  inc() {
    this.count.value++;
  }
}

export const userService = new UserService();
