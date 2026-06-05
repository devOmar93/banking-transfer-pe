import { html, LitElement, nothing } from "lit";
import { classMap } from "lit/directives/class-map.js";
import {
  updateField,
  createInitialFormStates,
  getFormValues,
} from "../../../../utils/transfer-form/transferFormUtil.js";
import "../../../../compositions/type-input/type-input.js";
import "../../../../compositions/type-button/type-button.js";
import "../../../../components/type-icon/type-icon.js";

import styles from "./transfer-form.css.js";

export class TransferForm extends LitElement {
  static properties = {
    formFieldStates: {
      type: Object,
    },

    stateForm: {
      type: Boolean,
    },

    configFormFields: {
      type: Array,
    },

    availableBalance: {
      type: Number,
    },
  };

  constructor() {
    super();
    this.formFieldStates = {};
    this.configFormFields = {};
    this.availableBalance = 100;
  }

  firstUpdated() {
    this.formFieldStates = createInitialFormStates(this.configFormFields);
  }

  _sendForm() {
    const formValues = getFormValues(this.formFieldStates);
    this.dispatchEvent(
      new CustomEvent("form-submit", {
        detail: formValues,
        bubbles: true,
        composed: true,
      }),
    );
  }

  _validateForm() {
    this.stateForm = Object.values(this.formFieldStates).every(
      ({ isValid }) => isValid === true,
    );
  }

  _onFieldChange(event) {
    this.formFieldStates = {
      ...this.formFieldStates,
      [event.detail.name]: updateField({
        field: event.detail,
        formFieldStates: this.formFieldStates,
        configFormFields: this.configFormFields,
        context: { availableBalance: this.availableBalance },
      }),
    };
    event.stopPropagation();
    this._validateForm();
  }

  _onSubmit() {
    if (!this.stateForm) return;
    this._sendForm();
  }

  static get styles() {
    return styles;
  }

  _renderFormField(field) {
    const { name, label, placeholder, type, nativeValidation, formatCurrency } =
      field;
    const invalidStateField = this.formFieldStates[name]?.isValid === false;
    const errorMessageField = this.formFieldStates[name]?.errorMessage ?? "";
    const isRequired = nativeValidation?.required ?? false;
    return html`
      <type-input
        class=${classMap({ error: invalidStateField })}
        @text-change=${this._onFieldChange}
        .textLabel=${label}
        .idInput=${name}
        .placeholderInput=${placeholder}
        .typeInput=${type}
        .requiredInput="${isRequired}"
        .nameField=${name}
        .formatCurrency=${formatCurrency ?? ""}
        .errorMessage=${errorMessageField}
        .valid=${this.formFieldStates[name]?.isValid}
      >
        <type-icon slot="prefix" icon-name="user"></type-icon>
      </type-input>
    `;
  }

  render() {
    return html`
      <form class="form-container">
        <div class="field-container">
          ${Object.values(this.configFormFields).map((field) =>
            this._renderFormField(field),
          )}
        </div>
        <type-button
              .text=${"Continuar"}
              .variant=${"default"}
              .type=${"button"}
              icon-name="arrow-right"
              @click="${this._onSubmit}"
              .iconPosition=${"right"}
            ></type-button>
      </form>
    `;
  }
}

/*<type-button
          text="Continuar"
          icon-name="arrow-right"
          ?disabled="${!this.stateForm}"
          @click="${this._onSubmit}"
        ></type-button>*/
customElements.define("transfer-form", TransferForm);
