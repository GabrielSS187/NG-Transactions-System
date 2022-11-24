import { IUsersModel } from "../models/Users-models/IUsersModel";
import { TUsersData } from "../models/Users-models/types";

import { Database } from "../data/Database";

export class CreateUsersRepository 
extends Database 
implements IUsersModel {
  #tableNames = {
    user: "Users",
    account: "Accounts",
  };

  private async createAccount (accountId: string) {
    await Database.connection(this.#tableNames.account)
    .insert({
      id_account: accountId,
      balance: 100,
    });
  };

  async create (data: TUsersData) {
    await this.createAccount(data.account_id);
    await Database.connection(this.#tableNames.user)
    .insert(data);
  };

  async findUser (userName: string, userId?: number) {      
    if ( userId ) {
      const [ foundUser ] = await Database
      .connection(`${this.#tableNames.user} as U`)
      .select("U.id_user", "U.user_name", "U.account_id", "U.password_hash", "A.balance")
      .innerJoin("Accounts as A", "U.account_id" ,"A.id_account")
      .where("U.id_user", userId);

      const objFormatted = {
        id_user: foundUser.id_user,
        user_name: foundUser.user_name,
        account_id: foundUser.account_id,
        balance: foundUser.balance,
      };

      return objFormatted;
    };

    const [ foundUser ] = await Database
    .connection(`${this.#tableNames.user} as U`)
    .select("U.id_user", "U.user_name", "U.account_id", "U.password_hash")
    .where("U.user_name", userName);

    return foundUser;
  };

  async fetchUsers (user_name: string) {
    const users = await Database.connection(this.#tableNames.user)
    .select("id_user", "user_name", "account_id")
    .where("user_name", "like", `%${user_name}%`);

    return users;
  };
};