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

// src/controllers/Users-controllers/Edit-info-user-controller.ts
var Edit_info_user_controller_exports = {};
__export(Edit_info_user_controller_exports, {
  EditInfoUserController: () => EditInfoUserController
});
module.exports = __toCommonJS(Edit_info_user_controller_exports);

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

// src/use-cases/Users-cases/Validations.ts
var yup = __toESM(require("yup"));
var bodyValidation = yup.object().shape({
  user_name: yup.string().required().min(5).max(100).trim(),
  user_email: yup.string().required().email().trim(),
  password: yup.string().required().min(8).trim()
});
var bodyEditValidation = yup.object().shape({
  photo_url: yup.string(),
  user_name: yup.string().min(5).max(100).trim(),
  user_email: yup.string().email().trim(),
  password_hash: yup.string().min(8).trim(),
  verify: yup.boolean()
});
var regexSpecialCharacters = /[*.\=#\¨!\<>\.^\~()\&$\¬{}\;:\°ª\?/\[£\]%\¢|\+]/gi;
var regexValidatePassword = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/g;
var regexRemoveSpaces = /\s/g;

// src/errors/CustomError.ts
var CustomError = class extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/errors/UsersErrors.ts
var ErrorExistUserName = class extends CustomError {
  constructor() {
    super(
      `J\xE1 existe um cadastro com esse nome!.`,
      409
    );
  }
};
var ErrorUserNameInvalid = class extends CustomError {
  constructor() {
    super(
      `Nome do usu\xE1rio, caracteres especiais permitidos s\xE3o: @, tra\xE7os e underline!.`,
      406
    );
  }
};
var ErrorUserNotFound = class extends CustomError {
  constructor() {
    super(
      `Usu\xE1rio n\xE3o encontrado ou n\xE3o existe!.`,
      404
    );
  }
};
var ErrorPasswordRegexInvalid = class extends CustomError {
  constructor() {
    super(
      `A senha deve conter no minimo 8 caracteres com no m\xE1ximo 1 digito, 1 letra mai\xFAscula, 1 letra min\xFAscula e um caracter especial. E n\xE3o pode conter espa\xE7os em branco!.`,
      406
    );
  }
};
var ErrorNotArrobaUserName = class extends CustomError {
  constructor() {
    super(
      `Por favor verifique si n\xE3o esta faltando o "@" antes do seu user_name!.`,
      406
    );
  }
};
var ErrorStringMustOnlyOneArroba = class extends CustomError {
  constructor() {
    super(
      `O nome deve ter apenas um @ que \xE9 no inicio.`,
      406
    );
  }
};

// src/use-cases/Users-cases/Edit-info-user-case.ts
var EditInfoUserCase = class {
  constructor(usersModel, bcryptAdapter) {
    this.usersModel = usersModel;
    this.bcryptAdapter = bcryptAdapter;
  }
  async edit(requestBody, idUser) {
    const {
      user_name,
      password_hash: password,
      photo_url,
      user_email
    } = requestBody;
    let validatedData = void 0;
    const userData = await this.usersModel.findUser("", idUser);
    if (!userData) {
      throw new ErrorUserNotFound();
    }
    ;
    const verifyValuesBody = user_name || password || photo_url || user_email;
    if (verifyValuesBody) {
      try {
        validatedData = await bodyEditValidation.validate(requestBody, { abortEarly: false });
      } catch (err) {
        const yupError = err;
        const validationErrors = {};
        yupError.inner.forEach((error) => {
          if (!error.path)
            return;
          validationErrors[error.path] = error.message;
        });
        return {
          message: validationErrors,
          statusCode: 400
        };
      }
      ;
    }
    ;
    const removeSpacesInString = user_name?.replaceAll(regexRemoveSpaces, "");
    if (removeSpacesInString) {
      const checkFirstCharacterHasArroba = removeSpacesInString[0].includes("@");
      const stringMustOnlyOneArroba = removeSpacesInString.substring(1).includes("@");
      if (!checkFirstCharacterHasArroba) {
        throw new ErrorNotArrobaUserName();
      }
      ;
      if (stringMustOnlyOneArroba) {
        throw new ErrorStringMustOnlyOneArroba();
      }
      ;
      if (removeSpacesInString.match(regexSpecialCharacters) !== null) {
        throw new ErrorUserNameInvalid();
      }
      ;
      const findUser = await this.usersModel.findUser(removeSpacesInString);
      if (!!findUser)
        throw new ErrorExistUserName();
    }
    ;
    let newPasswordHash = void 0;
    if (password) {
      if (password.match(regexValidatePassword) === null) {
        throw new ErrorPasswordRegexInvalid();
      }
      ;
      const newHashPassword = await this.bcryptAdapter.hashEncrypt({ password });
      newPasswordHash = newHashPassword;
    }
    ;
    await this.usersModel.editInfoUser({
      ...photo_url && { photo_url: `${process.env.API_URL}${photo_url}` },
      user_name: user_name ?? userData.user_name,
      user_email: user_email ?? userData.user_email,
      password_hash: newPasswordHash ?? userData.password_hash
    }, idUser);
    return {
      message: "Informa\xE7\xF5es editadas com sucesso.",
      statusCode: 200
    };
  }
};

// src/adapters/Bcrypt-adapter/Bcrypt-adapter.ts
var import_process2 = require("process");
var bcrypt = __toESM(require("bcryptjs"));
var BCryptAdapter = class {
  async hashEncrypt({ password }) {
    const rounds = Number(import_process2.env.BCRYPT_COST);
    const salt = await bcrypt.genSalt(rounds);
    const result = await bcrypt.hash(password, salt);
    return result;
  }
  async compareHash({ password, passwordDatabase }) {
    const result = await bcrypt.compare(password, passwordDatabase);
    return result;
  }
};

// src/controllers/Users-controllers/Edit-info-user-controller.ts
var EditInfoUserController = class {
  async edit(req, res) {
    const idUser = req.userId;
    let photo_url;
    if (req.file) {
      const requestImage = req.file;
      const image = requestImage.filename;
      photo_url = `/files/${image}`;
    }
    ;
    const {
      user_name,
      user_email,
      password_hash,
      verify
    } = req.body;
    const createUsersRepository = new CreateUsersRepository();
    const bcryptAdapter = new BCryptAdapter();
    const editInfoUserCase = new EditInfoUserCase(
      createUsersRepository,
      bcryptAdapter
    );
    const result = await editInfoUserCase.edit({
      photo_url,
      user_name,
      user_email,
      password_hash,
      verify
    }, idUser);
    return res.status(result.statusCode).json(result.message);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EditInfoUserController
});
