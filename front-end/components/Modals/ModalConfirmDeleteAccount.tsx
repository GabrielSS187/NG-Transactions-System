import { useState, useId, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useRouter } from "next/router";
import nookies, { destroyCookie,  } from "nookies";
import { CircleNotch, X } from "phosphor-react";
import Modal from "react-modal";
import { Zoom } from "react-awesome-reveal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { deleteAccountApi } from "../../services/endpoints/users";

interface IProps {
  openModal: boolean;
  closeModal: (input: boolean) => void;
};

export function ModalConfirmDeleteAccount({ openModal, closeModal }: IProps) {
  const { setUser } = useContext(AuthContext);
  const [isLoad, setIsLoad] = useState<boolean>();
  const [errorApi, setErrorApi] = useState<string>("");

  const toastId = useId();

  const { push, reload } = useRouter();

  async function deleteAccount() {
    try {
      nookies.destroy(null, "ng.token");
      setIsLoad(true);
      await deleteAccountApi();
      localStorage.removeItem("email-confirmed");
      localStorage.removeItem("notify");
      setUser(null); 
      // reload();
      toast.info(
        `Conta deletada com sucesso.`
        , {
          pauseOnFocusLoss: false,
          toastId: toastId
        });
      setTimeout(() => {
        push("/");
        setIsLoad(false);
      }, 3000);
    } catch (error: any) {
      setErrorApi(error?.response?.data);
    } finally {
      setIsLoad(false);
    };
  };

  return (
    <Modal
      isOpen={openModal}
      contentLabel="Modal confirm email"
      overlayClassName="modal-overlay"
      className="modal-content"
      ariaHideApp={false}
    >
      <button onClick={() => closeModal(!openModal)} className="self-end">
        <X
          width={30}
          height={30}
          className=" hover:border hover:rounded-full hover:border-green-500 hover:p-1"
        />
      </button>
      <Zoom>
        <div className="text-center">
          <div>
            <h1 className="text-3xl mb-3 max-sm:text-2xl max-[420px]:text-xl">
              <strong>Você tem certeza que quer deletar sua conta?</strong>
            </h1>
            <h2 className="text-lg max-sm:text-base">
              Sí sim clique no botão abaixo
            </h2>
            {errorApi && <h2>{errorApi}</h2>}
          </div>
          <br />
          <div className="flex flex-col gap-2">
            <div className="w-full px-3 flex gap-2">
              <button
                type="button"
                disabled={isLoad}
                onClick={deleteAccount}
                className={`block w-full max-w-xs mx-auto bg-indigo-500 text-white rounded-lg px-3 py-3 font-semibold ${
                  isLoad
                    ? "disabled:opacity-90 cursor-not-allowed"
                    : "hover:bg-red-700 focus:bg-red-700"
                }`}
              >
                {isLoad ? (
                  <CircleNotch
                    size={24}
                    color="#f1f0ef"
                    className="animate-spin flex justify-center w-full"
                  />
                ) : (
                  "SIM"
                )}
              </button>
            </div>
          </div>
        </div>
      </Zoom>
    </Modal>
  );
}
