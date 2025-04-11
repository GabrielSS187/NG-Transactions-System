import axios from "axios";
import { parseCookies } from "nookies";

const { "ng.token": token } = parseCookies();

const isBrowser = typeof window !== "undefined";

export const apiBase = axios.create({
  baseURL: isBrowser ? "/api" : process.env.NEXT_PUBLIC_API_URL,
});

if (token) {
  apiBase.defaults.headers["Authorization"] = `Bearer ${token}`;
}
