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

// src/use-cases/Users-cases/Find-user-by-name.ts
var Find_user_by_name_exports = {};
__export(Find_user_by_name_exports, {
  FindUserByNameCase: () => FindUserByNameCase
});
module.exports = __toCommonJS(Find_user_by_name_exports);

// src/errors/CustomError.ts
var CustomError = class extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/errors/UsersErrors.ts
var ErrorUserNotFound = class extends CustomError {
  constructor() {
    super(
      `Usu\xE1rio n\xE3o encontrado ou n\xE3o existe!.`,
      404
    );
  }
};

// src/use-cases/Users-cases/Find-user-by-name.ts
var FindUserByNameCase = class {
  constructor(usersModel) {
    this.usersModel = usersModel;
  }
  async find(userName) {
    const user = await this.usersModel.findUser(userName);
    if (!user) {
      throw new ErrorUserNotFound();
    }
    ;
    const objFormatted = {
      user_name: user.user_name,
      user_email: user.user_email,
      verify: user.verify
    };
    return {
      user: objFormatted,
      statusCode: 200
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FindUserByNameCase
});
