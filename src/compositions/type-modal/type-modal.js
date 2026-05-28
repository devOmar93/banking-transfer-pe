import { LitElement, html } from "lit";
import styles from "./type-modal.css.js";
export class TypeModal extends LitElement {
    static properties = {
        variant: { type: String, reflect: true },
        scrollable: { type: Boolean, reflect: true },
        fullHeight: { type: Boolean, reflect: true, attribute: "full-height" },
        hasFooter: { type: Boolean, reflect: true, attribute: "has-footer" },
    };
    constructor() {
        super();
        this.variant = "page";
        this.scrollable = false;
        this.fullHeight = false;
        this.hasFooter = false;
    }
    static get styles() {
        return styles;
    }
    render() {
        return html`
            ${this.variant === "dialog" ? html`<div class="backdrop" part="backdrop"></div>` : ""}
            <section
                class="modal"
                role="dialog"
                aria-modal="true"
                part="modal"
            >
                <header class="modal-header" part="header">
                    <slot name="header"></slot>
                </header>
                <div class="modal-body" part="body">
                    <slot name="body"></slot>
                </div>
                ${this.hasFooter ? html`
                    <footer class="modal-footer" part="footer">
                        <slot name="footer"></slot>
                    </footer>
                ` : ""}
            </section>
        `;
    }
}
customElements.define("type-modal", TypeModal);