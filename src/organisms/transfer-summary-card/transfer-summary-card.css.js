import { css } from "lit";

export const styles = css`
  .card {
    width: 100%;
    color: black;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: var(--shadow-md);
    box-sizing: border-box;
  }

  .container {
    padding: 1rem;
  }

  .amount-container {
    display: flex;
  }

  .header-container {
    background: linear-gradient(
      var(--transfer-summary-card-bg-gradient-start),
      var(--transfer-summary-card-bg-gradient-end)
    );
    color: white;
    padding: 1.4rem 1rem;
  }

  .body-container {
    padding: 0.5rem 0;
    background-color: white;
  }
`;
