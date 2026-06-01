import { css } from "lit";

export default css`
  :host {
    display: inline-flex;
    width: min-content;
    height: min-content;
  }

  .container-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: min-content;
    height: min-content;
    color: var(--icon-color);
  }

  :host([variant="default"]) .container-icon {
    background-color: var(--icon-bg-color);
    border-radius: 50%;
    padding: 0.5rem;
  }

  :host([variant="secondary"]) .container-icon {
    background-color: transparent;
  }

  :host([size="xs"]) svg {
    width: 0.6rem;
    height: 0.6rem;
  }

  :host([size="s"]) svg {
    width: 1.1rem;
    height: 1.1rem;
  }

  :host([size="m"]) svg {
    width: 1.4rem;
    height: 1.4rem;
  }

  :host([size="l"]) svg {
    width: 2.2rem;
    height: 2.2rem;
  }

  :host([size="xl"]) svg {
    width: 3rem;
    height: 3rem;
  }
`;
