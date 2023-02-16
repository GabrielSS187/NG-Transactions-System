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

// src/use-cases/Users-cases/Confirm-email-case.ts
var Confirm_email_case_exports = {};
__export(Confirm_email_case_exports, {
  ConfirmEmailCase: () => ConfirmEmailCase
});
module.exports = __toCommonJS(Confirm_email_case_exports);

// src/errors/CustomError.ts
var CustomError = class extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/errors/UsersErrors.ts
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

// src/use-cases/Users-cases/Confirm-email-case.ts
var ConfirmEmailCase = class {
  constructor(usersModel) {
    this.usersModel = usersModel;
  }
  async confirm(verify, codeUser) {
    const user = await this.usersModel.findUserByCode(codeUser);
    if (!user)
      throw new ErrorCodeInvalid();
    const verifyRequest = verify !== "true";
    if (verifyRequest)
      throw new ErrorVerifyInvalid();
    await this.usersModel.updateVerify(Boolean(verify), codeUser);
    return {
      message: "Email verificado com sucesso.",
      statusCode: 200
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConfirmEmailCase
});
