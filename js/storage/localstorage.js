import { fetchProducts } from "../server/products.js";

export async function loadLocalStorage() {
  try {
    let cartItems = getCartItems();
    let products = await fetchProducts();

    let itemsToRender = [];

    cartItems.forEach((cartItem) => {
      let foundProduct = products.find(
        (product) => product.id === cartItem.productID
      );
      if (foundProduct) {
        itemsToRender.push({
          ...foundProduct,
          quantity: cartItem.quantity,
        });
      } else {
        console.warn(`Product with id ${cartItem.productID} not found.`);
      }
    });

    return itemsToRender;
  } catch (error) {
    console.error("Erro ao carregar localstorage", error);
    return [];
  }
}

export function saveLocalStorage(productID, quantity) {
  let cartItems = getCartItems();

  const existingItemIndex = cartItems.findIndex(
    (item) => item.productID === productID
  );

  if (existingItemIndex !== -1) {
    alert("Produto já esta no carrinho");
    console.log("Produto já esta no localStorage");
  } else {
    cartItems.push({ productID, quantity });
  }

  localStorage.setItem("carrinho", JSON.stringify(cartItems));
}

export function updateLocalStorage(productID, quantity) {
  let cartItems = getCartItems();
  const foundIndex = cartItems.findIndex(
    (item) => item.productID === productID
  );

  if (foundIndex !== -1) {
    cartItems[foundIndex].quantity = quantity;
    localStorage.setItem("carrinho", JSON.stringify(cartItems));
  }
}

export function removeLocalStorage(productID) {
  let cartItems = getCartItems();
  cartItems = cartItems.filter((item) => item.productID !== productID);
  localStorage.setItem("carrinho", JSON.stringify(cartItems));
}

export function clearLocalStorage() {
  localStorage.clear();
}

export function getCartItems() {
  const cartItemsJSON = localStorage.getItem("carrinho");
  return JSON.parse(cartItemsJSON) || [];
}
