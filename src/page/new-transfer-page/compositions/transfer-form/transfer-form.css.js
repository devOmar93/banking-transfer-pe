import { css } from "lit";

export default css`
  :host {
    --form-bg: #ffffff;
    --form-border: #e5e7eb;
    --form-shadow: 0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .form-container {
    display: grid;
    gap: 1.25rem;
  }

  .field-container {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    padding: 1.5rem;
    background-color: var(--form-bg);
    border: 1px solid var(--form-border);
    border-radius: 0.75rem;
    box-shadow: var(--form-shadow);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .field-container:focus-within {
    border-color: #4f38fb;
    box-shadow:
      0 0 0 3px rgba(79, 56, 251, 0.1),
      var(--form-shadow);
  }

  .error {
    color: var(--text-error);
    font-size: 0.85rem;
    font-weight: 500;
  }

  button {
    padding: 12px 24px;
    border-radius: 0.5rem;
    background: #4f38fb;
    color: white;
    border: none;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    margin-top: 1rem;
    font-weight: 600;
    font-size: 0.95rem;
    letter-spacing: 0.3px;
  }

  button:hover:not(:disabled) {
    background: #3d2fb8;
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(79, 56, 251, 0.3);
  }

  button:active:not(:disabled) {
    transform: translateY(0);
  }

  button:disabled {
    background: #c5c5c5;
    cursor: not-allowed;
    opacity: 0.65;
  }

  button:focus-visible {
    outline: 2px solid #4f38fb;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    .field-container {
      grid-template-columns: 1fr;
      padding: 1.25rem;
      gap: 0.875rem;
    }

    button {
      width: 100%;
      padding: 12px 20px;
    }
  }

  @media (max-width: 480px) {
    .form-container {
      gap: 1rem;
    }

    .field-container {
      grid-template-columns: 1fr;
      padding: 1rem;
      gap: 0.75rem;
      border-radius: 0.5rem;
    }

    button {
      width: 100%;
      padding: 11px 16px;
      font-size: 0.9rem;
      margin-top: 0.75rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      transition: none !important;
      animation: none !important;
    }
  }
  
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;
