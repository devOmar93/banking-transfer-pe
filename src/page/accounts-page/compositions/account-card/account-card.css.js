// src/compositions/account-card/account-card.css.js
import { css } from "lit";

export const styles = css`
  :host {
    display: block;
    width: 100%;
    box-sizing: border-box;
    font-family: inherit;
  }
  .account-card {
    all: unset;
    box-sizing: border-box;
    font: inherit;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 1rem;
    gap: 3rem;
    background: white;
    border: 1px solid #d7d7d7;
    border-radius: 1rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition:
      box-shadow 0.15s ease,
      transform 0.12s ease;
  }
  .account-card:hover {
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  .account-card:focus-visible {
  outline: 2px solid #7c3aed;
  outline-offset: 2px;
}


  .account-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .icon-box {
    width: 3rem;
    height: 3rem;
    border-radius: 1rem;
    background: #eef2ff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .account-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .account-right {
    display: flex;
    justify-content: flex-end;
    flex-direction: column; 
    align-items: flex-end;
    gap: 1rem;
    flex-grow: 1;
    padding-right: 0.2rem;
  }

.balance {
  margin-top: 0.5rem;
}

  .balance type-text {
    text-align: right;
    letter-spacing: -0.3px;
  }

  .account-right type-text {
    text-align: right;
  }

  .account-right type-icon {
    --icon-color: #909096;
    --icon-size: 1.25rem;
    flex-shrink: 0;
  }

  .p-subtitle {
    --text-color: var(--text-secondary);
  }
`;
