"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/server.ts
var server_exports = {};
__export(server_exports, {
  app: () => app
});
module.exports = __toCommonJS(server_exports);
var import_express = __toESM(require("express"));
var import_cors = __toESM(require("cors"));
var import_dotenv = __toESM(require("dotenv"));

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
import_dotenv.default.config();
var app = (0, import_express.default)();
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app
});
