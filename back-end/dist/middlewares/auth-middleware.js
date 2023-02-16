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

// src/middlewares/auth-middleware.ts
var auth_middleware_exports = {};
__export(auth_middleware_exports, {
  authMiddleware: () => authMiddleware
});
module.exports = __toCommonJS(auth_middleware_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authMiddleware
});
