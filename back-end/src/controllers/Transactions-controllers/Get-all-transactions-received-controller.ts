import { Request, Response } from "express";
import { ReadStream } from "tty";

import { TransactionsRepository } 
from "../../repositories/Transactions-repository";
import { GetAllTransactionsReceivedCase }
 from "../../use-cases/Transactions-cases/Get-all-transactions-received-case";

 export class GetAllTransactionsReceivedController {
  async get (req: Request, res: Response) {
    const idUserLogged = Number(req.userId);

    const user_name_filter = req.query.user_name_filter as string;
    const date_filter = req.query.date_filter as string;

    const transactionsRepository =
    new TransactionsRepository();

    const getAllTransactionsReceivedCase = 
    new GetAllTransactionsReceivedCase(
      transactionsRepository
    );

    const result = await getAllTransactionsReceivedCase
    .get({ idUserLogged, user_name_filter, date_filter });

    return res.status(result.statusCode)
    .json(result.transactionsSent);
  };
 };