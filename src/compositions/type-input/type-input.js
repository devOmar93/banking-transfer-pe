import { html, LitElement, nothing } from "lit";
import { classMap } from "lit/directives/class-map.js";

export class TypeInput extends LitElement {

    static properties = {
        textLabel : {
            type: String
        },

        nameField: {
            type: String
        },

        idInput: {
            type: String
        },

        placeholderInput: {
            type: String
        },

        typeInput: {
            type: String
        },

        requiredInput: {
            type: Boolean
        },

        valid: {
            type: Boolean
        },

        _nativeValid: {
            type: Boolean
        },

        errorMessage: {
            type: String
        },
    }

    constructor() {
        super();
        this.textLabel = 'Prueba label';
        this.idInput ='PruebaInput';
        this.placeholderInput = 'Prueba placeholder';
        this.typeInput = 'email';
        this.nameField = '';
        this.requiredInput = true;
        this.errorMessage = 'Probando mostrar error';
    }
    
    _onInput(event) {
        const input = event.target;
        this._nativeValid = input.checkValidity();
        this.dispatchEvent(new CustomEvent('text-change', {
            detail: {
                name: this.nameField,
                isValid: this._nativeValid,
                value: input.value
                
            },

            bubbles: true,
            composed: true
        }))
    }

    
    get _isValid() {
        if (this.valid !== undefined) {
            return this.valid;
        }
        return this._nativeValid;
    }

    _renderField() {
        const isInvalid = this._isValid === false;
        const fieldClass = {
            'form-field': true,
            'invalid': isInvalid
        };
        const contentInputClass = {
            'content-input': true,
            'invalid': isInvalid
        };

        return html `
            <div class="${classMap(fieldClass)}">
                <label for=${`input${this.idInput}`}>${this.textLabel}</label>
                <div class="${classMap(contentInputClass)}">
                    <slot name="prefix"></slot>
                    <input
                        id=${`input${this.idInput}`}
                        type=${this.typeInput}
                        placeholder=${this.placeholderInput}
                        ?required=${this.requiredInput}
                        @input=${this._onInput}
                    >
                </div>
                ${isInvalid && this.errorMessage ? html`<span>${this.errorMessage}</span>`
                : nothing}
            </div>
        `
    }

    render() {
        return html`${this._renderField()}`
    }
}

customElements.define('type-input', TypeInput);