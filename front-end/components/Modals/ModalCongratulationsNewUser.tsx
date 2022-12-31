import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useLottieCustom } from "../../hooks/useLottieCustom";
import { X } from "phosphor-react";
import { Zoom } from "react-awesome-reveal";

import birthdayAnimation from "../../assets/animations/lottieJsonAnimations/birthdayAnimation.json";

export default function ModalCongratulationsNewUser() {
  const { user } = useContext(AuthContext);
  const [openPopup, setPopup] = useState<boolean>(true);
  const [openAnimation, setOpenAnimation] = useState<boolean>(true);

  setTimeout(() => {
    setOpenAnimation(false);
  }, 5000);

  //* Ver si a chave e true para mostrar a notificação de novo
  //* usuário.
  const getLocalStorageInfo = localStorage.getItem("newUser");

  function closePopup() {
    setPopup(false);
    localStorage.removeItem("newUser");
  }

  const styles = {
    width: "100%",
    height: "100vh",
  };

  const play = {
    autoplay: true,
    loop: false,
  };

  const { View } = useLottieCustom(birthdayAnimation, styles, play);

  return (
    <>
      {getLocalStorageInfo === "true" && openPopup && (
        <>
          {openAnimation && (
            <div className="h-screen w-full absolute z-50">{View}</div>
          )}
          <main
            onClick={closePopup}
            className="h-screen w-full overflow-y-hidden bg-opacity-25 bg-dark-purple fixed z-40 flex justify-center items-center"
          >
            <div className="w-11/12 md:w-11/12 lg:w-3/4 px-5 py-5 flex flex-col items-center absolute bg-white rounded-lg">
              <div className="w-full h-10 flex justify-end -mt-2">
                <button onClick={closePopup}>
                  <X width={35} height={30} color={"#000"} />
                </button>
              </div>
              <Zoom>
                <div className="text-center">
                  <h1 className="text-2xl">
                    Ola <strong>{user?.user_name}</strong>🖐
                  </h1>
                  <br />
                  <h2 className="text-sm sm:text-lg">
                    Muito obrigado por criar uma conta na{" "}
                    <strong>NG Transações</strong>.
                  </h2>
                  <h2 className="text-sm sm:text-lg">
                    Vai ser uma honra ter você junto com agente.
                  </h2>
                </div>
                <br />
                <div className="text-center">
                  <h2 className="text-sm sm:text-lg">
                    É por isso iremos te dar as boas vindas com{" "}
                    <strong className="text-green-500">R$ 100,00</strong>{" "}
                    iniciais na sua conta.
                  </h2>
                  <h2 className="text-sm sm:text-lg">
                    Para você poder envia com segurança para qualquer usuário
                    que tenha uma conta <strong>NG</strong>.
                  </h2>
                  <h2>Obrigado novamente, e seja bem vindo(a)!</h2>
                </div>
                <br />
                <div>
                  <h3>
                    <strong>NG Transações</strong>
                  </h3>
                </div>
              </Zoom>
            </div>
          </main>
        </>
      )}
    </>
  );
}
