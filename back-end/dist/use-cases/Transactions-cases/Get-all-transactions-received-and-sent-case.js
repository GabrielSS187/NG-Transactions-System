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

// src/use-cases/Transactions-cases/Get-all-transactions-received-and-sent-case.ts
var Get_all_transactions_received_and_sent_case_exports = {};
__export(Get_all_transactions_received_and_sent_case_exports, {
  GetAllTransactionsReceivedAndSentCase: () => GetAllTransactionsReceivedAndSentCase
});
module.exports = __toCommonJS(Get_all_transactions_received_and_sent_case_exports);
var GetAllTransactionsReceivedAndSentCase = class {
  constructor(transactionsModel) {
    this.transactionsModel = transactionsModel;
  }
  async get(idUserLogged) {
    const transactions = await this.transactionsModel.getAllTransactionsReceivedAndSent(idUserLogged);
    return {
      transactions,
      statusCode: 200
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetAllTransactionsReceivedAndSentCase
});
