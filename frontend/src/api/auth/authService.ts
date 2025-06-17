import axios from "axios";

import axiosInstance from "@/api/axios";
import { User } from "@/types";

// TODO: change to this when going to prod
// const API_URL = import.meta.env.VITE_API_URL;
const API_URL = "http://localhost:8000";

interface LoginData {
  username: string;
  password: string;
}

// API call for user login
// This function sends a POST request to the login endpoint with the user's credentials.
export const login = async ({ username, password }: LoginData) => {
  const response = await axios.post(`${API_URL}/api/login/`, {
    username,
    password,
  });

  // Token handling
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

// Clear localStorage and redirect to home page
export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("currentUser");
  window.location.href = "/";
};

interface RegisterData {
  username: string;
  password: string;
  email: string;
  isAdmin: boolean;
}

// API call for user registration
// This function sends a POST request to the user registration endpoint with the user's details.
export const register = async ({
  username,
  password,
  email,
  isAdmin,
}: RegisterData) => {
  const response = await axios.post(`${API_URL}/api/users/`, {
    username,
    password,
    email,
    is_staff: isAdmin,
  });

  return response.data;
};

// API call to update user details
// This function sends a PATCH request to the user update endpoint with the user's new data.
export const updateUser = async (userId: number, data: User) => {
  const response = await axiosInstance.patch(
    `${API_URL}/api/users/${userId}/`,
    data,
  );

  if (data.username) {
    const currentUser = localStorage.getItem("currentUser");

    if (currentUser) {
      const updatedUser = { ...JSON.parse(currentUser), ...data };

      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }
  }

  return response.data;
};

// API calls to disable or enable a user account
export const disableUser = async (userId: number) => {
  const response = await axiosInstance.patch(
    `${API_URL}/api/users/${userId}/`,
    { is_active: false },
  );

  return response.data;
};

export const enableUser = async (userId: number) => {
  const response = await axiosInstance.patch(
    `${API_URL}/api/users/${userId}/`,
    { is_active: true },
  );

  return response.data;
};

// API call to get a list of all users
export const getUsers = async () => {
  const response = await axiosInstance.get(`${API_URL}/api/users/`);

  return response.data;
};
