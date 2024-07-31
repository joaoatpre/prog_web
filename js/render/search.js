export function setupSearch(onSearch) {
  const searchInput = document.getElementById("searchInput");

  if (!searchInput) {
    console.error("Elemento de pesquisa não encontrado");
    return;
  }

  searchInput.addEventListener("input", (event) => {
    const searchText = event.target.value;
    onSearch(searchText);
  });
}
