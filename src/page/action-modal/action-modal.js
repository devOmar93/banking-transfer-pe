import { LitElement, html } from "lit";
import { actionModalStyles } from "./action-modal.css.js";
import "@/compositions/type-modal/type-modal.js";
import "@/compositions/type-button/type-button.js";
import "@/components/type-icon/type-icon.js";
import { fireEvent } from "@/utils/utils.js";
import locales from "@/locales/locales.json";

const DEFAULT_LANGUAGE = "es_LA";
const BUTTON_TYPES = {
  retry: "primary",
  exit: "secondary",
  understood: "primary",
  continue: "primary",
  confirm: "primary",
  cancel: "secondary",
};
const ACTION_MODALS = {
  loadAccountsError: {
    modalType: "error",
    iconName: "triangle-alert",
    localePrefix: "action-modal-load-accounts-error",
    buttons: ["retry", "exit"],
  },
  finalError: {
    modalType: "error",
    iconName: "triangle-alert",
    localePrefix: "action-modal-final-error",
    buttons: ["exit"],
  },
  insufficientBalance: {
    modalType: "error",
    iconName: "triangle-alert",
    localePrefix: "account-page-errors-no-balance",
    buttons: ["exit"],
  },
  blockedAccount: {
    modalType: "error",
    iconName: "triangle-alert",
    localePrefix: "account-page-errors-blocked",
    buttons: ["exit"],
  },
  noAccountsAvailable: {
    modalType: "error",
    iconName: "triangle-alert",
    localePrefix: "account-page-errors-no-accounts",
    buttons: ["exit"],
  },
  accountsLimitInformation: {
    modalType: "information",
    iconName: "info",
    localePrefix: "action-modal-accounts-limit",
    buttons: ["understood"],
  },
  singleValidAccountInformation: {
    modalType: "information",
    iconName: "circle-check-big",
    localePrefix: "action-modal-single-valid-account",
    buttons: ["continue"],
  },
  transferConfirmation: {
    modalType: "confirmation",
    iconName: "triangle-alert",
    localePrefix: "action-modal-transfer-confirmation",
    buttons: ["confirm", "cancel"],
  },
  sameAccount: {
    modalType: "error",
    iconName: "triangle-alert",
    localePrefix: "action-modal-same-account",
    buttons: ["exit"],
  },
  technicalError: {
    modalType: "error",
    iconName: "triangle-alert",
    localePrefix: "action-modal-technical-error",
    buttons: ["retry", "exit"],
  },
   inactiveAccount: {
    modalType: "error",
    iconName: "triangle-alert",
    localePrefix: "action-modal-inactive-account",
    buttons: ["exit"],
  },
  transferError: {
    modalType: "error",
    iconName: "triangle-alert",
    localePrefix: "action-modal-transfer-error",
    buttons: ["retry", "exit"],
  },
  downloadError : {
    modalType: "error",
    iconName: "triangle-alert",
    localePrefix: "action-modal-technical-error",
    buttons: ["retry", "exit"],
  }
};
export class ActionModal extends LitElement {
  static styles = actionModalStyles;
  static properties = {
    locale: { type: Object },
    actionType: { type: String, attribute: "action-type" },
    open: { type: Boolean },
  };
  constructor() {
    super();
    this.actionType = "loadAccountsError";
    this.locale = null;
    this.open = false;
  }
  get actionData() {
    return ACTION_MODALS[this.actionType] || ACTION_MODALS.loadAccountsError;
  }
  _getLocale() {
    return this.locale || locales[DEFAULT_LANGUAGE] || {};
  }
  _getText(key) {
    return this._getLocale()?.[key] || key;
  }
  _getTitle() {
    return this._getText(`${this.actionData.localePrefix}-title`);
  }
  _getMessage() {
    return this._getText(`${this.actionData.localePrefix}-message`);
  }
  _getButtonText(action) {
    return this._getText(`action-modal-button-${action}`);
  }
  _hasOnlyOneButton() {
    return this.actionData.buttons.length === 1;
  }
  _getButtonType(action) {
    if (this._hasOnlyOneButton()) {
      return "primary";
    }
    return BUTTON_TYPES[action] || "primary";
  }
  _getButtonVariant(action) {
    if (this._hasOnlyOneButton()) {
      return "default";
    }
    return this._getButtonType(action) === "primary" ? "default" : "secondary";
  }
  _emitAction(action, buttonType) {
    const detail = {
      actionType: this.actionType,
      modalType: this.actionData.modalType,
      buttonType,
      buttonAction: action,
      buttonText: this._getButtonText(action),
    };
    fireEvent(this, "action-modal-action", detail)
    fireEvent(this, `action-modal-${action}`, detail)
  }
  _handleButtonClick(action, event) {
    event.stopPropagation();
    this._emitAction(action, this._getButtonType(action));
  }
  _handleBackdropClick() {
    this._emitAction("exit", "backdrop");
  }
  _renderIcon() {
    return html`
      <type-icon
        class="modal-icon"
        .iconName=${this.actionData.iconName}
        .size=${"xl"}
        .variant=${"secondary"}
      ></type-icon>
    `;
  }
  _renderButton(action) {
    const buttonType = this._getButtonType(action);
    return html`
      <type-button
        class=${buttonType === "primary" ? "primary-btn" : "secondary-btn"}
        .text=${this._getButtonText(action)}
        .type=${"button"}
        .variant=${this._getButtonVariant(action)}
        .iconPosition=${"right"}
        @click=${(event) => this._handleButtonClick(action, event)}
      ></type-button>
    `;
  }
  render() {
    return html`
      <type-modal
        .open=${this.open}
        variant="dialog"
        .hasFooter=${true}
        @click=${this._handleBackdropClick}
      >
        <div slot="header" class="modal-header">
          ${this._renderIcon()}
          <h2 class="modal-title">${this._getTitle()}</h2>
        </div>
        <div slot="body" class="modal-body">
          <p class="modal-message">${this._getMessage()}</p>
        </div>
        <div slot="footer" class="modal-actions">
          ${this.actionData.buttons.map((action) => this._renderButton(action))}
        </div>
      </type-modal>
    `;
  }
}
customElements.define("action-modal", ActionModal);
