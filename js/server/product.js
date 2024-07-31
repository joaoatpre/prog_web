export async function fetchProduct(id) {
  try {
    const response = await fetch(`http://localhost:8000/product?id=${id}`);
    const allProducts = await response.json();
    const product = allProducts["product"];

    return product;
  } catch {
    console.error("Erro ao carregar os produtos:", error);
  }
}
