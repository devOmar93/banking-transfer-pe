import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing-helpers';

vi.mock('@components/type-text/type-text.js', () => ({}));
vi.mock('@components/type-icon/type-icon.js', () => ({}));

import '@compositions/type-button/type-button.js';

const createValidButton = () => html`
  <type-button
    text="Enviar"
    variant="default"
    type="button"
    icon-position="left"
  ></type-button>
`;

describe('type-button', () => {

  it('se renderiza correctamente', async () => {
    const el = await fixture(createValidButton());
    expect(el).to.exist;
  });

  it('renderiza botón base', async () => {
    const el = await fixture(createValidButton());
    const button = el.shadowRoot.querySelector('button');

    expect(button).to.exist;
  });

  it('renderiza texto cuando existe', async () => {
    const el = await fixture(createValidButton());
    const text = el.shadowRoot.querySelector('type-text');

    expect(text).to.exist;
  });

  it('renderiza icono cuando iconName existe', async () => {
    const el = await fixture(html`
      <type-button
        text="Enviar"
        variant="default"
        type="button"
        icon-position="left"
        icon-name="check"
      ></type-button>
    `);
    const icon = el.shadowRoot.querySelector('type-icon');
    expect(icon).to.exist;
  });

  it('aplica disabled correctamente', async () => {
    const el = await fixture(html`
      <type-button
        text="Enviar"
        variant="default"
        type="button"
        icon-position="left"
        disabled
      ></type-button>
    `);
    const btn = el.shadowRoot.querySelector('button');
    expect(btn.disabled).toBe(true);
  });

  it('aplica aria-label cuando existe', async () => {
    const el = await fixture(html`
      <type-button
        text="Enviar"
        variant="default"
        type="button"
        icon-position="left"
        aria-label="cerrar"
      ></type-button>
    `);
    const btn = el.shadowRoot.querySelector('button');
    expect(btn.getAttribute('aria-label')).toBe('cerrar');
  });

  it('aplica tipo de botón', async () => {
    const el = await fixture(html`
      <type-button
        text="Enviar"
        variant="default"
        type="submit"
        icon-position="left"
      ></type-button>
    `);
    const btn = el.shadowRoot.querySelector('button');
    expect(btn.getAttribute('type')).toBe('submit');
  });

  it('lanza error si no hay text', async () => {
    await expect(async () => {
      const el = await fixture(html`
        <type-button
          variant="default"
          type="button"
          icon-position="left"
        ></type-button>
      `);
      await el.updateComplete;
    }).rejects.toThrow();
  });

  it('lanza error si variant es inválido', async () => {
    await expect(async () => {
      const el = await fixture(html`
        <type-button
          text="Enviar"
          variant="wrong"
          type="button"
          icon-position="left"
        ></type-button>
      `);
      await el.updateComplete;
    }).rejects.toThrow();
  });

  it('lanza error si type es inválido', async () => {
    await expect(async () => {
      const el = await fixture(html`
        <type-button
          text="Enviar"
          variant="default"
          type="invalid"
          icon-position="left"
        ></type-button>
      `);
      await el.updateComplete;
    }).rejects.toThrow();
  });
});
