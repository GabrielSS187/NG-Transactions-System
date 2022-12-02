import { ITransactionsModel } 
from "../../models/Transactions-models/ITransactionsModel";

export class GetAllTransactionsReceivedAndSentCase {
  constructor(
    private transactionsModel: ITransactionsModel
  ){};

  async get (idUserLogged: number) {
      
    const transactions = await this.transactionsModel
    .getAllTransactionsReceivedAndSent(idUserLogged);
      
    return {
      transactions,
      statusCode: 200,
    };
  };
};