import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CircleNotch, ArrowClockwise, Hand } from "phosphor-react";
import Modal from "react-modal";
import { Zoom } from "react-awesome-reveal";

import { alterEmailApi } from "../../services/endpoints/users";
import { regexEmail } from "../../utils/regexs";

interface IProps {
  userName: string;
  userEmail: string;
  verify: boolean;
  codeUser: string;
}

type TFormEmail = {
  newEmail: string;
};

type TErrorAndSuccessApi = {
  type: "success" | "error" | string;
  message: string;
};

export function ModalConfirmEmail({
  userEmail,
  userName,
  verify,
  codeUser,
}: IProps) {
  const [isLoad, setIsLoad] = useState(false);
  const [errorAndSuccessApi, setErrorAndSuccessApi] =
    useState<TErrorAndSuccessApi>({
      type: "",
      message: "",
    });

  const { push } = useRouter();

  const emailLocal = localStorage.getItem("email-local");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormEmail>({
    defaultValues: { newEmail: emailLocal !== null ? emailLocal : "" },
  });

  async function alterEmail(data: TFormEmail) {
    try {
      setIsLoad(true);
      const responseMessage = await alterEmailApi(data.newEmail, codeUser);
      localStorage.setItem("email-local", data.newEmail);
      setIsLoad(false);
      setErrorAndSuccessApi({
        type: "success",
        message: responseMessage,
      });
    } catch (error: any) {
      setErrorAndSuccessApi({
        type: "error",
        message: error.response?.data,
      });
    } finally {
      setIsLoad(false);
    }
  } 

  const errorEmailInvalid = `${
    errors?.newEmail?.type ? "border-red-500" : "border-indigo-500"
  }`;

  return (
    <>
      <div>
        <Modal
          isOpen={verify}
          contentLabel="Modal confirm email"
          overlayClassName="modal-overlay"
          className="modal-content"
          ariaHideApp={false}
        >
          <Zoom>
            <div className="text-center">
              <div>
                <h2 className="text-2xl max-[420px]:text-xl">
                  Olá <strong>{userName}</strong>
                </h2>
                <h3 className="max-[420px]:text-sm">
                  Por favor confirme seu email que você usou para si cadastrar
                  para poder efetuar o login
                </h3>
                <h3 className="max-[420px]:text-sm">
                  Um email de confirmação foi enviado para{" "}
                  <strong>
                    {emailLocal !== null ? emailLocal : userEmail}
                  </strong>
                </h3>
              </div>
              <br />
              <div className="flex flex-col gap-2 max-[420px]:text-sm">
                <h3>
                  Caso tenha colocado o email errado, altere colocando o novo
                  email abaixo.
                </h3>
                <form
                  onSubmit={handleSubmit(alterEmail)}
                  className="flex flex-col gap-2 justify-center items-center"
                >
                  <div className="w-full">
                    <div className="mb-1 max-[450px]:text-sm">
                      {errorAndSuccessApi.message && isLoad === false && (
                        <p
                          className={`${
                            errorAndSuccessApi.type === "success"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {errorAndSuccessApi.message}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <input
                        {...register("newEmail", {
                          required: {
                            value: true,
                            message: "Email obrigatório!",
                          },
                          pattern: {
                            value: regexEmail,
                            message: "Email invalido!",
                          },
                        })}
                        type="text"
                        id="email"
                        className={`w-full  pl-5 pr-3 py-2 rounded-lg border-2 outline-none ${errorEmailInvalid}`}
                        placeholder={userEmail}
                      />
                      <button
                        type="submit"
                        disabled={isLoad}
                        title="Reenviar"
                        className="p-2 text-white rounded-lg border-2 disabled:bg-red-500 bg-indigo-500 hover:bg-indigo-700 transition duration-150 hover:ease-in hover:rotate-180"
                      >
                        {!isLoad ? (
                          <ArrowClockwise width={30} height={30} />
                        ) : (
                          <Hand width={30} height={30} />
                        )}
                      </button>
                    </div>
                    <div className="h-5 mb-3 mt-1 max-[450px]:text-sm">
                      {errors.newEmail && (
                        <p className="text-red-500">
                          {errors.newEmail.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="w-full px-3 flex gap-2">
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
                      ) : (
                        "Alterar"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => push("/Register")}
                      className={`block w-full max-w-xs mx-auto bg-indigo-500 text-white rounded-lg px-3 py-3 font-semibold ${
                        isLoad
                          ? "disabled:opacity-90 cursor-not-allowed"
                          : "hover:bg-indigo-700 focus:bg-indigo-700"
                      }`}
                    >
                      Criar conta
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Zoom>
        </Modal>
      </div>
    </>
  );
}
function findUser(getEmailLocal: string) {
  throw new Error("Function not implemented.");
}

