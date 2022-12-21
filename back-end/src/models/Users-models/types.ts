export type TUsersData = {
  photo_url?: string;
  user_name: string;
  user_email: string;
  password_hash?: string;
  account_id: string;
  balance?: number;
  id_user?: number;
  verify?: boolean;
  code?: string;
};

export type TEditUserData = {
  photo_url?: string;
  user_name?: string,
  user_email?: string;
  password_hash?: string,
  verify?: boolean;
};