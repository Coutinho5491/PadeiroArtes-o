/** Trava/destrava a rolagem da página (menu móvel e lightbox). */
export function setScrollLocked(locked: boolean) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
