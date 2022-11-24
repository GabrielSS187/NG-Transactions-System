import { IUsersModel }
 from "../../models/Users-models/IUsersModel";

 import { ErrorUserNotFound }
  from "../../errors/UsersErrors";

 export class FindUserByTokenCase {
  constructor(
    private usersModel: IUsersModel
  ){};

  async find (userId: number) {
    const user = await this.usersModel
    .findUser("", userId);

    if ( !user ) {
      throw new ErrorUserNotFound();
    };

    return {
      user,
      statusCode: 200,
    };
  };
 };