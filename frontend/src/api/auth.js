// src/api/auth.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const register = async (username, password, faction) => {
  const res = await axios.post(`${API_URL}/api/register`, { username, password, faction });
  return res.data;
};

export const login = async (username, password) => {
  const res = await axios.post(`${API_URL}/api/login`, { username, password });
  // store token in localStorage for future requests
  localStorage.setItem("token", res.data.token);
  return res.data.user;
};
