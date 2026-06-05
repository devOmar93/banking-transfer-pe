import { css } from "lit";

export default css`
  .btn {
    border: 0;
    width: 100%;
    padding: 0.8rem 1rem;
    border-radius: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    cursor: pointer;
  }

  .btn:disabled {
    cursor: not-allowed;
  }

  :host([variant="default"]) .btn {
    background-color: var(--btn-bg-color);
    color: var(--btn-text-color);
    --icon-color: var(--btn-text-color);
  }

  :host([variant="default"]) .btn:disabled {
    background-color: var(--btn-disabled-bg-color);
    color: var(--btn-disabled-text-color);
    --icon-color: var(--btn-disabled-text-color);
  }

  :host([variant="secondary"]) .btn {
    background-color: var(--btn-secondary-bg-color);
    color: var(--btn-secondary-text-color);
    --icon-color: var(--btn-secondary-text-color);
  }

  :host([variant="secondary"]) .btn:disabled {
    background-color: var(--btn-secondary-disabled-bg-color);
    color: var(--btn-secondary-disabled-text-color);
    --icon-color: var(--btn-secondary-disabled-text-color);
  }

  :host([variant="ghost"]) .btn {
    background-color: var(--btn-ghost-bg-color);
    color: var(--btn-ghost-text-color);
    --icon-color: var(--btn-ghost-text-color);
  }

  :host([variant="ghost"]) .btn:disabled {
    background-color: var(--btn-ghost-disabled-bg-color);
    color: var(--btn-ghost-disabled-text-color);
    --icon-color: var(--btn-ghost-disabled-text-color);
  }

  :host([icon-position="left"]) .btn {
    flex-direction: row-reverse;
  }

  :host([icon-position="right"]) .btn {
    flex-direction: row;
  }
`;
