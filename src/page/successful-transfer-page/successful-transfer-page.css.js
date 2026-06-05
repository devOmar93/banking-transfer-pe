import { css } from "lit";

export default css`
  :host {
    --type-modal-bg-color: #dcf5ff;
    color: black;
    font-size: 1rem;
    max-width: 22.5 rem;
    margin: 0 auto;
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

  [slot="body"] {
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
