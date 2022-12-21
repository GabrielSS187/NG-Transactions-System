import { useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { AuthContext } from "../../contexts/AuthContext";
import Router, { useRouter } from "next/router";
import { FieldValues } from "react-hook-form";
import { SEO } from "../../Seo";

import { FormLoginAndRegister } from "../../components/FormLoginAndRegister";

import { registerUsersApi } from "../../services/endpoints/users";
import { queryClientObj } from "../../services/queryClient";

const { useMutation } = queryClientObj;

type TEmailLocal = {
  user_name: string,
  user_email: string,
  password: string,
};

export default function Register () {
  const { isAuthenticated }
   = useContext(AuthContext); 
  const [ errorApi, setErrorApi ] = useState<string>("");
  // const [ emailDataLocal, setEmailDataLocal ] = useLocalStorage<T>("user-local", null);

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
      localStorage.setItem("email-local", JSON.parse(data.config.data).user_email);
    },
    onError: (err: any) => {
      setErrorApi(err.response?.data);
    },
  });

  async function registerSubmit (data: FieldValues | any) {
      const { user_name, user_email, password } = data;
      mutate({user_name, user_email, password});
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