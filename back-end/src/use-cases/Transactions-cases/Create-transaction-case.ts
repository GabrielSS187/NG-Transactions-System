import { ITransactionsModel } 
from "../../models/Transactions-models/ITransactionsModel";

import * as yup from "yup";

import { TTransactionsData } from "./types";
import { bodyValidation } from "./validations";

import { 
  ErrorInsufficientFunds,
  ErrorUserSendNotFound,
  ErrorValueAndString,
  ErrorCannotSendMoneyToYourself,
  ErrorNotArrobaUserName,
  ErrorValueInvalid,
 } from "../../errors/TransactionsErrors";

export class CreateTransactionCase {
  constructor (
    private readonly transactionsModel: ITransactionsModel,
  ){};

  async create (request: TTransactionsData) {
    let {
      user_id_send,
      user_name_receiver,
      value
    } = request;

    let validatedData: TTransactionsData | undefined = undefined;

    if ( typeof user_name_receiver !== "string" ) {
      throw new ErrorValueInvalid();
    };

    try {
      validatedData = 
      await bodyValidation.validate(request, { abortEarly: false });
    } catch ( err ) {
      const yupError = err as yup.ValidationError;
      const validationErrors: Record<string, string> = {};

      yupError.inner.forEach((error) => {
        if ( !error.path ) return;
        validationErrors[error.path] = error.message
      });

      return {
        message: validationErrors,
        statusCode: 400,
      }
    };

    if ( typeof value !== "number" ) {
      throw new ErrorValueAndString();
    };

    const checkFirstCharacterHasArroba = user_name_receiver
     .trim()[0].includes("@");

     if (!checkFirstCharacterHasArroba) {
      throw new ErrorNotArrobaUserName();
     };

    value = Number(value.toFixed(2));

    const userSend = await this.transactionsModel
    .findUser(user_id_send!);

    if ( userSend.user_name === user_name_receiver ) {
      throw new ErrorCannotSendMoneyToYourself();
    };
    
    const userReceiver = await this.transactionsModel
    .findUser(0, user_name_receiver);

    if (!userReceiver) {
      throw new ErrorUserSendNotFound();
    };

    const accountSend = await this.transactionsModel
    .findAccount(userSend.account_id);
    const accountReceiver = await this.transactionsModel
    .findAccount(userReceiver.account_id);

    if ( accountSend.balance < value ) {
      throw new ErrorInsufficientFunds();
    };
    
    await this.transactionsModel.create({
      debited_account_id: userSend.account_id,
      credited_account_id: userReceiver.account_id,
      value,
    });

    await this.transactionsModel.updateBalance({
      id_account: userSend.account_id,
      value: accountSend.balance - value,
    });

    await this.transactionsModel.updateBalance({
      id_account: userReceiver.account_id,
      value: accountReceiver.balance + value,
    });

    return {
      message: {
        userSend: userSend.user_name,
        userReceiver: userReceiver.user_name,
        sendValue: value,
      },
      statusCode: 201,
    };
  };
};