import { css } from "lit";
 
export const styles = css`
  :host {
    display: contents;
  }

  .modal-page-primary {
    --type-modal-bg-color: var(--surface-page-primary-bg);
    --type-modal-backdrop-color: var(--surface-page-primary-backdrop);
  }

  .confirm-transfer-page__header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .confirm-transfer-page__footer {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }
 
  .confirm-transfer-page__back-btn {
    width: min-content;
    display: block;
  }
`;