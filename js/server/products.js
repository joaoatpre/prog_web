export async function fetchProducts() {
  try {
    const response = await fetch("http://localhost:8000/products");
    const allProducts = await response.json();
    const products = allProducts["products"];

    return products;
  } catch {
    console.error("Erro ao carregar os produtos:", error);
  }
}
