import { ITransactionsModel } 
from "../../models/Transactions-models/ITransactionsModel";

import { TTransactionsRequestData } from "./types";

import { 
  ErrorNotArrobaUserName,
 } from "../../errors/UsersErrors";

export class GetAllTransactionsReceivedCase {
  constructor(
    private transactionsModel: ITransactionsModel
  ){};

  async get ({ idUserLogged, user_name_filter, date_filter }
    : TTransactionsRequestData) {
      
    const transactionsSent = await this.transactionsModel
    .getAllTransactionsReceived(idUserLogged);

    if ( user_name_filter ) {
      const checkFirstCharacterHasArroba = user_name_filter
     .trim()[0].includes("@");

      if ( !checkFirstCharacterHasArroba ) {
        throw new ErrorNotArrobaUserName();
      };

      const transactionsSentFilterName = transactionsSent
      .filter((transaction) => {
        return transaction.user_name_debited
        .includes(user_name_filter.trim());
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
      transactionsSent: transactionsSent,
      statusCode: 200,
    };
  };
};