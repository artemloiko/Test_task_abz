import { clamp } from "./clamp";

export default function clampAll() {
  //clamp first p of product proposal cards
  let cards = document.querySelectorAll(
    ".proposal-card--titleAbove .proposal-card__info:nth-child(3)"
  );
  [...cards].forEach(item => {
    item.style.whiteSpace = "normal";
    clamp(item, { clamp: 2 });
  });
  //clamp second p of product proposal cards
  cards = document.querySelectorAll(
    ".sidebar-block--product .proposal-card__info:last-child"
  );
  [...cards].forEach(item => {
    item.style.whiteSpace = "normal";
    clamp(item, { clamp: 3 });
  });
}
