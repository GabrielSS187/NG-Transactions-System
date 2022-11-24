import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.-middleware";

import { CreateUsersController } 
from "../controllers/Users-controllers/Create-users-controller";
import { LoginUserController } 
from "../controllers/Users-controllers/Login-user-controller";
import { FetchUsersController } 
from "../controllers/Users-controllers/Fetch-users-controller";
import { FindUserByTokenController }
 from "../controllers/Users-controllers/Find-user-by-token-controller";

export const usersRoutes = Router();

const createUsersController = new CreateUsersController();
const loginUserController = new LoginUserController();
const fetchUsersController = new FetchUsersController();
const findUserByTokenController = new FindUserByTokenController();

usersRoutes
.get("/find_user", authMiddleware, findUserByTokenController.find);
usersRoutes
.get("/:user_name", authMiddleware, fetchUsersController.find);

usersRoutes.post("/register", createUsersController.create);
usersRoutes.post("/login", loginUserController.login);