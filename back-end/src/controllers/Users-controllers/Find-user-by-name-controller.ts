import { Request, Response } from "express";

import { CreateUsersRepository }
 from "../../repositories/Users-repository";

 import { FindUserByNameCase }
  from "../../use-cases/Users-cases/Find-user-by-name";

  export class FindUserByNameController {
    async find (req: Request, res: Response) {
      const { name } = req.params;

      const createUsersRepository =
      new CreateUsersRepository();

      const findUserByNameCase =
      new FindUserByNameCase(createUsersRepository);

      const result = await findUserByNameCase.find(name);

      return res.status(result.statusCode).json(result.user);
    };
  };