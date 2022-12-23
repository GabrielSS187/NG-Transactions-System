import { Request, Response } from "express";

import { CreateUsersRepository } 
  from "../../repositories/Users-repository";
import { AlterPasswordCase } 
  from "../../use-cases/Users-cases/Alter-password-case";
import { RequestPasswordChangeCase }
 from "../../use-cases/Users-cases/Alter-password-case";
import { NodemailerMailAdapter } 
 from "../../adapters/Nodemailer-adapter/Nodemailer-adapter";
import { BCryptAdapter } from "../../adapters/Bcrypt-adapter/Bcrypt-adapter";

 export class AlterPasswordController {
  async alter (req: Request, res: Response) {
    const { codeUser } = req.params;
    const { 
      newPassword,
     } = req.body;

     const createUsersRepository = new CreateUsersRepository();
     const bcryptAdapter = new BCryptAdapter();

     const alterPasswordCase =
     new AlterPasswordCase(
      createUsersRepository, 
      bcryptAdapter,
    );

     const result = await alterPasswordCase.alter({
      newPassword,
      codeUser,
     });

     return res.status(result.statusCode).json(result.message);
  };
 };

 //* Enviar email para confirmar que e o usuário que pediu a alteração de senha
 export class RequestPasswordChangeController {
  async request (req: Request, res: Response) {
    const { email } = req.params;

    const createUsersRepository =
    new CreateUsersRepository();

    const nodemailerMailAdapter = 
     new NodemailerMailAdapter();

    const requestPasswordChangeCase =
    new RequestPasswordChangeCase(
      createUsersRepository,
      nodemailerMailAdapter
    );

    const result = await requestPasswordChangeCase.request(email);

    return res.status(result.statusCode).json(result.message);
  };
 };