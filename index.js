import { CardComponent } from "./src/js/components/cardComponent.js";
import { ListComponent } from "./src/js/components/listComponent.js";
import { ErrorMessage } from "./src/js/components/errorMessage.js";

window.customElements.define('card-component', CardComponent);
window.customElements.define('list-component', ListComponent);
window.customElements.define('error-message', ErrorMessage);