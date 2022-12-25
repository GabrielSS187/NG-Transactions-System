import { SEO } from "../../Seo";
import { useState } from "react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { parseCookies } from "nookies";
import { CircleNotch, Money } from "phosphor-react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "../../components/Layout";
import { fetchAllUsersApi } from "../../services/endpoints/users";
import { queryClientObj } from "../../services/queryClient";
import { Load } from "../../components/Load";
import { createdTransactionApi } from "../../services/endpoints/transactions";
import { TCreateTransaction } from "../../services/endpoints/types";

const { useQuery, useMutation, useQueryClient } = queryClientObj;

const SearchUserSentMoney = dynamic(
  () => import("../../components/SearchUserSentMoney"),
  {
    loading: () => <Load />,
  }
);

export default function SentMoney() {
  const [isOpenSearchUser, setIsOpenSearchUser] = useState<boolean>(false);
  const [errorApi, setErrorApi] = useState<string>("");

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<TCreateTransaction>();

  const watchUserNameReceiver = watch("user_name_receiver") ?? "";

  function getUserOnClick(userName: string) {
    setValue("user_name_receiver", userName.substring(1));
    setIsOpenSearchUser(false);
  };

  const { mutate, isLoading } = useMutation(createdTransactionApi, {
    onSuccess: async (data) => {      
      toast.success(
        `Dinheiro enviado com sucesso para ${data.userReceiver}.`
      );
      queryClient.invalidateQueries("find-user-logged");
      reset();
    },
    onError: (err: any) => {
      setErrorApi(err.response?.data);
      toast.error(err.response?.data);
    },
  });

  async function sentForm(data: TCreateTransaction) {
    const dataForm = {
      ...data,
      user_name_receiver: `@${data.user_name_receiver}`,
      value: Number(data.value),
    };

    mutate(dataForm);
  };

  const { data, refetch } = useQuery(
    "users-search",
    async () => await fetchAllUsersApi("", watchUserNameReceiver.trim()),
    {
      enabled: watchUserNameReceiver.trim().length >= 1,
    }
  );

  const errorUserNameClass = `${
    errors?.user_name_receiver?.type ? "border-red-500" : "border-indigo-500"
  }`;

  const errorValueClass = `${
    errors?.value?.type ? "border-red-500" : "border-indigo-500"
  }`;

  if (errorApi.length > 1) {
    setTimeout(() => {
      setErrorApi("");
    }, 7000);
  };

  return (
    <Layout>
      <SEO title="Enviar" description="Envia dinheiro" />
      <div className="min-w-screen h-screen flex items-start justify-center px-5 pb-10 pt-16">
        <ToastContainer />
        <form
          onSubmit={handleSubmit(sentForm)}
          className="w-full mx-auto rounded-lg bg-white shadow-lg border-2 px-10 pb-12 pt-5 text-gray-700"
          style={{ maxWidth: "600px" }}
        >
          <div className="w-full pt-1 pb-5">
            <div className="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
              <Money className="text-3xl text-white" />
            </div>
          </div>
          <div className="mb-10">
            <h1 className="text-center font-bold text-xl uppercase">
              Envio seguro
            </h1>
            <br />
            <div className="h-2  text-center text-red-500 max-[451px]:text-sm max-[317px]:text-xs">
              {errorApi && <p>{errorApi}</p>}
            </div>
          </div>

          <div className="mb-3">
            <label className="font-bold text-sm mb-2 ml-1">
              Nome da pessoa
            </label>
            <div className="flex gap-1">
              <input
                type="text"
                value="@"
                disabled={true}
                className="w-7 text-center text-lg mb-1 border-2 border-gray-200 rounded-md bg-indigo-500 text-white"
              />
              <input
                {...register("user_name_receiver", {
                  required: true,
                })}
                onKeyDown={(e) =>
                  e.currentTarget.value.trim().length >= 1 &&
                  setIsOpenSearchUser(true)
                }
                className={`w-full px-3 py-2 mb-1 border-2 ${errorUserNameClass} rounded-md focus:outline-none transition-colors`}
                placeholder="Gabriel_Silva"
                type="text"
              />
            </div>
            {isOpenSearchUser && (
              <SearchUserSentMoney
                data={data || []}
                getUserOnClick={getUserOnClick}
                inputHandle={watchUserNameReceiver}
                refetch={refetch}
              />
            )}

            <div className="h-2 text-red-500 mb-2 max-[451px]:text-sm max-[317px]:text-xs">
              <p>
                {errors.user_name_receiver?.type === "required" &&
                  "Esse campo é obrigatório."}
              </p>
            </div>
          </div>
          <br />

          <div className="mb-3">
            <label className="font-bold text-sm mb-2 ml-1">
              Valor a ser enviado
            </label>
            <div>
              <input
                {...register("value", {
                  required: true,
                  min: 1
                })}
                className={`w-full px-3 py-2 mb-1 border-2 ${errorValueClass} rounded-md focus:outline-none transition-colors`}
                placeholder="R$ 5.00"
                type="number"
                step="0.01" lang="en"
              />
            </div>

            <div className="h-2 text-red-500 max-[451px]:text-sm max-[317px]:text-xs">
              <p>
                {errors.value?.type === "required" &&
                  "Esse campo é obrigatório!"}
              </p>
              <p>
                {errors.value?.type === "min" &&
                  "Valor tem que ser no mínimo R$ 1.00!"}
              </p>
            </div>
          </div>
          <br />

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`block w-full max-w-xs mx-auto ${isLoading ? "disabled:opacity-90 cursor-not-allowed" : "hover:bg-indigo-700 focus:bg-indigo-700"} bg-indigo-500 text-white rounded-lg px-3 py-3 mt-2 font-semibold`}
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
    }

    return {
      props: {},
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
