import { html, LitElement, nothing } from "lit";
import { classMap } from "lit/directives/class-map.js";
import "@/compositions/type-input/type-input.js";
import "@/compositions/type-button/type-button.js";
import "@/components/type-icon/type-icon.js";
import {
  NEW_TRANSFER_PAGE_LITERALS as LITERALS,
  NEW_TRANSFER_PAGE_CONFIG as CONFIG,
} from "@/page/new-transfer-page/utils/newTransferPageConfig.js";
import {
  updateField,
  createInitialFormStates,
  getFormValues,
} from "./utils/transferFormUtil.js";
import styles from "./transfer-form.css.js";

export class TransferForm extends LitElement {
  static properties = {
    /** The state of each form field. 
     *  It holds the current value, validity, and error message for each field
     * @type {Object}
     * @default {}
     */
    formFieldStates: {
      type: Object,
    },

    /** The overall state of the form, indicating whether it is valid
     * @type {boolean}
     * @default false
     */
    stateForm: {
      type: Boolean,
    },

    /** The configuration for each form field
     * @type {Object}
     * @default {}
     */
    configFormFields: {
      type: Object,
    },

    /** The available balance for the source account
     * @type {Number}
     * @default 0
     */
    availableBalance: {
      type: Number,
    },

    /** The currency of the available balance for the source account
     * @type {String}
     * @default ""
     */
    currency: {
      type: String,
    },
  };

  constructor() {
    super();
    this.formFieldStates = {};
    this.configFormFields = {};
    this.availableBalance = 0;
    this.stateForm = false;
    this.currency = "";
  }

  willUpdate(changedProps) {
    if (changedProps.has("configFormFields")) {
      this.formFieldStates = createInitialFormStates(this.configFormFields);
    }
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
    const isValid = Object.values(this.formFieldStates).every(
      ({ isValid }) => isValid,
    );

    if (this.stateForm !== isValid) {
      this.stateForm = isValid;
    }
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
    const {
      name,
      label,
      placeholder,
      type,
      nativeValidation,
      formatCurrency,
      hasIcon,
    } = field;
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
        aria-label=${`Ingresar ${label}`}
      >
        ${hasIcon && this.currency
          ? html`<type-icon
              slot="prefix"
              icon-name="${this.currency}"
              variant="secondary"
              size="s"
            ></type-icon>`
          : nothing}
      </type-input>
    `;
  }

  render() {
    return html`
      <form class="form-container" aria-label="Formulario de transferencia">
        <div class="field-container">
          ${Object.values(this.configFormFields).map((field) =>
            this._renderFormField(field),
          )}
        </div>
        <div aria-live="polite" class="sr-only">
          ${this.stateForm ? "Formulario válido" : ""}
        </div>
        <type-button
          .text=${LITERALS.continueButton.text}
          .variant=${CONFIG.continueButton.variant}
          .type=${CONFIG.continueButton.type}
          icon-name=${CONFIG.continueButton.iconName}
          @click="${this._onSubmit}"
          .iconPosition=${CONFIG.continueButton.iconPosition}
          ?disabled="${!this.stateForm}"
          aria-label="Continuar con la transferencia"
        ></type-button>
        <div aria-live="polite" class="sr-only">
          ${this.stateForm ? "Formulario válido" : ""}
        </div>
      </form>
    `;
  }
}

customElements.define("transfer-form", TransferForm);
