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

// src/data/migrations/20221118062554_Accounts.ts
var Accounts_exports = {};
__export(Accounts_exports, {
  down: () => down,
  up: () => up
});
module.exports = __toCommonJS(Accounts_exports);
async function up(knex) {
  return knex.schema.createTable("Accounts", (table) => {
    table.string("id_account", 255).primary();
    table.float("balance").notNullable().defaultTo(0);
  });
}
async function down(knex) {
  return knex.schema.dropTable("Accounts");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  down,
  up
});
