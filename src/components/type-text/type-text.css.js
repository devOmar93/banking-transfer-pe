import { css } from "lit";

export const styles = css`
  :host {   
    --text-color: currentColor;
  }

  * {
    font-family: 'Inter', sans-serif;
    display: block;
  }

  h1,
  h2,
  h3,
  p {
    margin: 0;
    color: var(--text-color);
  }

  .size-xs {
    font-size: 0.75rem;
  }

  .size-s {
    font-size: 0.875rem;
  }

  .size-m {
    font-size: 1rem;
  }

  .size-l {
    font-size: 2.25rem;
  }

  .size-xl {
    font-size: 3.25rem;
  }

  .weight-regular {
    font-weight: 400;
  }

  .weight-medium {
    font-weight: 500;
  }

  .weight-semibold {
    font-weight: 600;
  }

  .weight-bold {
    font-weight: 700;
  }

  .align-center {
    text-align: center;
  }

  .align-left {
    text-align: left;
  }

  .align-right {
    text-align: right;
  }
`;