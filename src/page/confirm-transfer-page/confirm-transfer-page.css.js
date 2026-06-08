import { css } from "lit";
 
export const styles = css`
  :host {
    display: contents;
  }

  .confirm-transfer-page__header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .confirm-transfer-page__footer {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }
 
  .confirm-transfer-page__back-btn {
    width: min-content;
    display: block;
  }
`;