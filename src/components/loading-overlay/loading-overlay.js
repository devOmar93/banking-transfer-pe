import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { styles } from './loading-overlay.css';

export class LoadingOverlay extends LitElement {

  static styles = styles;

  render() {
    return html`
      <div class="overlay" role="alert" aria-busy="true">
        <div class="spinner"></div>
      </div>
    `;
  }
}

customElements.define('loading-overlay', LoadingOverlay);