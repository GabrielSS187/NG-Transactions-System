import * as yup from "yup";

import { IUsersModel } from "../../models/Users-models/IUsersModel";
import { TUsersData } from "./types";

import { IJwtAdapter } from "../../adapters/IJwt-adapter";
import { IBCryptAdapter } from "../../adapters/IBcrypt-adapter";

import { 
  ErrorUserNotFound,
  ErrorPasswordInvalid,
  ErrorNotArrobaUserName,
 } from "../../errors/UsersErrors";

export class LoginUserCase {
  constructor (
    private readonly usersModel: IUsersModel,
    private readonly jwtAdapter: IJwtAdapter,
    private readonly bcryptAdapter: IBCryptAdapter,
  ){};

  async login (request: TUsersData) {
    const { user_name, password } = request;     

     const checkFirstCharacterHasArroba = user_name
     .trim()[0].includes("@");

     if (!checkFirstCharacterHasArroba) {
      throw new ErrorNotArrobaUserName();
     };
     
     const findUser = await this.usersModel.findUser(user_name);
     
     if (!findUser) throw new ErrorUserNotFound(); 
     
     const verifyPasswordHash = await this.bcryptAdapter
     .compareHash({ 
      password: password.trim(), 
      passwordDatabase: findUser.password_hash!
    });

     if (!verifyPasswordHash) throw new ErrorPasswordInvalid();

     const token = this.jwtAdapter.generateToken({ id: findUser.id_user! });

     const user = {
      user_name,
      token,
     };

     return {
      user,
      statusCode: 200,
     };
  };
};