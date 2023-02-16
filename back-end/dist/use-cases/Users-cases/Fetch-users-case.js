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

// src/use-cases/Users-cases/Fetch-users-case.ts
var Fetch_users_case_exports = {};
__export(Fetch_users_case_exports, {
  FetchUsersCase: () => FetchUsersCase
});
module.exports = __toCommonJS(Fetch_users_case_exports);

// src/errors/CustomError.ts
var CustomError = class extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/errors/UsersErrors.ts
var ErrorNotArrobaUserName = class extends CustomError {
  constructor() {
    super(
      `Por favor verifique si n\xE3o esta faltando o "@" antes do seu user_name!.`,
      406
    );
  }
};

// src/use-cases/Users-cases/Fetch-users-case.ts
var FetchUsersCase = class {
  constructor(usersModel) {
    this.usersModel = usersModel;
  }
  async find(request) {
    let { user_id_logged, user_name } = request;
    const checkFirstCharacterHasArroba = user_name.trim()[0].includes("@");
    if (!checkFirstCharacterHasArroba) {
      throw new ErrorNotArrobaUserName();
    }
    ;
    ;
    const usersList = await this.usersModel.fetchUsers(user_name.trim().toLocaleLowerCase());
    const removeUserLoggedInListView = usersList.filter((user) => {
      if (user.id_user !== user_id_logged)
        return user;
    });
    return {
      list: removeUserLoggedInListView,
      statusCode: 200
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FetchUsersCase
});
