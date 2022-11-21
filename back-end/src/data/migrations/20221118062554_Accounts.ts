import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("Accounts", (table) => {
    table.string("id_account", 255).primary();
    table.float("balance").notNullable().defaultTo(0);
  });
};

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("Accounts");
};