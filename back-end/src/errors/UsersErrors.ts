import { CustomError } from "./CustomError";

export class ErrorExistUserName extends CustomError {
  constructor(){
    super(
      `Já existe um cadastro com esse nome!.`, 
      409
    );
  };
};

export class ErrorExistUserEmail extends CustomError {
  constructor(){
    super(
      `Já existe um cadastro com esse email!.`, 
      409
    );
  };
};

export class ErrorLogin extends CustomError {
  constructor(){
    super(
      `Os campos de nome do usuário e senha são obrigatórios!.`, 
      406
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

export class ErrorCodeInvalid extends CustomError {
  constructor(){
    super(
      `Código invalido.`,
      406
    );
  };
};

export class ErrorVerifyInvalid extends CustomError {
  constructor(){
    super(
      `So e aceito valor booleano!.`,
      406
    );
  };
};

export class ErrorInvalidEmail extends CustomError {
  constructor(){
    super(
      `Esse email não é valido!.`,
      406
    );
  };
};

export class ErrorEmailSameAsAlreadyBe extends CustomError {
  constructor(){
    super(
      `Escolha um email diferente do que já esta!.`,
      409
    );
  };
};

export class ErrorEmailRequired extends CustomError {
  constructor(){
    super(
      `Email obrigatório!.`,
      406
    );
  };
};

export class ErrorConfirmEmail extends CustomError {
  constructor(){
    super(
      `Por favor confirme seu email!.`,
      406
    );
  };
};


export class ErrorStandard extends CustomError {
  constructor(){
    super(
      `Ops! algo deu errado. Por favor tente de novo mais tarde!.`,
      500
    );
  };
};
