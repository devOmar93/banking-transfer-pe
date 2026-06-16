import { LitElement, html, nothing } from "lit";
import { styles } from "./loading-overlay.css";

export class LoadingOverlay extends LitElement {
  static properties = {
    active: {
      type: Boolean,
    },
  };

  constructor() {
    super();
    this.active = false;
  }

  static styles = styles;

  render() {
    return this.active
      ? html`
          <div class="overlay" role="status" aria-label="Cargando..." aria-busy="true">
            <div class="spinner"></div>
          </div>
        `
      : nothing;
  }
}

customElements.define("loading-overlay", LoadingOverlay);
