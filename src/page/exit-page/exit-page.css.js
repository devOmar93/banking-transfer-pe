import { css } from "lit";

export const styles = css`
  .modal-exit {
    --type-modal-bg-color: #e0e4fd;
    --type-modal-backdrop-color: #e0e4fd;
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