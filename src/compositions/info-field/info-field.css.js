import {css} from 'lit';
export const infoFieldStyles = css`

.info-field {
  display: flex;
  justify-content: space-between;
  align-items: center;

  border: none;
  padding: var(--padding, 12px);
  gap: var(--gap, 12px);

  border-radius: 4px;
  background-color:#ffffff;
}

.label {
    font-size: 14px;
    color: #6b7280;
}    

.value {
    font-size: 14px;
    font-weight: 600;
    color: #111827;
}

.ingo-field.primary {
    --border-color: #4f46e5;
}

.info-field.success {
    --border-color: #16a34a;
}
 `   