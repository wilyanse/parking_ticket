import axios from "axios";
import { jwtDecode } from "jwt-decode";

// const API_URL = import.meta.env.VITE_API_URL;
const API_URL = "http://localhost:8000";

let accessToken = localStorage.getItem("access");
let refreshToken = localStorage.getItem("refresh");

interface JwtPayload {
  exp: number;
  [key: string]: any;
}

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
  },
});

axiosInstance.interceptors.request.use(
  async (config: any) => {
    if (accessToken) {
      const decoded: JwtPayload = jwtDecode(accessToken);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        try {
          const response = await axios.post(`${API_URL}/api/token/refresh/`, {
            refresh: refreshToken,
          });

          accessToken = response.data.access;
          localStorage.setItem("access", accessToken ?? "");
          if (config.headers)
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        } catch (err) {
          localStorage.clear();
          window.location.href = "/login";

          return Promise.reject(err);
        }
      } else {
        if (config.headers)
          config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
