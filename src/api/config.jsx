import axios from "axios";
//import * as dotenv from "dotenv";
import i18n from "../services/language.serivce";

// let path;

// switch (process.env.NODE_ENV) {
//   case "test":
//     break;
//   case "development":
//     path = "@root/.env.local";
//     break;
//   case "production":
//     break;
//   default:
//     path = "@root/.env.local";
// }
// dotenv.config({ path });

export const apiUrl = "http://localhost:4000";

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
