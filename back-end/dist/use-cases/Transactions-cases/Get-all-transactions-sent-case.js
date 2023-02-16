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

// src/use-cases/Transactions-cases/Get-all-transactions-sent-case.ts
var Get_all_transactions_sent_case_exports = {};
__export(Get_all_transactions_sent_case_exports, {
  GetAllTransactionsSentCase: () => GetAllTransactionsSentCase
});
module.exports = __toCommonJS(Get_all_transactions_sent_case_exports);

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

// src/use-cases/Transactions-cases/Get-all-transactions-sent-case.ts
var GetAllTransactionsSentCase = class {
  constructor(transactionsModel) {
    this.transactionsModel = transactionsModel;
  }
  async get({ idUserLogged, user_name_filter, date_filter }) {
    const transactionsSent = await this.transactionsModel.getAllTransactionsSent(idUserLogged);
    if (user_name_filter) {
      const checkFirstCharacterHasArroba = user_name_filter.trim()[0].includes("@");
      if (!checkFirstCharacterHasArroba) {
        throw new ErrorNotArrobaUserName();
      }
      ;
      const transactionsSentFilterName = transactionsSent.filter((transaction) => {
        return transaction.user_name_credited.toLocaleLowerCase().includes(user_name_filter.trim().toLocaleLowerCase());
      }).filter((transaction) => {
        if (date_filter) {
          return transaction.created_at === date_filter.trim();
        }
        ;
        return transaction;
      });
      return {
        transactionsSent: transactionsSentFilterName,
        statusCode: 200
      };
    }
    ;
    if (date_filter) {
      const transactionsSentFilterDate = transactionsSent.filter((transaction) => {
        return transaction.created_at === date_filter.trim();
      });
      return {
        transactionsSent: transactionsSentFilterDate,
        statusCode: 200
      };
    }
    ;
    return {
      transactionsSent,
      statusCode: 200
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetAllTransactionsSentCase
});
