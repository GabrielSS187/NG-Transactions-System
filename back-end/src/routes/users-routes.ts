import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.-middleware";

import { CreateUsersController } 
from "../controllers/Users-controllers/Create-users-controller";
import { LoginUserController } 
from "../controllers/Users-controllers/Login-user-controller";
import { FetchUsersController } 
from "../controllers/Users-controllers/Fetch-users-controller";

export const usersRoutes = Router();

const createUsersController = new CreateUsersController();
const loginUserController = new LoginUserController();
const fetchUsersController = new FetchUsersController();

usersRoutes
.get("/:user_name", authMiddleware, fetchUsersController.find);

usersRoutes.post("/register", createUsersController.create);
usersRoutes.post("/login", loginUserController.login);