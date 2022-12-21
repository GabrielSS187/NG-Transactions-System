import { Request, Response } from "express";

import { CreateUsersRepository } 
from "../../repositories/Users-repository";
import { CreateUsersCase }
 from "../../use-cases/Users-cases/Create-users-case";
 import { NodemailerMailAdapter } 
 from "../../adapters/Nodemailer-adapter/Nodemailer-adapter";

 import { BCryptAdapter } from "../../adapters/Bcrypt-adapter/Bcrypt-adapter";

 export class CreateUsersController {
  async create (req: Request, res: Response) {
    const { 
      user_name,
      user_email,
      password,
     } = req.body;

     const createUsersRepository = new CreateUsersRepository();
     const bcryptAdapter = new BCryptAdapter();

     const nodemailerMailAdapter = 
     new NodemailerMailAdapter();

     const createUsersCase =
     new CreateUsersCase(
      createUsersRepository, 
      bcryptAdapter,
      nodemailerMailAdapter
    );

     const dataBody = {
      user_name,
      user_email,
      password
     };

     const result = await createUsersCase.create(dataBody);

     return res.status(result.statusCode).json(result.message);
  };
 };