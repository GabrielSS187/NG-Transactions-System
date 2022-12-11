import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FieldValues } from "react-hook-form";

import { AuthContext } from "../../contexts/AuthContext";

import { FormLoginAndRegister } from "../../components/FormLoginAndRegister";
import { queryClientObj } from "../../services/queryClient";

const { useMutation } = queryClientObj;

export default function Login () {
  const { signIn, isAuthenticated }
   = useContext(AuthContext); 
   const [ errorApi, setErrorApi ] = useState<string>("");
   
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
    <FormLoginAndRegister
      type="login"
      onSubmitData={signInSubmit}
      errorApi={errorApi}
      isLoad={isLoading}
    />
  );
};