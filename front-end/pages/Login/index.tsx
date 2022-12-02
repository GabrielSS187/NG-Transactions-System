import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FieldValues } from "react-hook-form";

import { AuthContext } from "../../contexts/AuthContext";

import { FormLoginAndRegister } from "../../components/FormLoginAndRegister";

export default function Login () {
  const { signIn, isAuthenticated }
   = useContext(AuthContext); 
   const [ errorApi, setErrorApi ] = useState<string>("");
   const [ isLoad, setIsLoad ] = useState<boolean>(false);
   
   const router = useRouter();

   useEffect(() => {
      if ( isAuthenticated ) router.push("/Dashboard");
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isAuthenticated]);

   if ( errorApi ) {
      setTimeout(() => {
        setErrorApi("");
      }, 7000);
   };

  async function signInSubmit (data: FieldValues | any) {
    try {
      setIsLoad(true);
      await signIn(data);    
      setIsLoad(false);
    } catch (error: any) {
      console.log(error);
      setErrorApi(error?.response?.data);
      setIsLoad(false);
    };
  };

  return (
    <FormLoginAndRegister
      type="login"
      onSubmitData={signInSubmit}
      errorApi={errorApi}
      isLoad={isLoad}
    />
  );
};