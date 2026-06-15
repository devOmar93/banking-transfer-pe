import { describe, it, expect } from "vitest";
import {
  STATES,
  ACCOUNTS_PAGE_CONFIG,
  ACCOUNTS_PAGE_ES,
} from "@utils/accounts-page/accounts.config.js";

describe("accounts.config", () => {
  it("debe tener estados correctamente definidos", () => {
    expect(STATES.SUCCESS.ACTIVE).toBeDefined();
  });

  it("debe mapear errorState correctamente", () => {
    const error = STATES.ERROR_MODAL_TYPES;

    expect(error).toBeDefined();
  });

  it("debe tener textos cargados", () => {
    expect(ACCOUNTS_PAGE_ES.header.title).toBeDefined();
  });
});
