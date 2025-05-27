const BASE_URL = "http://localhost:3001";

function getItems() {
  return fetch(`${BASE_URL}/items`).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
}

const api = { getItems };
export default api;
