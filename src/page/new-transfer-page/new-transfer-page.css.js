import { css } from "lit";

export default css`
  :host {
    animation: pageEntry 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  @keyframes pageEntry {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .modal-page-primary {
    --type-modal-bg-color: var(--surface-page-primary-bg);
    --type-modal-backdrop-color: var(--surface-page-primary-backdrop);
  }

  .container-button {
  display: inline-flex;
  margin-bottom: 1.25rem;
    background: transparent; /* ❌ sin blanco */

  }

  .container-button type-button {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .container-button type-button:hover {
    transform: translateX(-4px);
    opacity: 0.9;
  }

  .container-button type-button:active {
    transform: translateX(-2px);
  }


  
  .container-body {
    display: grid;
    gap: 1.5rem;
    animation: formEntry 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards;
    animation-fill-mode: both;
  }

  @keyframes formEntry {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .container-body from-account-card {
    animation: slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.15s both;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .container-body from-account-card:hover,
  .container-body from-account-card:focus-within {
    transform: translateY(-3px);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .container-body transfer-form {
    animation: slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.25s both;
  }

  .container-body transfer-form:hover,
  .container-body transfer-form:focus-within {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  :focus-visible {
    outline: 3px solid #4f38fb;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    .container-button {
      margin-bottom: 1rem;
    }

    .container-body {
      gap: 1.25rem;
    }
  }

  @media (max-width: 480px) {
    .container-button {
      margin-bottom: 0.75rem;
    }

    .container-body {
      gap: 1rem;
    }

    .container-body from-account-card {
      animation: slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both;
    }

    .container-body transfer-form {
      animation: slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.15s both;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
      transition: none !important;
    }
  }
`;
