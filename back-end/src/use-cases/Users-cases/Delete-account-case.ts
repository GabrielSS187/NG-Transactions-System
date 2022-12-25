import { IUsersModel } from "../../models/Users-models/IUsersModel";

import { 
  ErrorUserNotFound,
  ErrorCodeInvalid
} from "../../errors/UsersErrors";

export class DeleteAccountCase {
  constructor (
    private readonly usersModel: IUsersModel,
  ){};

  async delete (idUser: number) {
    
    if ( !idUser ) throw new ErrorCodeInvalid();

    const user = await this.usersModel.findUser("", idUser);  
    
    if ( !user ) throw new ErrorUserNotFound();
    
    await this.usersModel.deleteAccount(idUser);

    return {
      message: "Conta deletada com sucesso.",
      statusCode: 200,
    };
  };
};