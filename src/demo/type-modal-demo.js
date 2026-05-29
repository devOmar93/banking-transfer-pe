import { LitElement, html } from "lit";
import "../compositions/type-modal/type-modal.js";
import styles from "./type-modal-demo.css.js";
 
export class TypeModalDemo extends LitElement {
 
    static properties = {
        _pageOpen: { type: Boolean, state: true },
        _dialogOpen: { type: Boolean, state: true },
        _stackedDialogOpen: { type: Boolean, state: true },
        _lastEvent: { type: String, state: true },
    };
 
    constructor() {
        super();
        this._pageOpen = false;
        this._dialogOpen = false;
        this._stackedDialogOpen = false;
        this._lastEvent = "Sin eventos todavía. Abre un modal para verlos aquí.";
    }
 
    static get styles() {
        return styles;
    }
 
    _logEvent(name, detail) {
        const stamp = new Date().toLocaleTimeString();
        this._lastEvent = `[${stamp}] ${name} → ${JSON.stringify(detail)}`;
    }
 
    _openPage() {
        this._pageOpen = true;
    }
 
    _closePage(reason = "external") {
        this._pageOpen = false;
        this._logEvent("modal-close (page)", { reason });
    }
 
    _openDialog() {
        this._dialogOpen = true;
    }
 
    _closeDialog(reason = "external") {
        this._dialogOpen = false;
        this._logEvent("modal-close (dialog)", { reason });
    }
 
    _openStackedDialog() {
        this._stackedDialogOpen = true;
    }
 
    _closeStackedDialog(reason = "external") {
        this._stackedDialogOpen = false;
        this._logEvent("modal-close (stacked dialog)", { reason });
    }
 
    render() {
        return html`
            <h1>Demo · type-modal</h1>
            <p class="subtitle">
                Composition base reutilizable para todas las pages y dialogs de la feature.
            </p>
 
            <button class="demo-button" @click=${this._openPage}>
                Abrir <strong>page-modal</strong> (slide-up)
            </button>
            <button class="demo-button alt" @click=${this._openDialog}>
                Abrir <strong>dialog-modal</strong> (fade)
            </button>
 
            <div class="log">${this._lastEvent}</div>
 
            <div class="filler">
                Esta zona es solo para demostrar que el <code>overflow: hidden</code>
                del &lt;body&gt; bloquea el scroll cuando un modal está abierto.
                Intenta scrollear con el modal abierto: no debería moverse.
            </div>
 
            <type-modal
                variant="page"
                ?open=${this._pageOpen}
                has-footer
                @modal-close=${(e) => this._closePage(e.detail.reason)}
            >
                <div slot="header" class="modal-header-row">
                    <button class="back-button" @click=${() => this._closePage("back")}>
                        ← Volver
                    </button>
                    <button class="back-button" @click=${this._openStackedDialog}>
                        Dialog prueba
                    </button>
                </div>
 
                <div slot="body">
                    <h2 class="modal-title">Nueva Transferencia</h2>
                    <p class="modal-text">
                        Page modal. Características:
                    </p>
                    <ul class="modal-text">
                        <li>asdf</li>
                        <li>kjsjkakjfsd</li>
                        <li>dfsajbdakhgadshk</li>
                        <li>adsf</li>
                        <li>asdf</li>
                    </ul>
                    <p class="modal-text">
                        Prueba de contenido dentro de la modal page
                    </p>
                </div>
 
                <div slot="footer" class="footer-buttons">
                    <button class="btn btn-primary" @click=${() => this._closePage("continue")}>
                        Continuar
                    </button>
                </div>
            </type-modal>
 
            <type-modal
                variant="dialog"
                ?open=${this._dialogOpen}
                has-footer
                @modal-close=${(e) => this._closeDialog(e.detail.reason)}
            >
                <div slot="header" class="modal-header-row" style="justify-content: flex-end;">
                    <button class="x-button" @click=${() => this._closeDialog("x-button")}>
                        ×
                    </button>
                </div>
 
                <div slot="body" style="text-align: center;">
                    <div class="icon-circle warn">!</div>
                    <h2 class="modal-title">La información no está disponible</h2>
                    <p class="modal-text">
                        Lo sentimos, no pudimos mostrar la información, pero estamos trabajando
                        para solucionarlo. Por favor, intenta de nuevo.
                    </p>
                </div>
 
                <div slot="footer" class="footer-buttons">
                    <button class="btn btn-primary" @click=${() => this._closeDialog("retry")}>
                        Reintentar
                    </button>
                    <button class="btn btn-secondary" @click=${() => this._closeDialog("exit")}>
                        Salir
                    </button>
                </div>
            </type-modal>
 
            <type-modal
                variant="dialog"
                ?open=${this._stackedDialogOpen}
                has-footer
                @modal-close=${(e) => this._closeStackedDialog(e.detail.reason)}
            >
                <div slot="body" style="text-align: center;">
                    <h2 class="modal-title">Dialog encima de la page</h2>
                    <p class="modal-text">
                        Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba 
                    </p>
                </div>
 
                <div slot="footer" class="footer-buttons">
                    <button class="btn btn-primary" @click=${() => this._closeStackedDialog("ok")}>
                        Entendido
                    </button>
                </div>
            </type-modal>
        `;
    }
}
 
customElements.define("type-modal-demo", TypeModalDemo);