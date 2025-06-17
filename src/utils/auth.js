const BASE_URL = "http://localhost:3001";

export const register = (name, avatar, email, password) => {
  console.log('Registering user with:', { name, email });
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, avatar, email, password }),
  })
  .then((res) => {
    if (!res.ok) {
      console.error('Registration error:', res.status);
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => {
    console.log('Registration successful:', data);
    return data;
  })
  .catch((err) => {
    console.error('Registration failed:', err);
    throw err;
  });
};

export const authorize = (email, password) => {
  console.log('Attempting to authorize user:', email);
  
  // Log the request payload for debugging
  const payload = { email, password };
  console.log('Auth request payload:', payload);
  
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  .then(async (res) => {
    if (!res.ok) {
      console.error('Authorization error:', res.status);
      
      // Try to get more information about the error
      try {
        const errorData = await res.json();
        console.error('Error details:', errorData);
        return Promise.reject({ status: res.status, details: errorData });
      } catch (e) {
        // If we can't parse the response as JSON
        return Promise.reject(`Error: ${res.status}`);
      }
    }
    return res.json();
  })
  .then((data) => {
    console.log('Authorization successful, token received:', data);
    return data;
  })
  .catch((err) => {
    console.error('Authorization failed:', err);
    throw err;
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
  .then((res) => {
    if (!res.ok) {
      console.error('Token validation error:', res.status);
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => {
    console.log('Token validation successful:', data);
    return data;
  })
  .catch((err) => {
    console.error('Token validation failed:', err);
    throw err;
  });
};
