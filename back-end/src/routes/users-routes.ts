import { Router } from "express";
import multer from "multer";
import uploadsConfig from "../config/multer";

import { authMiddleware } from "../middlewares/auth-middleware";

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
  import { FindUserByNameController }
   from "../controllers/Users-controllers/Find-user-by-name-controller";
import { FindUserByCodeController } from "../controllers/Users-controllers/Find-user-by-code-controller";
import { DeleteAccountController } from "../controllers/Users-controllers/Delete-account-controller";
import { 
  AlterPasswordController,
  RequestPasswordChangeController
 } from "../controllers/Users-controllers/Alter-password-controller";

export const usersRoutes = Router();
const upload = multer(uploadsConfig);

const createUsersController = new CreateUsersController();
const loginUserController = new LoginUserController();
const fetchUsersController = new FetchUsersController();
const findUserByTokenController = new FindUserByTokenController();
const findUserByEmailController = new FindUserByEmailController();
const findUserByCodeController = new FindUserByCodeController();
const findUserByNameController = new FindUserByNameController();
const editInfoUserController = new EditInfoUserController();
const confirmEmailController = new ConfirmEmailController();
const alterEmailController = new AlterEmailController();
const alterPasswordController = new AlterPasswordController();
const requestPasswordChangeController = new RequestPasswordChangeController();
const deleteAccountController = new DeleteAccountController();


usersRoutes.get("/find_user", authMiddleware, findUserByTokenController.find);
usersRoutes.get("/find_user/:email", findUserByEmailController.find);
usersRoutes.get("/find_user_code/:code", findUserByCodeController.find);
usersRoutes.get("/find_user_name/:name", findUserByNameController.find);
usersRoutes.get("/confirm_email/:verify/:codeUser", confirmEmailController.confirm);
usersRoutes.get("/confirm_you/:email", requestPasswordChangeController.request);
//* Achar e filtra por nome do usuário
usersRoutes.get("/:user_name", authMiddleware, fetchUsersController.find);
//* =========================================================================

usersRoutes.post("/register", createUsersController.create);
usersRoutes.post("/login", loginUserController.login);
usersRoutes.post("/alter_email/:codeUser", [] ,alterEmailController.alter);

usersRoutes.put("/edit", authMiddleware, upload.single("image"), editInfoUserController.edit);
usersRoutes.put("/alter_password/:codeUser", alterPasswordController.alter);

usersRoutes.delete("/delete_account", authMiddleware, deleteAccountController.delete);