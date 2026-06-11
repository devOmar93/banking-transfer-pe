import { fixture, html, expect } from "@open-wc/testing";
import "../../src/components/type-text/type-text.js";

describe("TypeText Component", () => {
  // Render básico
  it("se renderiza correctamente", async () => {
    const el = await fixture(html`<type-text></type-text>`);
    expect(el).to.exist;
  });

  //  Render del texto
  it("muestra el texto correctamente", async () => {
    const el = await fixture(html`<type-text text="Hola Mundo"></type-text>`);

    const node = el.shadowRoot.firstElementChild;
    expect(node.textContent).to.include("Hola Mundo");
  });

  // Tag dinámico (core del componente)
  it("renderiza el tag dinámico correctamente", async () => {
    const el = await fixture(
      html`<type-text tag="h1" text="Título"></type-text>`,
    );

    const h1 = el.shadowRoot.querySelector("h1");

    expect(h1).to.exist;
    expect(h1.textContent.trim()).to.equal("Título");
  });

  // Clases generadas correctamente
  it("aplica clases según size, align y weight", async () => {
    const el = await fixture(html`
      <type-text tag="p" size="m" align="center" weight="bold"></type-text>
    `);

    const node = el.shadowRoot.querySelector("p");

    expect(node.className).to.include("size-m");
    expect(node.className).to.include("align-center");
    expect(node.className).to.include("weight-bold");
  });

  // Validación de props (willUpdate)
  it("corrige valores inválidos usando validateText", async () => {
    const el = await fixture(
      html`<type-text size="invalid" align="wrong"></type-text>`,
    );

    await el.updateComplete;

    expect(el.size).to.not.equal("invalid");
    expect(el.align).to.not.equal("wrong");
  });

  // Reactividad (cambio dinámico)
  it("actualiza el DOM cuando cambia el text", async () => {
    const el = await fixture(html`<type-text text="Inicial"></type-text>`);

    el.text = "Actualizado";
    await el.updateComplete;

    expect(el.shadowRoot.textContent).to.include("Actualizado");
  });

  // Manejo seguro de tag vacío
  it("renderiza aunque el tag esté vacío (fallback implícito)", async () => {
    const el = await fixture(html`<type-text text="Test"></type-text>`);

    await el.updateComplete;

    const node = el.shadowRoot.firstElementChild;

    expect(node).to.exist;
    expect(node.textContent.trim()).to.equal("Test");
  });
});
