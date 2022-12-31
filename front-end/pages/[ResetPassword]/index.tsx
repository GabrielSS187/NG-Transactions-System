import { useId, useState } from "react";
import { GetServerSideProps } from "next";
import Router, { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CircleNotch,
  Money,
  Key,
  LockKey,
  Eye,
  EyeSlash,
} from "phosphor-react";
import { useForm } from "react-hook-form";

import { SEO } from "../../Seo";
import {
  findUserByCodeApi,
  alterPasswordApi,
} from "../../services/endpoints/users";
import { useMutation } from "react-query";

type TUser = {
  user_name: string;
};

type TFormData = {
  password: string;
  confirme_password: string;
  codeUser?: string;
};

export default function ResetPassword(user: TUser) {
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const [viewConfirmPassword, setViewConfirmPassword] =
    useState<boolean>(false);
  const [alterLogoForm, setAlterLogoForm] = useState<boolean>(false);
  const [errorsApi, setErrorsApi] = useState<string>("");

  const toastId = useId();

  const { query } = useRouter()
  const { ResetPassword: codeUser } = query;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TFormData>();

  const watchPassword = watch("password");

  const { mutate, isLoading, isSuccess, isError } = useMutation(alterPasswordApi, {
    onSuccess: async (data) => {
      setAlterLogoForm(true);
      toast.success("Senha alterada com sucesso.", { toastId });
      Router.push("/");
    },
    onError: (err: any) => {
      setErrorsApi(err.response?.data);
      toast.error(err.response?.data);
    },
  });

  async function sentForm(data: TFormData) {
    const formattedObj = {
      newPassword: data.password,
      codeUser: String(codeUser),
    };

    mutate(formattedObj);
  };
  
  const errorPasswordInvalid = `${
    errors?.password?.type ? "border-red-500" : "border-indigo-500"
  }`;

  const errorConfirmPassword = `${
    errors?.confirme_password?.type ? "border-red-500" : "border-indigo-500"
  }`;

  const regexValidatePassword =
    /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/g;

  return (
    <>
      <SEO title="ALterar senha" description="Alterar senha" />
      <main className="py-10 flex flex-col items-center">
        {/* { isSuccess === true || isError === true ? <ToastContainer /> : null } */}
        <div className="flex flex-col items-center text-center px-2">
          <h1 className="text-3xl">
            Olá <strong>{user.user_name}</strong>
          </h1>
          <h2 className="text-2xl max-sm:text-lg">
            Para redefinir sua senha preencha os campos abaixo
          </h2>
        </div>

        <div className="w-4/5 max-md:w-full h-screen flex items-start justify-center px-5 pb-10 pt-16">
          <form
            onSubmit={handleSubmit(sentForm)}
            className="w-full mx-auto rounded-lg bg-white shadow-lg border-2 px-10 pb-12 pt-5 text-gray-700"
            style={{ maxWidth: "600px" }}
          >
            <div className="w-full pt-1 pb-5">
              <div className="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
                {alterLogoForm ? (
                  <LockKey className="text-3xl text-white" />
                ) : (
                  <Key className="text-3xl text-white" />
                )}
              </div>
            </div>
            <div className="mb-10">
              <h1 className="text-center font-bold text-xl uppercase">
                Trocar senha
              </h1>
              <br />
              <div className="h-2  text-center text-red-500 max-[451px]:text-sm max-[317px]:text-xs">
                {errorsApi && <p>{errorsApi}</p>}
              </div>
            </div>

            <div className="flex -mx-3">
              <div className="w-full px-3 mb-12">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold px-1"
                >
                  Nova senha
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
                          minLength: 8,
                          pattern: regexValidatePassword,
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
                      <p>
                        {errors?.password?.type === "minLength" &&
                          "Esse campo deve conter no máximo 8 caracteres."}
                      </p>
                      <p className="max-[450px]:text-xs">
                        {errors?.password?.type === "pattern" &&
                          "Deve ter 1 letra maiúscula e minuscula, números, é caracteres especiais e sem espaços."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`block w-full max-w-xs mx-auto ${
                  isLoading && "disabled:opacity-80"
                } bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 mt-2 font-semibold`}
              >
                {isLoading ? (
                  <CircleNotch
                    size={24}
                    color="#f1f0ef"
                    className="animate-spin flex justify-center w-full"
                  />
                ) : (
                  <i className="mdi mdi-lock-outline mr-1">Enviar</i>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { ResetPassword: codeUser } = ctx.query;

    const user = await findUserByCodeApi(String(codeUser));

    if (!user) {
      return {
        notFound: true,
      };
    };

    return {
      props: user,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  };
};
