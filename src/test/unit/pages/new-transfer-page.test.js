import { fixture, html, expect } from "@open-wc/testing";
import sinon from "sinon";
import { TRANSFER_DATA_MOCK } from "@/mocks/transfer.data";
import { NEW_TRANSFER_PAGE_RESPONSE_MOCK } from "@/mocks/newTransferPage.mock";
import { ACCOUNTS_CASE_2, ACCOUNTS_BASE_CASE } from "@/mocks/accounts.mock";
import "@/page/new-transfer-page/new-transfer-page.js";
import { fireEvent } from "@/utils/utils";

describe("NewTransferPage", () => {
  let el;

  beforeEach(async () => {
    el = await fixture(html`
      <new-transfer-page
        .accountCustomer=${ACCOUNTS_BASE_CASE}
      ></new-transfer-page>
    `);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("debe manejar submit del formulario", () => {
    const spy = sinon.spy();
    el.addEventListener("get-account-destinatari", spy);

    const form = el.shadowRoot.querySelector("transfer-form");

    fireEvent(form, "form-submit", TRANSFER_DATA_MOCK);
    expect(spy.calledOnce).to.be.true;
  });

  it("debe emitir evento get-account-destinatari", async () => {
    const spy = sinon.spy();
    el.addEventListener("get-account-destinatari", spy);

    const form = el.shadowRoot.querySelector("transfer-form");

    fireEvent(form, "form-submit", TRANSFER_DATA_MOCK);

    expect(spy.calledOnce).to.be.true;
  });

  it("debe emitir confirm-requested si cuenta destino es ACTIVE", async () => {
    const spy = sinon.spy();
    el.addEventListener("confirm-requested", spy);

    const form = el.shadowRoot.querySelector("transfer-form");
    const account = ACCOUNTS_CASE_2.accounts[0];

    fireEvent(form, "form-submit", TRANSFER_DATA_MOCK);

    el.destinationAccount = {
      accountNumber: account.accountNumber,
      status: "ACTIVE",
    };

    await el.updateComplete;

    expect(spy.calledOnce).to.be.true;
    const event = spy.firstCall.args[0];
    expect(event.detail.destinationAccount.status).to.equal("ACTIVE");
  });

  it("debe abrir modal de error si cuenta no está ACTIVE", async () => {
    el.destinationAccount =
      NEW_TRANSFER_PAGE_RESPONSE_MOCK.ERRORS.blockedAccount;

    await el.updateComplete;

    const modal = el.shadowRoot.querySelector("action-modal");

    expect(modal).to.exist;
  });

  it("debe mapear correctamente tipos de error", () => {
    expect(el._getActionModalType("BLOCKED")).to.equal("blockedAccount");
  });

  it("debe abrir modal de error cuando cuenta destino es INACTIVE", async () => {
    el.destinationAccount = {
      status: "INACTIVE",
    };

    await el.updateComplete;

    const modal = el.shadowRoot.querySelector("action-modal");

    expect(modal).to.exist;
    expect(modal.getAttribute("action-type")).to.equal("inactiveAccount");
  });

  it("debe cerrar el modal al ejecutar acción", async () => {
    el.destinationAccount =
      NEW_TRANSFER_PAGE_RESPONSE_MOCK.ERRORS.blockedAccount;

    await el.updateComplete;

    const modal = el.shadowRoot.querySelector("action-modal");
    expect(modal).to.exist;

    fireEvent(modal, "action-modal-action", {
      buttonAction: "cancel",
    });

    await el.updateComplete;

    const modalAfter = el.shadowRoot.querySelector("action-modal");
    expect(modalAfter).to.not.exist;
  });

  it("debe emitir evento return-page al hacer click en botón", async () => {
    const spy = sinon.spy();
    el.addEventListener("return-page", spy);

    await el.updateComplete;

    const wrapper = el.shadowRoot.querySelector("type-button");
    const button = wrapper.shadowRoot?.querySelector("button");

    button.click();

    expect(spy.calledOnce).to.be.true;

    const event = spy.firstCall.args[0];
    expect(event.detail.step).to.equal(0);
  });

  it("debe renderizar action-modal cuando hay error", async () => {
    el.destinationAccount =
      NEW_TRANSFER_PAGE_RESPONSE_MOCK.ERRORS.blockedAccount;

    await el.updateComplete;

    const modal = el.shadowRoot.querySelector("action-modal");

    expect(modal).to.exist;
  });
});
