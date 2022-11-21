import { CustomError } from "./CustomError";
import * as b from "node:http"

export class ErrorExistUserName extends CustomError {
  constructor(userName: string){
    super(
      `Já existe um usuário com esse nome: ${userName}. Por favor tente outro diferente!.`, 
      409
    );
  };
};

export class ErrorUserNameInvalid extends CustomError {
  constructor(){
    super(
      `Nome do usuário não pode conter espaços em branco. E os únicos caracteres especiais permitidos são: traços e underline!.`,
      406
    );
  };
};

export class ErrorUserNotFound extends CustomError {
  constructor(){
    super(
      `Usuário não encontrado ou não existe!.`,
      404
    );
  };
};

export class ErrorPasswordInvalid extends CustomError {
  constructor(){
    super(
      `Senha invalida!.`,
      406
    );
  };
};

export class ErrorPasswordRegexInvalid extends CustomError {
  constructor(){
    super(
      `A senha deve conter no minimo 8 caracteres com no máximo 1 digito, 1 letra maiúscula, 1 letra minúscula e um caracter especial. E não pode conter espaços em branco!.`,
      406
    );
  };
};

export class ErrorNotArrobaUserName extends CustomError {
  constructor(){
    super(
      `Por favor verifique si não esta faltando o "@" antes do seu user_name!.`,
      406
    );
  };
};
