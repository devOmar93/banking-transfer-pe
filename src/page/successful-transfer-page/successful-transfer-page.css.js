import { css } from "lit";

export default css`
  :host {
    --type-modal-bg-color: #dcf5ff;
    color: black;
    font-size: 1rem;
    max-width: 22.5 rem;
    margin: 0 auto;
  }

  [slot="header"] {
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
    position: relative;
    width: 100%;
    height: 100%;
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .title {
    font-size: 2.2rem;
    font-weight: 700;
    color: #111827;
  }

  .subtitle {
    font-size: 1rem;
    color: #6b7280;
    margin-top: 0.25rem;
  }

  .actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }

  .actions type-button {
    display: block;
    flex: 1;
  }

  .note-box {
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 0.625rem;
    text-align: center;
  }

  .note-box type-text {
    font-size: 0.6875rem;
    color: #6b7280;
    line-height: 1.4;
  }

  type-button[variant="outline"] {
    background: white;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    font-size: 0.875rem;
  }

  .footer {
    margin-top: 1.25rem;
  }
  .alert-dialog {
    border: none;
    border-radius: 0.625rem;
    padding: 1.25rem;
    width: 20rem;
    max-width: 90%;
    text-align: center;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }

  .alert-dialog::backdrop {
    background: rgba(0, 0, 0, 0.2);
  }

  .alert-header {
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.375rem;
  }

  .alert-body {
    font-size: 0.8125rem;
    color: #6b7280;
    margin-bottom: 1rem;
  }

  .alert-footer {
    display: flex;
    justify-content: center;
  }
  .alert-footer type-button {
    min-width: 12.5rem;
  }
`;
