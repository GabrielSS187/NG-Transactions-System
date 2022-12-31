import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FieldValues } from "react-hook-form";

import { AuthContext } from "../../contexts/AuthContext";

import { FormLoginAndRegister } from "../../components/FormLoginAndRegister";
import { ModalConfirmEmail } from "../../components/Modals/ModalConfirmEmail";
import { ModalSuccessEmailConfirmed } from "../../components/Modals/ModalSuccessEmailConfirmed";
import { ModalAlterPassword } from "../../components/Modals/ModalAlterPassword";
import { queryClientObj } from "../../services/queryClient";
import { findUserByEmailApi, findUserByNameApi } from "../../services/endpoints/users";

const { useMutation } = queryClientObj;

type TUserLocal = {
  user_name: string,
  user_email: string,
  password: string,
  verify: boolean;
};

export default function Login () {
  const { signIn, isAuthenticated }
   = useContext(AuthContext); 

   const [ user, setUser ] = useState<TUserLocal | any>(null);
   const [
     openPasswordChangeModal,
     setOpenPasswordChangeModal 
  ] = useState<boolean>(false);
   const [ errorApi, setErrorApi ] = useState<string>("");
   const [ errorApiEmail, setErrorApiEmail ] = useState<string>("");   
   
   const router = useRouter();

   useEffect(() => {
      if ( isAuthenticated ) router.push("/Dashboard");
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isAuthenticated]);

  async function findUser (emailUser: string) {
    try {
      const user = await findUserByEmailApi(emailUser);
      if ( user && user.verify === true ) {
        localStorage.removeItem("email-local");
      };
      setUser(user);
    } catch (error: any) {
      setErrorApiEmail(error.response?.data);
    };
  };

   useEffect(() => {
    const getEmailLocal = localStorage.getItem("email-local");

    window.addEventListener("blur" , () => {
      router.reload();
    });

    if ( getEmailLocal !== null ) {
      findUser(getEmailLocal);

      window.addEventListener("focus" , () => {
        findUser(getEmailLocal);
      });
    };
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   if ( errorApi ) {
      setTimeout(() => {
        setErrorApi("");
      }, 7000);
   };

   const { mutate, isLoading } = useMutation(signIn, {
    onSuccess: async (data) => null,
    onError: (err: any) => {
      window.scrollTo({ top: 0, behavior: "smooth" })
      navigator.vibrate(200);
      setErrorApi(err.response?.data); 
    },
   });

  async function signInSubmit (data: FieldValues | any) {
    mutate(data);
    try {
      const user = await findUserByNameApi(data.user_name);
      if ( user && user.verify === false ) {
        localStorage.setItem("email-local", user.user_email!);
        localStorage.removeItem("email-confirmed");
        router.reload();
        return;
      };
      
      if ( user && user.verify === true ) {
        localStorage.setItem("email-confirmed", user.user_email!);
        localStorage.removeItem("email-local");
        return;
      };
    } catch (error) {
      console.log(error);
    };  
  };
  
  return (
    <>
      { user?.verify === false && (<ModalConfirmEmail 
          userName={user.user_name} 
          userEmail={user.user_email} 
          verify={!user.verify}   
          codeUser={user?.code}
        />)
      }

      { user?.verify === true && (<ModalSuccessEmailConfirmed/>) }

      { openPasswordChangeModal && ( <ModalAlterPassword
            openModal={openPasswordChangeModal}
            closeModal={setOpenPasswordChangeModal}
          /> 
        ) 
      }

      <FormLoginAndRegister
        type="login"
        onSubmitData={signInSubmit}
        errorApi={errorApi}
        isLoad={isLoading}
        openPasswordChangeModal={openPasswordChangeModal}
        setOpenPasswordChangeModal ={setOpenPasswordChangeModal}
      />
    </>
  );
};
