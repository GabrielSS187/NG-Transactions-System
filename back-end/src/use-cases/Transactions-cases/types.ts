export type TTransactionsData = {
  user_id_send?: number,
  user_name_receiver: string,
  value: number,
};

export type TTransactionsRequestData = {
  idUserLogged: number,
  user_name_filter: string,
  date_filter: string,
};

export type TUpdateLookedRequest = {
  id_transaction: string;
  looked: boolean;
};