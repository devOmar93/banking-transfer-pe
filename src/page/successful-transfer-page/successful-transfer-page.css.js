import { css } from "lit";

export default css`
  :host {
    color: black;
    font-size: 1rem;
    max-width: 22.5 rem;
    margin: 0 auto;
  }

  .modal-page-primary {
    --type-modal-bg-color: var(--surface-page-primary-bg);
    --type-modal-backdrop-color: var(--surface-page-primary-backdrop);
  }

  .header {
    --icon-color: #00cc2c;
    --icon-bg-color: #d1ffdb;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 0.375rem;
    color: black;
    margin: 1rem;
  }

  .modal-body {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
`;
