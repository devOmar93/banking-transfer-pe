import { css } from "lit";

export default css`
  :host {
    font-size: 1rem;
    max-width: 360px;
    margin: 0 auto;
  }
  [slot="header"] {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 0.375rem;
  }

  [slot="header"] type-text {
    text-align: center;
  }

  [slot="header"] type-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
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

  .note {
    margin-top: 1.25rem;
    text-align: center;
  }

  .note type-text {
    font-size: 0.875rem;
    color: #9ca3af;
    line-height: 1.4;
    display: block;
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
    border-radius: 8px;
    padding: 0.625rem;
    text-align: center;
  }

  .note-box type-text {
    font-size: 0.875rem;
    color: #6b7280;
    line-height: 1.4;
  }

  type-button[variant="outline"] {
    background: white;
    border: 1px solid #d1d5db;
    border-radius: 10px;
    font-size: 0.875rem;
  }

  .actions type-button {
    width: auto !important;
  }

  .footer {
    margin-top: 1.25rem;
  }
`;
