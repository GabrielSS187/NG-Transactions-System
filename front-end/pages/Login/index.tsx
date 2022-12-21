import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FieldValues } from "react-hook-form";

import { AuthContext } from "../../contexts/AuthContext";

import { FormLoginAndRegister } from "../../components/FormLoginAndRegister";
import { ModalConfirmEmail } from "../../components/Modals/ModalConfirmEmail";
import { ModalSuccessEmailConfirmed } from "../../components/Modals/ModalSuccessEmailConfirmed";
import { queryClientObj } from "../../services/queryClient";
import { findUserByEmail } from "../../services/endpoints/users";

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
   const [ errorApi, setErrorApi ] = useState<string>("");
   const [ errorApiEmail, setErrorApiEmail ] = useState<string>("");
   
   const router = useRouter();

   useEffect(() => {
      if ( isAuthenticated ) router.push("/Dashboard");
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isAuthenticated]);

  async function findUser (emailUser: string) {
    try {
      const user = await findUserByEmail(emailUser);
      setUser(user);
    } catch (error: any) {
      setErrorApiEmail(error.response?.data);
    };
  };

   useEffect(() => {
    const getEmailLocal = localStorage.getItem("email-local");
    if ( getEmailLocal !== null ) {
      findUser(getEmailLocal);
      window.addEventListener("focus" , () => {
        findUser(getEmailLocal);
      });
    };
    
   }, []);

   if ( errorApi ) {
      setTimeout(() => {
        setErrorApi("");
      }, 7000);
   };

   const { mutate, isLoading } = useMutation(signIn, {
    onSuccess: async (data) => null,
    onError: (err: any) => {
      setErrorApi(err.response?.data);
    },
   });

  async function signInSubmit (data: FieldValues | any) {
    mutate(data);
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

      <FormLoginAndRegister
        type="login"
        onSubmitData={signInSubmit}
        errorApi={errorApi}
        isLoad={isLoading}
      />
    </>
  );
};
