import { Request, Response, NextFunction } from "express";
import { app } from "./server";

import "express-async-errors";

import { usersRoutes } from "./routes/users-routes";
import { transactionsRoutes } from "./routes/transactions-routes";

import { authMiddleware } from "./middlewares/auth.-middleware";

import { CustomError } from "./errors/CustomError";

app.use("/users", usersRoutes);
app.use("/transactions", authMiddleware, transactionsRoutes);

//* ============================================================
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    return error instanceof CustomError 
  ?
    res.status(error.statusCode).send(error.message)
  :
    res.status(500).send(error.message || error.pgMessage)
});