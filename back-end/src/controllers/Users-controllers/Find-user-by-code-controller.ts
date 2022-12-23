import { Request, Response } from "express";

import { CreateUsersRepository }
 from "../../repositories/Users-repository";

 import { FindUserByCodeCase }
  from "../../use-cases/Users-cases/Find-user-by-code-case";

  export class FindUserByCodeController {
    async find (req: Request, res: Response) {
      const { code } = req.params;

      const createUsersRepository =
      new CreateUsersRepository();

      const findUserByCodeCase =
      new FindUserByCodeCase(createUsersRepository);

      const result = await findUserByCodeCase.find(code);

      return res.status(result.statusCode).json(result.user);
    };
  };