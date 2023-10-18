import { ReactiveWC } from "../../../assets/reactive-wc.js";
import { userService } from "../services/userService.js";

export class ListComponent extends ReactiveWC {

    constructor() {
        super()

        this.state = this.defineState({
            users: []
        })

    }

    async onInit() {
       try {
        this.state.users = await userService.getUsers()
       } catch (e) {
        this.state.users = 'KO'
       }
    }

    render() {
        const elements = {
            'SPINNER': /*html*/`<div class="spinner"></div>`,
            'ERROR_MESSAGE': /*html*/`<error-message></error-message>`
        }

        if (this.state.users.length == 0) {
            return elements['SPINNER']
        }

        if (this.state.users == 'KO') {
            return elements['ERROR_MESSAGE']
        }

        return this.state.users.map(user => /*html*/` 
        
            <card-component data_user='${JSON.stringify(user)}'></card-component>
            
            `).join(" ")


    }
}