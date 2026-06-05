import { LitElement, html } from "lit";
import { pageHeaderStyles } from "./page-header.css.js";
import "../../../../components/type-text/type-text.js";
export class NewTransferPageHeader extends LitElement {
  static styles = pageHeaderStyles;
  render() {
    return html`
      <section class="page-header">
        <type-text
          tag="h1"
          .text=${"Nueva Transferencia"}
          size="ml"
          weight="bold"
          align="left"
        ></type-text>
        <type-text
          tag="p"
          .text=${"Completa los datos de la transferencia"}
          size="s"
          weight="regular"
          align="left"
        ></type-text>
      </section>
    `;
  }
}
customElements.define("new-transfer-page-header", NewTransferPageHeader);
