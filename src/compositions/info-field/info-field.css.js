import { css } from "lit";

export const styles = css`
  .info-field {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: none;
    padding: 1rem;
    gap: 1rem;
    background-color: var(--info-field-bg-color);
  }

  .label {
    color: var(--info-field-label-color);
  }

  .value {
    color: var(--info-field-value-color);
  }
`;
