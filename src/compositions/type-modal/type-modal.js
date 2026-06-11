import { LitElement, html, nothing } from "lit";
import { classMap } from "lit/directives/class-map.js";
import styles from "./type-modal.css.js";

export class TypeModal extends LitElement {

  static properties = {
    open: { type: Boolean, reflect: true },
    variant: { type: String, reflect: true },
    scrollable: { type: Boolean, reflect: true },
    fullHeight: { type: Boolean, reflect: true, attribute: "full-height" },
    hasFooter: { type: Boolean, reflect: true, attribute: "has-footer" },
    _closing: { state: true },
  };

  constructor() {
    super();
    this.open = false;
    this.variant = "page";
    this.scrollable = false;
    this.fullHeight = false;
    this.hasFooter = false;
    this._closing = false;
    this._previousActiveElement = null;
    this._abortClose = null;
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

    if (this._abortClose) {
      this._abortClose();
      this._abortClose = null;
    }
    if (this._bodyScrollLocked) {
      TypeModal._unlockBodyScroll();
      this._bodyScrollLocked = false;
    }
    this._closing = false;
  }

  _onOpen() {
    if (this._abortClose) {
      this._abortClose();
      this._abortClose = null;
      this._closing = false;
      this.updateComplete.then(() => this._focusFirst());
      return;
    }

    TypeModal._lockBodyScroll();
    this._bodyScrollLocked = true;
    this._previousActiveElement = document.activeElement;
    this.updateComplete.then(() => this._focusFirst());
  }

  _onClose() {
    this._closing = true;

    let aborted = false;
    this._abortClose = () => { aborted = true; };

    this.updateComplete.then(() => {
      if (aborted) return;

      const content = this.renderRoot.querySelector(".type-modal-content");
      if (!content) {
        if (!aborted) this._cleanupAfterClose();
        return;
      }

      const fallback = setTimeout(() => {
        if (!aborted) this._cleanupAfterClose();
      }, 300);

      const handleAnimationEnd = () => {
        clearTimeout(fallback);
        content.removeEventListener("animationend", handleAnimationEnd);
        if (!aborted) this._cleanupAfterClose();
      };

      content.addEventListener("animationend", handleAnimationEnd);
    });
  }

  _cleanupAfterClose() {
    this._abortClose = null;
    this._closing = false;

    if (this._bodyScrollLocked) {
      TypeModal._unlockBodyScroll();
      this._bodyScrollLocked = false;
    }

    if (this._previousActiveElement && typeof this._previousActiveElement.focus === "function") {
      this._previousActiveElement.focus();
    }
    this._previousActiveElement = null;
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

  _handleContentClick(e) {
    e.stopPropagation();
  }

  render() {
    if (!this.open && !this._closing) return nothing;

    return html`
      <div class=${classMap({
        "type-modal-backdrop": true,
        "type-modal-backdrop--closing": this._closing,
    })}>
        <div
          class=${classMap({
            "type-modal-content": true,
            "type-modal-content--closing": this._closing,
          })}
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