import axios from "axios";

const API_URL = "http://localhost:8000/api";

interface LoginData {
  username: string;
  password: string;
}

export const login = async ({ username, password }: LoginData) => {
  const response = await axios.post(`${API_URL}/login/`, {
    username,
    password,
  });

  localStorage.setItem("access", response.data.access);
  localStorage.setItem("refresh", response.data.refresh);
  const token = response.data.access;
  const payload = JSON.parse(atob(token.split(".")[1]));

  // Store user info in localStorage for access on other pages
  localStorage.setItem(
    "currentUser",
    JSON.stringify({
      username: payload.username,
      user_id: payload.user_id,
      is_staff: payload.is_staff,
      email: payload.email,
    }),
  );
  window.location.href = "/home";
};

export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  window.location.href = "/blog";
};
