import knex from "knex";
import knexConfigDatabase  from "../config/knexfile";

export class Database {
 protected static connection = knex(knexConfigDatabase.development);
};