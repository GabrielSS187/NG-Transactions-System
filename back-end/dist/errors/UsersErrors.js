"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/errors/UsersErrors.ts
var UsersErrors_exports = {};
__export(UsersErrors_exports, {
  ErrorCodeInvalid: () => ErrorCodeInvalid,
  ErrorConfirmEmail: () => ErrorConfirmEmail,
  ErrorEmailRequired: () => ErrorEmailRequired,
  ErrorEmailSameAsAlreadyBe: () => ErrorEmailSameAsAlreadyBe,
  ErrorExistUserEmail: () => ErrorExistUserEmail,
  ErrorExistUserName: () => ErrorExistUserName,
  ErrorInvalidEmail: () => ErrorInvalidEmail,
  ErrorLogin: () => ErrorLogin,
  ErrorNewPasswordRequired: () => ErrorNewPasswordRequired,
  ErrorNotArrobaUserName: () => ErrorNotArrobaUserName,
  ErrorPasswordInvalid: () => ErrorPasswordInvalid,
  ErrorPasswordRegexInvalid: () => ErrorPasswordRegexInvalid,
  ErrorStandard: () => ErrorStandard,
  ErrorStringMustOnlyOneArroba: () => ErrorStringMustOnlyOneArroba,
  ErrorUserEmailNotFound: () => ErrorUserEmailNotFound,
  ErrorUserNameInvalid: () => ErrorUserNameInvalid,
  ErrorUserNotFound: () => ErrorUserNotFound,
  ErrorVerifyInvalid: () => ErrorVerifyInvalid
});
module.exports = __toCommonJS(UsersErrors_exports);

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
var ErrorExistUserEmail = class extends CustomError {
  constructor() {
    super(
      `J\xE1 existe um cadastro com esse email!.`,
      409
    );
  }
};
var ErrorUserEmailNotFound = class extends CustomError {
  constructor() {
    super(
      `Email n\xE3o encontrado!.`,
      404
    );
  }
};
var ErrorLogin = class extends CustomError {
  constructor() {
    super(
      `Os campos de nome do usu\xE1rio e senha s\xE3o obrigat\xF3rios!.`,
      406
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
var ErrorPasswordInvalid = class extends CustomError {
  constructor() {
    super(
      `Senha invalida!.`,
      406
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
var ErrorCodeInvalid = class extends CustomError {
  constructor() {
    super(
      `C\xF3digo invalido.`,
      406
    );
  }
};
var ErrorVerifyInvalid = class extends CustomError {
  constructor() {
    super(
      `So e aceito valor booleano!.`,
      406
    );
  }
};
var ErrorInvalidEmail = class extends CustomError {
  constructor() {
    super(
      `Esse email n\xE3o \xE9 valido!.`,
      406
    );
  }
};
var ErrorEmailSameAsAlreadyBe = class extends CustomError {
  constructor() {
    super(
      `Escolha um email diferente do que j\xE1 esta!.`,
      409
    );
  }
};
var ErrorEmailRequired = class extends CustomError {
  constructor() {
    super(
      `Email obrigat\xF3rio!.`,
      406
    );
  }
};
var ErrorConfirmEmail = class extends CustomError {
  constructor() {
    super(
      `Por favor confirme seu email!.`,
      406
    );
  }
};
var ErrorNewPasswordRequired = class extends CustomError {
  constructor() {
    super(
      `Nova senha \xE9 obrigat\xF3rio!`,
      406
    );
  }
};
var ErrorStandard = class extends CustomError {
  constructor() {
    super(
      `Ops! algo deu errado. Por favor tente de novo mais tarde!.`,
      500
    );
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ErrorCodeInvalid,
  ErrorConfirmEmail,
  ErrorEmailRequired,
  ErrorEmailSameAsAlreadyBe,
  ErrorExistUserEmail,
  ErrorExistUserName,
  ErrorInvalidEmail,
  ErrorLogin,
  ErrorNewPasswordRequired,
  ErrorNotArrobaUserName,
  ErrorPasswordInvalid,
  ErrorPasswordRegexInvalid,
  ErrorStandard,
  ErrorStringMustOnlyOneArroba,
  ErrorUserEmailNotFound,
  ErrorUserNameInvalid,
  ErrorUserNotFound,
  ErrorVerifyInvalid
});
