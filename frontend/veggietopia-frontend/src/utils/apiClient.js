const apiUrl = "http://localhost:3000/api";

const getAuthToken = () => {
  return localStorage.getItem("token");
};

const authFetch = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = options.headers || {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${apiUrl}${endpoint}`, {
    ...options,
    headers,
  });

  return response;
};

export default authFetch;
