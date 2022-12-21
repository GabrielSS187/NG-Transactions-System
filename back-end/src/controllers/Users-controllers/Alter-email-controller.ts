import { Request, Response } from "express";

import { CreateUsersRepository } 
from "../../repositories/Users-repository";
import { AlterEmailCase } 
  from "../../use-cases/Users-cases/Alter-email-case";
import { NodemailerMailAdapter } 
 from "../../adapters/Nodemailer-adapter/Nodemailer-adapter";

 export class AlterEmailController {
  async alter (req: Request, res: Response) {
    const { codeUser } = req.params;
    const { newEmail } = req.body;

    const createUsersRepository = new CreateUsersRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();

     const alterEmailCase = new AlterEmailCase(
        createUsersRepository,
        nodemailerMailAdapter
      );

     const result = await alterEmailCase.alter(newEmail, codeUser);

     return res.status(result.statusCode).json(result.message);
  };
 };