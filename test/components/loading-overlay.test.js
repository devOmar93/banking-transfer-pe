import { fixture, html, expect } from '@open-wc/testing';
import '../../src/components/loading-overlay/loading-overlay.js';

describe('loading-overlay', () => {
  let el;

  beforeEach(async () => {
    el = await fixture(html`<loading-overlay></loading-overlay>`);
  });

  it('se renderiza correctamente', () => {
    expect(el).to.exist;
  });

  it('renderiza el contenedor overlay', () => {
    const overlay = el.shadowRoot.querySelector('.overlay');

    expect(overlay).to.exist;
  });

  it('renderiza el spinner', () => {
    const spinner = el.shadowRoot.querySelector('.spinner');

    expect(spinner).to.exist;
    expect(spinner.classList.contains('spinner')).to.be.true;
  });

});
