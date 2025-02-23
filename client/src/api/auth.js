import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const register = async (user) => {
  return axios.post(`${API_URL}/register`, user);
};

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  localStorage.setItem("token", response.data.token);
  return response.data;
};

export const getProtectedData = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/protected`, { headers: { Authorization: token } });
};

export const logout = () => {
  localStorage.removeItem("token");
};
