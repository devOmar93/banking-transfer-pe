import { html, LitElement, nothing } from "lit";
import { classMap } from "lit/directives/class-map.js";
import "../../components/type-text/type-text.js";

import styles from "./type-input.css.js";

export class TypeInput extends LitElement {
  static properties = {
    textLabel: {
      type: String,
    },

    nameField: {
      type: String,
    },

    idInput: {
      type: String,
    },

    placeholderInput: {
      type: String,
    },

    typeInput: {
      type: String,
    },

    formatCurrency: {
      type: String,
    },

    requiredInput: {
      type: Boolean,
    },

    valid: {
      type: Boolean,
    },

    _nativeValid: {
      type: Boolean,
    },

    errorMessage: {
      type: String,
    },
  };

  constructor() {
    super();
    this.textLabel = "";
    this.idInput = "";
    this.placeholderInput = "";
    this.typeInput = "";
    this.nameField = "";
    this.requiredInput = true;
    this.errorMessage = "";
    this.formatCurrency = "";
  }

  _onInput(event) {
    const input = event.target;
    let value = input.value;
    this._nativeValid = input.checkValidity();

    if (this.typeInput === "number") {
      value = value === "" ? null : parseFloat(value);
    }

    this.dispatchEvent(
      new CustomEvent("text-change", {
        detail: {
          name: this.nameField,
          isValid: this._nativeValid,
          value: value,
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  get _isValid() {
    if (this.valid !== undefined) {
      return this.valid;
    }
    return this._nativeValid;
  }

  static get styles() {
    return styles;
  }

  _renderField() {
    const invalid = this._isValid === false;
    const fieldClass = {
      field: true,
      invalid: invalid,
    };
    const contentInputClass = {
      "content-input": true,
      invalid: invalid,
    };

    return html`
      <div class="${classMap(fieldClass)}">
        <label for=${`input${this.idInput}`}>${this.textLabel}</label>
        <div class="${classMap(contentInputClass)}">
          <slot name="prefix"></slot>
          <input
            id=${`input${this.idInput}`}
            .type=${this.typeInput}
            placeholder=${this.placeholderInput}
            ?required=${this.requiredInput}
            @input=${this._onInput}
            step="${this.formatCurrency}"
          />
        </div>
        ${invalid && this.errorMessage
          ? html`
              <type-text tag="span" .text=${this.errorMessage} weight="medium">
              </type-text>
            `
          : nothing}
      </div>
    `;
  }

  render() {
    return html`${this._renderField()}`;
  }
}

customElements.define("type-input", TypeInput);
