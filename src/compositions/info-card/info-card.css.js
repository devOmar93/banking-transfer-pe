import { css } from "lit";
/** @element info-card
 * css styles for the info-card component
 */
export const styles = css`
  :host {
    display: block;
    width: 100%;

  }
  .info-card {
    background-color: white;
    color: black;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    gap: 0.8rem;
    box-shadow: var(--shadow-md);
    border-radius: 1rem;
  }
`;
