import axios from "axios";
//import * as dotenv from "dotenv";
import i18n from "../services/language.service";

export const captchaKey = process.env.REACT_APP_CAPTCHA_KEY;
export const apiUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_URL_DEV
    : process.env.REACT_APP_API_URL_PROD;
export const websitUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_WEB_URL_DEV
    : process.env.REACT_APP_WEB_URL_PROD;
export const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
export const googleLibraries = ["places"];

export const stripeKey = process.env.REACT_APP_STRIPE_KEY;
export let token = null;

export const setToken = (currentToken) => {
  if (currentToken) {
    localStorage.setItem("token", currentToken);
    token = currentToken;
  } else {
    localStorage.removeItem("token");
    token = null;
  }
};

const api = axios.create({
  baseURL: `${apiUrl}/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(function (config) {
  config.headers["Accept-Language"] = i18n.language;
  config.headers["x-access-token"] = token;

  return config;
});

export default api;
