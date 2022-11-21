import * as yup from "yup";

import { TTransactionsData } from "./types";

export const bodyValidation: yup.SchemaOf<TTransactionsData> =
yup.object().shape({
 user_id_send: yup.number(),
 user_name_receiver: yup.string().required(),
 value: yup.number().moreThan(0.99).required(),
});