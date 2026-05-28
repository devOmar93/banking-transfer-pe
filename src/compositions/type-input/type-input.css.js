import { css } from "lit";

export default css`

    :host {
        --color-error: #FF0000;
        --icon-color: blue;
        --color-border-field: #adb5bd;
    }

    :host .invalid {
        --icon-color: var(--color-error);
    }

    .field {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;

        label {
            font-size: 0.875rem;
        }

        .content-input {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            border: 0.125rem solid;
            border-color: var(--color-border-field);
            border-radius: 0.25rem;
            padding: 0.5rem;

            input {
                border: none;
                outline: none;
            }
        }

        .content-input.invalid {
            border-color: var(--color-error);
        }
    }

    .invalid {
        color: var(--color-error);
        font-weight: 600;
    }

`