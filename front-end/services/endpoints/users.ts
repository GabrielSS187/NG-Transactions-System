import { GetServerSidePropsContext } from "next";
import axios from "axios";

import { apiBase } from "../apiBase";
import { apiAuthClient } from "../apiAuthClient";

import {
   TLoginAndRegisterUser,
   TSignInApiResponse,
   TFindUserResponse,
   TAlterPassword,
   TEditInfoUser
  } from "./types";

export async function registerUsersApi (data: TLoginAndRegisterUser) {
  const result = await apiBase
  .post<TSignInApiResponse>("/V1/users/register", data);
  return result;
};

export async function signInApi (data: TLoginAndRegisterUser) {
  const result = await apiBase
  .post<TSignInApiResponse>("/V1/users/login", data);
  return result;
};

export async function deleteAccountApi () {
  const result = await apiBase
  .delete("/V1/users/delete_account");
  return result;
};

//* Procurar usuário pelo token normal
export async function findUserApi (token?: string) { 
  const result = await apiBase
  .get<TFindUserResponse>("/V1/users/find_user", 
  { headers: { Authorization: token } });
  
  return result;
};

//* Procurar usuário pelo token no servidor node js do next
export async function findUserAuthApi (ctx?: GetServerSidePropsContext) { 
  const { data } = await apiAuthClient(ctx)
  .get<TFindUserResponse>("/V1/users/find_user");

  return data;
};

export async function findUserByEmailApi (email: string) { 
  const { data } = await apiBase
  .get<TFindUserResponse>(`/V1/users/find_user/${email}`);

  return data;
};

export async function findUserByNameApi (userName: string) { 
  const { data } = await apiBase
  .get<TFindUserResponse>(`/V1/users/find_user_name/${userName}`);

  return data;
};


export async function fetchAllUsersApi (ctx?: GetServerSidePropsContext | any, userFilterName?: string) {
  const { data } = await apiAuthClient(ctx)
  .get<TFindUserResponse[]>(`/V1/users/@${userFilterName?.trim()}`);

  return data;
};

export async function alterEmailApi (newEmail: string, codeUser: string) {
  const { data } = await apiBase.post(`/V1/users/alter_email/${codeUser}`,
   { newEmail }
  );

  return data;
};

export async function findUserByCodeApi (codeUser: string) {
  const { data } = await apiBase.get(`/V1/users/find_user_code/${codeUser}`);

  return data;
};

export async function alterPasswordApi ({ newPassword, codeUser }: TAlterPassword) {
  const { data } = await apiBase
  .put(`/V1/users/alter_password/${codeUser}`, { newPassword });

  return data;
};

export async function editInfoUserApi (data: FormData) {
  const response = await apiBase
  .put(`/V1/users/edit`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};

export async function sendConfirmationEmailApi (email: string) {
  const { data } = await apiBase
  .get(`/V1/users/confirm_you/${email}`);

  return data;
};