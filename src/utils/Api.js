import { BASE_URL } from "../utils/constants";
import { checkResponse } from "./apiUtils";

const getHeaders = () => {
  const token = localStorage.getItem('jwt');
  

  if (!token || token === 'undefined' || token === 'null') {
    console.warn('No valid JWT token found in localStorage');

    localStorage.removeItem('jwt');
    return {
      'Content-Type': 'application/json'
    };
  }
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
  
  return headers;
};

// checkResponse moved to apiUtils.js

function getItems() {
  console.log('Fetching items from API');
  return fetch(`${BASE_URL}/items`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(checkResponse)
  .then(items => {
    console.log('Items received:', items);
    return items;
  });
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

function addCardLike(id) {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "PUT",
    headers: getHeaders()
  }).then(checkResponse);
}

function removeCardLike(id) {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "DELETE",
    headers: getHeaders()
  }).then(checkResponse);
}


function changeLikeStatus(id, isLiked) {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: isLiked ? "PUT" : "DELETE",
    headers: getHeaders()
  }).then(checkResponse);
}


function checkAuth() {
  const token = localStorage.getItem('jwt');
  return !!token;
}

function updateProfile({ name, avatar }) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify({ name, avatar })
  }).then(checkResponse);
}

export default { 
  getItems, 
  deleteItem, 
  addItem, 
  addCardLike, 
  removeCardLike,
  changeLikeStatus,
  checkAuth,
  updateProfile
};
