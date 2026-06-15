import { css } from "lit";

export default css`
  :host {
    --icon-color: var(--text-muted);
    --color-border-field: #e5e7eb;
    --color-bg-field: #f9fafb;
    --color-focus-ring: rgba(79, 56, 251, 0.1);
  }

  :host .invalid {
    --icon-color: var(--text-error);
    --color-border-field: var(--text-error);
    --color-focus-ring: rgba(220, 38, 38, 0.1);
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .field label {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: 0.2px;
  }

    .content-input {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border: 0.125rem solid;
      border-color: var(--color-border-field);
      border-radius: 0.5rem;
      padding: 0.75rem 0.875rem;
      background-color: var(--color-bg-field);
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
  .content-input input {
    border: none;
    outline: none;
    width: 100%;
    background-color: transparent;
    font-size: 0.95rem;
    font-family: 'Roboto', sans-serif;
  }


.content-input input::placeholder {
    color: var(--text-muted);
  }

  .content-input:hover {
    border-color: #d1d5db;
    background-color: #ffffff;
  }

  .content-input:focus-within {
    border-color: #4f38fb;
    background-color: #ffffff;
    box-shadow: 0 0 0 3px var(--color-focus-ring);
  }


  .content-input.invalid {
    border-color: var(--text-error);
    background-color: rgba(220, 38, 38, 0.02);
  }

  .content-input.invalid:focus-within {
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }

  .field > type-text {
    color: var(--text-error);
    font-size: 0.8rem;
    font-weight: 500;
    margin-top: 0.25rem;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  @media (max-width: 768px) {
    .field label {
      font-size: 0.8125rem;
    }

    .content-input {
      padding: 0.625rem 0.75rem;
    }

    .content-input input {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    .field {
      gap: 0.25rem;
    }

    .field label {
      font-size: 0.75rem;
    }

    .content-input {
      padding: 0.625rem 0.625rem;
      gap: 0.375rem;
    }

    .content-input input {
      font-size: 0.875rem;
    }

    .field > type-text {
      font-size: 0.75rem;
      margin-top: 0.125rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      transition: none !important;
      animation: none !important;
    }
  }
`;
