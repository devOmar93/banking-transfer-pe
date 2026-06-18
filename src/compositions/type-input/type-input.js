import { html, LitElement, nothing } from "lit";
import { classMap } from "lit/directives/class-map.js";

import styles from "./type-input.css.js";

export class TypeInput extends LitElement {
  static properties = {
    /** 
     * The label text for the input field 
     * @type {String}
     * @default ""
     * */
    textLabel: {
      type: String,
    },

    /** 
     * The name of the input field 
     * @type {String}
     * @default ""
     * */
    nameField: {
      type: String,
    },

    /** 
     * The Id of the input field 
     * @type {String}
     * @default ""
     * */
    idInput: {
      type: String,
    },

    /** 
     * The placeholder text for the input field 
     * @type {String}
     * @default ""
     * */
    placeholderInput: {
      type: String,
    },

    /** 
     * The type of the input field 
     * @type {String}
     * @default ""
     * */
    typeInput: {
      type: String,
    },

    /** 
     * Indicates if the input field is required 
     * @type {Boolean}
     * @default false
     * */
    requiredInput: {
      type: Boolean,
    },

    /** 
     * Indicates if the input field is valid 
     * @type {Boolean}
     * @default false
     * */
    valid: {
      type: Boolean,
    },

    /** 
     * Indicates if the input field is natively valid 
     * @type {Boolean}
     * @default false
     * @private
     * */
    _nativeValid: {
      type: Boolean,
      state: true,
    },

    /** 
     * The error message for the input field 
     * @type {String}
     * @default ""
     * */
    errorMessage: {
      type: String,
    },

    /** 
     * The value of the input field 
     * @type {String}
     * @default ""
     * @private
     * */
    _value: {
      type: String, 
      state: true
    },

    ariaLabel: {
      type: String,
      attribute: "aria-label",
    }
  };

  constructor() {
    super();
    this.textLabel = "";
    this.idInput = "";
    this.placeholderInput = "";
    this.typeInput = "";
    this.nameField = "";
    this.requiredInput = false;
    this.errorMessage = "";
    this._value = "";
    this.valid = false;
    this._nativeValid = false;
    this.ariaLabel = "";
  }
  _onInput(event) {
    const input = event.target;
    let value = input.value;
    value = this._validateInput(value);
    this._value = value;
    input.value = value;

    if (this.nameField === "amount") {
      value = value === "" ? null : parseFloat(value);
    }
    this._nativeValid = input.checkValidity();

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

  _validateInput(event) {
    const validateForNameInput = {
      destinationAccount: this._formatAccountDestinatari(event),
      amount: this._formatAmount(event),
    };
    return validateForNameInput[this.nameField] ?? event.target.value;
  }

  _formatAmount(value) {
    let currentValue = value;
    currentValue = currentValue.replace(/[^0-9.]/g, '');
    const indicePunto = currentValue.indexOf('.');

    if (indicePunto !== -1) {
      let intPart = currentValue.slice(0, indicePunto);
      let decimalPart = currentValue.slice(indicePunto + 1);
      intPart = intPart.replace(/^0+/, '');

      if (intPart === '') {
        intPart = '0';
      }

      decimalPart = decimalPart.replace(/\./g, '0').substring(0, 2);
      currentValue = intPart + '.' + decimalPart;
      return currentValue;  
    }

    return currentValue = currentValue.replace(/^0+/, '');
  }

  _formatAccountDestinatari(value) {
    let currentValue = value;
    currentValue = currentValue.replace(/[^0-9]/g, "");
    return currentValue;
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
            aria-label=${this.ariaLabel}
            aria-invalid=${invalid ? "true" : "false"}
            aria-describedby=${invalid ? `error-${this.idInput}` : nothing}
            ?required=${this.requiredInput}
            .value="${this._value}"
            @input=${this._onInput}
          />
        </div>
        ${invalid && this.errorMessage
          ? html`
              <p id="error-${this.idInput}" role="alert">
              ${this.errorMessage}
              </p>
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
