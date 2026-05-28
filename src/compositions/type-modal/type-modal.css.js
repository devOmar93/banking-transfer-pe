import { css } from "lit";
 
export default css`
    :host {
        --type-modal-bg-color: #ffffff;
        --type-modal-width: 100%;
        --type-modal-max-width: 420px;
        --type-modal-min-width: 280px;
        --type-modal-border-radius: 0;
        --type-modal-padding: 1.5rem;
        --type-modal-gap: 1rem;
        --type-modal-backdrop-color: rgba(0, 0, 0, 0.5);
 
        display: contents;
    }
 
    .backdrop {
        position: fixed;
        inset: 0;
        background-color: var(--type-modal-backdrop-color);
        z-index: 10;
    }
 
    .modal {
        background-color: var(--type-modal-bg-color);
        padding: var(--type-modal-padding);
        display: flex;
        flex-direction: column;
        gap: var(--type-modal-gap);
        width: var(--type-modal-width);
        max-width: var(--type-modal-max-width);
        min-width: var(--type-modal-min-width);
        border-radius: var(--type-modal-border-radius);
        box-sizing: border-box;
    }
 
    :host([variant="page"]) .modal {
        position: fixed;
        inset: 0;
        max-width: 100%;
        height: 100vh;
        border-radius: 0;
        z-index: 5;
    }
 
    :host([variant="dialog"]) .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 360px;
        border-radius: 1rem;
        z-index: 20;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }
 
    :host([variant="dialog"][full-height]) .modal {
        height: 90vh;
    }
 
    :host([scrollable]) .modal-body {
        overflow-y: auto;
        flex: 1 1 auto;
    }
 
    .modal-header,
    .modal-body,
    .modal-footer {
        display: flex;
        flex-direction: column;
    }
 
    .modal-footer {
        margin-top: auto;
    }
`;