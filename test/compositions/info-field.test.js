import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing-helpers';

import '@compositions/info-field/info-field.js';

describe('info-field', () => {

  it('se renderiza correctamente', async () => {
    const el = await fixture(html`<info-field></info-field>`);
    expect(el).to.exist;
  });

  it('renderiza contenedores label y value', async () => {
    const el = await fixture(html`<info-field></info-field>`);

    const label = el.shadowRoot.querySelector('.label');
    const value = el.shadowRoot.querySelector('.value');

    expect(label).to.exist;
    expect(value).to.exist;
  });

  it('renderiza contenido en slot label', async () => {
    const el = await fixture(html`
      <info-field>
        <span slot="label">Nombre</span>
      </info-field>
    `);

    const slot = el.shadowRoot.querySelector('slot[name="label"]');
    const assigned = slot.assignedNodes({ flatten: true });

    expect(assigned.length).toBeGreaterThan(0);
    expect(assigned[0].textContent).toContain('Nombre');
  });

  it('renderiza contenido en slot value', async () => {
    const el = await fixture(html`
      <info-field>
        <span slot="value">123456</span>
      </info-field>
    `);

    const slot = el.shadowRoot.querySelector('slot[name="value"]');
    const assigned = slot.assignedNodes({ flatten: true });

    expect(assigned.length).toBeGreaterThan(0);
    expect(assigned[0].textContent).toContain('123456');
  });

});