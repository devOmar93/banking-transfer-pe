import { html, LitElement, nothing } from "lit";
import "@/compositions/type-modal/type-modal.js";
import "@/compositions/type-header/type-header.js";
import "@/compositions/type-button/type-button.js";
import "@/compositions/transfer-summary/transfer-summary.js";
import { styles } from "./confirm-transfer-page.css.js";
import { fireEvent } from "@/utils/utils.js";
import "@/page/action-modal/action-modal.js";
import {
  CONFIRM_TRANSFER_PAGE_CONFIG as CONFIG,
  CONFIRM_TRANSFER_PAGE_LITERALS as LITERALS,
} from "./utils/confirmTransferPageConfig.js";

export class ConfirmTransferPage extends LitElement {
  static properties = {
    /**
     * Holds the transfer details to be displayed in the summary
     * @type {Object}
     * @default {}
     */
    transferData: { type: Object },

    /** 
     * Controls the visibility of the confirmation modal
     * @type {Boolean}
     * @default false
     */
    open: { type: Boolean },

    /** 
     * Represents the status of the transfer
     * @type {String}
     * @default ""
     */
    transferStatus: { type: String },

    /** 
     * Transfer retry counter 
     * @type {Number}
     * @default 0
     * @private
     */
    _retryCount: { type: Number, state: true },

    /** 
     * Controls the visibility of the action modal
     * @type {Boolean}
     * @default false
     * @private
     */
    _actionModalOpen: { type: Boolean, state: true },

    /** 
     * Defines which type of action modal should be displayed
     * @type {String}
     * @default ""
     * @private
     */
    _actionType: { type: String, state: true },
  };

  constructor() {
    super();
    this.transferData = {};
    this.open = false;
    this.transferStatus = "";
    this._retryCount = 0;
    this._actionModalOpen = false;
    this._actionType = "";
  }

  static styles = styles;

  willUpdate(changedProperties) {
    if (!changedProperties.has("transferStatus")) return;
    if (this.transferStatus === "error") {
      this._handleTransferError();
    }
  }

  _handleTransferError() {
    this._retryCount += 1;
    if (this._retryCount >= 3) {
      this._retryCount = 0;
      this._dispatchCancel();
      return;
    }
    this._showActionModal("transferError");
  }

  _showActionModal(actionType) {
    this._actionType = actionType;
    this._actionModalOpen = true;
  }

  _closeActionModal() {
    this._actionModalOpen = false;
    this._actionType = "";
  }

  _handleActionModalAction(e) {
    const { buttonAction } = e.detail;
    this._closeActionModal();
    if (buttonAction === "retry") {
      this._requestRetry();
    }
  }

  _requestRetry() {
    fireEvent(this, "transfer-retry")
  }

  _handleAccept() {
    fireEvent(this, "confirm-accept", { transferData: this.transferData })
  }

  _handleCancel() {
    this._dispatchCancel();
  }

  _dispatchCancel() {
    fireEvent(this, "confirm-cancel")
  }

  _renderActionModal() {
    return html`
      <action-modal
        ?open=${true}
        action-type=${this._actionType}
        @action-modal-action=${this._handleActionModalAction}
      ></action-modal>
    `;
  }

  _renderContent() {
    return html`
      <type-modal
        class="modal-page-primary"
        .variant=${CONFIG.modal.variant}
        ?open=${this.open}
        ?scrollable=${CONFIG.modal.scrollable}
        ?full-height=${CONFIG.modal.fullHeight}
        ?has-footer=${CONFIG.modal.hasFooter}
        aria-label=${LITERALS.modal.title}
      >
        <div slot="header" class="confirm-transfer-page__header">
          <type-button
            class="confirm-transfer-page__back-btn"
            .type=${CONFIG.backButton.type}
            .text=${LITERALS.backButton.text}
            .variant=${CONFIG.backButton.variant}
            icon-name=${CONFIG.backButton.iconName}
            icon-position=${CONFIG.backButton.iconPosition}
            @click=${this._handleCancel}
          ></type-button>
          <type-header
            .title=${LITERALS.header.title}
          ></type-header>
        </div>

        <div slot="body">
          <transfer-summary
            .transferData=${this.transferData}
            .amountLabel=${LITERALS.transferSummary.amountLabel}
            .sourceAccountLabel=${LITERALS.transferSummary.sourceAccountLabel}
            .beneficiaryLabel=${LITERALS.transferSummary.beneficiaryLabel}
            .emptySourceAccountText=${LITERALS.transferSummary.emptySourceAccountText}
            .emptyBeneficiaryText=${LITERALS.transferSummary.emptyBeneficiaryText}
          ></transfer-summary>
        </div>

        <div slot="footer" class="confirm-transfer-page__footer">
          <type-button
            .type=${CONFIG.submitButton.type}
            .text=${LITERALS.submitButton.text}
            .iconPosition=${CONFIG.submitButton.iconPosition}
            .variant=${CONFIG.submitButton.variant}
            @click=${this._handleAccept}
          ></type-button>
        </div>
      </type-modal>

      ${this._actionModalOpen ? this._renderActionModal() : nothing}
    `;
  }

  render() {
    return html`${this._renderContent()}`;
  }
}

customElements.define("confirm-transfer-page", ConfirmTransferPage);
