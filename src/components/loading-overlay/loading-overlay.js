import { LitElement, html, nothing } from "lit";
import { styles } from "./loading-overlay.css";

/**
 * `loading-overlay` is a component that displays a blocking loading screen
 * overlaid with a spinner indicator.
 *
 * @element loading-overlay
 */
export class LoadingOverlay extends LitElement {
  static properties = {
    /**
     * Determines whether the loading overlay is visible and active.
     * When set to `true`, it blocks user interaction and triggers accessibility attributes.
     * @type { Boolean }
     * @default false
     */
    active: {
      type: Boolean
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
