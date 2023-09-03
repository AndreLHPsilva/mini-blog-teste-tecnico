import axios from "axios";
import { getSession } from "next-auth/react";

const ApiClient = () => {
  const isBrowser = typeof window !== "undefined";

  const instance = axios.create({
    baseURL: process.env.API_URL,
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(async (request) => {
    const session = await getSession();
    if (session) {
      request.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return request;
  });

  if (isBrowser) {
    const Notiflix = require("notiflix");

    instance.interceptors.request.use((config) => {
      if (config.url.startsWith("/articles")) {
        if (config.method != "get") {
          Notiflix.Loading.circle("Aguarde...", {
            svgColor: "#29D",
            messageColor: "#29D",
            messageFontSize: "18px",
          });
        }
      } else {
        Notiflix.Loading.circle("Aguarde...", {
          svgColor: "#29D",
          messageColor: "#29D",
          messageFontSize: "18px",
        });
      }
      return config;
    });

    instance.interceptors.response.use(
      (response) => {
        Notiflix.Loading.remove();
        return response;
      },
      (error) => {
        Notiflix.Loading.remove();
        return Promise.reject(error);
      }
    );
  }

  return instance;
};

export default ApiClient();
