import { ITransactionsModel } 
from "../../models/Transactions-models/ITransactionsModel";

import { TTransactionsRequestData } from "./types";

import { 
  ErrorNotArrobaUserName,
 } from "../../errors/UsersErrors";

export class GetAllTransactionsSentCase {
  constructor(
    private transactionsModel: ITransactionsModel
  ){};

  async get ({ idUserLogged, user_name_filter, date_filter }
    : TTransactionsRequestData) {
      
    const transactionsSent = await this.transactionsModel
    .getAllTransactionsSent(idUserLogged);

    if ( user_name_filter ) {
      const checkFirstCharacterHasArroba = user_name_filter
     .trim()[0].includes("@");

      if ( !checkFirstCharacterHasArroba ) {
        throw new ErrorNotArrobaUserName();
      };

      const transactionsSentFilterName = transactionsSent
      .filter((transaction) => {
        return transaction.user_name_credited
        .toLocaleLowerCase()
        .includes(user_name_filter
          .trim().toLocaleLowerCase());
      }).filter((transaction) => {
        if ( date_filter ) {
          return transaction.created_at === date_filter.trim();
        };
        return transaction;
      });

      return {
        transactionsSent: transactionsSentFilterName,
        statusCode: 200,
      };      
    };

    if ( date_filter ) {
      const transactionsSentFilterDate = transactionsSent
      .filter((transaction) => {
        return transaction.created_at === date_filter.trim();
      });

      return {
        transactionsSent: transactionsSentFilterDate,
        statusCode: 200,
      };
    };

    return {
      transactionsSent,
      statusCode: 200,
    };
  };
};