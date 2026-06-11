import { css } from "lit";

export const styles = css`
  :host {
    --icon-color: var(--type-tag-text-color);
  }

  .tag {
    background-color: var(--type-tag-bg-color);
    color: var(--type-tag-text-color);
    padding: 0.6rem;
    border-radius: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
  }
`;
