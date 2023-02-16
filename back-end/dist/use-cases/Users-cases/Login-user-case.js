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

// src/use-cases/Users-cases/Login-user-case.ts
var Login_user_case_exports = {};
__export(Login_user_case_exports, {
  LoginUserCase: () => LoginUserCase
});
module.exports = __toCommonJS(Login_user_case_exports);

// src/errors/CustomError.ts
var CustomError = class extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/errors/UsersErrors.ts
var ErrorLogin = class extends CustomError {
  constructor() {
    super(
      `Os campos de nome do usu\xE1rio e senha s\xE3o obrigat\xF3rios!.`,
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
var ErrorNotArrobaUserName = class extends CustomError {
  constructor() {
    super(
      `Por favor verifique si n\xE3o esta faltando o "@" antes do seu user_name!.`,
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

// src/use-cases/Users-cases/Login-user-case.ts
var LoginUserCase = class {
  constructor(usersModel, jwtAdapter, bcryptAdapter) {
    this.usersModel = usersModel;
    this.jwtAdapter = jwtAdapter;
    this.bcryptAdapter = bcryptAdapter;
  }
  async login(request) {
    const { user_name, password } = request;
    if (!user_name || !password) {
      throw new ErrorLogin();
    }
    ;
    const checkFirstCharacterHasArroba = user_name.trim()[0].includes("@");
    if (!checkFirstCharacterHasArroba) {
      throw new ErrorNotArrobaUserName();
    }
    ;
    const findUser = await this.usersModel.findUser(user_name);
    if (!findUser)
      throw new ErrorUserNotFound();
    if (findUser.verify === false) {
      throw new ErrorConfirmEmail();
    }
    ;
    const verifyPasswordHash = await this.bcryptAdapter.compareHash({
      password: password.trim(),
      passwordDatabase: findUser.password_hash
    });
    if (!verifyPasswordHash)
      throw new ErrorPasswordInvalid();
    const token = this.jwtAdapter.generateToken({ id: findUser.id_user });
    const user = {
      user_name,
      token
    };
    return {
      user,
      statusCode: 200
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LoginUserCase
});
