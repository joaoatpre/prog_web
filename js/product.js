import { fetchProduct } from "./server/product.js";
import { saveLocalStorage, getCartItems } from "./storage/localstorage.js";

window.onload = async () => {
  try {
    const productId = new URLSearchParams(window.location.search).get("id");
    if (!productId) {
      window.location.href = "/";
      return;
    }

    const productData = await fetchProduct(productId);
    if (!productData) {
      window.location.href = "/";
      return;
    }

    document.getElementById("product-image").src = productData.image;
    document.getElementById("product-name").textContent = productData.name;
    document.getElementById("product-description").textContent =
      productData.description;
    document.getElementById(
      "product-price"
    ).textContent = `R$ ${productData.offPrice.toFixed(2)}`;
    document.getElementById(
      "product-offprice"
    ).textContent = `R$ ${productData.price.toFixed(2)}`;

    document.getElementById("add-to-cart").onclick = () => {
      let cartItems = getCartItems();
      const existingItem = cartItems.find(
        (item) => item.productID === productData.id
      );

      if (existingItem) {
        alert("Produto já está no carrinho");
      } else {
        saveLocalStorage(productData.id, 1);
      }
    };
  } catch (error) {
    console.log("Error initializing the page:", error);
  }
};
