const API_BASE_URL = "http://localhost:8000"; // Replace with your backend URL

export const loginSeller = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  return data.token;
};

export const fetchProducts = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/products`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
};

export const createProduct = async (product) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });
  return response.json();
};