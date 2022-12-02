import { GetServerSidePropsContext } from "next";

import { apiBase } from "../apiBase";
import { apiAuthClient } from "../apiAuthClient";

import {
   TLoginAndRegisterUser,
   TSignInApiResponse,
   TFindUserResponse
  } from "./types";

export async function registerUsersApi (data: TLoginAndRegisterUser) {
  const result = await apiBase
  .post<TSignInApiResponse>("/users/register", data);
  return result;
};

export async function signInApi (data: TLoginAndRegisterUser) {
  const result = await apiBase
  .post<TSignInApiResponse>("/users/login", data);
  return result;
};

export async function findUserApi (token: string) {
  const AuthStr = "Bearer ".concat(token); 
  const result = await apiBase
  .get<TFindUserResponse>("users/find_user", 
  { headers: { Authorization: AuthStr } });

  return result;
};

export async function fetchAllUsersApi (ctx: GetServerSidePropsContext) {
  const { data } = await apiAuthClient(ctx)
  .get<TFindUserResponse[]>("users/@");

  return data;
};
