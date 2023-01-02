import { GetServerSidePropsContext } from "next";

import axios from "axios";

import { parseCookies } from "nookies";

//* API do lado do do servidor SSR
export function apiAuthClient (ctx?: GetServerSidePropsContext) {
  const { "ng.token": token } = parseCookies(ctx);

  const apiAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  if ( token ) {
    apiAuth.defaults.headers["Authorization"] = `Bearer ${token}`
  };

  return apiAuth;
};