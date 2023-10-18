class UserService {

  constructor() {
    this.users = []
    this.count = this.reactive(0)
    this.subscribers = []

  }

  

  async getUsers() {

    try {
      if (this.users.length) return this.users;

      this.users =  (
        await fetch("https://jsonplaceholder.typicode.com/users")
      ).json();

      this.count.value = 1
      console.log(this.count.value)

      return this.users
      
    } catch(err) {
        console.log(err)
        return err
    }

  }

  inc() {
    this.count.value += 1
  }

  reactive(object) {
    // if (object === null || typeof object !== 'object') {
    //     return object;
    // }

    // for (const property in object) {
    //     object[property] = this.reactive(object[property])
    // }

    const initial = {
      value: object,
      subscribers: [],
      
      /** @param {HTMLElement} el */
      subscribe(el) {
        this.subscribers = [...this.subscribers, el]
        return this.value
      }
    }

    return new Proxy(initial, {
        get(target, property) {
          
            return target[property];
        },
        set(target, property, value) {
            if (target.value != value ) {
                target.value = value;

                target.subscribers.forEach( el => el.state[property] = value)
                console.log(target.subscribers)
                
               
            }

            return true;
        },
    });
  }

}

export const userService = new UserService();