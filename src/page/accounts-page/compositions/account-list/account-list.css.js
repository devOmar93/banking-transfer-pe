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

.container-list::after {
  content: "";
  position: sticky;
  bottom: 0;
  height: 10px;
  background: linear-gradient(transparent,  var(--type-modal-bg-color));


`;