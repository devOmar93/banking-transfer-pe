import { fixture, html, expect } from '@open-wc/testing';
import '../../src/components/loading-overlay/loading-overlay.js';

describe('loading-overlay', () => {

  it('se renderiza correctamente', async () => {
    const el = await fixture(html`<loading-overlay></loading-overlay>`);

    expect(el).to.exist;
  });

  it('tiene el contenedor overlay', async () => {
    const el = await fixture(html`<loading-overlay></loading-overlay>`);

    const overlay = el.shadowRoot.querySelector('.overlay');

    expect(overlay).to.exist;
  });
/** no requerido */
  it('tiene atributos de accesibilidad', async () => {
    const el = await fixture(html`<loading-overlay></loading-overlay>`);

    const overlay = el.shadowRoot.querySelector('.overlay');

    expect(overlay.getAttribute('role')).to.equal('alert');
    expect(overlay.getAttribute('aria-busy')).to.equal('true');
  });

  /* modificar o mantener dependiendo de como se modifique*/
  it('renderiza el spinner', async () => {
    const el = await fixture(html`<loading-overlay></loading-overlay>`);

    const spinner = el.shadowRoot.querySelector('.spinner');

    expect(spinner).to.exist;
  });
  
});
