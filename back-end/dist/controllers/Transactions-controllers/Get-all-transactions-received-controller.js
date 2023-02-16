"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/controllers/Transactions-controllers/Get-all-transactions-received-controller.ts
var Get_all_transactions_received_controller_exports = {};
__export(Get_all_transactions_received_controller_exports, {
  GetAllTransactionsReceivedController: () => GetAllTransactionsReceivedController
});
module.exports = __toCommonJS(Get_all_transactions_received_controller_exports);

// src/data/Database.ts
var import_knex = __toESM(require("knex"));

// knexfile.ts
var import_process = require("process");
var configKnexDatabase = {
  development: {
    client: "pg",
    connection: import_process.env.DATABASE_URL,
    searchPath: ["knex", "public"],
    migrations: {
      tableName: "knex_migrations",
      directory: `${__dirname}/src/data/migrations`,
      extension: "ts"
    },
    pool: {
      min: 2,
      max: 10
    }
  }
};
var knexfile_default = configKnexDatabase;

// src/data/Database.ts
var Database = class {
};
__publicField(Database, "connection", (0, import_knex.default)(knexfile_default.development));

// src/utils/generate-id.ts
var import_uuid = require("uuid");
var generateId = () => (0, import_uuid.v4)();

// src/utils/formatData.ts
var formatDate = (data, style) => {
  const date = data.toLocaleDateString(
    "pt-BR",
    { dateStyle: style }
  );
  return date;
};
var formatHours = (date) => {
  const time = date.toLocaleTimeString("pt-BR", {
    timeStyle: "short",
    hour12: false,
    numberingSystem: "latn"
  });
  return time;
};

// src/repositories/Transactions-repository.ts
var TransactionsRepository = class extends Database {
  #tableNames = {
    user: "Users",
    Transactions: "Transactions",
    account: "Accounts"
  };
  async findUser(idUser, userName) {
    if (userName) {
      const [foundUser2] = await Database.connection(this.#tableNames.user).select("id_user", "photo_url", "user_name", "user_email", "account_id").where("user_name", userName);
      return foundUser2;
    }
    ;
    const [foundUser] = await Database.connection(this.#tableNames.user).select("id_user", "photo_url", "user_name", "user_email", "account_id").where("id_user", idUser);
    return foundUser;
  }
  async findAccount(idAccount) {
    const [foundAccount] = await Database.connection(this.#tableNames.account).where("id_account", idAccount);
    return foundAccount;
  }
  async findTransaction(id_transaction) {
    const [transaction] = await Database.connection(this.#tableNames.Transactions).where("id_transaction", id_transaction);
    return transaction;
  }
  async updateBalance(data) {
    await Database.connection(this.#tableNames.account).update("balance", data.value).where("id_account", data.id_account);
  }
  //* Criar uma nova transação. 
  async create(data) {
    await Database.connection(this.#tableNames.Transactions).insert({
      id_transaction: generateId(),
      ...data,
      looked: false
    });
  }
  async getAllTransactionsSent(idUser) {
    const transactionsListFormatted = [];
    const transactionsSent = await Database.connection(`${this.#tableNames.user} as U`).select("T.id_transaction", "T.credited_account_id", "T.value", "T.created_at").innerJoin("Transactions as T", "U.account_id", "T.debited_account_id").where("id_user", idUser).orderBy("created_at", "desc");
    for (let i = 0; i < transactionsSent.length; i++) {
      const [transaction] = await Database.connection("Users").select("user_name", "photo_url").where("account_id", transactionsSent[i].credited_account_id);
      const formattedTransactionObj = {
        id_transaction: transactionsSent[i].id_transaction,
        photo_url: transaction.photo_url,
        user_name_credited: transaction.user_name,
        value_sent: transactionsSent[i].value.toFixed(2),
        created_at: formatDate(transactionsSent[i].created_at, "short"),
        hour: formatHours(transactionsSent[i].created_at)
      };
      transactionsListFormatted.push(formattedTransactionObj);
    }
    ;
    return transactionsListFormatted;
  }
  async getAllTransactionsReceived(idUser) {
    const listTransactionsReceived = [];
    const transactionsReceived = await Database.connection(`${this.#tableNames.Transactions} as T`).select("T.id_transaction", "T.debited_account_id", "T.value", "T.looked", "T.created_at").innerJoin("Users as U", "U.account_id", "T.credited_account_id").where("U.id_user", idUser).orderBy("T.created_at", "desc");
    for (let i = 0; i < transactionsReceived.length; i++) {
      const [transaction] = await Database.connection("Users").select("user_name", "photo_url").where("account_id", transactionsReceived[i].debited_account_id);
      const objFormatted = {
        id_transaction: transactionsReceived[i].id_transaction,
        photo_url: transaction.photo_url,
        user_name_debited: transaction.user_name,
        value_received: transactionsReceived[i].value.toFixed(2),
        looked: transactionsReceived[i].looked,
        created_at: formatDate(transactionsReceived[i].created_at, "short"),
        hour: formatHours(transactionsReceived[i].created_at)
      };
      listTransactionsReceived.push(objFormatted);
    }
    ;
    return listTransactionsReceived;
  }
  //* Atualizar visto.
  async updateLooked({ id_transaction, looked }) {
    await Database.connection(this.#tableNames.Transactions).update("looked", looked).where("id_transaction", id_transaction);
  }
  //* Teste
  async getAllTransactionsReceivedAndSent(idUser) {
    const sent = await this.getAllTransactionsSent(idUser);
    const received = await this.getAllTransactionsReceived(idUser);
    const merge = [...sent, ...received];
    return merge;
  }
  //* =============================================================
};

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

// src/use-cases/Transactions-cases/Get-all-transactions-received-case.ts
var GetAllTransactionsReceivedCase = class {
  constructor(transactionsModel) {
    this.transactionsModel = transactionsModel;
  }
  async get({ idUserLogged, user_name_filter, date_filter }) {
    const transactionsSent = await this.transactionsModel.getAllTransactionsReceived(idUserLogged);
    if (user_name_filter) {
      const checkFirstCharacterHasArroba = user_name_filter.trim()[0].includes("@");
      if (!checkFirstCharacterHasArroba) {
        throw new ErrorNotArrobaUserName();
      }
      ;
      const transactionsSentFilterName = transactionsSent.filter((transaction) => {
        return transaction.user_name_debited.toLocaleLowerCase().includes(user_name_filter.trim().toLocaleLowerCase());
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

// src/controllers/Transactions-controllers/Get-all-transactions-received-controller.ts
var GetAllTransactionsReceivedController = class {
  async get(req, res) {
    const idUserLogged = Number(req?.userId);
    const user_name_filter = req.query.user_name_filter;
    const date_filter = req.query.date_filter;
    const transactionsRepository = new TransactionsRepository();
    const getAllTransactionsReceivedCase = new GetAllTransactionsReceivedCase(
      transactionsRepository
    );
    const result = await getAllTransactionsReceivedCase.get({ idUserLogged, user_name_filter, date_filter });
    return res.status(result.statusCode).json(result.transactionsSent);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetAllTransactionsReceivedController
});
