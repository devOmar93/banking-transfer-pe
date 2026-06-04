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
    /** */
  };
  constructor() {
    super();
  }

  static get styles() {
    return styles;
  }
  render() {
    return html`
      <div class="info-card">
        <div class="content">
          <div class="title">
            <slot name="title"></slot>
          </div>
          <div class="value">
            <slot name="value"></slot>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define("info-card", InfoCard);
