import { css } from "lit";

export default css`
  .modal-page-primary {
    --type-modal-bg-color: var(--surface-page-primary-bg);
    --type-modal-backdrop-color: var(--surface-page-primary-backdrop);
  }

  .container-button {
    width: min-content;
    display: block;
  }

  .container-body {
    display: grid;
    gap: 1rem;
  }
`;
