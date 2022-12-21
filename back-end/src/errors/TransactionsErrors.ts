import { CustomError } from "./CustomError";

export class ErrorValueAndString extends CustomError{
  constructor(){
    super("Só é aceito valores númericos!.", 406);
  };
};

export class ErrorValueInvalid extends CustomError{
  constructor(){
    super("Só é aceito valor em string!.", 406);
  };
};

export class ErrorUserSendNotFound extends CustomError{
  constructor(){
    super("Ó usuário que você quer enviar o dinheiro não existe!.", 404);
  };
};

export class ErrorInsufficientFunds extends CustomError{
  constructor(){
    super("Você não possui saldo suficiente para concluir a transação!.", 406);
  };
};

export class ErrorCannotSendMoneyToYourself extends CustomError{
  constructor(){
    super("Você não pode enviar dinheiro para si mesmo!.", 406);
  };
};

export class ErrorTransactionNotFound extends CustomError{
  constructor(){
    super("Transação não encontrada!.", 404);
  };
};

export class ErrorLookedInvalid extends CustomError{
  constructor(){
    super("Só é aceito valores booleanos como true ou false!.", 406);
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

export class ErrorStandard extends CustomError {
  constructor(){
    super(
      `Ops! algo deu errado. Por favor tente de novo mais tarde!.`,
      500
    );
  };
};