import { GetServerSidePropsContext } from "next/types";

import { apiBase } from "../apiBase";
import { apiAuthClient } from "../apiAuthClient";
import { formatDate } from "../../utils/formatData";

import { 
   TTransactionsReceived,
   TTransactionsSentData,
   TTransactionsReceivedAndSent
  } from "./types";

export async function fetchAllTransactionsReceivedApi(
  ctx?: GetServerSidePropsContext,
) {
  const { data } = await apiAuthClient(ctx).get<TTransactionsReceived[]>(
    `/transactions/transactions_received`
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
    `/transactions/transactions_received?user_name_filter=@${userName}&date_filter=${dateValid}`
  );

  return data;
};

export async function fetchAllTransactionsSentApi(
  ctx?: GetServerSidePropsContext
) {
  const { data } = await apiAuthClient(ctx).get<TTransactionsSentData[]>(
    "/transactions/transactions_sent"
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
    `/transactions/transactions_sent?user_name_filter=@${userName}&date_filter=${dateValid}`
  );

  return data;
};

//* Teste
export async function fetchAllTransactionsSentAndReceivedApi(
  ctx?: GetServerSidePropsContext
) {
  const { data } = await apiBase.get<TTransactionsReceivedAndSent[]>(
    "/transactions/all"
  );

  return data;
};
