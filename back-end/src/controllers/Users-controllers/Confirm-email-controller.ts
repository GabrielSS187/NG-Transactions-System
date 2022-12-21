import { Request, Response } from "express";
import path from "path";

import { CreateUsersRepository } 
from "../../repositories/Users-repository";
import { ConfirmEmailCase }
from "../../use-cases/Users-cases/Confirm-email-case";


 export class ConfirmEmailController {
  async confirm (req: Request, res: Response) {
    const { verify, codeUser } = req.params;

     const createUsersRepository = new CreateUsersRepository();

     const confirmEmailCase =
     new ConfirmEmailCase(
      createUsersRepository, 
    );

     const result = await confirmEmailCase.confirm(verify, codeUser);
     
     if ( result.statusCode === 200 ) {
       return res.status(200)
        .sendFile(path.resolve("src/html/successMessageEmailValidatePage.html"));
     };
   };
 };