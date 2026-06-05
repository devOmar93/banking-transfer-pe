import { css } from "lit";

export const styles = css`
  .container {
    width: 100%;
    box-sizing: border-box
  }

  .primary-text {
    color: var(--field-list-primary-text-color);
  }

  .secondary-text {
    color: var(--field-list-secondary-text-color);
  }

  ul {
    padding: 0;
    margin: 0;
  }

  li {
    list-style: none;
  }
`;
