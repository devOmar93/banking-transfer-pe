import { LitElement, html, nothing } from "lit";
import { classMap } from "lit/directives/class-map.js";
import styles from "./type-modal.css.js";

export class TypeModal extends LitElement {
  static properties = {
    open: { type: Boolean },
    variant: { type: String },
    scrollable: { type: Boolean },
    fullHeight: { type: Boolean, attribute: "full-height" },
    hasFooter: { type: Boolean, attribute: "has-footer" },
  };

  constructor() {
    super();
    this.open = false;
    this.variant = "page";
    this.scrollable = false;
    this.fullHeight = false;
    this.hasFooter = false;
    this._bodyScrollLocked = false;
  }

  static get styles() {
    return styles;
  }

  willUpdate(changedProps) {
    if (!changedProps.has("open")) return;

    if (this.open) {
      this._lockScrollIfNeeded();
    } else if (changedProps.get("open") === true) {
      this._unlockScrollIfNeeded();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unlockScrollIfNeeded();
  }

  _lockScrollIfNeeded() {
    if (this._bodyScrollLocked) return;
    TypeModal._lockBodyScroll();
    this._bodyScrollLocked = true;
  }

  _unlockScrollIfNeeded() {
    if (!this._bodyScrollLocked) return;
    TypeModal._unlockBodyScroll();
    this._bodyScrollLocked = false;
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

  _handleContentClick(e) {
    e.stopPropagation();
  }

  render() {
    if (!this.open) return nothing;

    return html`
      <div
        class=${classMap({
          "type-modal-backdrop": true,
          "type-modal-backdrop--page": this.variant === "page",
        })}
      >
        <div
          class=${classMap({
            "type-modal-content": true,
            "type-modal-content--page": this.variant === "page",
            "type-modal-content--dialog": this.variant === "dialog",
            "type-modal-content--full-height": this.fullHeight,
          })}
          role="dialog"
          aria-modal="true"
          @click=${this._handleContentClick}
        >
          <header class="type-modal-header">
            <slot name="header"></slot>
          </header>
          <section
            class=${classMap({
              "type-modal-body": true,
              "type-modal-body--scrollable": this.scrollable,
            })}
          >
            <slot name="body"></slot>
          </section>
          ${this.hasFooter
            ? html`
                <footer class="type-modal-footer">
                  <slot name="footer"></slot>
                </footer>
              `
            : nothing}
        </div>
      </div>
    `;
  }
}

customElements.define("type-modal", TypeModal);
