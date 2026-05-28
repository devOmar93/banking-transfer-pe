
import { LitElement, html } from 'lit'
import { infoFieldStyles } from './info-field.css.js'

export class InfoField extends LitElement {
 static styles = infoFieldStyles

 static properties = {
   variant: { type: String },
 }

 constructor() {
   super()
   this.variant = ''
 }

 render() {
   return html`
<div class="info-field ${this.variant}">
<div class="label">
<slot name="label"></slot>
</div>

<div class="value">
<slot name="value"></slot>
</div>
</div>
   `
 }
}

customElements.define('info-field', InfoField)

