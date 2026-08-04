import { fixture, html, expect } from "@open-wc/testing";
import sinon from "sinon";
import "@/page/action-modal/action-modal.js";
import locales from "@/locales/locales.json";

describe("ActionModal", () => {
  let el;
  const mockLocale = locales.es_LA;

  beforeEach(async () => {
    el = await fixture(html`
      <action-modal
        .locale=${mockLocale}
        action-type="loadAccountsError"
        .open=${true}
      ></action-modal>
    `);

    await el.updateComplete;
  });

  afterEach(() => {
    sinon.restore();
  });

  it("renders the modal correctly", async () => {
    const modal = el.shadowRoot.querySelector("type-modal");

    expect(modal).to.exist;
    expect(modal.open).to.be.true;
  });


  it("renders the title and message based on the actionType", async () => {
    const title = el.shadowRoot.querySelector(".modal-title");
    const message = el.shadowRoot.querySelector(".modal-message");

    expect(title).to.exist;
    expect(message).to.exist;
    expect(title.textContent).to.include("Error al cargar cuentas");
    expect(message.textContent).to.include("Ocurrió un problema al obtener sus cuentas. Intente nuevamente.");
  });


it("alls back to loadAccountsError when actionType does not exist", async () => {
    const el = await fixture(html`
      <action-modal
        .locale=${mockLocale}
        action-type="tipo-inexistente"
        .open=${true}
      ></action-modal>
    `);

    await el.updateComplete;

    const title = el.shadowRoot.querySelector(".modal-title");
    const buttons = el.shadowRoot.querySelectorAll("type-button");

    expect(title).to.exist;
    expect(title.textContent).to.include("Error al cargar cuentas");
    expect(buttons.length).to.equal(2);
  });



  it("renders two buttons for loadAccountsError", async () => {
    const buttons = el.shadowRoot.querySelectorAll("type-button");

    expect(buttons.length).to.equal(2);
  });



  it("emits action-modal-action when retry is clicked", async () => {
    const actionSpy = sinon.spy();

    el.addEventListener("action-modal-action", actionSpy);

    const buttons = el.shadowRoot.querySelectorAll("type-button");

    expect(buttons.length).to.equal(2);

    buttons[0].click();

    await el.updateComplete;

    expect(actionSpy.calledOnce).to.be.true;
    expect(actionSpy.firstCall.args[0].detail.buttonAction).to.equal("retry");
    expect(actionSpy.firstCall.args[0].detail.buttonText).to.equal("Reintentar");
  });


  it("emits action-modal-exit when exit button is clicked", async () => {
    const exitSpy = sinon.spy();

    el.addEventListener("action-modal-exit", exitSpy);

    const buttons = el.shadowRoot.querySelectorAll("type-button");

    expect(buttons.length).to.equal(2);

    buttons[1].click();

    await el.updateComplete;

    expect(exitSpy.calledOnce).to.be.true;
    expect(exitSpy.firstCall.args[0].detail.buttonAction).to.equal("exit");
  });


  it("renders a single button for blockedAccount", async () => {
    const elBlocked = await fixture(html`
      <action-modal
        .locale=${mockLocale}
        action-type="blockedAccount"
        .open=${true}
      ></action-modal>
    `);

    await elBlocked.updateComplete;

    const buttons = elBlocked.shadowRoot.querySelectorAll("type-button");

    expect(buttons.length).to.equal(1);
  });


  it("renders the continue button for singleValidAccountInformation", async () => {
    const elSingle = await fixture(html`
      <action-modal
        .locale=${mockLocale}
        action-type="singleValidAccountInformation"
        .open=${true}
      ></action-modal>
    `);

    await elSingle.updateComplete;

    const buttons = elSingle.shadowRoot.querySelectorAll("type-button");

    expect(buttons.length).to.equal(1);
    expect(buttons[0].text).to.equal("Continuar");
  });


  it("emits action-modal-exit when clicking on the backdrop", async () => {
    const exitSpy = sinon.spy();

    el.addEventListener("action-modal-exit", exitSpy);

    const modal = el.shadowRoot.querySelector("type-modal");

    expect(modal).to.exist;

    modal.click();

    await el.updateComplete;

    expect(exitSpy.calledOnce).to.be.true;
    expect(exitSpy.firstCall.args[0].detail.buttonType).to.equal("backdrop");
  });

  
it("uses the default locale when no locale is provided", async () => {
  const el = await fixture(html`
    <action-modal
      action-type="loadAccountsError"
      .open=${true}
    ></action-modal>
  `);

  await el.updateComplete;

  const title = el.shadowRoot.querySelector(".modal-title");
  const message = el.shadowRoot.querySelector(".modal-message");

  expect(title).to.exist;
  expect(message).to.exist;
  expect(title.textContent).to.include("Error al cargar cuentas");
  expect(message.textContent).to.include("Ocurrió un problema al obtener sus cuentas");
});


it("shows the key when the locale text does not exist", async () => {
  const incompleteLocale = {
    "action-modal-load-accounts-error-title": "Error custom"
  };

  const el = await fixture(html`
    <action-modal
      .locale=${incompleteLocale}
      action-type="loadAccountsError"
      .open=${true}
    ></action-modal>
  `);

  await el.updateComplete;

  const message = el.shadowRoot.querySelector(".modal-message");
  const buttons = el.shadowRoot.querySelectorAll("type-button");

  expect(message).to.exist;
  expect(message.textContent).to.include("action-modal-load-accounts-error-message");
  expect(buttons.length).to.equal(2);
  expect(buttons[0].text).to.equal("action-modal-button-retry");
});

});