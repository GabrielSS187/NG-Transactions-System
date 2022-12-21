import { useState } from "react";
import { useLottieCustom } from "../../hooks/useLottieCustom";
import { X } from "phosphor-react";
import Modal from "react-modal";

import birthdayAnimation from "../../assets/animations/lottieJsonAnimations/birthdayAnimation.json";

export function ModalSuccessEmailConfirmed () {
  const [modalIsOpen, setIsOpen] = useState(true);
  const [openAnimation, setOpenAnimation] = useState<boolean>(true);

  setTimeout(() => {
    setOpenAnimation(false);
  }, 5000);

  function closeModal () {
    const emailLocal = localStorage.getItem("email-local");
    localStorage.setItem("email-confirmed", emailLocal!);
    setIsOpen(false);
    localStorage.removeItem("email-local");
  };

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
       {openAnimation && (<div className="h-screen w-full absolute z-50">{ View }</div>)}
        <div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Modal success email confirmed"
            overlayClassName="modal-overlay"
            className="modal-content"
            ariaHideApp={false}
          >
            <button onClick={() => setIsOpen(false)} className="self-end">
              <X width={30} height={30} className=" hover:border hover:rounded-full hover:border-green-500 hover:p-1"/>
            </button>
            <div className="text-center">
              <div className="h-20">
                <h2 className="text-2xl text-green-500"><strong>Email confirmado com sucesso.</strong></h2>
              </div>
            </div>
          </Modal>
        </div>
    </>
  );
};