import { fixture, html, expect, oneEvent } from "@open-wc/testing";
import sinon from "sinon";
import "@/providers/data-managers/entelgy-global-transfers-api-dm/entelgy-global-transfers-api-dm.js";
import { ACCOUNTS_BASE_CASE } from "@/mocks/accounts.mock";
import { TRANSFER_DATA_MOCK } from "@/mocks/transfer.data";
 
describe("EntelgyGlobalTransfersApiDm", () => {
  let el;
 
  beforeEach(async () => {
    el = await fixture(html`
      <entelgy-global-transfers-api-dm .accounts=${ACCOUNTS_BASE_CASE.accounts}></entelgy-global-transfers-api-dm>
    `);
 
    await el.updateComplete;
  });
 
  afterEach(() => {
    sinon.restore();
  });
 
  it("emits success event when transfer is successful", async () => {
    const clock = sinon.useFakeTimers();
 
    const eventPromise = oneEvent(el, "transfer-api-dm-create");
 
    el.executeTransfer(TRANSFER_DATA_MOCK);
 
    await clock.tickAsync(800);
 
    const event = await eventPromise;
 
    expect(event).to.exist;
    expect(event.detail.response).to.exist;
    expect(event.detail.accounts).to.be.an("array");
 
    const source = el.accounts.find(a => a.accountNumber === "10101010101011");
    const destination = el.accounts.find(a => a.accountNumber === "10101010101014");
 
    expect(source.availableBalance).to.equal(5150);
    expect(destination.availableBalance).to.equal(4340);
 
    clock.restore();
  });
 
  it("emits error event when transfer fails", async () => {
    const clock = sinon.useFakeTimers();
 
    el.simulateError = true;
 
    const eventPromise = oneEvent(el, "transfer-api-dm-fetch-error");
 
    el.executeTransfer(TRANSFER_DATA_MOCK);
 
    await clock.tickAsync(800);
 
    const event = await eventPromise;
 
    expect(event).to.exist;
    expect(event.detail.message).to.equal("Error simulado de transferencia");
 
    clock.restore();
  });
});