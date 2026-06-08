import { css } from "lit";
export const actionModalStyles = css`
  :host {
    display: block;
  }
  * {
    box-sizing: border-box;
  }
  .overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(15, 23, 42, 0.18);
    padding: 24px;
    box-sizing: border-box;
  }
  .action-modal {
    width: 100%;
    max-width: 380px;
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.12);
    padding: 32px 24px 24px 24px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .title {
    margin-top: 20px;
    width: 100%;
  }
  .message {
    margin-top: 16px;
    width: 100%;
  }
  .extra-content {
    width: 100%;
    margin-top: 8px;
    min-height: 0;
  }
  .actions {
    width: 100%;
    margin-top: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }
  .primary-btn {
    flex: 1;
    max-width: 180px;
  }
  .secondary-btn {
    width: auto;
    min-width: 60px;
  }
  @media (max-width: 480px) {
    .overlay {
      padding: 16px;
    }
    .action-modal {
      max-width: 340px;
      padding: 28px 20px 20px 20px;
      border-radius: 20px;
    }
    .actions {
      gap: 12px;
    }
    .primary-btn {
      max-width: 160px;
    }
  }
`;
