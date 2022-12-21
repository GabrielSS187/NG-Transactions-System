import { 
  TTransactionsData, 
  TAccountData, 
  TUpdateBalanceData, 
  TTransactionsReceived,
  TTransactionsSentData,
  TTransactionsReceivedAndSent,
  TUpdateLooked,
} from "./types";
import { TUsersData } from "../Users-models/types";

export interface ITransactionsModel {
  create: (data: TTransactionsData) => Promise<void>;
  findUser: (idUser: number, userName?: string) => Promise<TUsersData>;
  findAccount: (idAccount: string) => Promise<TAccountData>
  findTransaction: (id_transaction: string) => Promise<TTransactionsSentData>
  updateBalance: (data: TUpdateBalanceData) => Promise<void>;
  getAllTransactionsSent: (idUser: number) => Promise<TTransactionsSentData[]>;
  getAllTransactionsReceived: (idUser: number) => Promise<TTransactionsReceived[]>;
  updateLooked: (data: TUpdateLooked) => Promise<void>;
  //* Teste
  getAllTransactionsReceivedAndSent: (idUser: number) => Promise<TTransactionsReceivedAndSent[]>;
  //* ============================================================================================
};