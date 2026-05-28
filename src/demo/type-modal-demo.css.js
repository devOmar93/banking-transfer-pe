import { css } from "lit";

export default css`
    :host {
        display: block;
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
        padding: 2rem 1.5rem;
        max-width: 480px;
        margin: 0 auto;
        color: #121212;
    }
 
    h1 {
        font-size: 1.5rem;
        margin: 0 0 0.25rem 0;
    }
 
    .subtitle {
        color: #565656;
        margin: 0 0 2rem 0;
        font-size: 0.95rem;
    }
 
    .demo-button {
        display: block;
        width: 100%;
        padding: 1rem;
        margin-bottom: 0.75rem;
        background-color: #004481;
        color: #ffffff;
        border: none;
        border-radius: 0.75rem;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        text-align: center;
    }
 
    .demo-button:hover {
        background-color: #003366;
    }
 
    .demo-button.alt {
        background-color: #1973b8;
    }
 
    .log {
        margin-top: 1.5rem;
        padding: 0.75rem 1rem;
        background-color: #f4f5f7;
        border-radius: 0.5rem;
        font-family: ui-monospace, "SF Mono", Menlo, monospace;
        font-size: 0.85rem;
        color: #565656;
        white-space: pre-wrap;
        min-height: 2.5rem;
    }
 
    .back-button,
    .x-button {
        background: transparent;
        border: none;
        cursor: pointer;
        font-size: 1rem;
        color: #004481;
        padding: 0.5rem 0.75rem;
        border-radius: 0.5rem;
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
    }
 
    .back-button:hover,
    .x-button:hover {
        background-color: #f0f3f7;
    }
 
    .x-button {
        font-size: 1.5rem;
        line-height: 1;
        align-self: flex-end;
        color: #565656;
        padding: 0.25rem 0.6rem;
    }
 
    .modal-header-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
 
    .modal-title {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0 0 0.5rem 0;
        color: #121212;
    }
 
    .modal-text {
        font-size: 1rem;
        color: #565656;
        line-height: 1.5;
        margin: 0 0 1rem 0;
    }
 
    .icon-circle {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1rem auto;
        font-size: 2rem;
        color: #ffffff;
    }
 
    .icon-circle.warn {
        background: #ffe5e5;
        color: #c40000;
        border: 2px solid #c40000;
    }
 
    .footer-buttons {
        display: flex;
        gap: 0.75rem;
        width: 100%;
    }
 
    .btn {
        flex: 1;
        padding: 0.85rem 1rem;
        border-radius: 0.75rem;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        border: 1px solid transparent;
    }
 
    .btn-primary {
        background-color: #004481;
        color: #ffffff;
    }
 
    .btn-secondary {
        background-color: #ffffff;
        color: #004481;
        border-color: #004481;
    }
 
    .filler {
        height: 200vh;
        background: linear-gradient(180deg, #f0f3f7, #d6e4f0);
        margin-top: 1rem;
        border-radius: 0.5rem;
        padding: 1rem;
        color: #565656;
        font-size: 0.9rem;
    }
`;