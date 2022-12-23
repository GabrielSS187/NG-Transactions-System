import { IUsersModel }
 from "../../models/Users-models/IUsersModel";

 import { ErrorUserNotFound }
  from "../../errors/UsersErrors";

 export class FindUserByNameCase {
  constructor(
    private usersModel: IUsersModel
  ){};

  async find (userName: string) {
    const user = await this.usersModel
    .findUser(userName);

    if ( !user ) {
      throw new ErrorUserNotFound();
    };

    const objFormatted = {
      user_name: user.user_name,
      user_email: user.user_email,
      verify: user.verify,
    };    

    return {
      user: objFormatted,
      statusCode: 200,
    };
  };
 };