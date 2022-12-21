import { IUsersModel } from "../../models/Users-models/IUsersModel";
import { IMailAdapter } from "../../adapters/INodemailer-adapter";
import { regexEmail } from "./Validations";
import { validEmail } from "../../emails/validEmail";

import { 
  ErrorExistUserEmail,
  ErrorEmailSameAsAlreadyBe,
  ErrorEmailRequired,
  ErrorInvalidEmail,
  ErrorCodeInvalid,
  ErrorStandard
 } from "../../errors/UsersErrors";

export class AlterEmailCase {
  constructor(
    private readonly usersModel: IUsersModel,
    private readonly mailAdapter: IMailAdapter,
  ){};

  async alter (newEmail: string, codeUser: string) {

    if ( !newEmail ) {
      throw new ErrorEmailRequired();
    };

    const userCode = await this.usersModel.findUserByCode(codeUser);   

    if ( !userCode ) {
      throw new ErrorCodeInvalid();
    };

    if ( !regexEmail.test(newEmail.trim()) ) {
      throw new ErrorInvalidEmail();
    };

    // if ( newEmail.trim() === userCode.user_email ) {
    //   throw new ErrorEmailSameAsAlreadyBe();
    // };

    const userEmail = await this.usersModel.findUserByEmail(newEmail.trim());

    if ( userEmail ) {
      await this.mailAdapter.sendMail({
        email: `${newEmail}`,
        subject: "NG Transações",
        body:  validEmail(userCode.user_name, newEmail, userCode.code!),
      });
      return {
        message: "Email enviado com sucesso.",
        statusCode: 200,
      };
    };

    try {
      await this.mailAdapter.sendMail({
        email: `${newEmail}`,
        subject: "NG Transações",
        body:  validEmail(userCode.user_name, newEmail, userCode.code!),
      });
      await this.usersModel.editInfoUser({...userCode, user_email: newEmail}, userCode.id_user!);
      return {
        message: "Email alterado com sucesso. Um novo email de verificação foi enviado.",
        statusCode: 200,
      };
    } catch (error) {
      throw new ErrorStandard();
    };
  };
};