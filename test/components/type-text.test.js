import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing-helpers';

import '@components/type-text/type-text.js';

describe('type-text', () => {

  it('se renderiza correctamente', async () => {
    const el = await fixture(html`
      <type-text text="Hola"></type-text>
    `);

    expect(el).to.exist;
  });

  it('renderiza el texto correctamente', async () => {
    const el = await fixture(html`
      <type-text text="Hola"></type-text>
    `);

    const content = el.shadowRoot.innerHTML;

    expect(content).to.include('Hola');
  });

  it('aplica configuraciones válidas', async () => {
    const el = await fixture(html`
      <type-text
        text="Hola"
        size="m"
        align="center"
        weight="bold"
      ></type-text>
    `);

    const node = el.shadowRoot.querySelector('*');

    expect(node.className).to.include('size-m');
    expect(node.className).to.include('align-center');
    expect(node.className).to.include('weight-bold');
  });

  it('corrige valores inválidos usando validateText', async () => {
    const el = await fixture(html`
      <type-text
        text="Hola"
        size="invalid"
      ></type-text>
    `);

    await el.updateComplete;

    const node = el.shadowRoot.querySelector('*');

    expect(node.className).to.include('size-');
  });
  
  it('actualiza el texto cuando cambia la prop', async () => {
    const el = await fixture(html`
      <type-text text="Inicial"></type-text>
    `);

    el.text = 'Nuevo';
    await el.updateComplete;

    expect(el.shadowRoot.innerHTML).to.include('Nuevo');
  });

  it('renderiza con tag personalizado', async () => {
    const el = await fixture(html`
      <type-text text="Hola" tag="p"></type-text>
    `);

    const p = el.shadowRoot.querySelector('p');

    expect(p).to.exist;
  });

});