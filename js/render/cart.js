import {
  getCartItems,
  loadLocalStorage,
  updateLocalStorage,
  removeLocalStorage,
} from "../storage/localstorage.js";

export async function renderCart() {
  try {
    const cartPopup = document.getElementById("cartPopup");
    cartPopup.style.display = "block";
    const cartItemsPopup = document.getElementById("cartItemsPopup");
    cartItemsPopup.innerHTML = "";

    let cartItems = getCartItems();
    let cartProducts = await loadLocalStorage();

    if (cartItems.length === 0) {
      const emptyCartMessage = document.createElement("p");
      emptyCartMessage.textContent = "Seu carrinho está vazio.";
      emptyCartMessage.style.fontWeight = "bold";
      emptyCartMessage.style.fontSize = "21px";
      emptyCartMessage.style.paddingTop = "5px";
      cartItemsPopup.appendChild(emptyCartMessage);

      const checkoutBtn = document.getElementById("checkoutBtn");
      checkoutBtn.style.display = "none";
      return;
    }

    cartProducts.forEach((product) => {
      let article = document.createElement("article");
      article.classList.add("cart-item");

      let img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;
      img.classList.add("cart-item-image");
      article.appendChild(img);

      let container = document.createElement("div");
      container.classList.add("cart-item-details");
      article.appendChild(container);

      let h3 = document.createElement("h3");
      h3.textContent = product.name;
      h3.classList.add("cart-item-title");
      container.appendChild(h3);

      let pPrice = document.createElement("p");
      pPrice.textContent = `R$ ${product.offPrice.toFixed(2)}`;
      pPrice.classList.add("cart-item-price");
      container.appendChild(pPrice);

      let uPrice = document.createElement("p");
      uPrice.textContent = `R$ ${product.offPrice.toFixed(2)}`;
      uPrice.classList.add("cart-item-price");
      container.appendChild(uPrice);

      let controlsContainer = document.createElement("div");
      controlsContainer.classList.add("cart-item-controls");
      article.appendChild(controlsContainer);

      let quantityInput = document.createElement("input");
      quantityInput.type = "number";
      quantityInput.value = product.quantity;
      quantityInput.min = 1;
      quantityInput.classList.add("cart-item-quantity");
      quantityInput.addEventListener("input", function () {
        updateTotalPrice(product, quantityInput);
        updateLocalStorage(product.id, parseInt(quantityInput.value));
        product.quantity = parseInt(quantityInput.value);
      });
      controlsContainer.appendChild(quantityInput);

      let removeButton = document.createElement("button");
      removeButton.textContent = "Remover";
      removeButton.classList.add("cart-item-remove");
      removeButton.addEventListener("click", function () {
        removeLocalStorage(product.id);
        article.remove();
        cartItems = cartItems.filter((item) => item.productID !== product.id);
        if (cartItems.length === 0) {
          const emptyCartMessage = document.createElement("p");
          emptyCartMessage.textContent = "Seu carrinho está vazio.";
          emptyCartMessage.style.fontWeight = "bold";
          emptyCartMessage.style.fontSize = "21px";
          emptyCartMessage.style.paddingTop = "5px";
          cartItemsPopup.appendChild(emptyCartMessage);

          const checkoutBtn = document.getElementById("checkoutBtn");
          checkoutBtn.style.display = "none";
        }
      });
      controlsContainer.appendChild(removeButton);

      const checkoutBtn = document.getElementById("checkoutBtn");
      checkoutBtn.addEventListener("click", () => {
        window.location.href = "/checkout.html";
      });
      checkoutBtn.style.display = "block";

      cartItemsPopup.appendChild(article);

      updateTotalPrice(product, quantityInput);
    });
  } catch (error) {
    console.error("Failed to render cart:", error);
  }

  function updateTotalPrice(product, quantityInputElement) {
    const quantity = parseInt(quantityInputElement.value);
    const totalPrice = product.offPrice * quantity;

    const article = quantityInputElement.closest(".cart-item");
    const priceElement = article.querySelector(".cart-item-price");

    priceElement.textContent = `R$ ${totalPrice.toFixed(2)}`;
  }
}
