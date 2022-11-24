import { Request, Response } from "express";

import { CreateUsersRepository }
 from "../../repositories/Users-repository";

 import { FindUserByTokenCase }
  from "../../use-cases/Users-cases/Find-user-by-token-case";

  export class FindUserByTokenController {
    async find (req: Request, res: Response) {
      const userId = req.userId as number;

      const createUsersRepository =
      new CreateUsersRepository();

      const findUserByTokenCase =
      new FindUserByTokenCase(createUsersRepository);

      const result = await findUserByTokenCase.find(userId);

      res.status(result.statusCode).json(result.user);
    };
  };