import { Request, Response } from "express";

import { CreateUsersRepository }
 from "../../repositories/Users-repository";

 import { FindUserByEmailCase }
  from "../../use-cases/Users-cases/Find-user-by-email-case";

  export class FindUserByEmailController {
    async find (req: Request, res: Response) {
      const { email } = req.params;

      const createUsersRepository =
      new CreateUsersRepository();

      const findUserByEmailCase =
      new FindUserByEmailCase(createUsersRepository);

      const result = await findUserByEmailCase.find(email);

      res.status(result.statusCode).json(result.user);
    };
  };