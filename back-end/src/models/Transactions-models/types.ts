export type TTransactionsData = {
  id_transaction?: string
  debited_account_id: string;
  credited_account_id: string;
  value: number;
  looked?: boolean;
};

export type TUpdateBalanceData = {
  id_account: string;
  value: number;
};

export type TAccountData = {
  id_account: string;
  balance: number;
};

export type TTransactionsSentData = {
  id_transaction: string;
  user_name_credited: string;
  value_sent: string;
  created_at: string;
  hour: string;
};

export type TTransactionsReceived = {
  id_transaction: string;
  user_name_debited: string;
  value_received: string;
  looked: boolean;
  created_at: string;
  hour: string;
};

export type TTransactionsReceivedAndSent = {
  id_transaction: string;
  user_name_debited?: string;
  user_name_credited?: string;
  value_sent?: string;
  value_received?: string;
  looked?: boolean;
  created_at: string;
  hour: string;
};

export type TUpdateLooked = {
  id_transaction: string;
  looked: boolean;
};