export type TLoginAndRegisterUser = {
  user_name: string,
  user_email?: string,
  password: string,
  verify?: boolean;
};

export type TSignInApiResponse = {
  user_name: string;
  token: string;
};

export type TFindUserResponse = {
  photo_url: string;
  id_user: number,
  user_name: string,
  user_email?: string
  account_id: string,
  balance: number,
  verify: boolean;
  code?: string;
};

export type TTransactionsSentData = {
  id_transaction: string,
  user_name_credited: string,
  value_sent: string,
  created_at: string,
  hour: string,
};

export type TTransactionsReceived = {
  id_transaction: string;
  user_name_debited: string;
  value_received: string;
  looked: boolean;
  created_at: string;
  hour: string;
  viewLocal?: boolean;
};

export type TCreateTransaction = {
  user_name_receiver: string; 
  value: number;
};

export type TAlterPassword = {
  newPassword: string;
  codeUser: string;
};