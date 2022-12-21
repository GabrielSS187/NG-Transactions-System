import { Request, Response } from "express";

import { TransactionsRepository } 
from "../../repositories/Transactions-repository";
import { CreateTransactionCase } 
from "../../use-cases/Transactions-cases/Create-transaction-case";
import { NodemailerMailAdapter } 
from "../../adapters/Nodemailer-adapter/Nodemailer-adapter";

export class CreateTransactionController {
  async create (req: Request, res: Response) {
    const user_id_send = req?.userId;

    const {
      user_name_receiver,
      value,
    } = req.body;

    const transactionsRepository =
    new TransactionsRepository();

    const nodemailerMailAdapter =
     new NodemailerMailAdapter();

    const createTransactionsCase = 
    new CreateTransactionCase(
      transactionsRepository,
      nodemailerMailAdapter
    );

    const result = await createTransactionsCase
    .create({
      user_id_send: Number(user_id_send),
      user_name_receiver,
      value,
    });

    return res.status(result.statusCode).json(result.message);
  };
};