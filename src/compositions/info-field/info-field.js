import { LitElement, html } from "lit";
import { styles } from "./info-field.css.js";

export class InfoField extends LitElement {
  constructor() {
    super();
  }

  static styles = styles;

  render() {
    return html`
      <div class="info-field">
        <div class="label">
          <slot name="label"></slot>
        </div>
        <div class="value">
          <slot name="value"></slot>
        </div>
      </div>
    `;
  }
}

customElements.define("info-field", InfoField);
