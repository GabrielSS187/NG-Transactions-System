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

// src/controllers/Users-controllers/Confirm-email-controller.ts
var Confirm_email_controller_exports = {};
__export(Confirm_email_controller_exports, {
  ConfirmEmailController: () => ConfirmEmailController
});
module.exports = __toCommonJS(Confirm_email_controller_exports);

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
var ErrorCodeInvalid = class extends CustomError {
  constructor() {
    super(
      `C\xF3digo invalido.`,
      406
    );
  }
};
var ErrorVerifyInvalid = class extends CustomError {
  constructor() {
    super(
      `So e aceito valor booleano!.`,
      406
    );
  }
};

// src/use-cases/Users-cases/Confirm-email-case.ts
var ConfirmEmailCase = class {
  constructor(usersModel) {
    this.usersModel = usersModel;
  }
  async confirm(verify, codeUser) {
    const user = await this.usersModel.findUserByCode(codeUser);
    if (!user)
      throw new ErrorCodeInvalid();
    const verifyRequest = verify !== "true";
    if (verifyRequest)
      throw new ErrorVerifyInvalid();
    await this.usersModel.updateVerify(Boolean(verify), codeUser);
    return {
      message: "Email verificado com sucesso.",
      statusCode: 200
    };
  }
};

// src/html/successMessageEmailValidatePage..ts
var successMessageEmail = `
<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
  <title></title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 0;
    }

    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: inherit !important;
    }

    #MessageViewBody a {
      color: inherit;
      text-decoration: none;
    }

    p {
      line-height: inherit
    }

    .desktop_hide,
    .desktop_hide table {
      mso-hide: all;
      display: none;
      max-height: 0px;
      overflow: hidden;
    }

    @media (max-width:620px) {

      .desktop_hide table.icons-inner,
      .social_block.desktop_hide .social-table {
        display: inline-block !important;
      }

      .icons-inner {
        text-align: center;
      }

      .icons-inner td {
        margin: 0 auto;
      }

      .row-content {
        width: 100% !important;
      }

      .mobile_hide {
        display: none;
      }

      .stack .column {
        width: 100%;
        display: block;
      }

      .mobile_hide {
        min-height: 0;
        max-height: 0;
        max-width: 0;
        overflow: hidden;
        font-size: 0px;
      }

      .desktop_hide,
      .desktop_hide table {
        display: table !important;
        max-height: none !important;
      }
    }
  </style>
</head>

<body
  style="background-color: transparent; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
  <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: transparent;">
    <tbody>
      <tr>
        <td>
          <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
            <tbody>
              <tr>
                <td>
                  <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0"
                    role="presentation"
                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; border-radius: 0; width: 600px;"
                    width="600">
                    <tbody>
                      <tr>
                        <td class="column column-1" width="100%"
                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; border-top: 11px solid transparent; border-right: 11px solid transparent; border-bottom: 11px solid transparent; border-left: 11px solid transparent; vertical-align: middle; padding-top: 15px; padding-bottom: 10px;">
                          <table class="html_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tr>
                              <td class="pad">
                                <div style="font-family:Arial, Helvetica Neue, Helvetica, sans-serif;text-align:center;"
                                  align="center">
                                  <div style="height:30px;">&nbsp;</div>
                                </div>
                              </td>
                            </tr>
                          </table>
                          <table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tr>
                              <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                <div class="alignment" align="center" style="line-height:10px"><img
                                    src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/916972_901322/transactions-logo-3.png"
                                    style="display: block; height: auto; border: 0; width: 260px; max-width: 100%;"
                                    width="260"></div>
                              </td>
                            </tr>
                          </table>
                          <table class="heading_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tr>
                              <td class="pad">
                                <h1
                                  style="margin: 0; color: #04d643; font-size: 25px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; line-height: 120%; text-align: center; direction: ltr; font-weight: 700; letter-spacing: normal; margin-top: 0; margin-bottom: 0;">
                                  <span class="tinyMce-placeholder">Obrigado por confirmar o email</span></h1>
                              </td>
                            </tr>
                          </table>
                          <table class="heading_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tr>
                              <td class="pad" style="width:100%;text-align:center;">
                                <h1
                                  style="margin: 0; color: #000000; font-size: 14px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; line-height: 120%; text-align: center; direction: ltr; font-weight: 700; letter-spacing: normal; margin-top: 0; margin-bottom: 0;">
                                  <span class="tinyMce-placeholder">Volte para o site para continuar usando sua
                                    conta.</span></h1>
                              </td>
                            </tr>
                          </table>
                          <table class="text_block block-5" width="100%" border="0" cellpadding="10" cellspacing="0"
                            role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                            <tr>
                              <td class="pad">
                                <div style="font-family: sans-serif">
                                  <div class
                                    style="font-size: 12px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
                                    <p
                                      style="margin: 0; font-size: 12px; text-align: center; mso-line-height-alt: 14.399999999999999px;">
                                      <span style="color:#555555;">Visite meu site ou linkedin:</span></p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </table>
                          <table class="social_block block-6" width="100%" border="0" cellpadding="5" cellspacing="0"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tr>
                              <td class="pad">
                                <div class="alignment" align="center">
                                  <table class="social-table" width="94px" border="0" cellpadding="0" cellspacing="0"
                                    role="presentation"
                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
                                    <tr>
                                      <td style="padding:0 15px 0 0px;"><a
                                          href="https://www.linkedin.com/in/gabriel-silva-souza-developer/"
                                          target="_blank"><img
                                            src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/linkedin@2x.png"
                                            width="32" height="32" alt="LinkedIn" title="LinkedIn"
                                            style="display: block; height: auto; border: 0;"></a></td>
                                      <td style="padding:0 15px 0 0px;"><a
                                          href="https://my-site-portfolio-dev.vercel.app/" target="_blank"><img
                                            src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/website@2x.png"
                                            width="32" height="32" alt="Web Site" title="Web Site"
                                            style="display: block; height: auto; border: 0;"></a></td>
                                    </tr>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
</body>

</html>
`;

// src/controllers/Users-controllers/Confirm-email-controller.ts
var ConfirmEmailController = class {
  async confirm(req, res) {
    const { verify, codeUser } = req.params;
    const createUsersRepository = new CreateUsersRepository();
    const confirmEmailCase = new ConfirmEmailCase(
      createUsersRepository
    );
    const result = await confirmEmailCase.confirm(verify, codeUser);
    if (result.statusCode === 200) {
      return res.status(200).send(successMessageEmail);
    }
    ;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConfirmEmailController
});
