"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/server.ts
var import_express = __toESM(require("express"));
var import_cors = __toESM(require("cors"));
var import_dotenv = __toESM(require("dotenv"));
var import_path = __toESM(require("path"));

// src/services/translationsYup.ts
var import_yup = require("yup");
(0, import_yup.setLocale)({
  mixed: {
    required: "Este campo \xE9 obrigat\xF3rio",
    notType: "Formato digitado \xE9 invalido",
    defined: "Este campo precisa ter um valor definido",
    oneOf: "Deve ser um dos seguintes valores: ${values}",
    notOneOf: "N\xE3o pode ser um dos seguintes valores: ${values}"
  },
  string: {
    lowercase: "Deve estar em mai\xFAsculo",
    uppercase: "Deve estar em min\xFAsculo",
    url: "Deve ter um formato de URL v\xE1lida",
    max: "Deve ter no m\xE1ximo ${max} caracteres",
    min: "Deve ter pelo menos ${min} caracteres",
    email: "Formato de e-mail digitado n\xE3o \xE9 valido",
    length: "Deve ter exatamente ${length} caracteres",
    uuid: "Valor digitado n\xE3o confere a um UUID valido",
    trim: "N\xE3o deve conter espa\xE7os no in\xEDcio ou no fim.",
    matches: "O valor deve corresponder ao padr\xE3o: ${regex}"
  },
  number: {
    min: "Deve ser no m\xEDnimo ${min}",
    max: "Deve ser no m\xE1ximo ${max}",
    integer: "Deve ser um n\xFAmero inteiro",
    lessThan: "Deve ser menor que ${less}",
    moreThan: "Deve ser maior que ${more}",
    positive: "Deve ser um n\xFAmero positivo",
    negative: "Deve ser um n\xFAmero negativo"
  },
  date: {
    min: "Deve ser maior que a data ${min}",
    max: "Deve ser menor que a data ${max}"
  },
  array: {
    min: "Deve ter no m\xEDnimo ${min} itens",
    max: "Deve ter no m\xE1ximo ${max} itens",
    length: "Deve conter exatamente ${length} itens"
  },
  object: {
    noUnknown: "Deve ser passado um valor definido"
  }
});

