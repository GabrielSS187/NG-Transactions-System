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

// src/use-cases/Users-cases/Validations.ts
var Validations_exports = {};
__export(Validations_exports, {
  bodyEditValidation: () => bodyEditValidation,
  bodyValidation: () => bodyValidation,
  regexEmail: () => regexEmail,
  regexRemoveCommas: () => regexRemoveCommas,
  regexRemoveSpaces: () => regexRemoveSpaces,
  regexSpecialCharacters: () => regexSpecialCharacters,
  regexValidatePassword: () => regexValidatePassword
});
module.exports = __toCommonJS(Validations_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  bodyEditValidation,
  bodyValidation,
  regexEmail,
  regexRemoveCommas,
  regexRemoveSpaces,
  regexSpecialCharacters,
  regexValidatePassword
});
