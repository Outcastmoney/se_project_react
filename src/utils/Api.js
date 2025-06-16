const BASE_URL = "http://localhost:3001";

const getHeaders = () => {
  const token = localStorage.getItem('jwt');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  return fetch(`${BASE_URL}/items`, {
    headers: getHeaders()
  }).then(checkResponse);
}

function deleteItem(id) {
  return fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
    headers: getHeaders()
  }).then(checkResponse);
}

function addItem({ name, imageUrl, weather }) {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ name, imageUrl, weather })
  }).then(checkResponse);
}

function addCardLike(id, token) {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then(checkResponse);
}

function removeCardLike(id, token) {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then(checkResponse);
}

export default { 
  getItems, 
  deleteItem, 
  addItem, 
  addCardLike, 
  removeCardLike 
};
