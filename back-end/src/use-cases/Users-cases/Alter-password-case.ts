import { IUsersModel } from "../../models/Users-models/IUsersModel";
import { IBCryptAdapter } from "../../adapters/IBcrypt-adapter";
import { IMailAdapter } from "../../adapters/INodemailer-adapter";

import { generateId } from "../../utils/generate-id";
import { regexEmail, regexValidatePassword } from "./Validations";
import { resetPasswordEmail } from "../../emails/resetPasswordEmail";

import { 
  ErrorPasswordRegexInvalid,
  ErrorCodeInvalid,
  ErrorInvalidEmail,
  ErrorEmailRequired,
  ErrorUserEmailNotFound,
  ErrorStandard,
  ErrorNewPasswordRequired
 } from "../../errors/UsersErrors";

type TRquest = {
  newPassword: string,
  codeUser: string
};

export class RequestPasswordChangeCase {
  constructor (
    private readonly usersModel: IUsersModel,
    private readonly mailAdapter: IMailAdapter,
  ){};

  async request (email: string) {
    if ( !email ) {
      throw new ErrorEmailRequired();
    };

    if ( !regexEmail.test(email.trim()) ) {
      throw new ErrorInvalidEmail();
    };

    const user = await this.usersModel.findUserByEmail(email);

    if ( !user ) {
      throw new ErrorUserEmailNotFound();
    };

    try {
      await this.mailAdapter.sendMail({
        email: `${email}`,
        subject: "NG Transações",
        body: resetPasswordEmail(user.code!),
      });
      return {
        message: "Um email para você redefinir sua senha foi enviado.",
        statusCode: 200,
      };
    } catch (error) {
      throw new ErrorStandard();
    };
  };
};

export class AlterPasswordCase {
  constructor (
    private readonly usersModel: IUsersModel,
    private readonly bcryptAdapter: IBCryptAdapter
  ){};

  async alter (request: TRquest) {
    const { newPassword: password, codeUser } = request;

    const user = await this.usersModel.findUserByCode(codeUser);

    if ( !user ) {
      throw new ErrorCodeInvalid();
    };

    if ( !password ) {
      throw new ErrorNewPasswordRequired();
    };
    
    if (password.match(regexValidatePassword) === null ) {
      throw new ErrorPasswordRegexInvalid();
    };

    const newHashPassword = await this.bcryptAdapter
     .hashEncrypt({password});

    const generateNewCode = generateId();

     await this.usersModel.editInfoUser({
      password_hash: newHashPassword,
      code: generateNewCode,
     }, user.id_user!);

     return {
      message: "Senha alterada com sucesso.",
      statusCode: 200,
     };
  };
};