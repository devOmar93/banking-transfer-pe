import { fixture, html, expect, oneEvent } from "@open-wc/testing";
import "@/page/accounts-page/compositions/account-card/account-card.js";

describe("AccountCard", () => {
  let el;

  beforeEach(async () => {
    el = await fixture(html`
      <account-card
        accountName="Cuenta Ahorros"
        accountNumber="123"
        accountType="Ahorros"
        currency="PEN"
        .availableBalance=${100}
        status="ACTIVE"
      ></account-card>
    `);

    await el.updateComplete;
  });

  it("renders the button correctly", async () => {
    const button = el.shadowRoot.querySelector("button");

    expect(button).to.exist;
    expect(button.getAttribute("type")).to.equal("button");
  });

  it("emits account-selected on click", async () => {
    const button = el.shadowRoot.querySelector("button");

    expect(button).to.exist;

    const promise = oneEvent(el, "account-selected");

    button.click();

    const event = await promise;

    expect(event).to.exist;
    expect(event.detail.account.accountName).to.equal("Cuenta Ahorros");
    expect(event.detail.account.accountNumber).to.equal("123");
    expect(event.detail.account.accountType).to.equal("Ahorros");
    expect(event.detail.account.currency).to.equal("PEN");
    expect(event.detail.account.availableBalance).to.equal(100);
    expect(event.detail.account.status).to.equal("ACTIVE");
  });

  it("emits account-selected when pressing Enter", async () => {
    const button = el.shadowRoot.querySelector("button");

    expect(button).to.exist;

    const promise = oneEvent(el, "account-selected");

    button.dispatchEvent(new KeyboardEvent("keydown", {
      key: "Enter",
      bubbles: true,
      composed: true
    }));

    const event = await promise;

    expect(event).to.exist;
    expect(event.detail.account.accountName).to.equal("Cuenta Ahorros");
  });

  it("emits account-selected when pressing Space", async () => {
    const button = el.shadowRoot.querySelector("button");

    expect(button).to.exist;

    const promise = oneEvent(el, "account-selected");

    button.dispatchEvent(new KeyboardEvent("keydown", {
      key: " ",
      bubbles: true,
      composed: true
    }));

    const event = await promise;

    expect(event).to.exist;
    expect(event.detail.account.accountName).to.equal("Cuenta Ahorros");
  });
});