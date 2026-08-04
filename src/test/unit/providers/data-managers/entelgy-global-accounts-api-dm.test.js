import { fixture, html, expect, oneEvent } from "@open-wc/testing";
import sinon from "sinon";
import "@/providers/data-managers/entelgy-global-accounts-api-dm/entelgy-global-accounts-api-dm.js";
import { ACCOUNTS_BASE_CASE } from "@/mocks/accounts.mock.js";

describe("EntelgyGlobalAccountsApiDm", () => {
  let el;

  beforeEach(async () => {
    el = await fixture(html`
      <entelgy-global-accounts-api-dm></entelgy-global-accounts-api-dm>
    `);

    await el.updateComplete;
  });

  afterEach(() => {
    sinon.restore();
  });

  it("emits accounts-api-dm-success with accounts data when getAccounts resolves", async () => {
    const clock = sinon.useFakeTimers();

    const eventPromise = oneEvent(el, "accounts-api-dm-success");

    const getAccountsPromise = el.getAccounts();

    await clock.tickAsync(1000);
    await getAccountsPromise;

    const event = await eventPromise;

    expect(event).to.exist;
    expect(event.detail).to.deep.equal(ACCOUNTS_BASE_CASE);
    expect(event.detail.accounts).to.deep.equal(ACCOUNTS_BASE_CASE.accounts);
  });

  it("emits accounts-api-dm-error when getAccounts fails", async () => {
    const clock = sinon.useFakeTimers();
    el.simulateError = true;

    const eventPromise = oneEvent(el, "accounts-api-dm-error");

    const getAccountsPromise = el.getAccounts();

    await clock.tickAsync(1000);
    await getAccountsPromise;

    const event = await eventPromise;

    expect(event).to.exist;
    expect(event.detail.message).to.equal("Error simulado");
  });
});
