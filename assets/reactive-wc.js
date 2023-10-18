export class ReactiveWC extends HTMLElement {
    /** Static method that defines the properties that might change while the component
     * is mounted on the DOM.
     * 
     * It pairs with attributeChangedCallback().
     * 
     * @return {string[]}
     */
    static get observedAttributes() { return [] }

    /** Method called when the element is attached to the DOM 
     * It's meant to only call this.onInit(). When extending this element, 
     * we must remember to always call this.onInit so it gets the default attributes. 
     * 
     * Any custom logic belonging to the child class will be called inside this method immediately
     * after calling this.onInit().
     * 
     * @return {void}
     * 
    */

    connectedCallback() {
        this.getProps();
        this.onInit();
        this.innerHTML = this.render();    
    }

    defineState() {}

    /** Method called when any of the attributes change. This is especially important when passing
     * AngularJS values. Typical lifecycle of an AngularJS value:
     * 1. attribute is null
     * 2. attribute is the literal string representation we pass to the component, without evaluating the expression
     *      - Example: data_text = "{{ 'HELLO' | lang }}"
     * 3. AngularJS evaluates the expression and assigns the value of the expression
     *      - Example: data_text = "Hello"
     */
    attributeChangedCallback(name, _oldValue, newValue) {
        // this[name] = JSON.parse(newValue);
        this[name] = newValue;
        this.watchAttributes(name, JSON.parse(_oldValue), JSON.parse(newValue));
        this.innerHTML = this.render();
    }
    

    getProps() {
        this.getAttributeNames().forEach( attr => {

            if (!attr.startsWith('data_')) return;

            this[attr] = JSON.parse(this.getAttribute(attr))
        })
    }

    
    /** Logic to be called inside the attributeChangedCallback method */
    watchAttributes(name, _oldValue, newValue) {}

    defineState(object) {
        if (object === null || typeof object !== 'object') {
            return object;
        }
    
        for (const property in object) {
            object[property] = this.defineState(object[property])
        }
        return new Proxy(object, {
            get(target, property) {
                return target[property];
            },
            set: (target, property, value) => {
                if (target[property] !== value) {
                    target[property] = value;
                    this.innerHTML = this.render();
                }
    
                return true;
            },
        });
    }

    /**
     * Method called during the connectedCallback lifecyle method. If you want to define
     * custom logic for whenever the component is mounted on the DOM, this is the place.
     */
    onInit() {}

    render() {}

}


class DefaultAddress extends ReactiveWC {

    static get observedAttributes() { return ['icon_name', 'data_text', 'data_type'] }

    constructor() {
        super();

        this.state = this.defineState({
            count: 0,
            icon_name: this.icon_name,
            isBadge: this.data_type == 'badge',
            test: {
                count: 0
            }
        })
    }

    onInit() {        
        
        if (this.show_counter) {

            this.addEventListener('click', function(e) {
                if (e.target == this.querySelector('img')) {
                    this.inc()
                } else {
                    this.toggle();
                };
            });

        } else {
            this.addEventListener('click', this.toggle);

        }
    }

    inc() {
        this.state.test.count++;
    }
    
    toggle() {
        
        if (this.data_type == 'badge') {
            this.setAttribute('data_type', 'footer')
        } else {
            this.setAttribute('data_type', 'badge')
        }

    }

    render() {
        return /*html*/`

           <div class="address-default__${this.data_type}">
                <img src="${this.icon_name}" alt="{{ 'DEFAULT_ADDRESS' | lang }}" />
                ${this.show_counter ? this.counter() : ''}
                <span>${this.data_text}</span>
           </div>

        `
    }

    counter() {
         return /* html */ `
            <span> ${this.state.test.count} </span>
            `
    } 

}
