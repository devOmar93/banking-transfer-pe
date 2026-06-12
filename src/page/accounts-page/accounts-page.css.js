import { css } from "lit";

export const styles = css`
  :host {
    --icon-color: #3366cc;
    --icon-bg-color: #d9e2f5;
  }

  .modal-page-primary {
    --type-modal-bg-color: var(--surface-page-primary-bg);
    --type-modal-backdrop-color: var(--surface-page-primary-backdrop);
  }

  .modal-accounts {
    --type-modal-bg-color: #e0e4fd;
    --type-modal-backdrop-color: rgba(0, 0, 0, 0.2);
  }

  .container-footer {
    display: flex;
    width: 5rem;
    height: 5rem;
  }

  .icon-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
  }

  .icon-loading {
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .info-card {
    color: var(--text-secondary);
  }

  info-card[slot="footer"] {
    margin-bottom: 1.5rem;
  }

  ::slotted([slot="body"]) {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;