// src/server.ts
var import_multer = __toESM(require("multer"));
import_dotenv.default.config();
var mt = (0, import_multer.default)({ dest: "./tmp/" }).single("uploads");
var app = (0, import_express.default)();
app.use("/files", import_express.default.static(import_path.default.resolve("src/uploads/imgs")));
app.use(import_express.default.json());
app.use((0, import_cors.default)());
var PORT = 8e3;
var server = app.listen(process.env.PORT || PORT, () => {
  if (server) {
    const address = server.address();
    console.log(`Server is running in ${process.env.API_URL}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
  ;
});

// src/index.ts
var import_express_async_errors = require("express-async-errors");

// src/routes/users-routes.ts
var import_express2 = require("express");
var import_multer3 = __toESM(require("multer"));

// src/config/multer.ts
var import_multer2 = __toESM(require("multer"));
var import_path2 = __toESM(require("path"));
var multer_default = {
  storage: import_multer2.default.diskStorage({
    destination: function(req, file, cb) {
      const fieldName = file.fieldname;
      let uploadPath;
      if (fieldName === "tempFile") {
        uploadPath = import_path2.default.resolve("src/uploads/tmp");
      } else if (fieldName === "image") {
        uploadPath = import_path2.default.resolve("src/uploads/imgs");
      } else {
        return;
      }
      cb(null, uploadPath);
    }
  }),
  limits: {
    fileSize: 8 * 1024 * 1024
    //* 8MB
  },
  fileFilter: (req, file, callback) => {
    const mimeType = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
    if (!mimeType.includes(file.mimetype)) {
      return callback(null, false);
    }
    ;
    callback(null, true);
  },
  // adicionando a propriedade tmpdir para a pasta temporária
  tmpdir: import_path2.default.resolve("tmp")
};

// src/adapters/Jwt-adapter/Jwt-adapter.ts
var import_process = require("process");
var jwt = __toESM(require("jsonwebtoken"));
var JwtAdapter = class {
  generateToken({ id }) {
    const expiresIn = "1d";
    const toke = jwt.sign(
      {
        id
      },
      import_process.env.JWT_KEY,
      {
        expiresIn
      }
    );
    return toke;
  }
  getTokenData({ token }) {
    const payload = jwt.verify(token, import_process.env.JWT_KEY);
    const result = {
      id: payload.id
    };
    return result;
  }
};

// src/errors/CustomError.ts
var CustomError = class extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/errors/TokenError.ts
var TokenError = class extends CustomError {
  constructor() {
    super("N\xE3o autorizado. Por favor passe o token de verifica\xE7\xE3o!.", 401);
  }
};

// src/middlewares/auth-middleware.ts
var jwt2 = new JwtAdapter();
var authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    throw new TokenError();
  const token = authorization.replace("Bearer", "").trim();
  try {
    const decoded = jwt2.getTokenData({ token });
    const { id } = decoded;
    req.userId = id;
    next();
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json(error.message);
    } else {
      return res.status(401).json(error.message);
    }
    ;
  }
  ;
};

// src/data/Database.ts
var import_knex = __toESM(require("knex"));

// src/config/knexfile.ts
var import_process2 = require("process");
var configKnexDatabase = {
  development: {
    client: "pg",
    connection: import_process2.env.DATABASE_URL,
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
  async updateVerify(verify2, codeUser) {
    await Database.connection(this.#tableNames.user).update("verify", verify2).where("code", codeUser);
    if (verify2 === true) {
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

// src/emails/validEmail/index.ts
var validEmail = (userName, email, codeUser) => {
  return `
  <!DOCTYPE html>
  <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
  
  <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
    <!--<![endif]-->
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
  
      @media (max-width:670px) {
  
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
  
        .image_block img.big,
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
  
  <body style="background-color: #000000; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000000;">
      <tbody>
        <tr>
          <td>
            <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f3e6f8;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 650px;" width="650">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="padding-bottom:15px;padding-top:15px;width:100%;padding-right:0px;padding-left:0px;">
                                  <div class="alignment" align="center" style="line-height:10px"><img src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/916972_901322/transactions-logo-3.png" style="display: block; height: auto; border: 0; width: 195px; max-width: 100%;" width="195" alt="your logo" title="your logo"></div>
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
            <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f3e6f8;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/2971/ResetPassword_BG_2.png'); background-position: center top; background-repeat: no-repeat; color: #000000; width: 650px;" width="650">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 45px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="divider_block block-1" width="100%" border="0" cellpadding="20" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span>&#8202;</span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="image_block block-2" width="100%" border="0" cellpadding="20" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center" style="line-height:10px"><img class="big" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/2971/lock5.png" style="display: block; height: auto; border: 0; width: 358px; max-width: 100%;" width="358" alt="Forgot your password?" title="Forgot your password?"></div>
                                </td>
                              </tr>
                            </table>
                            <table class="heading_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="padding-top:35px;text-align:center;width:100%;">
                                  <h1 style="margin: 0; color: #8412c0; direction: ltr; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 28px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Validar Email</span></h1>
                                </td>
                              </tr>
                            </table>
                            <table class="text_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad" style="padding-left:45px;padding-right:45px;padding-top:10px;">
                                  <div style="font-family: Arial, sans-serif">
                                    <div class style="font-size: 12px; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; mso-line-height-alt: 18px; color: #393d47; line-height: 1.5;">
                                      <p style="margin: 0; text-align: center; mso-line-height-alt: 27px;"><span style="font-size:18px;color:#aa67cf;">Ol\xE1 <span id="61dedaf2-15c0-4b10-87dc-ca96c200699f" style><strong>${userName}</strong></span>, obrigado por criar uma conta na <strong>NG_Transa\xE7\xF5es</strong></span></p>
                                      <p style="margin: 0; text-align: center; mso-line-height-alt: 27px;"><span style="font-size:18px;color:#aa67cf;">E uma honra ter voc\xEA junto com agente.</span></p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="divider_block block-5" width="100%" border="0" cellpadding="20" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="80%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #E1B4FC;"><span>&#8202;</span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="text_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad" style="padding-bottom:10px;padding-left:45px;padding-right:45px;padding-top:10px;">
                                  <div style="font-family: Arial, sans-serif">
                                    <div class style="font-size: 12px; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; text-align: center; mso-line-height-alt: 18px; color: #393d47; line-height: 1.5;">
                                      <p style="margin: 0; mso-line-height-alt: 19.5px;"><span style="font-size:13px;color:#8412c0;">Por favor valide seu email: <strong>${email}</strong> clicando no bot\xE3o abaixo</span></p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="button_block block-7" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${process.env.API_URL}/users/confirm_email/true/${codeUser}" style="height:50px;width:138px;v-text-anchor:middle;" arcsize="0%" strokeweight="0.75pt" strokecolor="#8412c0" fillcolor="#8412c0"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:14px"><![endif]--><a href="${process.env.API_URL}/users/confirm_email/true/${codeUser}" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#8412c0;border-radius:0px;width:auto;border-top:1px solid transparent;font-weight:400;border-right:1px solid transparent;border-bottom:1px solid transparent;border-left:1px solid transparent;padding-top:10px;padding-bottom:10px;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:40px;padding-right:40px;font-size:14px;display:inline-block;letter-spacing:normal;"><span dir="ltr" style="word-break: break-word;"><span style="line-height: 28px;" dir="ltr" data-mce-style>VALIDAR</span></span></span></a>
                                    <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
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
            <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f3e6f8;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 650px;" width="650">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 10px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="social_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <table class="social-table" width="72px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
                                      <tr>
                                        <td style="padding:0 2px 0 2px;"><a href="https://www.linkedin.com/in/gabriel-silva-souza-developer/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/linkedin@2x.png" width="32" height="32" alt="LinkedIn" title="LinkedIn" style="display: block; height: auto; border: 0;"></a></td>
                                        <td style="padding:0 2px 0 2px;"><a href="https://my-site-portfolio-dev.vercel.app/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/website@2x.png" width="32" height="32" alt="Web Site" title="Web Site" style="display: block; height: auto; border: 0;"></a></td>
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
var regexRemoveCommas = /[^0-9]/g;
var regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// src/errors/UsersErrors.ts
var ErrorExistUserName = class extends CustomError {
  constructor() {
    super(
      `J\xE1 existe um cadastro com esse nome!.`,
      409
    );
  }
};
var ErrorExistUserEmail = class extends CustomError {
  constructor() {
    super(
      `J\xE1 existe um cadastro com esse email!.`,
      409
    );
  }
};
var ErrorUserEmailNotFound = class extends CustomError {
  constructor() {
    super(
      `Email n\xE3o encontrado!.`,
      404
    );
  }
};
var ErrorLogin = class extends CustomError {
  constructor() {
    super(
      `Os campos de nome do usu\xE1rio e senha s\xE3o obrigat\xF3rios!.`,
      406
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
var ErrorPasswordInvalid = class extends CustomError {
  constructor() {
    super(
      `Senha invalida!.`,
      406
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
var ErrorInvalidEmail = class extends CustomError {
  constructor() {
    super(
      `Esse email n\xE3o \xE9 valido!.`,
      406
    );
  }
};
var ErrorEmailRequired = class extends CustomError {
  constructor() {
    super(
      `Email obrigat\xF3rio!.`,
      406
    );
  }
};
var ErrorConfirmEmail = class extends CustomError {
  constructor() {
    super(
      `Por favor confirme seu email!.`,
      406
    );
  }
};
var ErrorNewPasswordRequired = class extends CustomError {
  constructor() {
    super(
      `Nova senha \xE9 obrigat\xF3rio!`,
      406
    );
  }
};
var ErrorStandard = class extends CustomError {
  constructor() {
    super(
      `Ops! algo deu errado. Por favor tente de novo mais tarde!.`,
      500
    );
  }
};

// src/use-cases/Users-cases/Create-users-case.ts
var CreateUsersCase = class {
  constructor(usersModel, bcryptAdapter, mailAdapter) {
    this.usersModel = usersModel;
    this.bcryptAdapter = bcryptAdapter;
    this.mailAdapter = mailAdapter;
  }
  async create(request) {
    const { user_name, password, user_email } = request;
    let validatedData = void 0;
    try {
      validatedData = await bodyValidation.validate(request, { abortEarly: false });
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
    const removeSpacesInString = user_name.replaceAll(regexRemoveSpaces, "");
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
    if (password.match(regexValidatePassword) === null) {
      throw new ErrorPasswordRegexInvalid();
    }
    ;
    const findUser = await this.usersModel.findUser(removeSpacesInString);
    if (!!findUser)
      throw new ErrorExistUserName();
    const findUserEmail = await this.usersModel.findUserByEmail(user_email);
    if (!!findUserEmail)
      throw new ErrorExistUserEmail();
    const numbers = `${generateId()}}`.replace(regexRemoveCommas, "").replace(regexRemoveSpaces, "");
    const generateNumbers = Math.floor(10 * Math.random() + 1);
    const accountNumber = `2010 ${generateNumbers === 10 ? generateNumbers - 1 : generateNumbers} 00${numbers.slice(-5)} ${numbers[5]}`;
    const hashPassword = await this.bcryptAdapter.hashEncrypt({ password });
    const newCodeGenerate = generateId();
    try {
      await this.mailAdapter.sendMail({
        email: `${user_email}`,
        subject: "NG Transa\xE7\xF5es",
        body: validEmail(user_name, user_email, newCodeGenerate)
      });
      await this.usersModel.create({
        photo_url: `${process.env.API_URL}/files/person-icon.png`,
        user_name: removeSpacesInString,
        user_email,
        password_hash: hashPassword,
        account_id: accountNumber,
        code: newCodeGenerate
      });
      return {
        message: `Usu\xE1rio: ${removeSpacesInString} registrado com sucesso.`,
        statusCode: 201
      };
    } catch (error) {
      throw new ErrorStandard();
    }
    ;
  }
};

// src/adapters/Nodemailer-adapter/Nodemailer-adapter.ts
var import_nodemailer = __toESM(require("nodemailer"));
var transport = import_nodemailer.default.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});
var NodemailerMailAdapter = class {
  async sendMail({ subject, body, email, text }) {
    await transport.sendMail({
      from: `"NG Transa\xE7\xF5es"  <${process.env.EMAIL}>`,
      to: `<${email}>`,
      subject,
      html: body,
      text
    });
  }
};

// src/adapters/Bcrypt-adapter/Bcrypt-adapter.ts
var import_process3 = require("process");
var bcrypt = __toESM(require("bcryptjs"));
var BCryptAdapter = class {
  async hashEncrypt({ password }) {
    const rounds = Number(import_process3.env.BCRYPT_COST);
    const salt = await bcrypt.genSalt(rounds);
    const result = await bcrypt.hash(password, salt);
    return result;
  }
  async compareHash({ password, passwordDatabase }) {
    const result = await bcrypt.compare(password, passwordDatabase);
    return result;
  }
};

// src/controllers/Users-controllers/Create-users-controller.ts
var CreateUsersController = class {
  async create(req, res) {
    const {
      user_name,
      user_email,
      password
    } = req.body;
    const createUsersRepository = new CreateUsersRepository();
    const bcryptAdapter = new BCryptAdapter();
    const nodemailerMailAdapter = new NodemailerMailAdapter();
    const createUsersCase = new CreateUsersCase(
      createUsersRepository,
      bcryptAdapter,
      nodemailerMailAdapter
    );
    const dataBody = {
      user_name,
      user_email,
      password
    };
    const result = await createUsersCase.create(dataBody);
    return res.status(result.statusCode).json(result.message);
  }
};

// src/use-cases/Users-cases/Login-user-case.ts
var LoginUserCase = class {
  constructor(usersModel, jwtAdapter, bcryptAdapter) {
    this.usersModel = usersModel;
    this.jwtAdapter = jwtAdapter;
    this.bcryptAdapter = bcryptAdapter;
  }
  async login(request) {
    const { user_name, password } = request;
    if (!user_name || !password) {
      throw new ErrorLogin();
    }
    ;
    const checkFirstCharacterHasArroba = user_name.trim()[0].includes("@");
    if (!checkFirstCharacterHasArroba) {
      throw new ErrorNotArrobaUserName();
    }
    ;
    const findUser = await this.usersModel.findUser(user_name);
    if (!findUser)
      throw new ErrorUserNotFound();
    if (findUser.verify === false) {
      throw new ErrorConfirmEmail();
    }
    ;
    const verifyPasswordHash = await this.bcryptAdapter.compareHash({
      password: password.trim(),
      passwordDatabase: findUser.password_hash
    });
    if (!verifyPasswordHash)
      throw new ErrorPasswordInvalid();
    const token = this.jwtAdapter.generateToken({ id: findUser.id_user });
    const user = {
      user_name,
      token
    };
    return {
      user,
      statusCode: 200
    };
  }
};

// src/controllers/Users-controllers/Login-user-controller.ts
var LoginUserController = class {
  async login(req, res) {
    const { user_name, password } = req.body;
    const createUsersRepository = new CreateUsersRepository();
    const jwtAdapter = new JwtAdapter();
    const bcryptAdapter = new BCryptAdapter();
    const loginUserCase = new LoginUserCase(
      createUsersRepository,
      jwtAdapter,
      bcryptAdapter
    );
    const result = await loginUserCase.login({
      user_name,
      password
    });
    return res.status(result.statusCode).json(result.user);
  }
};

// src/use-cases/Users-cases/Fetch-users-case.ts
var FetchUsersCase = class {
  constructor(usersModel) {
    this.usersModel = usersModel;
  }
  async find(request) {
    let { user_id_logged, user_name } = request;
    const checkFirstCharacterHasArroba = user_name.trim()[0].includes("@");
    if (!checkFirstCharacterHasArroba) {
      throw new ErrorNotArrobaUserName();
    }
    ;
    ;
    const usersList = await this.usersModel.fetchUsers(user_name.trim().toLocaleLowerCase());
    const removeUserLoggedInListView = usersList.filter((user) => {
      if (user.id_user !== user_id_logged)
        return user;
    });
    return {
      list: removeUserLoggedInListView,
      statusCode: 200
    };
  }
};

// src/controllers/Users-controllers/Fetch-users-controller.ts
var FetchUsersController = class {
  async find(req, res) {
    const user_id_logged = req?.userId;
    const { user_name } = req.params;
    const createUsersRepository = new CreateUsersRepository();
    const fetchUsersCase = new FetchUsersCase(createUsersRepository);
    const result = await fetchUsersCase.find({
      user_id_logged: Number(user_id_logged),
      user_name
    });
    return res.status(result.statusCode).json(result.list);
  }
};

// src/use-cases/Users-cases/Find-user-by-token-case.ts
var FindUserByTokenCase = class {
  constructor(usersModel) {
    this.usersModel = usersModel;
  }
  async find(userId) {
    const user = await this.usersModel.findUser("", userId);
    if (!user) {
      throw new ErrorUserNotFound();
    }
    ;
    return {
      user,
      statusCode: 200
    };
  }
};

// src/controllers/Users-controllers/Find-user-by-token-controller.ts
var FindUserByTokenController = class {
  async find(req, res) {
    const userId = req?.userId;
    const createUsersRepository = new CreateUsersRepository();
    const findUserByTokenCase = new FindUserByTokenCase(createUsersRepository);
    const result = await findUserByTokenCase.find(userId);
    res.status(result.statusCode).json(result.user);
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
      verify: verify2
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
      verify: verify2
    }, idUser);
    return res.status(result.statusCode).json(result.message);
  }
};

// src/use-cases/Users-cases/Find-user-by-email-case.ts
var FindUserByEmailCase = class {
  constructor(usersModel) {
    this.usersModel = usersModel;
  }
  async find(userEmail) {
    const user = await this.usersModel.findUserByEmail(userEmail);
    if (!user) {
      throw new ErrorUserNotFound();
    }
    ;
    return {
      user,
      statusCode: 200
    };
  }
};

// src/controllers/Users-controllers/Find-user-by-email-controller.ts
var FindUserByEmailController = class {
  async find(req, res) {
    const { email } = req.params;
    const createUsersRepository = new CreateUsersRepository();
    const findUserByEmailCase = new FindUserByEmailCase(createUsersRepository);
    const result = await findUserByEmailCase.find(email);
    return res.status(result.statusCode).json(result.user);
  }
};

// src/use-cases/Users-cases/Confirm-email-case.ts
var ConfirmEmailCase = class {
  constructor(usersModel) {
    this.usersModel = usersModel;
  }
  async confirm(verify2, codeUser) {
    const user = await this.usersModel.findUserByCode(codeUser);
    if (!user)
      throw new ErrorCodeInvalid();
    const verifyRequest = verify2 !== "true";
    if (verifyRequest)
      throw new ErrorVerifyInvalid();
    await this.usersModel.updateVerify(Boolean(verify2), codeUser);
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
    const { verify: verify2, codeUser } = req.params;
    const createUsersRepository = new CreateUsersRepository();
    const confirmEmailCase = new ConfirmEmailCase(
      createUsersRepository
    );
    const result = await confirmEmailCase.confirm(verify2, codeUser);
    if (result.statusCode === 200) {
      return res.status(200).send(successMessageEmail);
    }
    ;
  }
};

// src/use-cases/Users-cases/Alter-email-case.ts
var AlterEmailCase = class {
  constructor(usersModel, mailAdapter) {
    this.usersModel = usersModel;
    this.mailAdapter = mailAdapter;
  }
  async alter(newEmail, codeUser) {
    if (!newEmail) {
      throw new ErrorEmailRequired();
    }
    ;
    const userCode = await this.usersModel.findUserByCode(codeUser);
    if (!userCode) {
      throw new ErrorCodeInvalid();
    }
    ;
    if (!regexEmail.test(newEmail.trim())) {
      throw new ErrorInvalidEmail();
    }
    ;
    const userEmail = await this.usersModel.findUserByEmail(newEmail.trim());
    if (userEmail) {
      await this.mailAdapter.sendMail({
        email: `${newEmail}`,
        subject: "NG Transa\xE7\xF5es",
        body: validEmail(userCode.user_name, newEmail, userCode.code)
      });
      return {
        message: "Email enviado com sucesso.",
        statusCode: 200
      };
    }
    ;
    try {
      await this.mailAdapter.sendMail({
        email: `${newEmail}`,
        subject: "NG Transa\xE7\xF5es",
        body: validEmail(userCode.user_name, newEmail, userCode.code)
      });
      await this.usersModel.editInfoUser({ ...userCode, user_email: newEmail }, userCode.id_user);
      return {
        message: "Email alterado com sucesso. Um novo email de verifica\xE7\xE3o foi enviado.",
        statusCode: 200
      };
    } catch (error) {
      throw new ErrorStandard();
    }
    ;
  }
};

// src/controllers/Users-controllers/Alter-email-controller.ts
var AlterEmailController = class {
  async alter(req, res) {
    const { codeUser } = req.params;
    const { newEmail } = req.body;
    const createUsersRepository = new CreateUsersRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();
    const alterEmailCase = new AlterEmailCase(
      createUsersRepository,
      nodemailerMailAdapter
    );
    const result = await alterEmailCase.alter(newEmail, codeUser);
    return res.status(result.statusCode).json(result.message);
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

// src/use-cases/Users-cases/Find-user-by-code-case.ts
var FindUserByCodeCase = class {
  constructor(usersModel) {
    this.usersModel = usersModel;
  }
  async find(userCode) {
    const user = await this.usersModel.findUserByCode(userCode);
    if (!user) {
      throw new ErrorCodeInvalid();
    }
    ;
    return {
      user,
      statusCode: 200
    };
  }
};

// src/controllers/Users-controllers/Find-user-by-code-controller.ts
var FindUserByCodeController = class {
  async find(req, res) {
    const { code } = req.params;
    const createUsersRepository = new CreateUsersRepository();
    const findUserByCodeCase = new FindUserByCodeCase(createUsersRepository);
    const result = await findUserByCodeCase.find(code);
    return res.status(result.statusCode).json(result.user);
  }
};

// src/use-cases/Users-cases/Delete-account-case.ts
var DeleteAccountCase = class {
  constructor(usersModel) {
    this.usersModel = usersModel;
  }
  async delete(idUser) {
    if (!idUser)
      throw new ErrorCodeInvalid();
    const user = await this.usersModel.findUser("", idUser);
    if (!user)
      throw new ErrorUserNotFound();
    await this.usersModel.deleteAccount(idUser);
    return {
      message: "Conta deletada com sucesso.",
      statusCode: 200
    };
  }
};

// src/controllers/Users-controllers/Delete-account-controller.ts
var DeleteAccountController = class {
  async delete(req, res) {
    const idUser = Number(req.userId);
    const createUsersRepository = new CreateUsersRepository();
    const deleteAccountCase = new DeleteAccountCase(
      createUsersRepository
    );
    const result = await deleteAccountCase.delete(idUser);
    return res.status(200).json(result.message);
  }
};

// src/emails/resetPasswordEmail/index.ts
function resetPasswordEmail(userCode) {
  return `
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
  
      @media (max-width:660px) {
  
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
  
        .image_block img.big,
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
  
  <body style="background-color: #f8f8f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8f9;">
      <tbody>
        <tr>
          <td>
            <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #1aa19c;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; background-color: #1aa19c; width: 640px;" width="640">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="divider_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 4px solid #1AA19C;"><span>&#8202;</span></td>
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
            <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px;" width="640">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                  <div class="alignment" align="center" style="line-height:10px"><a href="www.example.com" target="_blank" style="outline:none" tabindex="-1"><img src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/916972_901322/transactions-logo-3.png" style="display: block; height: auto; border: 0; width: 256px; max-width: 100%;" width="256" alt="Your logo." title="Your logo."></a></div>
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
            <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; width: 640px;" width="640">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                  <div class="alignment" align="center" style="line-height:10px"><a href="www.example.com" target="_blank" style="outline:none" tabindex="-1"><img class="big" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/4036/___passwordreset.gif" style="display: block; height: auto; border: 0; width: 640px; max-width: 100%;" width="640" alt="Image of lock &amp; key." title="Image of lock &amp; key."></a></div>
                                </td>
                              </tr>
                            </table>
                            <table class="divider_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="padding-top:30px;">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span>&#8202;</span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="text_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
                                  <div style="font-family: Arial, sans-serif">
                                    <div class style="font-size: 12px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
                                      <p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 19.2px;"><span style="font-size:30px;color:#2b303a;"><strong>Voc\xEA solicitou redefini\xE7\xE3o</strong></span></p>
                                      <p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 19.2px;"><span style="font-size:30px;color:#2b303a;"><strong>de senha?</strong></span></p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="text_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
                                  <div style="font-family: sans-serif">
                                    <div class style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 18px; color: #555555; line-height: 1.5;">
                                      <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 22.5px;"><span style="color:#808389;font-size:15px;">para redefinir sua senha basta clicar no bot\xE3o abaixo</span></p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="button_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="padding-left:10px;padding-right:10px;padding-top:15px;text-align:center;">
                                  <div class="alignment" align="center">
                                    <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://localhost:3000/${userCode}" style="height:62px;width:206px;v-text-anchor:middle;" arcsize="57%" stroke="false" fillcolor="#f7a50c"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px"><![endif]--><a href="http://localhost:3000/${userCode}" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#f7a50c;border-radius:35px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:15px;padding-bottom:15px;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:30px;padding-right:30px;font-size:16px;display:inline-block;letter-spacing:normal;"><span dir="ltr" style="margin: 0; word-break: break-word; line-height: 32px;"><strong>REDEFINIR SENHA</strong></span></span></a>
                                    <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="divider_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="padding-bottom:12px;padding-top:60px;">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span>&#8202;</span></td>
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
            <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; background-color: #410125; width: 640px;" width="640">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="social_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:28px;text-align:center;">
                                  <div class="alignment" align="center">
                                    <table class="social-table" width="104px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
                                      <tr>
                                        <td style="padding:0 10px 0 10px;"><a href="linkedin.com/in/gabriel-silva-souza-developer" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-outline-circle-white/linkedin@2x.png" width="32" height="32" alt="LinkedIn" title="LinkedIn" style="display: block; height: auto; border: 0;"></a></td>
                                        <td style="padding:0 10px 0 10px;"><a href="https://my-site-portfolio-dev.vercel.app/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-outline-circle-white/website@2x.png" width="32" height="32" alt="Web Site" title="Web Site" style="display: block; height: auto; border: 0;"></a></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="divider_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px;">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #555961;"><span>&#8202;</span></td>
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
}

// src/use-cases/Users-cases/Alter-password-case.ts
var RequestPasswordChangeCase = class {
  constructor(usersModel, mailAdapter) {
    this.usersModel = usersModel;
    this.mailAdapter = mailAdapter;
  }
  async request(email) {
    if (!email) {
      throw new ErrorEmailRequired();
    }
    ;
    if (!regexEmail.test(email.trim())) {
      throw new ErrorInvalidEmail();
    }
    ;
    const user = await this.usersModel.findUserByEmail(email);
    if (!user) {
      throw new ErrorUserEmailNotFound();
    }
    ;
    try {
      await this.mailAdapter.sendMail({
        email: `${email}`,
        subject: "NG Transa\xE7\xF5es",
        body: resetPasswordEmail(user.code)
      });
      return {
        message: "Um email para voc\xEA redefinir sua senha foi enviado.",
        statusCode: 200
      };
    } catch (error) {
      throw new ErrorStandard();
    }
    ;
  }
};
var AlterPasswordCase = class {
  constructor(usersModel, bcryptAdapter) {
    this.usersModel = usersModel;
    this.bcryptAdapter = bcryptAdapter;
  }
  async alter(request) {
    const { newPassword: password, codeUser } = request;
    const user = await this.usersModel.findUserByCode(codeUser);
    if (!user) {
      throw new ErrorCodeInvalid();
    }
    ;
    if (!password) {
      throw new ErrorNewPasswordRequired();
    }
    ;
    if (password.match(regexValidatePassword) === null) {
      throw new ErrorPasswordRegexInvalid();
    }
    ;
    const newHashPassword = await this.bcryptAdapter.hashEncrypt({ password });
    const generateNewCode = generateId();
    await this.usersModel.editInfoUser({
      password_hash: newHashPassword,
      code: generateNewCode
    }, user.id_user);
    return {
      message: "Senha alterada com sucesso.",
      statusCode: 200
    };
  }
};

// src/controllers/Users-controllers/Alter-password-controller.ts
var AlterPasswordController = class {
  async alter(req, res) {
    const { codeUser } = req.params;
    const {
      newPassword
    } = req.body;
    const createUsersRepository = new CreateUsersRepository();
    const bcryptAdapter = new BCryptAdapter();
    const alterPasswordCase = new AlterPasswordCase(
      createUsersRepository,
      bcryptAdapter
    );
    const result = await alterPasswordCase.alter({
      newPassword,
      codeUser
    });
    return res.status(result.statusCode).json(result.message);
  }
};
var RequestPasswordChangeController = class {
  async request(req, res) {
    const { email } = req.params;
    const createUsersRepository = new CreateUsersRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();
    const requestPasswordChangeCase = new RequestPasswordChangeCase(
      createUsersRepository,
      nodemailerMailAdapter
    );
    const result = await requestPasswordChangeCase.request(email);
    return res.status(result.statusCode).json(result.message);
  }
};

// src/routes/users-routes.ts
var usersRoutes = (0, import_express2.Router)();
var upload = (0, import_multer3.default)(multer_default);
var createUsersController = new CreateUsersController();
var loginUserController = new LoginUserController();
var fetchUsersController = new FetchUsersController();
var findUserByTokenController = new FindUserByTokenController();
var findUserByEmailController = new FindUserByEmailController();
var findUserByCodeController = new FindUserByCodeController();
var findUserByNameController = new FindUserByNameController();
var editInfoUserController = new EditInfoUserController();
var confirmEmailController = new ConfirmEmailController();
var alterEmailController = new AlterEmailController();
var alterPasswordController = new AlterPasswordController();
var requestPasswordChangeController = new RequestPasswordChangeController();
var deleteAccountController = new DeleteAccountController();
usersRoutes.get("/find_user", authMiddleware, findUserByTokenController.find);
usersRoutes.get("/find_user/:email", findUserByEmailController.find);
usersRoutes.get("/find_user_code/:code", findUserByCodeController.find);
usersRoutes.get("/find_user_name/:name", findUserByNameController.find);
usersRoutes.get("/confirm_email/:verify/:codeUser", confirmEmailController.confirm);
usersRoutes.get("/confirm_you/:email", requestPasswordChangeController.request);
usersRoutes.get("/:user_name", authMiddleware, fetchUsersController.find);
usersRoutes.post("/register", createUsersController.create);
usersRoutes.post("/login", loginUserController.login);
usersRoutes.post("/alter_email/:codeUser", [], alterEmailController.alter);
usersRoutes.put("/edit", authMiddleware, upload.single("image"), editInfoUserController.edit);
usersRoutes.put("/alter_password/:codeUser", alterPasswordController.alter);
usersRoutes.delete("/delete_account", authMiddleware, deleteAccountController.delete);

// src/routes/transactions-routes.ts
var import_express3 = require("express");

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

// src/emails/sentTransactionEmailSuccess/index.ts
var sentTransactionEmailSuccess = (nameUserSent, nameUserReceiver, valueSent) => {
  const html = `
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
  
      @media (max-width:660px) {
  
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
  
        .image_block img.big,
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
  
  <body style="background-color: #f8f8f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8f9;">
      <tbody>
        <tr>
          <td>
            <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #1aa19c;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; background-color: #1aa19c; width: 640px;" width="640">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="divider_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 4px solid #1AA19C;"><span>&#8202;</span></td>
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
            <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; width: 640px;" width="640">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="padding-top:2px;width:100%;padding-right:0px;padding-left:0px;">
                                  <div class="alignment" align="center" style="line-height:10px"><img src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/916972_901322/transactions-logo-3.png" style="display: block; height: auto; border: 0; width: 256px; max-width: 100%;" width="256" alt="I'm an image" title="I'm an image"></div>
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
            <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; width: 640px;" width="640">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="divider_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="padding-bottom:12px;">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span>&#8202;</span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="padding-left:40px;padding-right:40px;width:100%;">
                                  <div class="alignment" align="center" style="line-height:10px"><img class="big" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1366/Img5_2x.jpg" style="display: block; height: auto; border: 0; width: 352px; max-width: 100%;" width="352" alt="I'm an image" title="I'm an image"></div>
                                </td>
                              </tr>
                            </table>
                            <table class="divider_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="padding-top:50px;">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span>&#8202;</span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="text_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
                                  <div style="font-family: sans-serif">
                                    <div class style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
                                      <p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 19.2px;"><span style="font-size:30px;color:#2b303a;"><strong>Transa\xE7\xE3o efetuada com sucesso</strong></span></p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="text_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
                                  <div style="font-family: sans-serif">
                                    <div class style="font-size: 12px; mso-line-height-alt: 18px; color: #555555; line-height: 1.5; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
                                      <p style="margin: 0; font-size: 12px; text-align: center; mso-line-height-alt: 21px;"><span style="font-size:14px;">Ol\xE1 <span id="2462809a-3a5f-4e0c-934a-779e6349f29b" style>${nameUserSent}</span>, aqui est\xE3o os dados da sua transa\xE7\xE3o que voc\xEA acabou de efetuar.</span></p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="divider_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="padding-top:10px;">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span>&#8202;</span></td>
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
            <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; width: 640px;" width="640">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #f3fafa; border-left: 20px solid #FFF; border-right: 8px solid #FFF; vertical-align: top; border-top: 0px; border-bottom: 0px;">
                            <table class="divider_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 4px solid #1AA19C;"><span>&#8202;</span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="text_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad" style="padding-bottom:40px;padding-left:5px;padding-right:5px;padding-top:35px;">
                                  <div style="font-family: sans-serif">
                                    <div class style="font-size: 12px; mso-line-height-alt: 18px; color: #555555; line-height: 1.5; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
                                      <p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 18px;"><span style="color:#a2a9ad;font-size:12px;"><strong>Nome do recebedor</strong></span></p>
                                      <p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 30px;"><span style="color:#2b303a;font-size:20px;"><strong><span style id="a0662caf-22db-4076-8cf7-1f25682c462b">${nameUserReceiver}</span></strong></span></p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td class="column column-2" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #f3fafa; border-left: 8px solid #FFF; border-right: 20px solid #FFF; vertical-align: top; border-top: 0px; border-bottom: 0px;">
                            <table class="divider_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 4px solid #1AA19C;"><span>&#8202;</span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="text_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad" style="padding-bottom:40px;padding-left:5px;padding-right:5px;padding-top:35px;">
                                  <div style="font-family: sans-serif">
                                    <div class style="font-size: 12px; mso-line-height-alt: 18px; color: #555555; line-height: 1.5; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
                                      <p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 18px;"><span style="color:#a2a9ad;font-size:12px;"><strong>Valor enviado</strong></span></p>
                                      <p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 30px;"><span style="color:#2b303a;font-size:20px;"><strong>R$ ${valueSent}</strong></span></p>
                                    </div>
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
            <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; width: 640px;" width="640">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="button_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="padding-left:10px;padding-right:10px;padding-top:40px;text-align:center;">
                                  <div class="alignment" align="center">
                                    <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://localhost:3000/Dashboard/SentMoney" style="height:62px;width:187px;v-text-anchor:middle;" arcsize="97%" stroke="false" fillcolor="#1aa19c"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:16px"><![endif]--><a href="http://localhost:3000/Dashboard/SentMoney" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#1aa19c;border-radius:60px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:15px;padding-bottom:15px;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:30px;padding-right:30px;font-size:16px;display:inline-block;letter-spacing:normal;"><span dir="ltr" style="margin: 0; word-break: break-word; line-height: 32px;"><strong>Voltar para o app</strong></span></span></a>
                                    <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="divider_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="padding-bottom:12px;">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span>&#8202;</span></td>
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
            <table class="row row-6" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; background-color: #f8f8f9; width: 640px;" width="640">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="row row-7" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; background-color: #2b303a; width: 640px;" width="640">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="divider_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 4px solid #1AA19C;"><span>&#8202;</span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                  <div class="alignment" align="center" style="line-height:10px"><img class="big" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1366/footer.png" style="display: block; height: auto; border: 0; width: 640px; max-width: 100%;" width="640" alt="I'm an image" title="I'm an image"></div>
                                </td>
                              </tr>
                            </table>
                            <table class="social_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:28px;text-align:center;">
                                  <div class="alignment" align="center">
                                    <table class="social-table" width="104px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
                                      <tr>
                                        <td style="padding:0 10px 0 10px;"><a href="https://www.linkedin.com/in/gabriel-silva-souza-developer/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-outline-circle-white/linkedin@2x.png" width="32" height="32" alt="LinkedIn" title="LinkedIn" style="display: block; height: auto; border: 0;"></a></td>
                                        <td style="padding:0 10px 0 10px;"><a href="https://my-site-portfolio-dev.vercel.app/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-outline-circle-white/website@2x.png" width="32" height="32" alt="Web Site" title="Web Site" style="display: block; height: auto; border: 0;"></a></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="divider_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px;">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #555961;"><span>&#8202;</span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="text_block block-5" width="100%" border="0" cellpadding="20" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad">
                                  <div style="font-family: sans-serif">
                                    <div class style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #ffffff; line-height: 1.2; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
                                      <p style="margin: 0; font-size: 12px; text-align: center; mso-line-height-alt: 14.399999999999999px; letter-spacing: 2px;"><strong>NG Transa\xE7\xF5es</strong></p>
                                    </div>
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
  return html;
};

// src/emails/receiverTransactionEmailSuccess/index.ts
var receiverTransactionEmailSuccess = (nameUserSent, nameUserReceiver, valueSent) => {
  const html = `
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
  
      @media (max-width:660px) {
  
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
  
        .image_block img.big,
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
  
  <body style="background-color: #f8f8f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8f9;">
      <tbody>
        <tr>
          <td>
            <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #1aa19c;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; background-color: #1aa19c; width: 640px;" width="640">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="divider_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 4px solid #1AA19C;"><span>&#8202;</span></td>
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
            <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; width: 640px;" width="640">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="padding-top:2px;width:100%;padding-right:0px;padding-left:0px;">
                                  <div class="alignment" align="center" style="line-height:10px"><img src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/916972_901322/transactions-logo-3.png" style="display: block; height: auto; border: 0; width: 256px; max-width: 100%;" width="256" alt="I'm an image" title="I'm an image"></div>
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
            <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; width: 640px;" width="640">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="divider_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="padding-bottom:12px;">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span>&#8202;</span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="padding-left:40px;padding-right:40px;width:100%;">
                                  <div class="alignment" align="center" style="line-height:10px"><img class="big" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1366/Img5_2x.jpg" style="display: block; height: auto; border: 0; width: 352px; max-width: 100%;" width="352" alt="I'm an image" title="I'm an image"></div>
                                </td>
                              </tr>
                            </table>
                            <table class="divider_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="padding-top:50px;">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span>&#8202;</span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="text_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
                                  <div style="font-family: sans-serif">
                                    <div class style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
                                      <p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 19.2px;"><span style="font-size:30px;color:#2b303a;"><strong>Dinheiro recebido</strong></span></p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="text_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
                                  <div style="font-family: sans-serif">
                                    <div class style="font-size: 12px; mso-line-height-alt: 18px; color: #555555; line-height: 1.5; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
                                      <p style="margin: 0; font-size: 12px; text-align: center; mso-line-height-alt: 21px;"><span style="font-size:14px;">Ol\xE1 <span id="2462809a-3a5f-4e0c-934a-779e6349f29b" style>${nameUserReceiver}</span>, algu\xE9m acabou de te enviar dinheiro. Abaixo est\xE3o os dados do enviador.</span></p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="divider_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="padding-top:10px;">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span>&#8202;</span></td>
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
            <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; width: 640px;" width="640">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #f3fafa; border-left: 20px solid #FFF; border-right: 8px solid #FFF; vertical-align: top; border-top: 0px; border-bottom: 0px;">
                            <table class="divider_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 4px solid #1AA19C;"><span>&#8202;</span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="text_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad" style="padding-bottom:40px;padding-left:5px;padding-right:5px;padding-top:35px;">
                                  <div style="font-family: sans-serif">
                                    <div class style="font-size: 12px; mso-line-height-alt: 18px; color: #555555; line-height: 1.5; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
                                      <p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 18px;"><span style="color:#a2a9ad;font-size:12px;"><strong>Nome do enviador</strong></span></p>
                                      <p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 30px;"><span style="color:#2b303a;font-size:20px;"><strong><span style id="a0662caf-22db-4076-8cf7-1f25682c462b">${nameUserSent}</span></strong></span></p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td class="column column-2" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #f3fafa; border-left: 8px solid #FFF; border-right: 20px solid #FFF; vertical-align: top; border-top: 0px; border-bottom: 0px;">
                            <table class="divider_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 4px solid #1AA19C;"><span>&#8202;</span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="text_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad" style="padding-bottom:40px;padding-left:5px;padding-right:5px;padding-top:35px;">
                                  <div style="font-family: sans-serif">
                                    <div class style="font-size: 12px; mso-line-height-alt: 18px; color: #555555; line-height: 1.5; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
                                      <p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 18px;"><span style="color:#a2a9ad;font-size:12px;"><strong>Valor enviado</strong></span></p>
                                      <p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 30px;"><span style="color:#2b303a;font-size:20px;"><strong>R$ ${valueSent}</strong></span></p>
                                    </div>
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
            <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; width: 640px;" width="640">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="button_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="padding-left:10px;padding-right:10px;padding-top:40px;text-align:center;">
                                  <div class="alignment" align="center">
                                    <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://localhost:3000/Dashboard" style="height:62px;width:187px;v-text-anchor:middle;" arcsize="97%" stroke="false" fillcolor="#1aa19c"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:16px"><![endif]--><a href="http://localhost:3000/Dashboard" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#1aa19c;border-radius:60px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:15px;padding-bottom:15px;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:30px;padding-right:30px;font-size:16px;display:inline-block;letter-spacing:normal;"><span dir="ltr" style="margin: 0; word-break: break-word; line-height: 32px;"><strong>Voltar para o app</strong></span></span></a>
                                    <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="divider_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="padding-bottom:12px;">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span>&#8202;</span></td>
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
            <table class="row row-6" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; background-color: #f8f8f9; width: 640px;" width="640">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="row row-7" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; background-color: #2b303a; width: 640px;" width="640">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="divider_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 4px solid #1AA19C;"><span>&#8202;</span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                  <div class="alignment" align="center" style="line-height:10px"><img class="big" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1366/footer.png" style="display: block; height: auto; border: 0; width: 640px; max-width: 100%;" width="640" alt="I'm an image" title="I'm an image"></div>
                                </td>
                              </tr>
                            </table>
                            <table class="social_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:28px;text-align:center;">
                                  <div class="alignment" align="center">
                                    <table class="social-table" width="104px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
                                      <tr>
                                        <td style="padding:0 10px 0 10px;"><a href="https://www.linkedin.com/in/gabriel-silva-souza-developer/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-outline-circle-white/linkedin@2x.png" width="32" height="32" alt="LinkedIn" title="LinkedIn" style="display: block; height: auto; border: 0;"></a></td>
                                        <td style="padding:0 10px 0 10px;"><a href="https://my-site-portfolio-dev.vercel.app/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-outline-circle-white/website@2x.png" width="32" height="32" alt="Web Site" title="Web Site" style="display: block; height: auto; border: 0;"></a></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="divider_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px;">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #555961;"><span>&#8202;</span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="text_block block-5" width="100%" border="0" cellpadding="20" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad">
                                  <div style="font-family: sans-serif">
                                    <div class style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #ffffff; line-height: 1.2; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
                                      <p style="margin: 0; font-size: 12px; text-align: center; mso-line-height-alt: 14.399999999999999px; letter-spacing: 2px;"><strong>NG Transa\xE7\xF5es</strong></p>
                                    </div>
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
  return html;
};

// src/use-cases/Transactions-cases/validations.ts
var yup2 = __toESM(require("yup"));
var bodyValidation2 = yup2.object().shape({
  user_id_send: yup2.number(),
  user_name_receiver: yup2.string().required(),
  value: yup2.number().moreThan(0.99).required()
});

// src/errors/TransactionsErrors.ts
var ErrorValueAndString = class extends CustomError {
  constructor() {
    super("S\xF3 \xE9 aceito valores n\xFAmericos!.", 406);
  }
};
var ErrorValueInvalid = class extends CustomError {
  constructor() {
    super("S\xF3 \xE9 aceito valor em string!.", 406);
  }
};
var ErrorUserSendNotFound = class extends CustomError {
  constructor() {
    super("\xD3 usu\xE1rio que voc\xEA quer enviar o dinheiro n\xE3o existe!.", 404);
  }
};
var ErrorInsufficientFunds = class extends CustomError {
  constructor() {
    super("Voc\xEA n\xE3o possui saldo suficiente para concluir a transa\xE7\xE3o!.", 406);
  }
};
var ErrorCannotSendMoneyToYourself = class extends CustomError {
  constructor() {
    super("Voc\xEA n\xE3o pode enviar dinheiro para si mesmo!.", 406);
  }
};
var ErrorTransactionNotFound = class extends CustomError {
  constructor() {
    super("Transa\xE7\xE3o n\xE3o encontrada!.", 404);
  }
};
var ErrorLookedInvalid = class extends CustomError {
  constructor() {
    super("S\xF3 \xE9 aceito valores booleanos como true ou false!.", 406);
  }
};
var ErrorNotArrobaUserName2 = class extends CustomError {
  constructor() {
    super(
      `Por favor verifique si n\xE3o esta faltando o "@" antes do seu user_name!.`,
      406
    );
  }
};
var ErrorStandard2 = class extends CustomError {
  constructor() {
    super(
      `Ops! algo deu errado. Por favor tente de novo mais tarde!.`,
      500
    );
  }
};

// src/use-cases/Transactions-cases/Create-transaction-case.ts
var CreateTransactionCase = class {
  constructor(transactionsModel, mailAdapter) {
    this.transactionsModel = transactionsModel;
    this.mailAdapter = mailAdapter;
  }
  async create(request) {
    let {
      user_id_send,
      user_name_receiver,
      value
    } = request;
    let validatedData = void 0;
    if (typeof user_name_receiver !== "string") {
      throw new ErrorValueInvalid();
    }
    ;
    try {
      validatedData = await bodyValidation2.validate(request, { abortEarly: false });
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
    if (typeof value !== "number") {
      throw new ErrorValueAndString();
    }
    ;
    const checkFirstCharacterHasArroba = user_name_receiver.trim()[0].includes("@");
    if (!checkFirstCharacterHasArroba) {
      throw new ErrorNotArrobaUserName2();
    }
    ;
    const userSend = await this.transactionsModel.findUser(user_id_send);
    if (userSend.user_name === user_name_receiver) {
      throw new ErrorCannotSendMoneyToYourself();
    }
    ;
    const userReceiver = await this.transactionsModel.findUser(0, user_name_receiver);
    if (!userReceiver) {
      throw new ErrorUserSendNotFound();
    }
    ;
    const accountSend = await this.transactionsModel.findAccount(userSend.account_id);
    const accountReceiver = await this.transactionsModel.findAccount(userReceiver.account_id);
    if (accountSend.balance < value) {
      throw new ErrorInsufficientFunds();
    }
    ;
    value = Number(value.toFixed(2));
    try {
      await this.mailAdapter.sendMail({
        email: `${userSend.user_email}`,
        subject: "NG Transa\xE7\xF5es",
        body: sentTransactionEmailSuccess(userSend.user_name, userReceiver.user_name, value.toFixed(2))
      });
      await this.mailAdapter.sendMail({
        email: `${userReceiver.user_email}`,
        subject: "NG Transa\xE7\xF5es",
        body: receiverTransactionEmailSuccess(userSend.user_name, userReceiver.user_name, value.toFixed(2))
      });
      await this.transactionsModel.create({
        debited_account_id: userSend.account_id,
        credited_account_id: userReceiver.account_id,
        value
      });
      await this.transactionsModel.updateBalance({
        id_account: userSend.account_id,
        value: accountSend.balance - value
      });
      await this.transactionsModel.updateBalance({
        id_account: userReceiver.account_id,
        value: accountReceiver.balance + value
      });
      return {
        message: {
          userSend: userSend.user_name,
          userReceiver: userReceiver.user_name,
          sendValue: value
        },
        statusCode: 201
      };
    } catch (error) {
      throw new ErrorStandard2();
    }
    ;
  }
};

// src/controllers/Transactions-controllers/Create-transactions-controller.ts
var CreateTransactionController = class {
  async create(req, res) {
    const user_id_send = req?.userId;
    const {
      user_name_receiver,
      value
    } = req.body;
    const transactionsRepository = new TransactionsRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();
    const createTransactionsCase = new CreateTransactionCase(
      transactionsRepository,
      nodemailerMailAdapter
    );
    const result = await createTransactionsCase.create({
      user_id_send: Number(user_id_send),
      user_name_receiver,
      value
    });
    return res.status(result.statusCode).json(result.message);
  }
};

// src/use-cases/Transactions-cases/Get-all-transactions-sent-case.ts
var GetAllTransactionsSentCase = class {
  constructor(transactionsModel) {
    this.transactionsModel = transactionsModel;
  }
  async get({ idUserLogged, user_name_filter, date_filter }) {
    const transactionsSent = await this.transactionsModel.getAllTransactionsSent(idUserLogged);
    if (user_name_filter) {
      const checkFirstCharacterHasArroba = user_name_filter.trim()[0].includes("@");
      if (!checkFirstCharacterHasArroba) {
        throw new ErrorNotArrobaUserName();
      }
      ;
      const transactionsSentFilterName = transactionsSent.filter((transaction) => {
        return transaction.user_name_credited.toLocaleLowerCase().includes(user_name_filter.trim().toLocaleLowerCase());
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

// src/controllers/Transactions-controllers/Get-all-transactions-sent-controller.ts
var GetAllTransactionsSentController = class {
  async get(req, res) {
    const idUserLogged = Number(req?.userId);
    const user_name_filter = req.query.user_name_filter;
    const date_filter = req.query.date_filter;
    const transactionsRepository = new TransactionsRepository();
    const getAllTransactionsSentCase = new GetAllTransactionsSentCase(
      transactionsRepository
    );
    const result = await getAllTransactionsSentCase.get({ idUserLogged, user_name_filter, date_filter });
    return res.status(result.statusCode).json(result.transactionsSent);
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

// src/use-cases/Transactions-cases/Update-looked-case.ts
var UpdateLookedCase = class {
  constructor(transactionsModel) {
    this.transactionsModel = transactionsModel;
  }
  async update({ id_transaction, looked }) {
    const transaction = await this.transactionsModel.findTransaction(id_transaction);
    if (!transaction) {
      throw new ErrorTransactionNotFound();
    }
    ;
    if (typeof looked !== "boolean") {
      throw new ErrorLookedInvalid();
    }
    ;
    await this.transactionsModel.updateLooked({ id_transaction, looked });
    return {
      message: "Visto da transa\xE7\xE3o atualizado.",
      statusCode: 200
    };
  }
};

// src/controllers/Transactions-controllers/Update-transaction-controller.ts
var UpdateLookedController = class {
  async update(req, res) {
    const { id_transaction } = req?.params;
    const { looked } = req.body;
    const transactionsRepository = new TransactionsRepository();
    const updateLookedCase = new UpdateLookedCase(transactionsRepository);
    const result = await updateLookedCase.update({ id_transaction, looked });
    return res.status(result.statusCode).json(result.message);
  }
};

// src/use-cases/Transactions-cases/Get-all-transactions-received-and-sent-case.ts
var GetAllTransactionsReceivedAndSentCase = class {
  constructor(transactionsModel) {
    this.transactionsModel = transactionsModel;
  }
  async get(idUserLogged) {
    const transactions = await this.transactionsModel.getAllTransactionsReceivedAndSent(idUserLogged);
    return {
      transactions,
      statusCode: 200
    };
  }
};

// src/controllers/Transactions-controllers/Get-all-transactions-received-and-sent-controller.ts
var GetAllTransactionsReceivedAndSentController = class {
  async get(req, res) {
    const idUserLogged = Number(req?.userId);
    const transactionsRepository = new TransactionsRepository();
    const getAllTransactionsReceivedAndSentCase = new GetAllTransactionsReceivedAndSentCase(
      transactionsRepository
    );
    const result = await getAllTransactionsReceivedAndSentCase.get(idUserLogged);
    return res.status(result.statusCode).json(result.transactions);
  }
};

// src/routes/transactions-routes.ts
var transactionsRoutes = (0, import_express3.Router)();
var createTransactionController = new CreateTransactionController();
var getAllTransactionsSentController = new GetAllTransactionsSentController();
var getAllTransactionsReceivedController = new GetAllTransactionsReceivedController();
var updateLookedController = new UpdateLookedController();
var getAllTransactionsReceivedAndSentController = new GetAllTransactionsReceivedAndSentController();
transactionsRoutes.get("/all", getAllTransactionsReceivedAndSentController.get);
transactionsRoutes.get("/transactions_sent", getAllTransactionsSentController.get);
transactionsRoutes.get("/transactions_received", getAllTransactionsReceivedController.get);
transactionsRoutes.post("/create", createTransactionController.create);
transactionsRoutes.put("/update_looked/:id_transaction", updateLookedController.update);

// src/index.ts
app.use("/users", usersRoutes);
app.use("/transactions", authMiddleware, transactionsRoutes);
app.use((error, req, res, next) => {
  return error instanceof CustomError ? res.status(error.statusCode).send(error.message) : res.status(500).send(error.message || error.pgMessage);
});
