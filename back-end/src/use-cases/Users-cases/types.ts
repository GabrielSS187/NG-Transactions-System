export type TUsersData = {
  user_name: string,
  user_email?: string,
  password: string,
};

export type TFetchUsersRequest = {
  user_id_logged: number,
  photo_url?: string,
  user_name: string,
};

export type TEditInfoUserData = {
  photo_url?: string;
  user_name?: string,
  user_email?: string;
  password_hash?: string,
  verify?: boolean;
};