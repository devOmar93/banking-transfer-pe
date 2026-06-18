import { fixture, html, expect, oneEvent } from "@open-wc/testing";
import sinon from "sinon";
import "@/providers/data-managers/entelgy-global-new-transfer-api-dm/entelgy-global-new-transfer-api-dm.js";
import { ACCOUNTS_BASE_CASE } from "@/mocks/accounts.mock.js";

describe("EntelgyGlobalNewTransferApiDm", () => {
  let el;

  beforeEach(async () => {
    el = await fixture(html`
      <entelgy-global-new-transfer-api-dm></entelgy-global-new-transfer-api-dm>
    `);

    await el.updateComplete;
  });

  afterEach(() => {
    sinon.restore();
  });

  it("emits new-transfer-api-dm-success when destination account exists", async () => {
    const clock = sinon.useFakeTimers();
    const account = ACCOUNTS_BASE_CASE.accounts[0];

    const eventPromise = oneEvent(el, "new-transfer-api-dm-success");

    const requestPromise = el.getAccountDestination(account.accountNumber);

    await clock.tickAsync(2500);
    await requestPromise;

    const event = await eventPromise;

    expect(event).to.exist;
    expect(event.detail.accountNumber).to.equal(account.accountNumber);
    expect(event.detail.accountName).to.equal(account.accountName);
    expect(event.detail.firstName).to.equal(
      ACCOUNTS_BASE_CASE.accountHolder.firstName,
    );
    expect(event.detail.lastName).to.equal(
      ACCOUNTS_BASE_CASE.accountHolder.lastName,
    );
  });

  it("emits new-transfer-api-dm-error with message when destination account does not exist", async () => {
    const clock = sinon.useFakeTimers();

    const eventPromise = oneEvent(el, "new-transfer-api-dm-error");

    const requestPromise = el.getAccountDestination("99999999999999");

    await clock.tickAsync(2500);
    await requestPromise;

    const event = await eventPromise;

    expect(event).to.exist;
    expect(event.detail.message).to.equal("Cuenta destino no encontrada");
  });
});
