import { css } from "lit";
export const actionModalStyles = css`
  .action-modal {
    width: 100%;
    max-width: 420px;
    min-height: 100vh;
    padding: 32px 24px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .content {
    margin-top: 80px;
    width: 100%;
  }
  .title {
    margin-top: 24px;
  }
  .message {
    margin-top: 16px;
  }
  .actions {
    width: 100%;
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;
