const BASE_URL = "http://localhost:3001";
import { checkResponse } from './Api';

export const register = (name, avatar, email, password) => {
  console.log('Registering user with:', { name, email });
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, avatar, email, password }),
  })
  .then((res) => checkResponse(res))
  .then((data) => {
    console.log('Registration successful:', data);
    return data;
  });
};

export const authorize = (email, password) => {
  console.log('Attempting to authorize user:', email);
  
  const payload = { email, password };
  console.log('Auth request payload:', payload);
  
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  .then((res) => checkResponse(res))
  .then((data) => {
    console.log('Authorization successful, token received:', data);
    return data;
  });
};

export const checkToken = (token) => {
  console.log('Checking token validity');
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
    console.log('Token validation successful:', data);
    return data;
  });
};
