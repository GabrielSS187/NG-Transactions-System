import { IUsersModel }
 from "../../models/Users-models/IUsersModel";

 import { ErrorCodeInvalid }
  from "../../errors/UsersErrors";

 export class FindUserByCodeCase {
  constructor(
    private usersModel: IUsersModel
  ){};

  async find (userCode: string) {
    const user = await this.usersModel
    .findUserByCode(userCode);

    if ( !user ) {
      throw new ErrorCodeInvalid();
    };

    return {
      user,
      statusCode: 200,
    };
  };
 };