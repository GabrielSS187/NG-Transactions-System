import * as yup from "yup";

import { IUsersModel } from "../../models/Users-models/IUsersModel";
import { IBCryptAdapter } from "../../adapters/IBcrypt-adapter";

import { TEditInfoUserData } from "./types";
import { 
   bodyEditValidation, 
   regexRemoveSpaces, 
   regexSpecialCharacters,
   regexValidatePassword
 } from "./Validations";

 import { 
  ErrorExistUserName, 
  ErrorNotArrobaUserName, 
  ErrorPasswordRegexInvalid, 
  ErrorStringMustOnlyOneArroba, 
  ErrorUserNameInvalid,
  ErrorUserNotFound
} from "../../errors/UsersErrors";

export class EditInfoUserCase {
  constructor (
    private readonly usersModel: IUsersModel,
    private readonly bcryptAdapter: IBCryptAdapter
  ){};

  async edit (requestBody: TEditInfoUserData,  idUser: number ) {
    const {
      user_name,
      password_hash: password,
      photo_url,
      user_email,
    } = requestBody;

    let validatedData: TEditInfoUserData | undefined = undefined;

    const userData = await this.usersModel.findUser("", idUser);    
    
    if ( !userData ) {
      throw new ErrorUserNotFound();
    };

    const verifyValuesBody = user_name || password || photo_url || user_email;

    if ( verifyValuesBody ) {
      try {
        validatedData = 
        await bodyEditValidation.validate(requestBody, { abortEarly: false });
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
    };

    const removeSpacesInString = user_name?.replaceAll(regexRemoveSpaces, "");

    if ( removeSpacesInString ) {
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

        if (removeSpacesInString.match(regexSpecialCharacters) !== null ) {
          throw new ErrorUserNameInvalid();
        };

        const findUser = await this.usersModel.findUser(removeSpacesInString);
        if ( !!findUser ) throw new ErrorExistUserName();
      };

    let newPasswordHash: string | undefined = undefined;

    if ( password ) {
      if ( password.match(regexValidatePassword) === null ) {
        throw new ErrorPasswordRegexInvalid();
      };

      const newHashPassword = await this.bcryptAdapter
      .hashEncrypt({password});

      newPasswordHash = newHashPassword;
    };

    await this.usersModel.editInfoUser({
      ...(photo_url && { photo_url: `${process.env.API_URL}/api/V1/${photo_url}` }),
      user_name: user_name ?? userData.user_name,
      user_email: user_email ?? userData.user_email,
      password_hash: newPasswordHash ?? userData.password_hash,
    }, idUser);

    return {
      message: "Informações editadas com sucesso.",
      statusCode: 200,
    };
  };
};