import { fixture, html, expect } from "@open-wc/testing";
import sinon from "sinon";
import { fireEvent } from "@/utils/utils";
import "@/page/confirm-transfer-page/confirm-transfer-page.js";

import { TRANSFER_DATA_MOCK } from "@/mocks/transfer.data";

describe("ConfirmTransferPage", () => {
  let el;

  beforeEach(async () => {
    el = await fixture(html`
      <confirm-transfer-page
        .transferData=${TRANSFER_DATA_MOCK}
        open
      ></confirm-transfer-page>
    `);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("debe emitir confirm-accept al hacer click en aceptar", async () => {
    const spy = sinon.spy();
    el.addEventListener("confirm-accept", spy);

    await el.updateComplete;

    const wrapper = el.shadowRoot.querySelector(
      ".confirm-transfer-page__footer type-button"
    );

    const button = wrapper.shadowRoot?.querySelector("button");

    button.click();

    expect(spy.calledOnce).to.be.true;

  });

  it("debe emitir confirm-cancel al hacer click en volver", async () => {
    const spy = sinon.spy();
    el.addEventListener("confirm-cancel", spy);

    await el.updateComplete;

    const wrapper = el.shadowRoot.querySelector(
      ".confirm-transfer-page__back-btn"
    );

    const button = wrapper.shadowRoot?.querySelector("button");

    button.click();

    expect(spy.calledOnce).to.be.true;
  });

  it("debe mostrar modal de error cuando transferStatus es error", async () => {
    el.transferStatus = "error";

    await el.updateComplete;

    const modal = el.shadowRoot.querySelector("action-modal");

    expect(modal).to.exist;
    expect(modal.getAttribute("action-type")).to.equal("transferError");
  });

  it("debe emitir transfer-retry cuando action es retry", async () => {
    const spy = sinon.spy();
    el.addEventListener("transfer-retry", spy);

    el.transferStatus = "error";

    await el.updateComplete;

    const modal = el.shadowRoot.querySelector("action-modal");

    fireEvent(modal, "action-modal-action", {
      buttonAction: "retry",
    });

    expect(spy.calledOnce).to.be.true;
  });

  it("debe cancelar después de 3 errores", async () => {
    const spy = sinon.spy();
    el.addEventListener("confirm-cancel", spy);

    const states = ["error", "", "error", "", "error"];

    for (const state of states) {
      el.transferStatus = state;
      await el.updateComplete;
    }

    expect(spy.calledOnce).to.be.true;
  });

  it("debe cerrar modal si no es retry", async () => {
    el.transferStatus = "error";

    await el.updateComplete;

    const modal = el.shadowRoot.querySelector("action-modal");

    fireEvent(modal, "action-modal-action", {
      buttonAction: "cancel",
    });

    await el.updateComplete;

    const modalAfter = el.shadowRoot.querySelector("action-modal");

    expect(modalAfter).to.not.exist;
  });
});
