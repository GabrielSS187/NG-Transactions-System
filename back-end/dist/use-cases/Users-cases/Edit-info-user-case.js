"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/use-cases/Users-cases/Edit-info-user-case.ts
var Edit_info_user_case_exports = {};
__export(Edit_info_user_case_exports, {
  EditInfoUserCase: () => EditInfoUserCase
});
module.exports = __toCommonJS(Edit_info_user_case_exports);

// src/use-cases/Users-cases/Validations.ts
var yup = __toESM(require("yup"));
var bodyValidation = yup.object().shape({
  user_name: yup.string().required().min(5).max(100).trim(),
  user_email: yup.string().required().email().trim(),
  password: yup.string().required().min(8).trim()
});
var bodyEditValidation = yup.object().shape({
  photo_url: yup.string(),
  user_name: yup.string().min(5).max(100).trim(),
  user_email: yup.string().email().trim(),
  password_hash: yup.string().min(8).trim(),
  verify: yup.boolean()
});
var regexSpecialCharacters = /[*.\=#\¨!\<>\.^\~()\&$\¬{}\;:\°ª\?/\[£\]%\¢|\+]/gi;
var regexValidatePassword = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/g;
var regexRemoveSpaces = /\s/g;

// src/errors/CustomError.ts
var CustomError = class extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/errors/UsersErrors.ts
var ErrorExistUserName = class extends CustomError {
  constructor() {
    super(
      `J\xE1 existe um cadastro com esse nome!.`,
      409
    );
  }
};
var ErrorUserNameInvalid = class extends CustomError {
  constructor() {
    super(
      `Nome do usu\xE1rio, caracteres especiais permitidos s\xE3o: @, tra\xE7os e underline!.`,
      406
    );
  }
};
var ErrorUserNotFound = class extends CustomError {
  constructor() {
    super(
      `Usu\xE1rio n\xE3o encontrado ou n\xE3o existe!.`,
      404
    );
  }
};
var ErrorPasswordRegexInvalid = class extends CustomError {
  constructor() {
    super(
      `A senha deve conter no minimo 8 caracteres com no m\xE1ximo 1 digito, 1 letra mai\xFAscula, 1 letra min\xFAscula e um caracter especial. E n\xE3o pode conter espa\xE7os em branco!.`,
      406
    );
  }
};
var ErrorNotArrobaUserName = class extends CustomError {
  constructor() {
    super(
      `Por favor verifique si n\xE3o esta faltando o "@" antes do seu user_name!.`,
      406
    );
  }
};
var ErrorStringMustOnlyOneArroba = class extends CustomError {
  constructor() {
    super(
      `O nome deve ter apenas um @ que \xE9 no inicio.`,
      406
    );
  }
};

// src/use-cases/Users-cases/Edit-info-user-case.ts
var EditInfoUserCase = class {
  constructor(usersModel, bcryptAdapter) {
    this.usersModel = usersModel;
    this.bcryptAdapter = bcryptAdapter;
  }
  async edit(requestBody, idUser) {
    const {
      user_name,
      password_hash: password,
      photo_url,
      user_email
    } = requestBody;
    let validatedData = void 0;
    const userData = await this.usersModel.findUser("", idUser);
    if (!userData) {
      throw new ErrorUserNotFound();
    }
    ;
    const verifyValuesBody = user_name || password || photo_url || user_email;
    if (verifyValuesBody) {
      try {
        validatedData = await bodyEditValidation.validate(requestBody, { abortEarly: false });
      } catch (err) {
        const yupError = err;
        const validationErrors = {};
        yupError.inner.forEach((error) => {
          if (!error.path)
            return;
          validationErrors[error.path] = error.message;
        });
        return {
          message: validationErrors,
          statusCode: 400
        };
      }
      ;
    }
    ;
    const removeSpacesInString = user_name?.replaceAll(regexRemoveSpaces, "");
    if (removeSpacesInString) {
      const checkFirstCharacterHasArroba = removeSpacesInString[0].includes("@");
      const stringMustOnlyOneArroba = removeSpacesInString.substring(1).includes("@");
      if (!checkFirstCharacterHasArroba) {
        throw new ErrorNotArrobaUserName();
      }
      ;
      if (stringMustOnlyOneArroba) {
        throw new ErrorStringMustOnlyOneArroba();
      }
      ;
      if (removeSpacesInString.match(regexSpecialCharacters) !== null) {
        throw new ErrorUserNameInvalid();
      }
      ;
      const findUser = await this.usersModel.findUser(removeSpacesInString);
      if (!!findUser)
        throw new ErrorExistUserName();
    }
    ;
    let newPasswordHash = void 0;
    if (password) {
      if (password.match(regexValidatePassword) === null) {
        throw new ErrorPasswordRegexInvalid();
      }
      ;
      const newHashPassword = await this.bcryptAdapter.hashEncrypt({ password });
      newPasswordHash = newHashPassword;
    }
    ;
    await this.usersModel.editInfoUser({
      ...photo_url && { photo_url: `${process.env.API_URL}${photo_url}` },
      user_name: user_name ?? userData.user_name,
      user_email: user_email ?? userData.user_email,
      password_hash: newPasswordHash ?? userData.password_hash
    }, idUser);
    return {
      message: "Informa\xE7\xF5es editadas com sucesso.",
      statusCode: 200
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EditInfoUserCase
});
