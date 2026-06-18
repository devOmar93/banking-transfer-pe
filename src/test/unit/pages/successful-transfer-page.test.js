import { fixture, html, expect } from "@open-wc/testing";
import sinon from "sinon";
import "@/page/successful-transfer-page/successful-transfer-page.js";
import locales from "@/locales/locales.json";
import { SUCCESSFUL_TRANSFER_RESPONSE_MOCK as SUCCESSFUL_MOCK } from "@/mocks/transfer.mock";

describe("SuccessfulTransferPage", () => {
  let el;

  beforeEach(async () => {
    el = await fixture(html`
      <successful-transfer-page
        .locale=${locales["es-PE"]}
        .amount=${SUCCESSFUL_MOCK.amount}
        .transactionNumber=${SUCCESSFUL_MOCK.transactionNumber}
        .date=${SUCCESSFUL_MOCK.date}
        .time=${SUCCESSFUL_MOCK.time}
        .originAccount=${SUCCESSFUL_MOCK.originAccount}
        .originAccountNumber=${SUCCESSFUL_MOCK.originAccountNumber}
        .beneficiaryName=${SUCCESSFUL_MOCK.beneficiaryName}
        .beneficiaryLastName=${SUCCESSFUL_MOCK.beneficiaryLastName}
        ?isOpen=${true}
      ></successful-transfer-page>
    `);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("debe descargar con éxito", async () => {
    const downloadSpy = sinon.spy();
    const btnDownload = el.shadowRoot.getElementById("downloadBtn");
    el.addEventListener("download-summary-pdf", downloadSpy);

    btnDownload.click();

    await el.updateComplete;

    expect(downloadSpy.calledOnce).to.be.true;
  });

  it("debe cambiar abrirse el modal al hacer click al botón shareBtn", async () => {
    const shareBtn = el.shadowRoot.getElementById("shareBtn");
    const shareModal = el.shadowRoot.getElementById("shareModal");
    shareBtn.click();
    await el.updateComplete;
    expect(shareModal.open).to.be.true;
  });

  it("debe cambiar cerrarse el modal al hacer click al botón closeShareBtn", async () => {
    const shareBtn = el.shadowRoot.getElementById("shareBtn");
    const closeShareBtn = el.shadowRoot.getElementById("closeShareBtn");
    const shareModal = el.shadowRoot.getElementById("shareModal");
    shareBtn.click();
    await el.updateComplete;
    closeShareBtn.click();

    expect(shareModal.open).to.be.true;
  });

  it('debe emitir el evento "return-home"', async () => {
    const spyReturn = sinon.spy();
    const homeBtn = el.shadowRoot.getElementById("homeBtn");
    el.addEventListener("return-home", spyReturn);

    homeBtn.click();

    await el.updateComplete;
    expect(spyReturn.calledOnce).to.be.true;
    expect(spyReturn.firstCall.args[0].detail).to.equal(0);
    expect(el.isOpen).to.be.false;
  });
});
