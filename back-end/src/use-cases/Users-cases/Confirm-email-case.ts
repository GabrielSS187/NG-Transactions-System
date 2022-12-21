import { IUsersModel } from "../../models/Users-models/IUsersModel";

import { 
  ErrorCodeInvalid,
  ErrorVerifyInvalid,
} from "../../errors/UsersErrors";

export class ConfirmEmailCase {
  constructor (
    private readonly usersModel: IUsersModel,
  ){};

  async confirm (verify: string, codeUser: string) {
    const user = await this.usersModel.findUserByCode(codeUser);
    
    if ( !user ) throw new ErrorCodeInvalid();

    const verifyRequest = verify !== "true";   

    if ( verifyRequest ) throw new ErrorVerifyInvalid();
    
    await this.usersModel.updateVerify(Boolean(verify), codeUser);

    return {
      message: "Email verificado com sucesso.",
      statusCode: 200,
    };
  };
};