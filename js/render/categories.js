import { fetchCategories } from "../server/categories.js";

export async function renderCategories() {
  const categories = await fetchCategories();

  const categoryContainer = document.querySelector(".category-list");
  categoryContainer.innerHTML = "";

  let title = document.createElement("h1");
  title.textContent = "Categorias";
  categoryContainer.appendChild(title);

  categories.forEach((category) => {
    let a = document.createElement("a");
    a.href = "#";
    a.setAttribute("data-category", category.name);
    a.textContent = category.name;
    categoryContainer.appendChild(a);
  });
}

export async function setupCategory(onCategoryChange, currentCategory) {
  const categoryLinks = document.querySelectorAll(".category-list a");

  if (!categoryLinks) {
    console.error("Links de categoria não encontrados");
    return;
  }

  categoryLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const selectedCategory = link.getAttribute("data-category");

      if (
        selectedCategory === currentCategory &&
        link.classList.contains("active")
      ) {
        currentCategory = "Todos";
        link.classList.remove("active");
      } else {
        categoryLinks.forEach((lnk) => lnk.classList.remove("active"));
        link.classList.add("active");
        currentCategory = selectedCategory;
      }

      onCategoryChange(selectedCategory);

      const allLinksInactive = Array.from(categoryLinks).every(
        (lnk) => !lnk.classList.contains("active")
      );

      if (allLinksInactive) {
        currentCategory = "Todos";
        onCategoryChange(currentCategory);
      }
    });
  });
}
