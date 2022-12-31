import axios from "axios";
import { parseCookies } from "nookies";

//* Api de uso normal

const { "ng.token": token } = parseCookies();

const api_url = process.env.NEXT_PUBLIC_API_URL === "http://localhost:8000"
? process.env.NEXT_PUBLIC_API_URL : process.env.NEXT_PUBLIC_DOCKER_API_URL;

export const apiBase = axios.create({
  baseURL: api_url
});

if ( token ) {
  apiBase.defaults.headers["Authorization"] = `Bearer ${token}`
};
