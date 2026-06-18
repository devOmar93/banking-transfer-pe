import { css } from "lit";
 
export const styles = css`
  :host {
    display: block;
 
    --transfer-summary-amount-bg: linear-gradient(135deg, #6c5ce7 0%, #8e44ad 100%);
    --transfer-summary-amount-color: #ffffff;
    --transfer-summary-amount-radius: 0.75rem;
    --transfer-summary-amount-padding: 1.25rem 1.5rem;
    --transfer-summary-card-radius: 0.75rem;
    --transfer-summary-card-bg: #ffffff;
    --transfer-summary-card-border: #e5e7eb;
    --transfer-summary-card-shadow:
      0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.05);
    --transfer-summary-gap: 0.5rem;
    --transfer-summary-label-color: var(--field-list-secondary-text-color, #808080);
    --transfer-summary-value-color: var(--field-list-primary-text-color, #1f1f1f);
    --transfer-summary-muted-color: var(--field-list-secondary-text-color, #808080);
  }
 
  .transfer-summary {
    display: flex;
    flex-direction: column;
    gap: var(--transfer-summary-gap);
  }
 
  .transfer-summary__amount-card {
    background: var(--transfer-summary-amount-bg);
    color: var(--transfer-summary-amount-color);
    border-radius: var(--transfer-summary-amount-radius);
    padding: var(--transfer-summary-amount-padding);
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
 
  .transfer-summary__amount-label {
    --text-color: var(--transfer-summary-amount-color);
    opacity: 0.85;
  }
 
  .transfer-summary__amount-value {
    --text-color: var(--transfer-summary-amount-color);
  }
 
  .transfer-summary__fields {
    background: var(--transfer-summary-card-bg);
    border: 1px solid var(--transfer-summary-card-border);
    border-radius: var(--transfer-summary-card-radius);
    box-shadow: var(--transfer-summary-card-shadow);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
 
  .transfer-summary__fields ::slotted(info-field:not(:last-child)),
  .transfer-summary__fields info-field:not(:last-child) {
    border-bottom: 1px solid #f0f1f3;
  }
 
  .transfer-summary__value-block {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.125rem;
  }

  .transfer-summary__field-label {
    --text-color: var(--transfer-summary-label-color);
  }

  .transfer-summary__field-value {
    --text-color: var(--transfer-summary-value-color);
  }
 
  .transfer-summary__muted {
    --text-color: var(--transfer-summary-muted-color);
  }
`;