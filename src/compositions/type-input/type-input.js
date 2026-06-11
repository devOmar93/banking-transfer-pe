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

    valor: {
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
    this.valor = "";
  }
  _onInput(event) {
    const input = event.target;
    let value = input.value;
    value = this._validateInput(value);
    this.value = value;
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
    let valorActual = value;
    valorActual = valorActual.replace(/[^0-9.]/g, '');
    const indicePunto = valorActual.indexOf('.');

    if (indicePunto !== -1) {
      let intPart = valorActual.slice(0, indicePunto);
      let decimalPart = valorActual.slice(indicePunto + 1);
      intPart = intPart.replace(/^0+/, '');

      if (intPart === '') {
        intPart = '0';
      }

      decimalPart = decimalPart.replace(/\./g, '0').substring(0, 2);
      valorActual = intPart + '.' + decimalPart;
      return valorActual;  
    }

    return valorActual = valorActual.replace(/^0+/, '');
  }
  _/*formatAmount3(value) {
    let valorActual = value;
    valorActual = valorActual.replace(/[^0-9.]/g, '');
    const indicePunto = valorActual.indexOf('.');
    const [intPartRaw, decimalRaw = ''] = valorActual.split('.');
    
    console.log('intPartRaw', intPartRaw);
    console.log('decimalRaw', decimalRaw);
    let intPart = intPartRaw.replace(/^0+/, '') || '0';
    console.log('intPart', intPart);

    let decimalPart = decimalRaw.replace(/\./g, '').substring(0, 2);
    valorActual = intPart;
    if (decimalPart) {
      valorActual = intPart + '.' + decimalPart;
    }

    return valorActual;
  }*/

  _formatAccountDestinatari(value) {
    let valorActual = value;
    valorActual = valorActual.replace(/[^0-9]/g, "");
    return valorActual;
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
            .value="${this.valor}"
            @input=${this._onInput}
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
