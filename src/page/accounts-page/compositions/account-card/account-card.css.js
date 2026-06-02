// src/compositions/account-card/account-card.css.js
import { css } from "lit";

export const styles = css`
 :host{
  font-family: 'Inter', 'Roboto', 'Segoe UI', sans-serif;
}
  .account-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    gap: 3rem;
    background: white;
    border: 1px solid #d7d7d7;
    border-radius: 1rem;
    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
    cursor: pointer;
    transition: box-shadow 0.15s ease, transform 0.12s ease;
    
    
  }
    .account-card:hover {
    box-shadow: 0 8px 28px rgba(0,0,0,0.12);
    transform: translateY(-2px);
  }

  .account-card:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(124,58,237,0.15);
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
    align-items: center;
    gap: 0.5rem;
  }
    
.account-right type-icon {
  --icon-color: #909096; 
}
.account-right type-icon {
  --icon-size: 1rem;
}




  .p-subtitle {
    color: var(--text-secondary);
  }
`;