import axios from "axios";
import * as API from "@/constants/api";

const request = axios.create({
  baseURL: API.DOMAIN,
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("reg_token");
    if (token) {
      config.headers.token = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
