import { Request, Response } from "express";
import path from "path";

import { CreateUsersRepository } 
from "../../repositories/Users-repository";
import { DeleteAccountCase }
 from "../../use-cases/Users-cases/Delete-account-case";

 export class DeleteAccountController {
  async delete (req: Request, res: Response) {
    const idUser = Number(req.userId);

     const createUsersRepository = new CreateUsersRepository();

     const deleteAccountCase =
     new DeleteAccountCase(
      createUsersRepository, 
    );

     const result = await deleteAccountCase.delete(idUser);
     
    return res.status(200).json(result.message);
   };
 };