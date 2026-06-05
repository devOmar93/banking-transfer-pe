import { css } from "lit";

export const styles = css`
  :host {
    display: block;
  }

  .overlay {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--loading-overlay-bg-color);
    z-index: 9999;
    box-sizing: border-box;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .spinner {
    width: 1rem;
    height: 1rem;
    border: 5px solid var(--loading-overlay-spiner-bg-color);
    border-bottom-color: var(--loading-overlay-spiner-color);
    border-radius: 50%;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
