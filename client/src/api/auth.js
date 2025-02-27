import axios from "axios"; // Import Axios for making HTTP requests

// Base API URL for backend requests // will have to change
const API_URL = "http://localhost:5000/api";

// Registers a new user by sending their details to the backend
export const register = async (user) => {
  return axios.post(`${API_URL}/register`, user);
};

// Logs the user by sending credentials to the backend
// Stores the recieved JWT token in localStorage for authentication
export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  localStorage.setItem("token", response.data.token);
  return response.data;
};

// Fetches Protected data from the backend using the stored token.
// Adds the JWT token to the request headers for auth
export const getProtectedData = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/protected`, { headers: { Authorization: token } });
};

// Logs out user by removing JWT token from localStorage
export const logout = () => {
  localStorage.removeItem("token");
};
