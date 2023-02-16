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

// src/routes/users-routes.ts
var users_routes_exports = {};
__export(users_routes_exports, {
  usersRoutes: () => usersRoutes
});
module.exports = __toCommonJS(users_routes_exports);
var import_express = require("express");
var import_multer2 = __toESM(require("multer"));

// src/config/multer.ts
var import_multer = __toESM(require("multer"));
var import_path = __toESM(require("path"));
var multer_default = {
  storage: import_multer.default.diskStorage({
    destination: import_path.default.resolve("src/uploads/imgs"),
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
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
  }
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
var usersRoutes = (0, import_express.Router)();
var upload = (0, import_multer2.default)(multer_default);
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
usersRoutes.put("/alter_password/:codeUser", alterPasswordController.alter);
usersRoutes.delete("/delete_account", authMiddleware, deleteAccountController.delete);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  usersRoutes
});
