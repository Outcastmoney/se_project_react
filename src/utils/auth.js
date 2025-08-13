import { BASE_URL } from "./constants";
import { checkResponse } from './apiUtils';

export const register = (name, avatar, email, password) => {

  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, avatar, email, password }),
  })
  .then((res) => checkResponse(res))
  .then((data) => {

    return data;
  });
};

export const authorize = (email, password) => {

  
  const payload = { email, password };

  
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  .then((res) => checkResponse(res))
  .then((data) => {

    return data;
  });
};

export const checkToken = (token) => {

  if (!token) {
    console.error('No token provided for validation');
    return Promise.reject('No token provided');
  }
  
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then((res) => checkResponse(res))
  .then((data) => {

    return data;
  });
};
