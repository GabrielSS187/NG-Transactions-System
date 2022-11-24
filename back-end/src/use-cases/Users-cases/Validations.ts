import * as yup from "yup";
import { TUsersData } from "./types";

export const bodyValidation: yup.SchemaOf<TUsersData> =
yup.object().shape({
 user_name: yup.string().required().min(5).max(100).trim(),
 password: yup.string().required().min(8).trim(),
});

export const regexSpecialCharacters = /[*.\=#\¨!\<>\.^\~()\&$\¬{}\;:\°ª\?/\[£\]%\¢|\+]/gi
//* Pelo menos uma letra maiúscula, Pelo menos uma letra minúscula, Pelo menos um dígito
//* Pelo menos um caractere especial, Comprimento mínimo de oito.
export const regexValidatePassword = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/g
export const regexRemoveSpaces = /\s/g
export const regexRemoveCommas = /[^0-9]/g