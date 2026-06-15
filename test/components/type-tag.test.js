import { fixture, html } from '@open-wc/testing-helpers';
import { describe, it, expect } from 'vitest';
import '@components/type-tag/type-tag.js';

vi.mock('@components/type-icon/type-icon.js', () => ({}));
vi.mock('@components/type-text/type-text.js', () => ({}));

describe('type-tag', () => {
  let el;

  beforeEach(async () => {
    el = await fixture(html`
      <type-tag text="Etiqueta"></type-tag>
    `);
  });

  it('se renderiza correctamente', () => {
    expect(el).to.exist;
  });

  it('renderiza el contenedor principal', () => {
    const container = el.shadowRoot.querySelector('.tag');

    expect(container).to.exist;
  });

  it('renderiza type-icon', () => {
    const icon = el.shadowRoot.querySelector('type-icon');

    expect(icon).to.exist;
    expect(icon.iconName).to.equal('bullet-point');
  });

  it('renderiza type-text con el texto correcto', () => {
    const text = el.shadowRoot.querySelector('type-text');

    expect(text).to.exist;
    expect(text.text).to.equal('Etiqueta');
  });

}); 
