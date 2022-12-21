import * as yup from "yup";
import { TUsersData, TEditInfoUserData } from "./types";

export const bodyValidation: yup.SchemaOf<TUsersData> =
yup.object().shape({
 user_name: yup.string().required().min(5).max(100).trim(),
 user_email: yup.string().required().email().trim(),
 password: yup.string().required().min(8).trim(),
});

export const bodyEditValidation: yup.SchemaOf<TEditInfoUserData> =
yup.object().shape({
 photo_url: yup.string(),
 user_name: yup.string().min(5).max(100).trim(),
 user_email: yup.string().email().trim(),
 password_hash: yup.string().min(8).trim(),
 verify: yup.boolean(),
});

export const regexSpecialCharacters = /[*.\=#\¨!\<>\.^\~()\&$\¬{}\;:\°ª\?/\[£\]%\¢|\+]/gi
//* Pelo menos uma letra maiúscula, Pelo menos uma letra minúscula, Pelo menos um dígito
//* Pelo menos um caractere especial, Comprimento mínimo de oito.
export const regexValidatePassword = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/g
export const regexRemoveSpaces = /\s/g
export const regexRemoveCommas = /[^0-9]/g
export const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i