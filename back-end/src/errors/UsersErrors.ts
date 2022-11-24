import { CustomError } from "./CustomError";

export class ErrorExistUserName extends CustomError {
  constructor(userName: string){
    super(
      `Já existe um usuário com esse nome: ${userName}.`, 
      409
    );
  };
};

export class ErrorUserNameInvalid extends CustomError {
  constructor(){
    super(
      `Nome do usuário, caracteres especiais permitidos são: @, traços e underline!.`,
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

export class ErrorStringMustOnlyOneArroba extends CustomError {
  constructor(){
    super(
      `O nome deve ter apenas um @ que é no inicio.`,
      406
    );
  };
};
