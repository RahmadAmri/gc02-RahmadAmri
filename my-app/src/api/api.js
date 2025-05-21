import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
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
      window.location.href = "/";
    }
    console.error(error);
  }
);

export default api;
