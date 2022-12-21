import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("Users", (table) => {
    table.increments("id_user").primary();
    table.string("photo_url", 200).nullable()
    .defaultTo("https://www.logolynx.com/images/logolynx/e5/e5ba79334133d2cb362dd639f755a392.png");
    table.string("user_name", 200).notNullable().unique();
    table.string("user_email", 255).notNullable().unique();
    table.string("password_hash", 255).notNullable();
    table.string("account_id", 255).unique().unsigned();
    table.boolean("verify").notNullable();
    table.string("code", 255).notNullable().unique();
    table.timestamps(true, true);
    table.foreign("account_id")
    .references("Accounts.id_account")
    .onDelete("CASCADE")
    .onUpdate("CASCADE");
  });
};

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("Users");
};