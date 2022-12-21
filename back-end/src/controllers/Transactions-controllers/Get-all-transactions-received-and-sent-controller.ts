import { Request, Response } from "express";
import { ReadStream } from "tty";

import { TransactionsRepository } 
from "../../repositories/Transactions-repository";
import { GetAllTransactionsReceivedAndSentCase }
from "../../use-cases/Transactions-cases/Get-all-transactions-received-and-sent-case";

 export class GetAllTransactionsReceivedAndSentController {
  async get (req: Request, res: Response) {
    const idUserLogged = Number(req?.userId);

    const transactionsRepository =
    new TransactionsRepository();

    const getAllTransactionsReceivedAndSentCase = 
    new GetAllTransactionsReceivedAndSentCase(
      transactionsRepository
    );

    const result = await getAllTransactionsReceivedAndSentCase
    .get(idUserLogged);

    return res.status(result.statusCode)
    .json(result.transactions);
  };
 };