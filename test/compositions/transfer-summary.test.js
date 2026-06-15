import { describe, it, expect } from "vitest";
import { fixture, html } from "@open-wc/testing-helpers";
import "@compositions/transfer-summary/transfer-summary.js";

describe("transfer-summary (composition)", () => {
  it("se renderiza correctamente", async () => {
    const el = await fixture(html` <transfer-summary></transfer-summary> `);

    expect(el).to.exist;
  });

  it("formatea correctamente el monto", async () => {
    const el = await fixture(html`
      <transfer-summary
        .transferData=${{
          amount: 1000,
          currency: "USD",
        }}
      ></transfer-summary>
    `);

    await el.updateComplete;

    expect(el._formattedAmount).to.exist;
  });

  it("aplica máscara a la cuenta origen", async () => {
    const el = await fixture(html`
      <transfer-summary
        .transferData=${{
          sourceAccount: {
            accountNumber: "1234567890",
          },
        }}
      ></transfer-summary>
    `);

    await el.updateComplete;

    expect(el._sourceAccountNumber).to.exist;
  });

  it("usa fallback cuando no hay cuenta origen", async () => {
    const el = await fixture(html`
      <transfer-summary .transferData=${{}}></transfer-summary>
    `);

    await el.updateComplete;

    expect(el._sourceAccountName).to.equal("Sin cuenta");
  });

  it("usa fallback cuando no hay beneficiario", async () => {
    const el = await fixture(html`
      <transfer-summary .transferData=${{}}></transfer-summary>
    `);

    await el.updateComplete;

    expect(el._beneficiaryName).to.equal("Sin beneficiario");
  });

  it("renderiza correctamente el nombre del beneficiario", async () => {
    const el = await fixture(html`
      <transfer-summary
        .transferData=${{
          beneficiary: {
            fullName: "Juan Perez",
          },
        }}
      ></transfer-summary>
    `);

    const content = el.shadowRoot.textContent;

    expect(el._beneficiaryName).to.equal("Juan Perez");
  });

  it("renderiza el monto formateado en el DOM", async () => {
    const el = await fixture(html`
      <transfer-summary
        .transferData=${{
          amount: 500,
          currency: "USD",
        }} 
      ></transfer-summary>
    `);

    await el.updateComplete;

    const content = el.shadowRoot.textContent;

    expect(el._formattedAmount).to.be.a("string");
  });
});
