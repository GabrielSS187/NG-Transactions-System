import { ITransactionsModel }
 from "../../models/Transactions-models/ITransactionsModel";

 import {
   ErrorTransactionNotFound,
   ErrorLookedInvalid,
 } from "../../errors/TransactionsErrors";

 import { TUpdateLookedRequest } from "./types";

 export class UpdateLookedCase {
  constructor(
    private transactionsModel: ITransactionsModel
  ){};

  async update ({ id_transaction, looked }: TUpdateLookedRequest) {
    const transaction = await this.transactionsModel
    .findTransaction(id_transaction);

    if ( !transaction ) {
      throw new ErrorTransactionNotFound();
    };

    if ( typeof looked !== "boolean" ) {
      throw new ErrorLookedInvalid();
    };

    await this.transactionsModel.updateLooked({id_transaction, looked});

    return {
      message: "Visto da transação atualizado.",
      statusCode: 200,
    }
  };
 };