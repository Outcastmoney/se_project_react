const BASE_URL = "http://localhost:3001";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
}

function getItems() {
  return fetch(`${BASE_URL}/items`).then(checkResponse);
}

function deleteItem(id) {
  return fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
  }).then(checkResponse);
}

function addItem({ name, imageUrl, weather }) {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, imageUrl, weather })
  }).then(checkResponse);
}

export default { getItems, deleteItem, addItem };
