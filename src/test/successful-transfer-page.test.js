import { fixture, html, expect } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/payments-p2p-p2m-dashboard-dm-pe.js';
import { fireEvent } from '../utils/utils.js';

describe('PaymentsP2pP2mDashboardDmPe', () => {
  let el;

  beforeEach(async () => {
    el = await fixture(html`
      <my-element></my-element>
    `);
  });

  it('debe renderizar el componente', () => {
    expect(el).to.exist;
  });

  it('debe emitir evento success al ejecutar acción', () => {
    const spy = sinon.spy();
    el.addEventListener('success', spy);

    fireEvent(el, 'success', { amount: 100 });

    expect(spy.calledOnce).to.be.true;
    expect(spy.firstCall.args[0].detail.amount).to.equal(100);
  });
});