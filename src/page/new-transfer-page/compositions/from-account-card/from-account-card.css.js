import { css } from "lit";

export const styles = css`
  :host {
    display: block;

    --from-account-card-bg: var(--info-card-bg, #ffffff);
    --from-account-card-border: var(--info-card-border, #e5e7eb);
    --from-account-card-radius: 0.75rem;
    --from-account-card-padding: 1.25rem;
    --from-account-card-label-color: var(--text-secondary, #6b7280);
    --from-account-card-muted-color: var(--text-muted, #9ca3af);
    --from-account-card-shadow:
      0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .from-account-card {
    padding: var(--from-account-card-padding);
    background-color: var(--from-account-card-bg);
    border: 1px solid var(--from-account-card-border);
    border-radius: var(--from-account-card-radius);
    box-shadow: var(--from-account-card-shadow);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: default;
  }

  .from-account-card__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.25rem;
    width: 100%;
  }

  .from-account-card:hover,
  .from-account-card:focus-within {
    border-color: #4f38fb;
    box-shadow:
      0 0 0 3px rgba(79, 56, 251, 0.1),
      var(--from-account-card-shadow);
    transform: translateY(-2px);
  }

  .from-account-card__column {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    min-width: 0;
  }

  .from-account-card__column--right {
    align-items: flex-end;
    text-align: right;
  }

  .from-account-card__column--right type-text:last-child {
    white-space: nowrap;
  }

  .from-account-card__label {
    --text-color: var(--from-account-card-label-color);
    font-weight: 600;
    font-size: 0.875rem;
  }

  .from-account-card__muted {
    --text-color: var(--from-account-card-muted-color);
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
    :host {
      --from-account-card-padding: 1rem;
    }

    .from-account-card__content {
      gap: 1rem;
    }

    .from-account-card__column {
      gap: 0.25rem;
    }
  }

  @media (max-width: 480px) {
    :host {
      --from-account-card-padding: 0.875rem;
    }

    .from-account-card__content {
      align-items: center;
      gap: 0.75rem;
    }

    .from-account-card__column--right {
      align-items: flex-end;
      text-align: right;
      flex: 0 0 auto;
    }

    .from-account-card__label {
      font-size: 0.8125rem;
    }

    .from-account-card__muted {
      font-size: 0.75rem;
    }
  }
`;
