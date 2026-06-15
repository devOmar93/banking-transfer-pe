import { describe, it, expect, vi } from "vitest";
import { fixture, html } from "@open-wc/testing-helpers";

vi.mock("@components/type-text/type-text.js", () => ({}));

import "@compositions/type-header/type-header.js";

describe("type-header", () => {
  const createHeader = (props = {}) => html`
    <type-header
      title=${props.title || "Título"}
      subtitle=${props.subtitle || "Subtítulo"}
      align=${props.align || "left"}
    ></type-header>
  `;

  it("se renderiza correctamente", async () => {
    const el = await fixture(createHeader());
    expect(el).to.exist;
  });

  it("renderiza contenedor header", async () => {
    const el = await fixture(createHeader());
    const container = el.shadowRoot.querySelector(".header");

    expect(container).to.exist;
  });

  it("renderiza el título correctamente", async () => {
    const el = await fixture(createHeader({ title: "Mi título" }));
    const texts = el.shadowRoot.querySelectorAll("type-text");

    expect(texts.length).toBeGreaterThan(0);
  });

  it("renderiza el subtítulo correctamente", async () => {
    const el = await fixture(createHeader({ subtitle: "Mi subtítulo" }));
    const subtitle = el.shadowRoot.querySelector(".subtitle");

    expect(subtitle).to.exist;
  });

  it("aplica alineación correctamente", async () => {
    const el = await fixture(createHeader({ align: "center" }));
    const texts = el.shadowRoot.querySelectorAll("type-text");

    texts.forEach((node) => {
      expect(node.getAttribute("align")).toBe("center");
    });
  });

  it("actualiza el título cuando cambia la prop", async () => {
    const el = await fixture(createHeader({ title: "Inicial" }));

    el.title = "Nuevo título";
    await el.updateComplete;

    const texts = el.shadowRoot.querySelectorAll("type-text");

    expect(texts[0].getAttribute("text")).toBe("Nuevo título");
  });
});
