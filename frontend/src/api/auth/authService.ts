import axios from "axios";

const API_URL = "http://localhost:8000/api";

interface LoginData {
  username: string;
  password: string;
}

export const login = async ({ username, password }: LoginData) => {
  const response = await axios.post(`${API_URL}/token`, {
    username,
    password,
  });

  localStorage.setItem("access", response.data.access);
  localStorage.setItem("refresh", response.data.refresh);
  window.location.href = "/blog";
};

export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  window.location.href = "/blog";
};
