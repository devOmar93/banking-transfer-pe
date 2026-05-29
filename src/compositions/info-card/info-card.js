import { html, LitElement } from "lit";
import { styles } from "./info-card.css.js";
import "../../components/type-icon/type-icon.js";
import "../../components/type-text/type-text.js";
import { INFO_CARD_CONFIG } from "../../constants/info-card/constants.js";
/** @element info-card
 * A simple info card component that displays a message
 * and an icon based on the type of information
 * (e.g., info, warning, error).
 */
export class InfoCard extends LitElement {
  static properties = {
    /** The message to display in the info card.
     * @type { String }
     * @default "This is an info card"
     */
    message: {
      type: String,
      attribute: "message",
    },
    iconName: {
    	type: String,
      attribute: "icon-name",
    },
  };
  constructor() {
    super();
    this.message = INFO_CARD_CONFIG.message.default;
    this.iconName = INFO_CARD_CONFIG.iconName.default;
  }

  static get styles() {
    return styles;
  }
  render() {
    return html`
      <div class="info-card">
        <div class="icon-container">
          <type-icon icon-name=${this.iconName}></type-icon>
        </div>
        <div class="message-container">
          <type-text .text=${this.message}></type-text>
        </div>
      </div>
    `;
  }
}
customElements.define("info-card", InfoCard);
