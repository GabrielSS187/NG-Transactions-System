import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("Transactions", (table) => {
    table.string("id_transaction", 255).primary();
    table.string("debited_account_id", 255).notNullable();
    table.string("credited_account_id", 255).notNullable();
    table.float("value").notNullable();
    table.boolean("looked").defaultTo(false);
    table.timestamps(true, true);
    table.foreign("debited_account_id")
    .references("Accounts.id_account")
    .onDelete("CASCADE")
    .onUpdate("CASCADE");
    table.foreign("credited_account_id")
    .references("Accounts.id_account")
    .onDelete("CASCADE")
    .onUpdate("CASCADE");
  });
};

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("Transactions");
};