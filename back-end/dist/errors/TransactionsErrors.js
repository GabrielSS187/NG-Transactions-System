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

// src/errors/TransactionsErrors.ts
var TransactionsErrors_exports = {};
__export(TransactionsErrors_exports, {
  ErrorCannotSendMoneyToYourself: () => ErrorCannotSendMoneyToYourself,
  ErrorInsufficientFunds: () => ErrorInsufficientFunds,
  ErrorLookedInvalid: () => ErrorLookedInvalid,
  ErrorNotArrobaUserName: () => ErrorNotArrobaUserName,
  ErrorStandard: () => ErrorStandard,
  ErrorTransactionNotFound: () => ErrorTransactionNotFound,
  ErrorUserSendNotFound: () => ErrorUserSendNotFound,
  ErrorValueAndString: () => ErrorValueAndString,
  ErrorValueInvalid: () => ErrorValueInvalid
});
module.exports = __toCommonJS(TransactionsErrors_exports);

// src/errors/CustomError.ts
var CustomError = class extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/errors/TransactionsErrors.ts
var ErrorValueAndString = class extends CustomError {
  constructor() {
    super("S\xF3 \xE9 aceito valores n\xFAmericos!.", 406);
  }
};
var ErrorValueInvalid = class extends CustomError {
  constructor() {
    super("S\xF3 \xE9 aceito valor em string!.", 406);
  }
};
var ErrorUserSendNotFound = class extends CustomError {
  constructor() {
    super("\xD3 usu\xE1rio que voc\xEA quer enviar o dinheiro n\xE3o existe!.", 404);
  }
};
var ErrorInsufficientFunds = class extends CustomError {
  constructor() {
    super("Voc\xEA n\xE3o possui saldo suficiente para concluir a transa\xE7\xE3o!.", 406);
  }
};
var ErrorCannotSendMoneyToYourself = class extends CustomError {
  constructor() {
    super("Voc\xEA n\xE3o pode enviar dinheiro para si mesmo!.", 406);
  }
};
var ErrorTransactionNotFound = class extends CustomError {
  constructor() {
    super("Transa\xE7\xE3o n\xE3o encontrada!.", 404);
  }
};
var ErrorLookedInvalid = class extends CustomError {
  constructor() {
    super("S\xF3 \xE9 aceito valores booleanos como true ou false!.", 406);
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
  ErrorCannotSendMoneyToYourself,
  ErrorInsufficientFunds,
  ErrorLookedInvalid,
  ErrorNotArrobaUserName,
  ErrorStandard,
  ErrorTransactionNotFound,
  ErrorUserSendNotFound,
  ErrorValueAndString,
  ErrorValueInvalid
});
