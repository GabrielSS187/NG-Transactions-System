import { IUsersModel } from "../models/Users-models/IUsersModel";
import { TEditUserData, TUsersData } from "../models/Users-models/types";

import { Database } from "../data/Database";

import { generateId } from "../utils/generate-id";

export class CreateUsersRepository 
extends Database 
implements IUsersModel {
  #tableNames = {
    user: "Users",
    account: "Accounts",
  };

  //* Criar e editar usuário ================================================

  private async createAccount (accountId: string) {
    await Database.connection(this.#tableNames.account)
    .insert({
      id_account: accountId,
      balance: 100,
    });
  };

  //* Criar um novo usuário.
  async create (data: TUsersData) {
    await this.createAccount(data.account_id);
    await Database.connection(this.#tableNames.user)
    .insert({...data, verify: false});
  };

  async editInfoUser (data: TEditUserData, idUser: number) {
    await Database.connection(this.#tableNames.user)
    .update(data).where("id_user", idUser);

    // await Database.connection(this.#tableNames.user)
    // .update("code", generateId()).where("id_user", idUser);
  };

  async updateVerify (verify: boolean, codeUser: string) {
    await Database.connection(this.#tableNames.user)
    .update("verify", verify).where("code", codeUser);

    if ( verify === true ) {
      await Database.connection(this.#tableNames.user)
      .update("code", generateId()).where("code", codeUser);
    };
  };

  //* ===============================================

  //* Buscar ou achar usuários ======================

  async findUser (userName: string, userId?: number) {      
    if ( userId ) {
      const [ foundUser ] = await Database
      .connection(`${this.#tableNames.user} as U`)
      .select("U.id_user", "U.photo_url", "U.user_name", "U.user_email", "U.account_id", "U.password_hash", "U.verify", "A.balance")
      .innerJoin("Accounts as A", "U.account_id" ,"A.id_account")
      .where("U.id_user", userId);

      const objFormatted = {
        id_user: foundUser.id_user,
        photo_url: foundUser.photo_url,
        user_name: foundUser.user_name,
        user_email: foundUser.user_email,
        password_hash: foundUser.password_hash,
        verify: foundUser.verify,
        account_id: foundUser.account_id,
        balance: foundUser.balance,
      };
      
      return objFormatted;
    };

    const [ foundUser ] = await Database
    .connection(`${this.#tableNames.user} as U`)
    .select("id_user", "photo_url", "user_name", "user_email", "account_id", "password_hash", "verify")
    .where("U.user_name", userName);

    return foundUser;
  };
  
  async findUserByCode (codeUser: string) {
    const [ foundUser ] = await Database.connection(this.#tableNames.user)
    .select("id_user", "user_name", "user_email", "code", "verify",)
    .where("code", codeUser);

    return foundUser;
  };

  async findUserByEmail (userEmail: string) {
    const [ userFound ] = await Database.connection(this.#tableNames.user)
    .select("id_user", "photo_url", "user_email", "user_name", "account_id", "verify", "code")
    .where("user_email", userEmail);

    return userFound;
  };

  async fetchUsers (user_name: string) {
    const users = await Database.connection(this.#tableNames.user)
    .select("id_user", "photo_url", "user_email", "user_name", "account_id")
    .where("user_name", "like", `%${user_name}%`);

    return users;
  };
//* ====================================================
};