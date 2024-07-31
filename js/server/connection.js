export async function checkConnection() {
  async function checkServerConnection() {
    try {
      const response = await fetch("http://localhost:8000");
      return response.status === 200;
    } catch {
      return false;
    }
  }

  const haveConnection = await checkServerConnection();

  if (!haveConnection) {
    document.body.innerHTML = "";

    const offlineContainer = document.createElement("div");
    offlineContainer.style.width = "100%";
    offlineContainer.style.height = "100vh";
    offlineContainer.style.display = "flex";
    offlineContainer.style.justifyContent = "center";
    offlineContainer.style.alignItems = "center";
    document.body.appendChild(offlineContainer);

    const offlineMessage = document.createElement("span");
    offlineMessage.textContent = "Server Offline";
    offlineMessage.style.fontSize = "32px";
    offlineContainer.appendChild(offlineMessage);
  }
}
