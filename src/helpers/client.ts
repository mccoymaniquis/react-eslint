import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import type { Decoded } from "@/types/auth";

const token = Cookies.get("accessToken") || "";

export const client = axios.create({

  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
});

client.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  async (error) => {
    const e = { ...error };
    // console.log(`ERROR API-CLIENT: ${e.response}`);
    if (!e.response && !e.status)
      return Promise.reject(error);

    return Promise.reject(error);
  },
);
client.interceptors.request.use((config) => {
  if (token) {
    try {
      const decoded = jwtDecode<Decoded>(token);
      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp < now) {
        Cookies.remove("accessToken", { path: "/" });
        localStorage.clear();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(new Error("Token expired"));
      }
    }
    catch (error) {
      Cookies.remove("accessToken", { path: "/" });
      localStorage.clear();
      console.error("Invalid token", error);
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return Promise.reject(new Error("Invalid token"));
    }
  }

  return config;
});

// client.interceptors.request.use( async (config) => {
//     // const encryptedKey = encryptPublicKey();
//     // config.headers['X-Api-Key'] = encryptedKey;

//     return config
// })

export default client;
