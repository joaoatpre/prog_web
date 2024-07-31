import { loadLocalStorage, clearLocalStorage } from "./storage/localstorage.js";

window.onload = async () => {
  try {
    const products = await loadLocalStorage();
    const productsSectionElement = document.getElementById("products-section");
    const totalValueElement = document.getElementById("products-total-value");
    let total_value = 0;
    let max_delivery = "";

    if (!products || products.length === 0) {
      window.location.href = "/";
      return;
    }

    const productMap = products.reduce((acc, product) => {
      const { name, offPrice, quantity = 1, delivery } = product;
      if (!acc[name]) {
        acc[name] = { offPrice, quantity, delivery };
      } else {
        acc[name].quantity += quantity;
      }
      return acc;
    }, {});

    Object.keys(productMap).forEach((productName) => {
      const { offPrice, quantity, delivery } = productMap[productName];
      const prodElement = document.createElement("p");
      prodElement.textContent = `${productName} x${quantity} - R$ ${(
        offPrice * quantity
      ).toFixed(2)}`;
      total_value += offPrice * quantity;
      productsSectionElement.appendChild(prodElement);

      if (delivery > max_delivery) {
        max_delivery = delivery;
      }
    });

    const totalElement = document.createElement("p");
    totalElement.textContent = `TOTAL: R$ ${total_value.toFixed(2)}`;
    totalValueElement.appendChild(totalElement);

    document.getElementById("zip-delivery").textContent = `${max_delivery}`;
  } catch (error) {
    console.error("Error initializing the page:", error);
  }
};

document.getElementById("checkout-form").onsubmit = (event) => {
  event.preventDefault();

  const form = event.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const address = form.address.value.trim();
  const city = form.city.value.trim();
  const state = form.state.value.trim();
  const zip = form.zip.value.trim();

  if (!name || !email || !address || !city || !state || !zip) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  clearLocalStorage();
  window.location.href = "/";
};
