import { GetServerSidePropsContext } from "next/types";

import { apiBase } from "../apiBase";
import { apiAuthClient } from "../apiAuthClient";
import { formatDate } from "../../utils/formatData";

import { 
   TTransactionsReceived,
   TTransactionsSentData,
   TCreateTransaction
  } from "./types";

export async function fetchAllTransactionsReceivedApi(
  ctx?: GetServerSidePropsContext,
) {
  const { data } = await apiAuthClient(ctx).get<TTransactionsReceived[]>(
    `/V1/transactions/transactions_received`
  );

  return data;
};

export async function fetchAllTransactionsReceivedFilterApi (
  ctx?: GetServerSidePropsContext | any,
  userName?: string,
  date?: string,
) {
  let dateValid = "";
  if (  date?.length === 10 && date ) {
    dateValid = formatDate(new Date(date!), "short");
  };
  const { data } = await apiAuthClient(ctx).get<TTransactionsReceived[]>(
    `/V1/transactions/transactions_received?user_name_filter=@${userName}&date_filter=${dateValid}`
  );

  return data;
};

export async function fetchAllTransactionsSentApi(
  ctx?: GetServerSidePropsContext
) {
  const { data } = await apiAuthClient(ctx).get<TTransactionsSentData[]>(
    "/V1/transactions/transactions_sent"
  );

  return data;
};

export async function fetchAllTransactionsSentFilterApi (
  ctx?: GetServerSidePropsContext | any,
  userName?: string,
  date?: string,
) {
  let dateValid = "";
  if (  date?.length === 10 && date ) {
    dateValid = formatDate(new Date(date!), "short");
  };
  const { data } = await apiAuthClient(ctx).get<TTransactionsSentData[]>(
    `/V1/transactions/transactions_sent?user_name_filter=@${userName}&date_filter=${dateValid}`
  );

  return data;
};

export async function createdTransactionApi (input: TCreateTransaction) {
  const { data } = await apiBase.post("/V1/transactions/create", input);
  return data;
};

export async function updateTransactionLookedApi (idTransaction: string, looked: boolean) {
  const { data } = await apiBase.put(`/V1/transactions/update_looked/${idTransaction}`, {looked});
  return data;
};