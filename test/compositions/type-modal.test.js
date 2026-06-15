import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing-helpers';

import '@compositions/type-modal/type-modal.js';

describe('type-modal', () => {

  it('no renderiza contenido cuando open es false', async () => {
    const el = await fixture(html`
      <type-modal></type-modal>
    `);

    const backdrop = el.shadowRoot.querySelector('.type-modal-backdrop');

    expect(backdrop).toBeNull(); 
  });

  it('renderiza modal cuando open es true', async () => {
    const el = await fixture(html`
      <type-modal open></type-modal>
    `);

    const backdrop = el.shadowRoot.querySelector('.type-modal-backdrop');
    const content = el.shadowRoot.querySelector('.type-modal-content');

    expect(backdrop).to.exist;
    expect(content).to.exist;
  });

  it('aplica estado closing cuando se cierra', async () => {
    const el = await fixture(html`
      <type-modal open></type-modal>
    `);

    el.open = false;
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));

    const backdrop = el.shadowRoot.querySelector('.type-modal-backdrop');
    const content = el.shadowRoot.querySelector('.type-modal-content');

    expect(backdrop).to.exist;
    expect(content).to.exist;

    expect(backdrop.className).toContain('closing');
    expect(content.className).toContain('closing');
  });

  it('renderiza footer cuando hasFooter es true', async () => {
    const el = await fixture(html`
      <type-modal open has-footer></type-modal>
    `);

    const footer = el.shadowRoot.querySelector('.type-modal-footer');
    expect(footer).to.exist;
  });

  it('no renderiza footer cuando hasFooter es false', async () => {
    const el = await fixture(html`
      <type-modal open></type-modal>
    `);

    const footer = el.shadowRoot.querySelector('.type-modal-footer');
    expect(footer).toBeNull();
  });

  it('bloquea scroll del body al abrir', async () => {
    const el = await fixture(html`
      <type-modal open></type-modal>
    `);

    await el.updateComplete;
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restaura scroll del body al cerrar', async () => {
    const el = await fixture(html`
      <type-modal open></type-modal>
    `);

    await el.updateComplete;
    el.open = false;
    await el.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 310));

    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('evita propagación de click dentro del modal', async () => {
    const el = await fixture(html`
      <type-modal open></type-modal>
    `);

    const content = el.shadowRoot.querySelector('.type-modal-content');
    let stopped = false;
    const event = new Event('click', { bubbles: true });
    event.stopPropagation = () => {
      stopped = true;
    };

    content.dispatchEvent(event);
    expect(stopped).toBe(true);
  });

});
