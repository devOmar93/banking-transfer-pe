import { html, LitElement, nothing } from "lit";
import { styles } from "./info-card.css.js";
import "@/components/type-icon/type-icon.js";
import "@/components/type-text/type-text.js";
/** @element info-card
 * A simple info card component that displays a message
 * and an icon based on the type of information
 * (e.g., info, warning, error).
 */
export class InfoCard extends LitElement {
  static properties = {
    /** */
    message: {
      type: String,
    },
    hasIcon: {
      type: Boolean,
    },
  };
  constructor() {
    super();
    this.message = "";
    this.hasIcon = false;
  }

  static get styles() {
    return styles;
  }
  render() {
    return html`
      <div class="info-card">
        ${this.hasIcon
          ? html`
              <div class="icon-container">
                <type-icon icon-name="info" .size=${"s"} .variant=${"default"}></type-icon>
              </div>
            `
          : nothing}
        <div class="message-container">
          <type-text .text=${this.message}></type-text>
        </div>
      </div>
    `;
  }
}
customElements.define("info-card", InfoCard);
