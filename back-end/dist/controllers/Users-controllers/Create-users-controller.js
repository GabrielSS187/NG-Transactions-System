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

// src/controllers/Users-controllers/Create-users-controller.ts
var Create_users_controller_exports = {};
__export(Create_users_controller_exports, {
  CreateUsersController: () => CreateUsersController
});
module.exports = __toCommonJS(Create_users_controller_exports);

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
var ErrorExistUserEmail = class extends CustomError {
  constructor() {
    super(
      `J\xE1 existe um cadastro com esse email!.`,
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateUsersController
});
