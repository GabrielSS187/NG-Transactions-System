export type TLoginAndRegisterUser = {
  user_name: string;
  password: string;
};

export type TSignInApiResponse = {
  user_name: string;
  token: string;
};

export type TFindUserResponse = {
  id_user: number,
  user_name: string,
  account_id: string,
}