import { IUsersModel } from "../../models/Users-models/IUsersModel";

import { TFetchUsersRequest } from "./types";

import { 
  ErrorNotArrobaUserName,
 } from "../../errors/UsersErrors";

export class FetchUsersCase {
  constructor (
    private readonly usersModel: IUsersModel
  ){};

  async find (request: TFetchUsersRequest) {
    let { user_id_logged, user_name } = request;

    const checkFirstCharacterHasArroba = user_name
     .trim()[0].includes("@");

     if (!checkFirstCharacterHasArroba) {
      throw new ErrorNotArrobaUserName();
     };
;
    const usersList = await this.usersModel.fetchUsers(user_name.trim());

    const removeUserLoggedInListView = usersList.filter((user) => {
      if ( user.id_user !== user_id_logged ) return user;
    });

    return {
      list: removeUserLoggedInListView,
      statusCode: 200,
    };
  };
};