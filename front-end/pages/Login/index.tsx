import { useContext, useState } from "react";
import Router from "next/router";
import { FieldValues } from "react-hook-form";

import { AuthContext } from "../../src/contexts/AuthContext";

import { FormLoginAndRegister } 
from "../../src/components/FormLoginAndRegister";

export default function Login () {
  const { signIn, isAuthenticated }
   = useContext(AuthContext);

   if ( isAuthenticated ) {
    Router.push("/Dashboard");
   };
   
   const [ errorApi, setErrorApi ] = useState<string>("");
   const [ isLoad, setIsLoad ] = useState<boolean>(false);

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