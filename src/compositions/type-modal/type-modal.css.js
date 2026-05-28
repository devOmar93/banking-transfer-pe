import { css } from "lit";
 
export default css`
    :host {
        --type-modal-bg-color: #ffffff;
        --type-modal-backdrop-color: rgba(0, 0, 0, 0.5);
        --type-modal-width: 100%;
        --type-modal-max-width: 100%;
        --type-modal-min-width: auto;
        --type-modal-border-radius: 0;
        --type-modal-padding: 1.5rem;
        --type-modal-gap: 1rem;
        --type-modal-z-index: 1000;
    }
 
    :host([variant="dialog"]) {
        --type-modal-width: auto;
        --type-modal-max-width: 400px;
        --type-modal-border-radius: 1rem;
        --type-modal-padding: 1.5rem;
    }
 
    :host(:not([open])) {
        display: none;
    }
 
    .type-modal-backdrop {
        position: fixed;
        inset: 0;
        background-color: var(--type-modal-backdrop-color);
        z-index: var(--type-modal-z-index);
        display: flex;
        align-items: center;
        justify-content: center;
        animation: type-modal-backdrop-in 200ms ease-out;
    }
 
    :host([variant="page"]) .type-modal-backdrop {
        align-items: stretch;
        justify-content: stretch;
    }
 
    .type-modal-content {
        background-color: var(--type-modal-bg-color);
        width: var(--type-modal-width);
        max-width: var(--type-modal-max-width);
        min-width: var(--type-modal-min-width);
        border-radius: var(--type-modal-border-radius);
        padding: var(--type-modal-padding);
        display: flex;
        flex-direction: column;
        gap: var(--type-modal-gap);
        outline: none;
        box-sizing: border-box;
    }
 
    :host([variant="page"]) .type-modal-content {
        width: 100%;
        max-width: 100%;
        height: 100dvh;
        border-radius: 0;
        animation: type-modal-slide-up 250ms ease-out;
    }
 
    :host([variant="dialog"]) .type-modal-content {
        max-height: 90dvh;
        animation: type-modal-fade-in 200ms ease-out;
    }
 
    :host([full-height]) .type-modal-content {
        height: 100dvh;
    }
 
    :host([scrollable]) .type-modal-body {
        overflow-y: auto;
        flex: 1 1 auto;
        min-height: 0;
    }
 
    .type-modal-header,
    .type-modal-footer {
        flex: 0 0 auto;
    }
 
    .type-modal-body {
        flex: 1 1 auto;
        min-height: 0;
    }
 
    @keyframes type-modal-backdrop-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }
 
    @keyframes type-modal-fade-in {
        from {
            opacity: 0;
            transform: scale(0.96);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
 
    @keyframes type-modal-slide-up {
        from {
            transform: translateY(100%);
        }
        to {
            transform: translateY(0);
        }
    }
 
    @media (prefers-reduced-motion: reduce) {
        .type-modal-backdrop,
        .type-modal-content {
            animation: none;
        }
    }
`;