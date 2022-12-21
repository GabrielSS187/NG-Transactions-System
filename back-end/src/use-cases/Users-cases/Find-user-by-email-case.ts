import { IUsersModel }
 from "../../models/Users-models/IUsersModel";

 import { ErrorUserNotFound }
  from "../../errors/UsersErrors";

 export class FindUserByEmailCase {
  constructor(
    private usersModel: IUsersModel
  ){};

  async find (userEmail: string) {
    const user = await this.usersModel
    .findUserByEmail(userEmail);

    if ( !user ) {
      throw new ErrorUserNotFound();
    };

    return {
      user,
      statusCode: 200,
    };
  };
 };