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
import { EditInfoUserController } 
  from "../controllers/Users-controllers/Edit-info-user-controller";
import { FindUserByEmailController }
 from "../controllers/Users-controllers/Find-user-by-email-controller";
import { ConfirmEmailController }
 from "../controllers/Users-controllers/Confirm-email-controller";
import { AlterEmailController } 
  from "../controllers/Users-controllers/Alter-email-controller";

export const usersRoutes = Router();

const createUsersController = new CreateUsersController();
const loginUserController = new LoginUserController();
const fetchUsersController = new FetchUsersController();
const findUserByTokenController = new FindUserByTokenController();
const findUserByEmailController = new FindUserByEmailController();
const editInfoUserController = new EditInfoUserController();
const confirmEmailController = new ConfirmEmailController();
const alterEmailController = new AlterEmailController();


usersRoutes.get("/find_user", authMiddleware, findUserByTokenController.find);
usersRoutes.get("/:user_name", authMiddleware, fetchUsersController.find);
usersRoutes.get("/find_user/:email", findUserByEmailController.find);
usersRoutes.get("/confirm_email/:verify/:codeUser", confirmEmailController.confirm);

usersRoutes.post("/register", createUsersController.create);
usersRoutes.post("/login", loginUserController.login);
usersRoutes.post("/edit", authMiddleware, editInfoUserController.edit);
usersRoutes.post("/alter_email/:codeUser", [] ,alterEmailController.alter);