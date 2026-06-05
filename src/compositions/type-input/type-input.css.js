import { css } from "lit";

export default css`
  :host {
    --icon-color: var(--text-muted);
    --color-border-field: var(--text-muted);
  }

  :host .invalid {
    
    --icon-color: var(--text-error);
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;

    label {
      font-size: 0.875rem;
    }

    .content-input {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border: 0.125rem solid;
      border-color: var(--color-border-field);
      border-radius: 0.25rem;
      padding: 0.5rem;

      input {
        border: none;
        outline: none;
        width: 100%;
      }
    }

    .content-input.invalid {
      border-color: var(--text-error);
    }
  }

  .invalid {
    color: var(--text-error);
    font-weight: 600;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

`;
