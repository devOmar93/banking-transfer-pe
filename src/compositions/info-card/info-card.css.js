import { css } from 'lit';
/** @element info-card
 * css styles for the info-card component
*/
export const styles = css`
    :host {
        display: inline-block;
        box-sizing: border-box;
    }
    .info-card {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        gap: 0.75rem;
        flex-wrap: nowrap;
        padding: 1rem;
        border: 1px solid var(--info-card-border);
        border-radius: 0.5rem;
        background-color: var(--info-card-bg);
        max-width: 25rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }
    .message-container {
        display: flex;
        align-items: center;
        flex: 1;
    }
`;