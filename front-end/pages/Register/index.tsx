import { SEO } from "../../Seo";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Router, { useRouter } from "next/router";
import { FieldValues } from "react-hook-form";

import { FormLoginAndRegister } from "../../components/FormLoginAndRegister";

import { registerUsersApi } from "../../services/endpoints/users";
import { queryClientObj } from "../../services/queryClient";

const { useMutation } = queryClientObj;

export default function Register () {
  const { isAuthenticated }
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

  const { mutate, isLoading } = useMutation(registerUsersApi, {
    onSuccess: async (data) => {
      Router.push("/Login");
      localStorage.setItem("newUser", "true");
    },
    onError: (err: any) => {
      setErrorApi(err.response?.data);
    },
  });

  async function registerSubmit (data: FieldValues | any) {
      const { user_name, password } = data;
      mutate({user_name, password});
  };

  return (
    <>
      <SEO title="Criar conta" description="Crie uma conta na NG Transações" />
      <FormLoginAndRegister
        type="register"
        onSubmitData={registerSubmit}
        errorApi={errorApi}
        isLoad={isLoading}
      />
    </>
  );
};