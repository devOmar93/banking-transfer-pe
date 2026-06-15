import { describe, it, expect } from "vitest";
import { fixture, html } from "@open-wc/testing";

import "@compositions/info-card/info-card.js";

describe("info-card", () => {

  it("se renderiza correctamente", async () => {
    const el = await fixture(html` <info-card></info-card> `);

    expect(el).to.exist;
  });

  it("muestra el mensaje en type-text", async () => {
    const el = await fixture(html`
      <info-card message="Hola mundo"></info-card>
    `);

    const text = el.shadowRoot.querySelector("type-text");

    expect(text).to.exist;
    expect(text.text).to.equal("Hola mundo");
  });

  it("no renderiza el icon cuando hasIcon es false", async () => {
    const el = await fixture(html`
      <info-card message="Test" .hasIcon=${false}></info-card>
    `);

    const icon = el.shadowRoot.querySelector("type-icon");

    expect(icon).to.be.null;
  });

  it("renderiza el icon cuando hasIcon es true", async () => {
    const el = await fixture(html`
      <info-card message="Test" .hasIcon=${true}></info-card>
    `);

    const icon = el.shadowRoot.querySelector("type-icon");

    expect(icon).to.exist;
  });

  it("configura correctamente el icono", async () => {
    const el = await fixture(html`
      <info-card message="Test" .hasIcon=${true}></info-card>
    `);

    const icon = el.shadowRoot.querySelector("type-icon");

    expect(icon).to.exist;
    expect(icon.getAttribute("icon-name")).to.equal("info");
    expect(icon.size).to.equal("s");
    expect(icon.variant).to.equal("default");
  });

  it("actualiza el mensaje dinámicamente", async () => {
    const el = await fixture(html` <info-card message="Inicial"></info-card> `);

    el.message = "Actualizado";
    await el.updateComplete;

    const text = el.shadowRoot.querySelector("type-text");

    expect(text.text).to.equal("Actualizado");
  });
});
