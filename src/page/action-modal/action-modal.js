import { LitElement, html } from "lit";
import { actionModalStyles } from "./action-modal.css.js";
import "../../components/type-icon/type-icon.js";
import "../../components/type-text/type-text.js";
import "../../compositions/type-button/type-button.js";
const MODAL_TYPES = {
  error: {
    iconName: "triangle-alert",
    iconVariant: "secondary",
    primaryButtonText: "Reintentar",
    secondaryButtonText: "Salir",
  },
  information: {
    iconName: "info",
    iconVariant: "secondary",
    primaryButtonText: "Entendido",
    secondaryButtonText: "Salir",
  },
  confirmation: {
    iconName: "circle-check-big",
    iconVariant: "secondary",
    primaryButtonText: "Confirmar",
    secondaryButtonText: "Cancelar",
  },
};
const ACTION_MODALS = {
  insufficientBalance: {
    modalType: "error",
    title: "SALDO INSUFICIENTE",
    message:
      "La cuenta no cuenta con saldo suficiente para realizar la operación.",
    showPrimaryButton: false,
    showSecondaryButton: true,
    secondaryButtonAction: "exit",
  },
  blockedAccount: {
    modalType: "error",
    title: "CUENTA BLOQUEADA O INACTIVA",
    message:
      "La cuenta se encuentra bloqueada o inactiva y no permite realizar operaciones.",
    showPrimaryButton: false,
    showSecondaryButton: true,
    secondaryButtonAction: "exit",
  },
  noAccountsAvailable: {
    modalType: "error",
    title: "NO TIENE CUENTAS DISPONIBLES",
    message:
      "No se encontraron cuentas asociadas para realizar transferencias.",
    showPrimaryButton: false,
    showSecondaryButton: true,
    secondaryButtonAction: "exit",
  },
  loadAccountsError: {
    modalType: "error",
    title: "ERROR AL CARGAR CUENTAS",
    message: "Ocurrió un problema al obtener sus cuentas. Intente nuevamente.",
    showPrimaryButton: true,
    showSecondaryButton: true,
    primaryButtonAction: "retry",
    secondaryButtonAction: "exit",
  },
  finalError: {
    modalType: "error",
    title: "NO SE PUDO COMPLETAR LA OPERACIÓN",
    message: "Inténtelo más tarde.",
    showPrimaryButton: false,
    showSecondaryButton: true,
    secondaryButtonAction: "exit",
  },
  accountsLimitInformation: {
    modalType: "information",
    title: "INFORMACIÓN",
    message:
      "Se mostrarán como máximo 5 cuentas disponibles para realizar la transferencia.",
    showPrimaryButton: true,
    showSecondaryButton: false,
    primaryButtonAction: "understood",
  },
  singleValidAccountInformation: {
    modalType: "information",
    iconName: "circle-check-big",
    title: "CUENTA DISPONIBLE",
    message:
      "Se encontró una cuenta disponible para continuar con la transferencia.",
    showPrimaryButton: true,
    showSecondaryButton: false,
    primaryButtonText: "Continuar",
    primaryButtonAction: "continue",
  },
  transferConfirmation: {
    modalType: "confirmation",
    title: "CONFIRMAR OPERACIÓN",
    message: "¿Está seguro de continuar con la operación?",
    showPrimaryButton: true,
    showSecondaryButton: true,
    primaryButtonAction: "confirm",
    secondaryButtonAction: "cancel",
  },
};
export class ActionModal extends LitElement {
  static styles = actionModalStyles;
  static properties = {
    actionType: { type: String, attribute: "action-type" },
  };
  constructor() {
    super();
    this.actionType = "loadAccountsError";
  }
  get actionData() {
    return ACTION_MODALS[this.actionType] || ACTION_MODALS.loadAccountsError;
  }
  get modalType() {
    return MODAL_TYPES[this.actionData.modalType] || MODAL_TYPES.error;
  }
  emitModalAction(buttonType, buttonAction, buttonText) {
    const detail = {
      actionType: this.actionType,
      modalType: this.actionData.modalType,
      buttonType,
      buttonAction,
      buttonText,
    };
    this.dispatchEvent(
      new CustomEvent("action-modal-action", {
        bubbles: true,
        composed: true,
        detail,
      }),
    );
    this.dispatchEvent(
      new CustomEvent(`action-modal-${buttonAction}`, {
        bubbles: true,
        composed: true,
        detail,
      }),
    );
  }
  handlePrimaryAction() {
    const action = this.actionData;
    const modalType = this.modalType;
    this.emitModalAction(
      "primary",
      action.primaryButtonAction || "primary",
      action.primaryButtonText || modalType.primaryButtonText,
    );
  }
  handleSecondaryAction() {
    const action = this.actionData;
    const modalType = this.modalType;
    this.emitModalAction(
      "secondary",
      action.secondaryButtonAction || "secondary",
      action.secondaryButtonText || modalType.secondaryButtonText,
    );
  }
  handleBackdropClick() {
    this.emitModalAction("backdrop", "exit", "Salir");
  }
  render() {
    const action = this.actionData;
    const modalType = this.modalType;
    return html`
      <div class="overlay" @click=${() => this.handleBackdropClick()}>
        <section
          class="action-modal"
          @click=${(event) => event.stopPropagation()}
        >
          <div class="content">
            <type-icon
              icon-name=${action.iconName || modalType.iconName}
              size="xl"
              variant=${action.iconVariant || modalType.iconVariant}
              aria-label=${action.title}
            >
            </type-icon>
            <div class="title">
              <type-text
                tag="h1"
                .text=${action.title}
                size="l"
                weight="bold"
                align="center"
              >
              </type-text>
            </div>
            <div class="message">
              <type-text
                tag="p"
                .text=${action.message}
                size="s"
                weight="regular"
                align="center"
              >
              </type-text>
            </div>
            <div class="extra-content">
              <slot name="extra-content"></slot>
            </div>
          </div>
          <div class="actions">
            ${action.showPrimaryButton
              ? html`
                  <type-button
                    class="primary-btn"
                    type="button"
                    icon-position="right"
                    .text=${action.primaryButtonText ||
                    modalType.primaryButtonText}
                    variant="default"
                    @click=${() => this.handlePrimaryAction()}
                  >
                  </type-button>
                `
              : ""}
            ${action.showSecondaryButton
              ? html`
                  <type-button
                    class="secondary-btn"
                    type="button"
                    icon-position="right"
                    .text=${action.secondaryButtonText ||
                    modalType.secondaryButtonText}
                    variant="ghost"
                    @click=${() => this.handleSecondaryAction()}
                  >
                  </type-button>
                `
              : ""}
          </div>
        </section>
      </div>
    `;
  }
}
customElements.define("action-modal", ActionModal);
