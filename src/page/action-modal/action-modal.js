import { LitElement, html } from "lit";
import { actionModalStyles } from "./action-modal.css.js";
import "../../components/type-icon/type-icon.js";
import "../../components/type-text/type-text.js";
import "../../compositions/type-button/type-button.js";
import { MODAL_TYPES, ACTION_MODALS } from "./action-modal.constants.js";
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
  handlePrimaryAction() {
    this.dispatchEvent(
      new CustomEvent("action-modal-primary-click", {
        bubbles: true,
        composed: true,
        detail: {
          actionType: this.actionType,
          modalType: this.actionData.modalType,
        },
      }),
    );
  }
  handleSecondaryAction() {
    this.dispatchEvent(
      new CustomEvent("action-modal-secondary-click", {
        bubbles: true,
        composed: true,
        detail: {
          actionType: this.actionType,
          modalType: this.actionData.modalType,
        },
      }),
    );
  }
  render() {
    const action = this.actionData;
    const modalType = this.modalType;
    return html`
      <section class="action-modal">
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
            <slot name="extra-content">
              <p class="extra-content-placeholder">
                Espacio reservado para contenido adicional(CARD)
              </p>
            </slot>
          </div>
        </div>
        <div class="actions">
          ${action.showPrimaryButton
            ? html`
                <type-button
                  text=${modalType.primaryButtonText}
                  variant="default"
                  @click=${this.handlePrimaryAction}
                >
                </type-button>
              `
            : ""}
          ${action.showSecondaryButton
            ? html`
                <type-button
                  text=${modalType.secondaryButtonText}
                  variant="ghost"
                  @click=${this.handleSecondaryAction}
                >
                </type-button>
              `
            : ""}
        </div>
      </section>
    `;
  }
}
customElements.define("action-modal", ActionModal);
