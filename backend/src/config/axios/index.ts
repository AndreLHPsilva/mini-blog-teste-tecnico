import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEWS_API_URL,
  headers: {
    accept: "*/*",
    "Content-Type": "application/json",
  },
});
