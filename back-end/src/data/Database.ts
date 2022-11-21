import knex from "knex";
import knexConfigDatabase  from "./knexfile";

export class Database {
 protected static connection = knex(knexConfigDatabase.development);
};