import * as yup from "yup";

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
  ErrorPasswordRegexInvalid,
  ErrorNotArrobaUserName,
  ErrorStringMustOnlyOneArroba,
 } from "../../errors/UsersErrors";


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
      };
    };    

    const removeSpacesInString = user_name.replaceAll(regexRemoveSpaces, "");

    const checkFirstCharacterHasArroba =
     removeSpacesInString[0].includes("@");

     const stringMustOnlyOneArroba =
     removeSpacesInString.substring(1)
     .includes("@");

    if (!checkFirstCharacterHasArroba) {
      throw new ErrorNotArrobaUserName();
     };

     if (stringMustOnlyOneArroba) {
      throw new ErrorStringMustOnlyOneArroba();
     };

    //* O match ? Si tiver caracteres especiais ele retorna um array
    //* com essas caracteres si não retorna nulo.
    if (removeSpacesInString.match(regexSpecialCharacters) !== null ) {
      throw new ErrorUserNameInvalid();
    };

    if ( password.match(regexValidatePassword) === null ) {
      throw new ErrorPasswordRegexInvalid();
    };
    
    const findUser = await this.usersModel.findUser(removeSpacesInString);
    if ( !!findUser ) throw new ErrorExistUserName(removeSpacesInString);

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
      user_name: removeSpacesInString,
      password_hash: hashPassword,
      account_id: accountNumber,
    });

    return { 
      message: `Usuário: ${removeSpacesInString} registrado com sucesso.`,
      statusCode: 201,
    };
  };
};