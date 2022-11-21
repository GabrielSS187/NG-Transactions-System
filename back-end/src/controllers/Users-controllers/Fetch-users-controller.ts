import { Request, Response } from "express";

import { CreateUsersRepository } 
from "../../repositories/Users-repository";
import { FetchUsersCase }
 from "../../use-cases/Users-cases/Fetch-users-case";

 export class FetchUsersController {
  async find (req: Request, res: Response) {
    const user_id_logged = req.userId;
    const { user_name } = req.params;

    const createUsersRepository =
    new CreateUsersRepository();

    const fetchUsersCase = 
    new FetchUsersCase(createUsersRepository);

    const result = await fetchUsersCase.find({
      user_id_logged: Number(user_id_logged),
      user_name
    });

    return res.status(result.statusCode).json(result.list);
  };
 };