import { LitElement, html, nothing } from "lit";
import styles from "./type-modal.css.js";
 
export class TypeModal extends LitElement {
 
    static properties = {
        open: { type: Boolean, reflect: true },
        variant: { type: String, reflect: true },
        scrollable: { type: Boolean, reflect: true },
        fullHeight: { type: Boolean, reflect: true, attribute: "full-height" },
        hasFooter: { type: Boolean, reflect: true, attribute: "has-footer" },
    };
 
    constructor() {
        super();
        this.open = false;
        this.variant = "page";
        this.scrollable = false;
        this.fullHeight = false;
        this.hasFooter = false;
        this._previousActiveElement = null;
        this._handleKeyDown = this._handleKeyDown.bind(this);
        this._bodyScrollLocked = false;
    }
 
    static get styles() {
        return styles;
    }
 
    updated(changedProps) {
        if (!changedProps.has("open")) return;
 
        if (this.open) {
            this._onOpen();
        } else if (changedProps.get("open") === true) {
            this._onClose();
        }
    }
 
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._bodyScrollLocked) {
            TypeModal._unlockBodyScroll();
            this._bodyScrollLocked = false;
        }
        this.removeEventListener("keydown", this._handleKeyDown);
    }
 
    _onOpen() {
        TypeModal._lockBodyScroll();
        this._bodyScrollLocked = true;
 
        this._previousActiveElement = document.activeElement;
 
        this.updateComplete.then(() => this._focusFirst());
 
        this.addEventListener("keydown", this._handleKeyDown);
    }
 
    _onClose() {
        if (this._bodyScrollLocked) {
            TypeModal._unlockBodyScroll();
            this._bodyScrollLocked = false;
        }
 
        if (this._previousActiveElement && typeof this._previousActiveElement.focus === "function") {
            this._previousActiveElement.focus();
        }
        this._previousActiveElement = null;
 
        this.removeEventListener("keydown", this._handleKeyDown);
    }
 
    static _openCount = 0;
    static _previousBodyOverflow = "";
 
    static _lockBodyScroll() {
        TypeModal._openCount += 1;
        if (TypeModal._openCount === 1) {
            TypeModal._previousBodyOverflow = document.body.style.overflow || "";
            document.body.style.overflow = "hidden";
        }
    }
 
    static _unlockBodyScroll() {
        TypeModal._openCount = Math.max(0, TypeModal._openCount - 1);
        if (TypeModal._openCount === 0) {
            document.body.style.overflow = TypeModal._previousBodyOverflow;
        }
    }
 
    _getFocusableElements() {
        const selectors = [
            "a[href]",
            "button:not([disabled])",
            "input:not([disabled])",
            "select:not([disabled])",
            "textarea:not([disabled])",
            "[tabindex]:not([tabindex='-1'])",
        ].join(",");
 
        const focusables = [];
        const slots = this.renderRoot.querySelectorAll("slot");
        slots.forEach((slot) => {
            slot.assignedElements({ flatten: true }).forEach((el) => {
                if (el.matches && el.matches(selectors)) {
                    focusables.push(el);
                }
                if (el.querySelectorAll) {
                    focusables.push(...el.querySelectorAll(selectors));
                }
            });
        });
        return focusables;
    }
 
    _focusFirst() {
        const focusables = this._getFocusableElements();
        if (focusables.length > 0) {
            focusables[0].focus();
            return;
        }
        const content = this.renderRoot.querySelector(".type-modal-content");
        if (content) {
            content.setAttribute("tabindex", "-1");
            content.focus();
        }
    }
 
    _handleKeyDown(e) {
        if (e.key !== "Tab") return;
        const focusables = this._getFocusableElements();
        if (focusables.length === 0) {
            e.preventDefault();
            return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
 
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }
 
    _handleContentClick(e) {
        e.stopPropagation();
    }
 
    render() {
        if (!this.open) return nothing;
 
        return html`
            <div class="type-modal-backdrop">
                <div
                    class="type-modal-content"
                    role="dialog"
                    aria-modal="true"
                    @click=${this._handleContentClick}
                >
                    <header class="type-modal-header">
                        <slot name="header"></slot>
                    </header>
                    <section class="type-modal-body">
                        <slot name="body"></slot>
                    </section>
                    ${this.hasFooter ? html`
                        <footer class="type-modal-footer">
                            <slot name="footer"></slot>
                        </footer>
                    ` : nothing}
                </div>
            </div>
        `;
    }
}
 
customElements.define("type-modal", TypeModal);