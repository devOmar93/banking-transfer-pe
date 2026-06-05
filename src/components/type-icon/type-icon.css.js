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
    color: var(--icon-color);
    box-sizing: border-box;
    transition: all 0.2s ease-in-out;
  }

  .container-icon svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  :host([variant="default"]) .container-icon {
    background-color: var(--icon-bg-color);
    border-radius: 50%;
    padding: 0.5rem;
  }

  :host([variant="secondary"]) .container-icon {
    background-color: transparent;
    padding: 0;
  }

  :host([variant="ghost"]) .container-icon {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    padding: 0.25rem;
  }

  :host([size="s"]) .container-icon {
    width: 0.6rem;
    height: 0.6rem;
  }
  :host([size="m"]) .container-icon {
    width: 1.4rem;
    height: 1.4rem;
  }
  :host([size="l"]) .container-icon {
    width: 2.2rem;
    height: 2.2rem;
  }
  :host([size="xl"]) .container-icon {
    width: 3rem;
    height: 3rem;
  }
`;