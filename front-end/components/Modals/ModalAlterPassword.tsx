import { useState } from "react";
import { useForm } from "react-hook-form";
import { CircleNotch, ArrowClockwise, Hand, X } from "phosphor-react";
import Modal from "react-modal";

import { sendConfirmationEmailApi } from "../../services/endpoints/users";
import { regexEmail } from "../../utils/regexs";

interface IProps {
  closeModal: (input: boolean) => void;
  openModal: boolean;
};

type TFormData = {
  email: string
};

type TErrorAndSuccessApi = {
  type: "success" | "error" | string,
  message: string;
};

export function ModalAlterPassword ({
  openModal,
  closeModal
}: IProps) {
  const [isLoad, setIsLoad] = useState(false);
  const [ errorAndSuccessApi, setErrorAndSuccessApi ] = useState<TErrorAndSuccessApi>({
    type: "",
    message: ""
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<TFormData>({
    defaultValues: {email: ""}
  });

  async function sendEmail(data: TFormData) {
    try {
      setIsLoad(true)
      const responseMessage = await sendConfirmationEmailApi(data.email);
      setIsLoad(false);
      setErrorAndSuccessApi({
        type: "success",
        message: responseMessage
      });
    } catch (error: any) {
      setErrorAndSuccessApi({
        type: "error",
        message: error.response?.data
      });
    } finally {
      setIsLoad(false);
    };
  };

  function verifyEmailSaveLocal () {
    const emailLocal = localStorage.getItem("email-confirmed")
    if ( emailLocal !== null ) {
      setValue("email", emailLocal);
    }
    else {
      setErrorAndSuccessApi({
        type: "error",
        message: "Você não tem nenhum email salvo!"
      })
    };
  };

  const errorEmailInvalid = `${
    errors?.email?.type ? "border-red-500" : "border-indigo-500"
  }`;

  return (
    <>
        <div>
          <Modal
            isOpen={openModal}
            contentLabel="Modal confirm email"
            overlayClassName="modal-overlay"
            className="modal-content"
            ariaHideApp={false}
          >
            <button onClick={() => closeModal(false)} className="self-end"> 
              <X width={30} height={30} className=" hover:border hover:rounded-full hover:border-green-500 hover:p-1"/>
            </button>
            <div className="text-center">
              <div>
                <h1 className="text-3xl mb-3"><strong>Solicitar alteração de senha</strong></h1>
                <h2 className="">Olá você esta na sessão de solicitação de alteração de senha.</h2>
                <h2>Coloque o email da sua conta <strong>NG</strong> abaixo para podemos verificar que é você.</h2>
              </div>
              <br/>
              <div className="flex flex-col gap-2">
                <h3>
                  Verificar si existe o seu email salvo: 
                  <span/>   
                  <button 
                    type="button" 
                    onClick={verifyEmailSaveLocal}
                    className="text-blue-500 underline decoration-wavy ml-1"
                  >
                    Verificar
                  </button>
                </h3>
                <form onSubmit={handleSubmit(sendEmail)} className="flex flex-col gap-2 justify-center items-center">
                  <div className="w-full">
                        <div className="mb-1 max-[450px]:text-sm">
                          {
                            errorAndSuccessApi.message && isLoad === false && 
                            <p className={`${errorAndSuccessApi.type === "success" ? "text-green-500" : "text-red-500"}`}>
                              {errorAndSuccessApi.message}
                            </p>
                          }
                        </div>
                        <div className="flex gap-1">
                          <input
                            {...register("email", {
                              required: {value: true, message: "Email obrigatório!"},
                              pattern: {
                                value: regexEmail,
                                message: "Email invalido!"
                              }
                            })}
                            type="text"
                            id="email"
                            className={`w-full  pl-5 pr-3 py-2 rounded-lg border-2 outline-none ${errorEmailInvalid}`}
                            placeholder={"exemple@gmail.com"}
                          />
                          <button 
                             type="submit" 
                             disabled={isLoad}
                             title="Reenviar"
                             className="p-2 text-white rounded-lg border-2 disabled:bg-red-500 bg-indigo-500 hover:bg-indigo-700 transition duration-150 hover:ease-in hover:rotate-180">
                            {
                              !isLoad ?
                              ( <ArrowClockwise width={30} height={30} /> )
                              :
                              ( <Hand width={30} height={30}/> )
                            }
                          </button>
                        </div>
                        <div className="h-5 mb-3 mt-1 max-[450px]:text-sm">
                          { errors.email &&
                            (
                                <p className="text-red-500">
                                  {errors.email.message}
                                </p>
                            )
                          }
                        </div>
                    </div>
     
                    <div className="w-full px-3 flex gap-2">
                      <button
                        type="submit"
                        disabled={isLoad}
                        className={`block w-full max-w-xs mx-auto bg-indigo-500 text-white rounded-lg px-3 py-3 font-semibold ${
                          isLoad ? "disabled:opacity-90 cursor-not-allowed" : "hover:bg-indigo-700 focus:bg-indigo-700"
                        }`}
                      >
                        {isLoad ? (
                          <CircleNotch
                            size={24}
                            color="#f1f0ef"
                            className="animate-spin flex justify-center w-full"
                          /> )
                          :
                          "Solicitar"
                        }
                      </button>
                    </div>
                </form>
              </div>
            </div>
          </Modal>
        </div>
    </>
  );
};