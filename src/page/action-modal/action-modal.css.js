import { css } from "lit";
export const actionModalStyles = css`
  :host {
    display: block;
  }
  * {
    box-sizing: border-box;
  }
  .modal-header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .modal-icon {
    margin-bottom: 16px;
  }
  .modal-title {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
  }
  .modal-body {
    width: 100%;
    text-align: center;
  }
  .modal-message {
    margin: 0;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
  }
  .modal-actions {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }
  .primary-btn,
  .secondary-btn {
    flex: 1;
    max-width: 180px;
  }
  @media (max-width: 480px) {
    .modal-actions {
      gap: 12px;
    }
    .primary-btn,
    .secondary-btn {
      max-width: 160px;
    }
  }
`;
