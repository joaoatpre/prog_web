import { fetchProducts } from "../server/products.js";
import { saveLocalStorage } from "../storage/localstorage.js";
import { setupSearch } from "./search.js";
import { setupCategory } from "./categories.js";

export async function renderProducts() {
  const products = await fetchProducts();

  const productContainer = document.querySelector(".product-list");
  productContainer.innerHTML = "";

  let currentSearch = "";
  let currentCategory = "Todos";

  function displayProducts(productsToDisplay) {
    productContainer.innerHTML = "";

    productsToDisplay.forEach((product) => {
      let article = document.createElement("article");
      article.classList.add("product");

      let img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;
      img.classList.add("image");
      article.appendChild(img);

      let a = document.createElement("a");
      a.classList.add("title");
      a.href = `/product.html?id=${product.id}`;
      a.textContent = product.name;
      article.appendChild(a);

      let pSubPrice = document.createElement("p");
      pSubPrice.classList.add("sub-price");
      pSubPrice.textContent = "R$ " + product.price.toFixed(2);
      article.appendChild(pSubPrice);

      let pPrice = document.createElement("p");
      pPrice.classList.add("price");
      pPrice.textContent = "R$ " + product.offPrice.toFixed(2);
      article.appendChild(pPrice);

      let button = document.createElement("button");
      button.textContent = "Adicionar ao Carrinho";
      button.classList.add("purchase");
      button.addEventListener("click", function () {
        saveLocalStorage(product.id, 1);
      });
      article.appendChild(button);

      productContainer.appendChild(article);
    });
  }

  function filterProducts() {
    const filteredProducts = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(currentSearch.toLowerCase());
      const matchesCategory =
        currentCategory === "Todos" || product.category === currentCategory;
      return matchesSearch && matchesCategory;
    });
    displayProducts(filteredProducts);
  }

  displayProducts(products);

  setupSearch((searchText) => {
    currentSearch = searchText;
    filterProducts();
  });

  setupCategory((category) => {
    currentCategory = category;
    filterProducts();
  }, currentCategory);
}
