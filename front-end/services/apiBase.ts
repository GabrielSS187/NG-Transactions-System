import { apiUrl } from "../apiUrl";
import axios from "axios";
import { parseCookies } from "nookies";

//* Api de uso normal

const { "ng.token": token } = parseCookies();

export const apiBase = axios.create({
  baseURL: apiUrl
});

if ( token ) {
  apiBase.defaults.headers["Authorization"] = `Bearer ${token}`
};
