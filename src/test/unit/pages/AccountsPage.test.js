import { fixture, html, expect, oneEvent } from "@open-wc/testing";
import "@/page/accounts-page/AccountsPage.js";
import { fireEvent } from "@/utils/utils.js";
import {
  ACCOUNTS_BASE_CASE,
  ACCOUNTS_CASE_1,
  ACCOUNTS_CASE_3,
  ACCOUNTS_CASE_4
} from "@/mocks/accounts.mock.js";

describe("AccountsPage", () => {
  let el;

  beforeEach(async () => {
    el = await fixture(html`
      <accounts-page ?open=${true}></accounts-page>
    `);

    el.data = ACCOUNTS_BASE_CASE.accounts;

    await el.updateComplete;
  });

  it("passes the accounts to account-list", async () => {
    const list = el.shadowRoot.querySelector("account-list");

    expect(list).to.exist;
    expect(list.accounts).to.be.an("array");
    expect(list.accounts.length).to.be.greaterThan(0);
  });

  it("renders multiple accounts correctly", async () => {
    const list = el.shadowRoot.querySelector("account-list");

    expect(list).to.exist;
    expect(list.accounts.length).to.be.greaterThan(1);
  });

  it("renders an empty list when there are no accounts", async () => {
    const elEmpty = await fixture(html`
      <accounts-page ?open=${true}></accounts-page>
    `);

    elEmpty.data = [];
    await elEmpty.updateComplete;

    const list = elEmpty.shadowRoot.querySelector("account-list");

    expect(list).to.exist;
    expect(list.accounts).to.deep.equal([]);
  });

  it("emits account-validated when a valid account is selected", async () => {
    const list = el.shadowRoot.querySelector("account-list");

    expect(list).to.exist;

    const promise = oneEvent(el, "account-validated");

    fireEvent(list, "account-selected", {
      account: el.data[0]
    });

    const event = await promise;

    expect(event).to.exist;
    expect(event.detail.account).to.deep.equal(el.data[0]);
  });

  it("renders correctly when there is only one account", async () => {
    const elSingle = await fixture(html`
      <accounts-page ?open=${true}></accounts-page>
    `);

    elSingle.data = ACCOUNTS_CASE_1.accounts;
    await elSingle.updateComplete;

    const list = elSingle.shadowRoot.querySelector("account-list");

    expect(list).to.exist;
    expect(list.accounts.length).to.equal(1);
  });

  it("emits accounts-error when the selected account is blocked", async () => {
    const elBlocked = await fixture(html`
      <accounts-page ?open=${true}></accounts-page>
    `);

    elBlocked.data = ACCOUNTS_CASE_3.accounts;
    await elBlocked.updateComplete;

    const list = elBlocked.shadowRoot.querySelector("account-list");

    expect(list).to.exist;

    const promise = oneEvent(elBlocked, "accounts-error");

    fireEvent(list, "account-selected", {
      account: elBlocked.data[0]
    });

    const event = await promise;

    expect(event).to.exist;
  });

  it("renders an empty list for CASE 4 when no accounts are available", async () => {
    const elEmpty = await fixture(html`
      <accounts-page ?open=${true}></accounts-page>
    `);

    elEmpty.data = ACCOUNTS_CASE_4.accounts;
    await elEmpty.updateComplete;

    const list = elEmpty.shadowRoot.querySelector("account-list");

    expect(list).to.exist;
    expect(list.accounts).to.deep.equal([]);
  });
});
