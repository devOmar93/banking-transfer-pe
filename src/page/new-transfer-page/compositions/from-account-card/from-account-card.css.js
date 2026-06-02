import { css } from "lit";
 
export const styles = css`
  :host {
    display: block;
 
    --from-account-card-bg: var(--info-card-bg, #f3f4f6);
    --from-account-card-border: var(--info-card-border, #c3c7ca);
    --from-account-card-radius: 0.75rem;
    --from-account-card-padding: 1rem;
    --from-account-card-label-color: var(--text-secondary, #6b7280);
    --from-account-card-muted-color: var(--text-muted, #9ca3af);
  }
 
  .from-account-card {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    padding: var(--from-account-card-padding);
    background-color: var(--from-account-card-bg);
    border: 1px solid var(--from-account-card-border);
    border-radius: var(--from-account-card-radius);
  }
 
  .from-account-card__column {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 0;
  }
 
  .from-account-card__column--right {
    align-items: flex-end;
    text-align: right;
  }
 
  .from-account-card__label {
    --text-color: var(--from-account-card-label-color);
  }
 
  .from-account-card__muted {
    --text-color: var(--from-account-card-muted-color);
  }
`;