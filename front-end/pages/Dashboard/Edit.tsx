import { useEffect, useState, useId } from "react";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircleNotch, Eye, EyeSlash, UserGear, Trash } from "phosphor-react";
import { useForm } from "react-hook-form";

import Layout from "../../components/Layout";
import { ModalConfirmDeleteAccount } from "../../components/Modals/ModalConfirmDeleteAccount";
import { SEO } from "../../Seo";
import { queryClientObj } from "../../services/queryClient";
import { findUserAuthApi, editInfoUserApi } from "../../services/endpoints/users";
import { TFindUserResponse } from "../../services/endpoints/types";
import { regexValidatePassword } from "../../utils/regexs";

type TFormData = {
  photo_url?: string;
  user_name: string;
  password?: string;
  confirme_password?: string;
};

const { useMutation, queryClient, useQuery } = queryClientObj;

export default function Edit(user: TFindUserResponse) {
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const [errorApi, setErrorApi] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [ inputsModify, setInputsModify ] = useState<boolean>(false);
  const [ openModal, setOpenModal ] = useState<boolean>(false);
  const [viewConfirmPassword, setViewConfirmPassword] =
    useState<boolean>(false);   
  
 const toastId = useId();

 const { data, refetch } = 
 useQuery("find-user-logged", async () => findUserAuthApi());

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<TFormData>({
    defaultValues: {
      photo_url: "",
      user_name: user?.user_name,
      password: "",
      confirme_password: "",
    },
  });

  const watchUserName = watch("user_name");
  const watchPassword = watch("password");

  useEffect(() => {
    const verifyInputs = 
    previewImage?.length
    || watchPassword?.length 
    || watchUserName !== user.user_name ;

    if ( !verifyInputs ) {
      setInputsModify(true)
    } else {
      setInputsModify(false)
    };
  }, [previewImage?.length, user.user_name, watchPassword, watchUserName]);
  
  const errorUserName = `${
    errors?.user_name?.type ? "border-red-500" : "border-indigo-500"
  }`;

  const { mutate, isLoading, isSuccess, isError} = useMutation(editInfoUserApi, {
    onSuccess: async (data) => {
      queryClient.invalidateQueries("find-user-logged");
      refetch();
      toast.success(
        `Informações editadas com sucesso.`,
        { toastId }
      );
      setPreviewImage("");
      setErrorApi("");
    },
    onError: (err: any) => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigator.vibrate(200);
      setErrorApi(err.response?.data);
      toast.error(err.response?.data);
    },
  });

  function convert2base64 (file: any | Blob) {
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImage(reader.result!.toString());
      setValue("photo_url", reader.result!.toString());
    };
    
    reader.readAsDataURL(file);
  };

  async function sentForm(data: TFormData) {
    const formData = new FormData();
    
    //* Converter foto em base 64 em formato de obj
    const blob = await fetch(previewImage).then(res => res.blob());
    
    if ( data.user_name !==  user?.user_name) {
      formData.append("user_name", data.user_name);
    };
    if ( blob ) {
      formData.append("image", blob);
    };
    if ( data.password ) {
      formData.append("password_hash", data.password!);
    };
    
    mutate(formData);
  };

  const errorEmailInvalid = `${
    errors?.user_name?.type ? "border-red-500" : "border-indigo-500"
  }`;

  const errorPasswordInvalid = `${
    errors?.password?.type ? "border-red-500" : "border-indigo-500"
  }`;

  const errorConfirmPassword = `${
    errors?.confirme_password?.type && watchPassword ? "border-red-500" : "border-indigo-500"
  }`;

  return (
    <Layout>
      <SEO title="Editar" description="Edite sua informações" />
      <ModalConfirmDeleteAccount
        openModal={openModal}
        closeModal={setOpenModal}
      />
      <main className="w-full flex flex-col items-center">
         {/* { isSuccess === true || isError === true ? <ToastContainer /> : null } */}
  
        <div className="w-11/12 max-md:w-full flex items-start justify-center px-5 pb-10 pt-16">
          <form
            onSubmit={handleSubmit(sentForm)}
            className="w-full mx-auto rounded-lg bg-white shadow-lg border-2 px-10 pb-12 pt-5 text-gray-700"
            style={{ maxWidth: "600px" }}
          >
            <div className="w-full pt-1 pb-5">
              <div className="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
                <UserGear className="text-4xl text-white" />
              </div>
            </div>
            <div className="mb-10">
              <h1 className="text-center font-bold text-xl uppercase">
                Editar informações
              </h1>
              <br />
              <div className="h-2  text-center text-red-500 max-[451px]:text-sm max-[317px]:text-xs">
                {errorApi && <p>{errorApi}</p>}
              </div>
            </div>

            <div className="w-full mt-1">
              <div
                className="col-span-6 sm:col-span-4"
              >
                <input type="file" accept="image/png, image/jpeg, image/gif, image/jpg" className="hidden" id="photo"
                    {...register("photo_url", {
                      onChange: (e) => convert2base64(e.target.files[0])
                    })}
                />

                <h3
                  className="block text-gray-700 text-sm font-bold mb-2 text-center"
                >
                  Foto do perfil <span className="text-red-600"> </span>
                </h3>

                <div className="text-center">
                  <div className="mt-2" x-show="! photoPreview">
                    {
                      !previewImage &&
                      (
                        <Image
                          src={`${data?.photo_url ? data.photo_url : user?.photo_url}`} alt="foto do perfil preview"
                          width={150} height={100}
                          priority={true}
                          className={`${previewImage && "w-40 h-40 bg-cover bg-no-repeat bg-center"} m-auto rounded-full shadow`}
                        />
                      )
                    }
                  </div>

                  <div className={`mt-2 ${previewImage.length ? "block" : "hidden"}`}>
                    <span
                      className="block w-40 h-40 rounded-full m-auto shadow"
                      style={{backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundImage: `url("${previewImage}")`}}
                    ></span>
                  </div>
                  <div className="flex justify-center gap-2">
                    <label
                      htmlFor="photo"
                      className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 mt-2 ml-3 cursor-pointer max-sm:text-[0.7rem]"
                    >
                      Selecione uma foto
                    </label>
                    <button type="button" onClick={() => setPreviewImage("")} className="border rounded-md hover:bg-red-500 hover:text-white">
                      <Trash width={25} height={25}/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <br />

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
                        minLength: 5,
                        validate: (event) => {
                          return event![0] === "@";
                        },
                      })}
                      type="text"
                      id="user_name"
                      className={`w-full  pl-5 pr-3 py-2 rounded-lg border-2 outline-none ${errorUserName}`}
                      placeholder="@John-santos-123"
                    />

                    <div className="h-2 text-red-500 mb-2 max-[450px]:text-sm">
                      <p>
                        {errors.user_name?.type === "required"
                          ? "Esse campo é obrigatório."
                          : null}
                      </p>
                      <p>
                        {errors.user_name?.type === "validate" &&
                          "O @ é obrigatório antes do seu nome."}
                      </p>

                      <p className="max-[450px]:text-xs">
                        {errors.user_name?.type === "minLength" &&
                          "Esse campo deve conter no máximo 5 caracteres."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full mb-5">
              <label htmlFor="email" className="text-xs font-semibold px-1">
                Email
              </label>
              <input
                value={user?.user_email}
                disabled={true}
                type="text"
                id="email"
                className={`w-full pl-5 pr-3 py-2 rounded-lg border-2 outline-none ${errorEmailInvalid} disabled:border-green-600`}
                placeholder="@Gabriel-Silva-123"
              />
              {/* <div className="h-2 text-red-500 mb-3 max-[450px]:text-sm">
                <p>{errors.user_email && errors.user_email.message}</p>
              </div> */}
            </div>

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
                          required: false,
                          minLength: 8,
                          pattern: regexValidatePassword,
                        })}
                        type={viewPassword ? "text" : "password"}
                        id="password"
                        className={`w-full pl-5 pr-3 py-2 rounded-lg border-2 ${errorPasswordInvalid} outline-none`}
                        placeholder="Escolher nova senha"
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
                          required: false,
                          validate: (value) => {
                            return value === watchPassword;
                          },
                        })}
                        type={viewConfirmPassword ? "text" : "password"}
                        id="confirme_password"
                        className={`w-full pl-5 pr-3 py-2 rounded-lg border-2 ${errorConfirmPassword} outline-none`}
                        placeholder="Confirma nova senha"
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
                      {
                        watchPassword && (
                          <>
                            <p>
                              {errors?.confirme_password?.type === "required" &&
                                "Esse campo é obrigatório."}
                            </p>
                            <p>
                              {errors?.confirme_password?.type === "validate" &&
                                "Senha incompatível."}
                            </p>
                          </>
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isLoading || inputsModify}
                className={`w-2/4 max-sm:text-sm ${
                  isLoading || inputsModify ? "disabled:opacity-90 cursor-not-allowed" : "hover:bg-indigo-700 focus:bg-indigo-700"
                } bg-indigo-500 text-white rounded-lg px-3 py-3 mt-2 font-semibold`}
              >
                {isLoading ? (
                  <CircleNotch
                    size={24}
                    color="#f1f0ef"
                    className="animate-spin flex justify-center w-full"
                  />
                ) : (
                  <i className="mdi mdi-lock-outline mr-1">Salvar</i>
                )}
              </button>
              <button 
                type="button"
                disabled={isLoading}
                onClick={() => setOpenModal(true)}
                className={`w-2/4 max-sm:text-sm ${
                  isLoading ? "disabled:opacity-90 cursor-not-allowed" : "hover:bg-red-700 focus:bg-red-700"
                } bg-red-500 text-white rounded-lg px-3 py-3 mt-2 font-semibold`}
              >
                Exlcuir conta
              </button>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { ["ng.token"]: token } = parseCookies(ctx);

    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    };

    const user = await findUserAuthApi(ctx);

    return {
      props: user,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};