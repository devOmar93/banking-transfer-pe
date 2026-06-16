import { fixture, html, expect } from '@open-wc/testing';
import sinon from 'sinon';
import '@/page/successful-transfer-page/successful-transfer-page.js';

describe('SuccessfulTransferPage', () => {
  let el;

  const mockLocale = {
    "successful-transfer-page-transaction-number": "Número de transacción",
    "successful-transfer-page-date": "Fecha",
    "successful-transfer-page-time": "Hora",
    "successful-transfer-page-origin-account": "Cuenta origen",
    "successful-transfer-page-beneficiary": "Beneficiario",
    "successful-transfer-page-status": "Estado",
    "successful-transfer-page-title": "¡Transferencia Exitosa!",
    "successful-transfer-page-subtitle": "Tu dinero va en camino",
    "successful-transfer-page-download-button": "Descargar",
    "successful-transfer-page-share-button": "Compartir",
    "successful-transfer-page-new-transfer-button": "Nueva transferencia",
    "successful-transfer-page-message": "Aviso legal",
    "successful-transfer-page-share-modal-title": "Compartir",
    "successful-transfer-page-share-modal-subtitle": "Elige opción",
    "successful-transfer-page-share-modal-accept-button": "Aceptar"
  };

  beforeEach(async () => {
    el = await fixture(html`
      <successful-transfer-page
        .locale=${mockLocale}
        amount="150.00"
        transactionNumber="987654321"
        date="16/06/2026"
        time="11:30"
        originAccount="Ahorros"
        originAccountNumber="191-XXXX"
        beneficiaryName="Eyder"
        beneficiaryLastName="Huayta"
        .isOpen=${true}
      ></successful-transfer-page>
    `);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('debe ejecutar _handleDownload con éxito', () => {
    const elementClass = customElements.get('successful-transfer-page');
    const downloadSpy = sinon.spy(elementClass.prototype, '_handleDownload');

    el._handleDownload();

    expect(downloadSpy.calledOnce).to.be.true;
  });

  it('debe emitir el evento "error-retry" si la lógica interna del PDF falla', () => {
    const spyError = sinon.spy();
    el.addEventListener('error-retry', spyError);

    el.amount = null;
    el.transactionNumber = undefined;

    try {
      el._handleDownload();
    } catch (e) {
    }

    expect(spyError.calledOnce).to.be.true;
    expect(spyError.firstCall.args[0].detail.title).to.equal("Error al descargar el PDF");
  });

  it('debe cambiar _showShareModal a true al ejecutar _handleShare', () => {
    el._handleShare();
    expect(el._showShareModal).to.be.true;
  });

  it('debe cambiar _showShareModal a false al ejecutar _closeShareModal', () => {
    el._showShareModal = true;
    el._closeShareModal();
    expect(el._showShareModal).to.be.false;
  });

  it('debe emitir el evento "return-home" al ejecutar _handleNewTransfer', () => {
    const spyReturn = sinon.spy();
    el.addEventListener('return-home', spyReturn);

    el._handleNewTransfer();

    expect(spyReturn.calledOnce).to.be.true;
    expect(spyReturn.firstCall.args[0].detail).to.equal(0);
    expect(el.isOpen).to.be.false;
  });
});