import axios from "axios";
import { redirect } from "react-router";

const api = axios.create({
  baseURL: process.env.VITE_APP_API_URL,
});

api.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      if (req.headers) {
        req.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return req;
  },
  (error) => {
    console.error(error);
  }
);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("access_token");
      //
      redirect("/");
    }
    console.error(error);
  }
);

export default api;
