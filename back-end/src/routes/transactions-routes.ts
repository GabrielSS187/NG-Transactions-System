import { Router } from "express";

import { CreateTransactionController } 
from "../controllers/Transactions-controllers/Create-transactions-controller";
import { GetAllTransactionsSentController }
from "../controllers/Transactions-controllers/Get-all-transactions-sent-controller";
import { GetAllTransactionsReceivedController }
from "../controllers/Transactions-controllers/Get-all-transactions-received-controller";
import { UpdateLookedController }
from "../controllers/Transactions-controllers/Update-transaction-controller";
import { GetAllTransactionsReceivedAndSentController }
from "../controllers/Transactions-controllers/Get-all-transactions-received-and-sent-controller";

export const transactionsRoutes = Router();

const createTransactionController = 
new CreateTransactionController();
const getAllTransactionsSentController =
new GetAllTransactionsSentController();
const getAllTransactionsReceivedController =
new GetAllTransactionsReceivedController();
const updateLookedController =
new UpdateLookedController();
const getAllTransactionsReceivedAndSentController =
new GetAllTransactionsReceivedAndSentController();

transactionsRoutes
.get("/all", getAllTransactionsReceivedAndSentController.get);
transactionsRoutes
.get("/transactions_sent", getAllTransactionsSentController.get);
transactionsRoutes
.get("/transactions_received", getAllTransactionsReceivedController.get);

transactionsRoutes.post("/create", createTransactionController.create);
transactionsRoutes
.put("/update_looked/:id_transaction", updateLookedController.update);