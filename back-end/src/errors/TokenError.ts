import { CustomError } from "./CustomError";

export class TokenError extends CustomError {
  constructor(){
    super("Não autorizado. Por favor passe o token de verificação!.", 401);
  }
};