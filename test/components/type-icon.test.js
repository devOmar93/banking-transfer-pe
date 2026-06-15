import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';

vi.mock('@components/type-icon/utils/icons.js', () => {
  return {
    ICONS_RUTE: '/icons',
    ICONS: {
      '/icons/test.svg': `
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      `,
    },
  };
});

import '@components/type-icon/type-icon.js';

describe('type-icon', () => {

  it('se renderiza correctamente', async () => {
    const el = await fixture(html`
      <type-icon icon-name="test"></type-icon>
    `);

    expect(el).to.exist;
  });

  it('renderiza el SVG cuando cambia iconName', async () => {
    const el = await fixture(html`
      <type-icon icon-name="test"></type-icon>
    `);

    const container = el.shadowRoot.querySelector('.container-icon');

    expect(container).to.exist;
    expect(container.innerHTML).to.include('<svg');
  });

  it('actualiza el SVG cuando cambia iconName dinámicamente', async () => {
    const el = await fixture(html`
      <type-icon icon-name="test"></type-icon>
    `);

    el.iconName = 'test';
    await el.updateComplete;

    expect(el.svg).to.exist;
  });

  it('lanza error si variant es inválido', async () => {
    const el = await fixture(html`
      <type-icon icon-name="test" variant="default"></type-icon>
    `);

    let error;

    try {
      el.variant = 'invalid';
      await el.updateComplete;
    } catch (e) {
      error = e;
    }

    expect(error).to.exist;
  });

});