import { LitElement, html } from "lit";
import { styles } from "./info-field.css.js";

export class InfoField extends LitElement {
  constructor() {
    super();
  }

  static styles = styles;

  render() {
    return html`
      <dl class="info-field">
        <dt class="label">
          <slot name="label"></slot>
        </dt>
        <dd class="value">
          <slot name="value"></slot>
        </dd>
      </dl>
    `;
  }
}

customElements.define("info-field", InfoField);
