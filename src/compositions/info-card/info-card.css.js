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
    width: 100%;
    flex-direction: column;
    padding: 1rem;
    box-sizing: border-box;
    box-shadow: var(--shadow-md)
  }
`;
