import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { CircleNotch, Eye, EyeSlash } from "phosphor-react";

import LoginAndRegisterSvg from "../../assets/svgs/LoginAndRegisterSvg";
import transactionsLogo3 from "../../assets/imgs/transactions-logo-3.png";

type TFormType = "register" | "login";

interface IProps {
  type: TFormType;
  onSubmitData: SubmitHandler<FieldValues>;
  errorApi?: string;
  isLoad?: boolean;
}

type FormData = {
  user_name: string;
  user_email: string;
  password: string;
  confirme_password?: string;
};

export function FormLoginAndRegister({
  onSubmitData,
  type,
  errorApi,
  isLoad,
}: IProps) {
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const [viewConfirmPassword, setViewConfirmPassword] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const watchPassword = watch("password");

  const errorUserNameClass = `${
    errors?.user_name?.type ? "border-red-500" : "border-indigo-500"
  }`;

  const errorEmailInvalid = `${
    errors?.user_name?.type ? "border-red-500" : "border-indigo-500"
  }`;

  const errorPasswordInvalid = `${
    errors?.password?.type ? "border-red-500" : "border-indigo-500"
  }`;

  const errorConfirmPassword = `${
    errors?.confirme_password?.type ? "border-red-500" : "border-indigo-500"
  }`;

  const regexValidatePassword =
    /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/g;

  return (
    <main className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
      <div
        className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
        style={{ maxWidth: "1000px" }}
      >
        <div className="md:flex w-full">
          <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
            <LoginAndRegisterSvg />
          </div>

          <form
            onSubmit={handleSubmit(onSubmitData)}
            className="w-full md:w-1/2 py-10 px-5 md:px-10"
          >
            <div className="text-center mb-10">
              <div className="flex justify-center gap-6">
                <Image
                  src={transactionsLogo3}
                  width={220}
                  priority={true}
                  alt="logo ng transações"
                />
                <div />
              </div>
              <br />
              <h1 className="font-bold text-3xl text-gray-900">
                {type === "register" ? "Criar conta" : "Login"}
              </h1>
              <p>
                {type === "register"
                  ? "Insira suas informações para si cadastra."
                  : "Entre com suas informações de cadastro"}
              </p>

              <div className="pt-2 h-1 text-red-500 max-[451px]:text-sm max-[317px]:text-xs">
                {errorApi && <p>{errorApi}</p>}
              </div>
            </div>

            {/* Inputs */}
            <div className="pt-2">
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-3">
                  <label
                    htmlFor="user_name"
                    className="text-xs font-semibold px-1"
                  >
                    Seu nome
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                    </div>
                    <div className="w-full -ml-10">
                      <input
                        {...register("user_name", {
                          required: true,
                          minLength: type === "register" ? 5 : undefined,
                          validate: (event) => {
                            return event[0] === "@";
                          },
                        })}
                        type="text"
                        id="user_name"
                        className={`w-full  pl-5 pr-3 py-2 rounded-lg border-2 outline-none ${errorUserNameClass}`}
                        placeholder="@John-santos-123"
                      />

                      <div className="h-2 text-red-500 mb-2 max-[450px]:text-sm">
                        <p>
                          {errors.user_name?.type === "required"
                            ? "Esse campo é obrigatório."
                            : null}
                        </p>
                        <p>
                          {errors.user_name?.type === "validate"
                            ? "O @ é obrigatório antes do seu nome."
                            : null}
                        </p>
                        {type === "register" && (
                          <p className="max-[450px]:text-xs">
                            {errors.user_name?.type === "minLength"
                              ? "Esse campo deve conter no máximo 5 caracteres."
                              : null}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {
                type === "register" &&
                (
                  <div className="w-full mb-5">
                    <label
                        htmlFor="email"
                        className="text-xs font-semibold px-1"
                      >
                        Email
                    </label>
                    <input
                      {...register("user_email", {
                        required: { value: true, message: "Esse campo é obrigatório.!" },
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Email invalido!",
                        },
                      })}
                      type="text"
                      id="email"
                      className={`w-full pl-5 pr-3 py-2 rounded-lg border-2 outline-none ${errorEmailInvalid}`}
                      placeholder="@John-santos-123"
                    />
                    <div className="h-2 text-red-500 mb-3 max-[450px]:text-sm">
                      <p>{errors.user_email && errors.user_email.message}</p>
                    </div>
                  </div>
                )
              }

              <div className="flex -mx-3">
                <div className="w-full px-3 mb-12">
                  <label
                    htmlFor="password"
                    className="text-xs font-semibold px-1"
                  >
                    Senha
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                    </div>
                    <div className="w-full -ml-10">
                      <div className="flex gap-1">
                        <input
                          {...register("password", {
                            required: true,
                            minLength: type === "register" ? 8 : undefined,
                            pattern:
                              type === "register"
                                ? regexValidatePassword
                                : undefined,
                          })}
                          type={viewPassword ? "text" : "password"}
                          id="password"
                          className={`w-full pl-5 pr-3 py-2 rounded-lg border-2 ${errorPasswordInvalid} outline-none`}
                          placeholder="************"
                        />
                        <button
                          onClick={() => setViewPassword(!viewPassword)}
                          type="button"
                          className="border-2 border-indigo-500 p-1 rounded-md"
                        >
                          {!viewPassword ? (
                            <Eye width={20} height={20} />
                          ) : (
                            <EyeSlash width={20} height={20} />
                          )}
                        </button>
                      </div>
                      <div className="h-2 text-red-500 mb-3 max-[450px]:text-sm">
                        <p>
                          {errors?.password?.type === "required" &&
                            "Esse campo é obrigatório."}
                        </p>
                        {type === "register" && (
                          <p>
                            {errors?.password?.type === "minLength" &&
                              "Esse campo deve conter no máximo 8 caracteres."}
                          </p>
                        )}
                        {type === "register" && (
                          <p className="max-[450px]:text-xs">
                            {errors?.password?.type === "pattern" &&
                              "Deve ter 1 letra maiúscula e minuscula, números, é caracteres especiais e sem espaços."}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {type === "register" && (
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-12">
                    <label
                      htmlFor="confirme_password"
                      className="text-xs font-semibold px-1"
                    >
                      Confirma senha
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                      </div>
                      <div className="w-full -ml-10">
                        <div className="flex gap-1">
                          <input
                            {...register("confirme_password", {
                              required: true,
                              validate: (value) => {
                                return value === watchPassword;
                              },
                            })}
                            type={viewConfirmPassword ? "text" : "password"}
                            id="confirme_password"
                            className={`w-full pl-5 pr-3 py-2 rounded-lg border-2 ${errorConfirmPassword} outline-none`}
                            placeholder="************"
                          />
                          <button
                            onClick={() =>
                              setViewConfirmPassword(!viewConfirmPassword)
                            }
                            className="border-2 border-indigo-500 p-1 rounded-md"
                            type="button"
                          >
                            {!viewConfirmPassword ? (
                              <Eye width={20} height={20} />
                            ) : (
                              <EyeSlash width={20} height={20} />
                            )}
                          </button>
                        </div>
                        <div className="h-2 text-red-500 mb-3 max-[450px]:text-sm">
                          <p>
                            {errors?.confirme_password?.type === "required" &&
                              "Esse campo é obrigatório."}
                          </p>
                          <p>
                            {errors?.confirme_password?.type === "validate" &&
                              "Senha incompatível."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <button
                    type="submit"
                    disabled={isLoad}
                    className={`block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold ${
                      isLoad ? "disabled:opacity-80" : ""
                    }`}
                  >
                    {isLoad ? (
                      <CircleNotch
                        size={24}
                        color="#f1f0ef"
                        className="animate-spin flex justify-center w-full"
                      />
                    ) : type === "register" ? (
                      "Cadastrar"
                    ) : (
                      "Entrar"
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center">
              {type === "register" ? (
                <p>
                  Já possui uma conta? efetue o:
                  <Link
                    href="/Login"
                    className="text-blue-500 underline decoration-wavy ml-1"
                  >
                    login
                  </Link>
                </p>
              ) : (
                <p>
                  Ainda não possui uma conta? crie uma:
                  <Link
                    href="/Register"
                    className="text-blue-500 underline decoration-wavy ml-1"
                  >
                    criar
                  </Link>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
