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

// src/data/migrations/20221118062650_Users.ts
var Users_exports = {};
__export(Users_exports, {
  down: () => down,
  up: () => up
});
module.exports = __toCommonJS(Users_exports);
async function up(knex) {
  return knex.schema.createTable("Users", (table) => {
    table.increments("id_user").primary();
    table.string("photo_url", 255).notNullable();
    table.string("user_name", 200).notNullable().unique();
    table.string("user_email", 255).notNullable().unique();
    table.string("password_hash", 255).notNullable();
    table.string("account_id", 255).unique().unsigned();
    table.boolean("verify").notNullable();
    table.string("code", 255).notNullable().unique();
    table.timestamps(true, true);
    table.foreign("account_id").references("Accounts.id_account").onDelete("CASCADE").onUpdate("CASCADE");
  });
}
async function down(knex) {
  return knex.schema.dropTable("Users");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  down,
  up
});
