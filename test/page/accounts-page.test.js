vi.mock("@utils/accounts-page/accounts.utils.js", () => ({
  processAccounts: vi.fn(),
  filterTopAccounts: vi.fn(),
  validateAccount: vi.fn(),
}));

vi.mock("@components/type-icon/type-icon.js", () => ({
  TypeIcon: class extends HTMLElement {},
}));

vi.mock("@compositions/type-button/type-button.js", () => ({
  TypeIcon: class extends HTMLElement {},
}));

vi.mock("@compositions/type-modal/type-modal.js", () => ({}));

vi.mock("@utils/utils.js", () => ({
  fireEvent: vi.fn(),
}));
import { STATES } from "@utils/accounts-page/accounts.config.js";
import "@compositions/type-modal/type-modal.js";
import { formatAmount } from "@utils/format.js";
import "@page/accounts-page/AccountsPage.js";
import {
  processAccounts,
  filterTopAccounts,
  validateAccount,
} from "@utils/accounts-page/accounts.utils.js";

import { fireEvent } from "@utils/utils.js";

describe("accounts-page (flujo completo)", () => {
  let el;

  beforeEach(() => {
    el = document.createElement("accounts-page");
    document.body.appendChild(el);
  });

  it("muestra loading cuando status = loading", async () => {
    el.status = "loading";
    await el.updateComplete;

    const loading = el.shadowRoot.querySelector("loading-overlay");

    expect(loading).toBeTruthy();
  });

  it("procesa cuentas cuando status = success", async () => {
    filterTopAccounts.mockReturnValue([{ id: 1 }]);

    processAccounts.mockReturnValue({
      accounts: [{ id: 1 }],
    });

    el.data = [{ id: 1 }];
    el.status = "success";

    await el.updateComplete;

    expect(processAccounts).toHaveBeenCalled();
    expect(el._accountsProcessed.length).toBe(1);
  });

  it("dispara evento account cuando hay una sola cuenta válida", async () => {
    const account = { id: 1 };

    filterTopAccounts.mockReturnValue([account]);

    processAccounts.mockReturnValue({
      singleAccount: account,
    });

    validateAccount.mockReturnValue(null);

    el.status = "success";
    el.data = [account];

    await el.updateComplete;

    expect(fireEvent).toHaveBeenCalledWith(el, "account", account);
  });

  it("muestra modal cuando hay errorState", async () => {
    processAccounts.mockReturnValue({
      errorState: "ERROR",
      accounts: [],
    });

    filterTopAccounts.mockReturnValue([]);

    el.status = "success";
    el.data = [];

    await el.updateComplete;

    expect(el._actionModalOpen).toBe(true);
  });

  it("incrementa retry y cambia tipo error", () => {
    el._retryCount = 2;

    el._handleError();

    expect(el._retryCount).toBe(3);
    expect(el._actionModalOpen).toBe(true);
  });

  it("dispara evento retry", () => {
    el._requestRetry();

    expect(fireEvent).toHaveBeenCalledWith(el, "retry-accounts");
  });

  it("dispara evento exit cuando se cierra en error inicial", () => {
    el._isInitialError = true;

    el._closeActionModal();

    expect(fireEvent).toHaveBeenCalledWith(el, "exit", { step: 4 });
  });

  it("maneja selección de cuenta", () => {
    const spy = vi.spyOn(el, "_validateSingleAccount");

    const account = { id: 1 };

    el._selectedAccount({ detail: account });

    expect(spy).toHaveBeenCalledWith(account);
  });

  it("muestra error si validateAccount devuelve error", () => {
    validateAccount.mockReturnValue("ERROR");

    const account = { id: 1 };

    el._validateSingleAccount(account);

    expect(el._actionModalOpen).toBe(true);
  });

  it("cierra modal y ejecuta retry cuando acción es retry", () => {
    el._actionModalOpen = true;

    el._handleActionModalAction({
      detail: { buttonAction: "retry" },
    });

    expect(fireEvent).toHaveBeenCalledWith(el, "retry-accounts");
  });

  it("muestra finalError cuando retry >= 3", () => {
    const el = document.createElement("accounts-page");

    el._retryCount = 2;

    el._handleError();

    expect(el._actionType).toBe("finalError");
  });

  it("sale cuando retryCount es 3", () => {
    const el = document.createElement("accounts-page");

    el._retryCount = 3;

    el._closeActionModal();

    expect(el._actionModalOpen).toBe(false);
  });

  it("usa fallback cuando error no existe", () => {
    const el = document.createElement("accounts-page");

    const result = el._mapErrorStateToActionType("UNKNOWN");

    expect(result).toBe("loadAccountsError");
  });

  it("tiene estados válidos", () => {
    expect(STATES.SUCCESS.ACTIVE).toBeDefined();
  });

  it("maneja evento retry desde action-modal", async () => {
    const el = document.createElement("accounts-page");

    document.body.appendChild(el);

    const spy = vi.spyOn(el, "_requestRetry");

    el._actionModalOpen = true;

    await el.updateComplete;

    el._handleActionModalAction({
      detail: { buttonAction: "retry" },
    });

    expect(spy).toHaveBeenCalled();
  });
  it("retorna string vacío si no hay monto", () => {
    const result = formatAmount(null, "USD");
    expect(result).to.equal("");
  });
});
