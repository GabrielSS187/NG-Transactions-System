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

// src/data/migrations/20221118062616_Transactions.ts
var Transactions_exports = {};
__export(Transactions_exports, {
  down: () => down,
  up: () => up
});
module.exports = __toCommonJS(Transactions_exports);
async function up(knex) {
  return knex.schema.createTable("Transactions", (table) => {
    table.string("id_transaction", 255).primary();
    table.string("debited_account_id", 255).notNullable();
    table.string("credited_account_id", 255).notNullable();
    table.float("value").notNullable();
    table.boolean("looked").defaultTo(false);
    table.timestamps(true, true);
    table.foreign("debited_account_id").references("Accounts.id_account").onDelete("CASCADE").onUpdate("CASCADE");
    table.foreign("credited_account_id").references("Accounts.id_account").onDelete("CASCADE").onUpdate("CASCADE");
  });
}
async function down(knex) {
  return knex.schema.dropTable("Transactions");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  down,
  up
});
