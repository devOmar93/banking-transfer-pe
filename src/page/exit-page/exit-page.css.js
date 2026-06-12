import { css } from "lit";

export const styles = css`
  .modal-page-primary {
    --type-modal-bg-color: var(--surface-page-primary-bg);
    --type-modal-backdrop-color: var(--surface-page-primary-backdrop);
  }

  h2 {
    margin-bottom: 1rem;
    color: #333;
  }

  button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    background-color: #0078d4;
    color: white;
    cursor: pointer;
  }

  button:hover {
    background-color: #005ea6;
  }
`;