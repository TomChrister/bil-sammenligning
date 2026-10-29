/** Scroller til skiltfeltet på forsiden og setter fokus i det. */
export function scrollTilOppslag() {
  document.getElementById("skilt-oppslag")?.scrollIntoView({ behavior: "smooth", block: "center" });
  document.getElementById("skilt-input")?.focus({ preventScroll: true });
}
