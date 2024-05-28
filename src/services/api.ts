import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_STRAPI_API_URL ?? "http://localhost:1337/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config: any) => {
    const token =  process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    if (token) {
      if (config.headers) config.headers["Authorization"] =  `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(undefined, (err) => {
  return Promise.reject(err);
});

export default API;