import { css } from "lit";

export const styles = css`
.container-list{
 display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
}

.container-list::-webkit-scrollbar {
  display: none;
}

.fade-bottom {
  position: sticky;
  bottom: 0;
  height: 16px;
  background: linear-gradient(
    transparent,
    var(--type-modal-bg-color)
  );
  pointer-events: none;
}
`;