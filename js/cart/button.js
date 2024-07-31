import { renderCart } from "../render/cart.js";

export function checkCartButton() {
  const cartLink = document.getElementById("cartLink");
  const cartPopup = document.getElementById("cartPopup");
  const closePopup = document.getElementById("closePopup");

  cartLink.addEventListener("click", (event) => {
    event.preventDefault();
    renderCart();
  });

  closePopup.addEventListener("click", () => {
    cartPopup.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target == cartPopup) {
      cartPopup.style.display = "none";
    }
  });
}
