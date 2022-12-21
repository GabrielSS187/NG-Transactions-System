import { ITransactionsModel } 
from "../models/Transactions-models/ITransactionsModel";
import {
   TTransactionsData, 
   TUpdateBalanceData,
   TTransactionsSentData,
   TTransactionsReceived,
   TUpdateLooked,
  } 
from "../models/Transactions-models/types";

import { Database } from "../data/Database";

import { generateId } from "../utils/generate-id";
import { formatDate, formatHours } from "../utils/formatData";

export class TransactionsRepository 
extends Database 
implements ITransactionsModel {
  #tableNames = {
    user: "Users",
    Transactions: "Transactions",
    account: "Accounts",
  };

  async findUser (idUser: number, userName?: string) {
    if ( userName ) {
      const [ foundUser ] = await Database.connection(this.#tableNames.user)
      .select("id_user", "user_name", "user_email", "account_id")
      .where("user_name", userName);

      return foundUser;
    };

    const [ foundUser ] = await Database.connection(this.#tableNames.user)
    .select("id_user", "user_name", "user_email", "account_id")
    .where("id_user", idUser);

    return foundUser;
  };

  async findAccount (idAccount: string) {
    const [ foundAccount ] = await Database
    .connection(this.#tableNames.account)
    .where("id_account", idAccount);

    return foundAccount;
  };

  async findTransaction (id_transaction: string) {
    const [ transaction ] = await Database
    .connection(this.#tableNames.Transactions)
    .where("id_transaction", id_transaction);

    return transaction;
  };

  async updateBalance (data: TUpdateBalanceData) {
    await Database.connection(this.#tableNames.account)
    .update("balance", data.value)
    .where("id_account", data.id_account);
  };

  //* Criar uma nova transação. 
  async create (data: TTransactionsData) {
    await Database.connection(this.#tableNames.Transactions)
    .insert({ 
      id_transaction: generateId(), 
      ...data, 
      looked: false 
    });
  };

  async getAllTransactionsSent (idUser: number) {
    const transactionsListFormatted: TTransactionsSentData[] = []; 

    const transactionsSent = await Database
    .connection(`${this.#tableNames.user} as U`)
    .select("T.id_transaction", "T.credited_account_id", "T.value", "T.created_at")
    .innerJoin("Transactions as T", "U.account_id" ,"T.debited_account_id")
    .where("id_user", idUser)
    .orderBy("created_at", "desc");
 
    for( let i = 0; i < transactionsSent.length; i++ ) {
      const [ transaction ] = await Database.connection("Users")
      .select("user_name", "photo_url")
      .where("account_id", transactionsSent[i].credited_account_id);
      
      const formattedTransactionObj = {
          id_transaction: transactionsSent[i].id_transaction,
          photo_url: transaction.photo_url,
          user_name_credited: transaction.user_name,
          value_sent: transactionsSent[i].value.toFixed(2),
          created_at: formatDate(transactionsSent[i].created_at, "short"),
          hour: formatHours(transactionsSent[i].created_at),
        };

        transactionsListFormatted.push(formattedTransactionObj);
    };

    return transactionsListFormatted;
  };

  async getAllTransactionsReceived (idUser: number) {
    const listTransactionsReceived:
     TTransactionsReceived[] = [];

    const transactionsReceived = await Database
    .connection(`${this.#tableNames.Transactions} as T`)
    .select("T.id_transaction", "T.debited_account_id", "T.value", "T.looked", "T.created_at")
    .innerJoin("Users as U", "U.account_id","T.credited_account_id")
    .where("U.id_user", idUser)
    .orderBy("T.created_at", "desc");

    for( let i = 0; i < transactionsReceived.length; i++ ){
      const [ transaction ] = await Database.connection("Users")
      .select("user_name", "photo_url")
      .where("account_id", transactionsReceived[i].debited_account_id);

      const objFormatted = {
        id_transaction: transactionsReceived[i].id_transaction,
        photo_url: transaction.photo_url,
        user_name_debited: transaction.user_name,
        value_received: transactionsReceived[i].value.toFixed(2),
        looked: transactionsReceived[i].looked,
        created_at: formatDate(transactionsReceived[i].created_at, "short"),
        hour: formatHours(transactionsReceived[i].created_at),
      };
  
      listTransactionsReceived.push(objFormatted);
    };
       
    return listTransactionsReceived;
  };
  
  //* Atualizar visto.
  async updateLooked ({ id_transaction, looked }: TUpdateLooked) {
    await Database.connection(this.#tableNames.Transactions)
    .update("looked", looked).where("id_transaction", id_transaction);
  };

  //* Teste
  async getAllTransactionsReceivedAndSent (idUser: number) {
    const sent = await this.getAllTransactionsSent(idUser);
    const received = await this.getAllTransactionsReceived(idUser);

    const merge = [...sent, ...received];

    return merge;
  };
  //* =============================================================
};