export async function fetchCategories() {
  try {
    const response = await fetch("http://localhost:8000/categories");
    const allCategories = await response.json();
    const categories = allCategories["categories"];

    return categories;
  } catch {
    console.error("Erro ao carregar as categorias:", error);
  }
}
