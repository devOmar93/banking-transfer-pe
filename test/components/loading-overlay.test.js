import { describe, it, expect } from "vitest";
import { fixture, html } from "@open-wc/testing-helpers";
import "@components/loading-overlay/loading-overlay.js";

describe("loading-overlay", () => {
  it("se renderiza correctamente", async () => {
    const el = await fixture(html`<loading-overlay></loading-overlay>`);

    expect(el).to.exist;
  });

  it("renderiza el contenedor overlay", async () => {
    const el = await fixture(html`<loading-overlay></loading-overlay>`);

    const overlay = el.shadowRoot.querySelector(".overlay");

    expect(overlay).to.exist;
  });

  it("tiene atributo role=alert", async () => {
    const el = await fixture(html`<loading-overlay></loading-overlay>`);

    const overlay = el.shadowRoot.querySelector(".overlay");

    expect(overlay.getAttribute("role")).toBe("alert");
  });

  it("tiene aria-busy=true", async () => {
    const el = await fixture(html`<loading-overlay></loading-overlay>`);

    const overlay = el.shadowRoot.querySelector(".overlay");

    expect(overlay.getAttribute("aria-busy")).toBe("true");
  });

  it("renderiza spinner interno", async () => {
    const el = await fixture(html`<loading-overlay></loading-overlay>`);

    const spinner = el.shadowRoot.querySelector(".spinner");

    expect(spinner).to.exist;
  });
});
