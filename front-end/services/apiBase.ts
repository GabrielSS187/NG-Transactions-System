import axios from "axios";
import { parseCookies } from "nookies";

//* Api de uso normal

const { "ng.token": token } = parseCookies();

export const apiBase = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
  // "http://localhost:8000"
});

if ( token ) {
  apiBase.defaults.headers["Authorization"] = `Bearer ${token}`
};
