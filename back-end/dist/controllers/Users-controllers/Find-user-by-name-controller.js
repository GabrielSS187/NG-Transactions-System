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

// src/controllers/Users-controllers/Find-user-by-name-controller.ts
var Find_user_by_name_controller_exports = {};
__export(Find_user_by_name_controller_exports, {
  FindUserByNameController: () => FindUserByNameController
});
module.exports = __toCommonJS(Find_user_by_name_controller_exports);

// src/data/Database.ts
var import_knex = __toESM(require("knex"));

// src/config/knexfile.ts
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

// src/repositories/Users-repository.ts
var CreateUsersRepository = class extends Database {
  #tableNames = {
    user: "Users",
    account: "Accounts"
  };
  //* Criar, editar, deletar usuário ================================================
  async createAccount(accountId) {
    await Database.connection(this.#tableNames.account).insert({
      id_account: accountId,
      balance: 100
    });
  }
  //* Criar um novo usuário.
  async create(data) {
    await this.createAccount(data.account_id);
    await Database.connection(this.#tableNames.user).insert({ ...data, verify: false });
  }
  async deleteAccount(idUser) {
    const [user] = await Database.connection(this.#tableNames.user).where("id_user", idUser);
    await Database.connection(this.#tableNames.account).delete().where("id_account", user.account_id);
  }
  async editInfoUser(data, idUser) {
    await Database.connection(this.#tableNames.user).update(data).where("id_user", idUser);
  }
  async updateVerify(verify, codeUser) {
    await Database.connection(this.#tableNames.user).update("verify", verify).where("code", codeUser);
    if (verify === true) {
      await Database.connection(this.#tableNames.user).update("code", generateId()).where("code", codeUser);
    }
    ;
  }
  //* ===============================================
  //* Buscar ou achar usuários ======================
  async findUser(userName, userId) {
    if (userId) {
      const [foundUser2] = await Database.connection(`${this.#tableNames.user} as U`).select("U.id_user", "U.photo_url", "U.user_name", "U.user_email", "U.account_id", "U.password_hash", "U.verify", "A.balance").innerJoin("Accounts as A", "U.account_id", "A.id_account").where("U.id_user", userId);
      const objFormatted = {
        id_user: foundUser2.id_user,
        photo_url: foundUser2.photo_url,
        user_name: foundUser2.user_name,
        user_email: foundUser2.user_email,
        password_hash: foundUser2.password_hash,
        verify: foundUser2.verify,
        account_id: foundUser2.account_id,
        balance: foundUser2.balance
      };
      return objFormatted;
    }
    ;
    const [foundUser] = await Database.connection(`${this.#tableNames.user} as U`).select("id_user", "photo_url", "user_name", "user_email", "account_id", "password_hash", "verify").where("U.user_name", userName);
    return foundUser;
  }
  async findUserByCode(codeUser) {
    const [foundUser] = await Database.connection(this.#tableNames.user).select("id_user", "user_name", "user_email", "code", "verify").where("code", codeUser);
    return foundUser;
  }
  async findUserByEmail(userEmail) {
    const [userFound] = await Database.connection(this.#tableNames.user).select("id_user", "photo_url", "user_email", "user_name", "account_id", "verify", "code").where("user_email", userEmail);
    return userFound;
  }
  async fetchUsers(user_name) {
    const users = await Database.connection(this.#tableNames.user).select("id_user", "photo_url", "user_email", "user_name", "account_id").where("user_name", "ilike", `%${user_name}%`).where("verify", true);
    return users;
  }
  //* ====================================================
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
var ErrorUserNotFound = class extends CustomError {
  constructor() {
    super(
      `Usu\xE1rio n\xE3o encontrado ou n\xE3o existe!.`,
      404
    );
  }
};

// src/use-cases/Users-cases/Find-user-by-name.ts
var FindUserByNameCase = class {
  constructor(usersModel) {
    this.usersModel = usersModel;
  }
  async find(userName) {
    const user = await this.usersModel.findUser(userName);
    if (!user) {
      throw new ErrorUserNotFound();
    }
    ;
    const objFormatted = {
      user_name: user.user_name,
      user_email: user.user_email,
      verify: user.verify
    };
    return {
      user: objFormatted,
      statusCode: 200
    };
  }
};

// src/controllers/Users-controllers/Find-user-by-name-controller.ts
var FindUserByNameController = class {
  async find(req, res) {
    const { name } = req.params;
    const createUsersRepository = new CreateUsersRepository();
    const findUserByNameCase = new FindUserByNameCase(createUsersRepository);
    const result = await findUserByNameCase.find(name);
    return res.status(result.statusCode).json(result.user);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FindUserByNameController
});
