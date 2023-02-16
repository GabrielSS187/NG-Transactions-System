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

// src/routes/transactions-routes.ts
var transactions_routes_exports = {};
__export(transactions_routes_exports, {
  transactionsRoutes: () => transactionsRoutes
});
module.exports = __toCommonJS(transactions_routes_exports);
var import_express = require("express");

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
var yup = __toESM(require("yup"));
var bodyValidation = yup.object().shape({
  user_id_send: yup.number(),
  user_name_receiver: yup.string().required(),
  value: yup.number().moreThan(0.99).required()
});

// src/errors/CustomError.ts
var CustomError = class extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
};

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
var ErrorNotArrobaUserName = class extends CustomError {
  constructor() {
    super(
      `Por favor verifique si n\xE3o esta faltando o "@" antes do seu user_name!.`,
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
    if (typeof value !== "number") {
      throw new ErrorValueAndString();
    }
    ;
    const checkFirstCharacterHasArroba = user_name_receiver.trim()[0].includes("@");
    if (!checkFirstCharacterHasArroba) {
      throw new ErrorNotArrobaUserName();
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

// src/errors/UsersErrors.ts
var ErrorNotArrobaUserName2 = class extends CustomError {
  constructor() {
    super(
      `Por favor verifique si n\xE3o esta faltando o "@" antes do seu user_name!.`,
      406
    );
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
        throw new ErrorNotArrobaUserName2();
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
        throw new ErrorNotArrobaUserName2();
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
var transactionsRoutes = (0, import_express.Router)();
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  transactionsRoutes
});
