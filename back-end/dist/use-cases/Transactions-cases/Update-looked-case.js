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

// src/use-cases/Transactions-cases/Update-looked-case.ts
var Update_looked_case_exports = {};
__export(Update_looked_case_exports, {
  UpdateLookedCase: () => UpdateLookedCase
});
module.exports = __toCommonJS(Update_looked_case_exports);

// src/errors/CustomError.ts
var CustomError = class extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/errors/TransactionsErrors.ts
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

// src/use-cases/Transactions-cases/Update-looked-case.ts
var UpdateLookedCase = class {
  constructor(transactionsModel) {
    this.transactionsModel = transactionsModel;
  }
  async update({ id_transaction, looked }) {
    const transaction = await this.transactionsModel.findTransaction(id_transaction);
    if (!transaction) {
      throw new ErrorTransactionNotFound();
    }
    ;
    if (typeof looked !== "boolean") {
      throw new ErrorLookedInvalid();
    }
    ;
    await this.transactionsModel.updateLooked({ id_transaction, looked });
    return {
      message: "Visto da transa\xE7\xE3o atualizado.",
      statusCode: 200
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UpdateLookedCase
});
