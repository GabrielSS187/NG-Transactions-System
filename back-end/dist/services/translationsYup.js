"use strict";

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
