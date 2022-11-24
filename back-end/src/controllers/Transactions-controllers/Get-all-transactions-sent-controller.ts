import { Request, Response } from "express";
import { ReadStream } from "tty";

import { TransactionsRepository } 
from "../../repositories/Transactions-repository";
import { GetAllTransactionsSentCase }
 from "../../use-cases/Transactions-cases/Get-all-transactions-sent-case";

 export class GetAllTransactionsSentController {
  async get (req: Request, res: Response) {
    const idUserLogged = Number(req.userId);

    const user_name_filter = req.query.user_name_filter as string;
    const date_filter = req.query.date_filter as string;

    const transactionsRepository =
    new TransactionsRepository();

    const getAllTransactionsSentCase = 
    new GetAllTransactionsSentCase(
      transactionsRepository
    );

    const transactionsSent = await getAllTransactionsSentCase
    .get({ idUserLogged, user_name_filter, date_filter });

    return res.status(transactionsSent.statusCode)
    .json(transactionsSent);
  };
 };