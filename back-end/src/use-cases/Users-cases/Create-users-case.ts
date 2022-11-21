import { IUsersModel } from "../../models/Users-models/IUsersModel";

import { 
  bodyValidation, 
  regexSpecialCharacters ,
  regexRemoveSpaces,
  regexRemoveCommas,
  regexValidatePassword,
} from "./Validations";
import { TUsersData } from "./types";

import { 
  ErrorExistUserName,
  ErrorUserNameInvalid,
  ErrorPasswordRegexInvalid
 } from "../../errors/UsersErrors";

import * as yup from "yup";

import { IBCryptAdapter } from "../../adapters/IBcrypt-adapter";

import { generateId } from "../../utils/generate-id";

export class CreateUsersCase {
  constructor(
    private readonly usersModel: IUsersModel,
    private readonly bcryptAdapter: IBCryptAdapter,
  ){};

  async create(request: TUsersData){
    const { user_name, password } = request;
    let validatedData: TUsersData | undefined = undefined;

    try {
      validatedData = 
      await bodyValidation.validate(request, { abortEarly: false });
    } catch ( err ) {
      const yupError = err as yup.ValidationError;
      const validationErrors: Record<string, string> = {};

      yupError.inner.forEach((error) => {
        if ( !error.path ) return;
        validationErrors[error.path] = error.message
      });

      return {
        message: validationErrors,
        statusCode: 400,
      }
    };    

    //* O match ? Si tiver caracteres especiais ele retorna um array
    //* com essas caracteres si não retorna nulo.
    if (user_name.match(regexSpecialCharacters) !== null ) {
      throw new ErrorUserNameInvalid();
    };

    if ( password.match(regexValidatePassword) === null ) {
      throw new ErrorPasswordRegexInvalid();
    };
    
    const findUser = await this.usersModel.findUser(`@${user_name}`);
    if ( !!findUser ) throw new ErrorExistUserName(user_name);

    //* generateId() ? gera uma string grande com vários 
    //* números, letras e caracteres especias.
    const numbers = `${generateId()}}`
    .replace(regexRemoveCommas, "")
    .replace(regexRemoveSpaces, "");

    //* Gerar numeros de 1 a 10;
    const generateNumbers = Math.floor(10* Math.random() + 1);

    //* Número da conta. Exemplo ? 2010 5 0034875 9
    const accountNumber =
     `2010 ${generateNumbers === 10 ? 
      generateNumbers - 1 : 
      generateNumbers
    } 00${numbers.slice(-5)} ${numbers[5]}`;

     const hashPassword = await this.bcryptAdapter
     .hashEncrypt({password});
  
    await this.usersModel.create({
      user_name: `@${user_name}`,
      password_hash: hashPassword,
      account_id: accountNumber,
    });

    return { 
      message: `Usuário: ${user_name} registrado com sucesso.`,
      statusCode: 201,
    };
  };
};