// Shared API utility functions to break circular dependencies
export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  console.error(`API Error: ${res.status}`, res);

  if (res.status === 401) {

    localStorage.removeItem('jwt');
  }

  return Promise.reject({
    status: res.status,
    message: `Error: ${res.status}`
  });
}
