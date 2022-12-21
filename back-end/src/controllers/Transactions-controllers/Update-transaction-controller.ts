import { Request, Response } from "express";

import { TransactionsRepository }
 from "../../repositories/Transactions-repository";

 import { UpdateLookedCase }
  from "../../use-cases/Transactions-cases/Update-looked-case";

  export class UpdateLookedController {
    async update (req: Request, res: Response) {
      const { id_transaction } = req?.params;
      const { looked } = req.body;

      const transactionsRepository =
      new TransactionsRepository();

      const updateLookedCase = 
      new UpdateLookedCase(transactionsRepository);

      const result = await updateLookedCase.update({id_transaction, looked});

      return res.status(result.statusCode).json(result.message);
    };
  };