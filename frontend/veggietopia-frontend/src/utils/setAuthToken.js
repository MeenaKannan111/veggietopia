const setAuthToken = (token) => {
  if (token) {
    // Apply to every request
    window.localStorage.setItem('token', token);
  } else {
    // Remove token
    window.localStorage.removeItem('token');
  }
};

export default setAuthToken;
