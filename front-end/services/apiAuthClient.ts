import { GetServerSidePropsContext } from "next";

import axios from "axios";

import { parseCookies } from "nookies";

const api_url = process.env.NEXT_PUBLIC_API_URL === "http://host.docker.internal:8000"
? process.env.NEXT_PUBLIC_DOCKER_API_URL : process.env.NEXT_PUBLIC_API_URL;

//* API do lado do do servidor SSR
export function apiAuthClient (ctx?: GetServerSidePropsContext) {
  const { "ng.token": token } = parseCookies(ctx);

  const apiAuth = axios.create({
    baseURL: api_url
  });

  if ( token ) {
    apiAuth.defaults.headers["Authorization"] = `Bearer ${token}`
  };

  return apiAuth;
};