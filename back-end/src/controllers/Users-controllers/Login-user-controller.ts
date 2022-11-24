import { Request, Response } from "express";

import { CreateUsersRepository } 
from "../../repositories/Users-repository";
import { LoginUserCase }
 from "../../use-cases/Users-cases/Login-user-case";

 import { JwtAdapter } from "../../adapters/Jwt-adapter/Jwt-adapter";
 import { BCryptAdapter } from "../../adapters/Bcrypt-adapter/Bcrypt-adapter";

 export class LoginUserController {
  async login (req: Request, res: Response) {
    const { user_name, password } = req.body;

    const createUsersRepository =
    new CreateUsersRepository();

    const jwtAdapter = new JwtAdapter();
    const bcryptAdapter = new BCryptAdapter();

    const loginUserCase =
    new LoginUserCase(
      createUsersRepository,
      jwtAdapter,
      bcryptAdapter,
    );

    const result = await loginUserCase.login({
      user_name,
      password,
    });

    return res.status(result.statusCode).json(result.user);
  };
 };