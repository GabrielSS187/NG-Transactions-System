import { useState } from "react";
import Router from "next/router";
import { FieldValues } from "react-hook-form";

import { FormLoginAndRegister } from "../../components/FormLoginAndRegister";

import { registerUsersApi } from "../../services/endpoints/users";

export default function Register () {
  const [ errorApi, setErrorApi ] = useState<string>("");
  const [ isLoad, setIsLoad ] = useState<boolean>(false);

  if ( errorApi ) {
    setTimeout(() => {
      setErrorApi("");
    }, 7000);
  };

  async function registerSubmit (data: FieldValues | any) {
    try {
      setIsLoad(true);
      const { user_name, password } = data;
      await registerUsersApi({user_name, password});
      setIsLoad(false);
      Router.push("/Login");
    } catch (error: any) {
      console.log(error);
      setErrorApi(error?.response?.data) 
      setIsLoad(false)
    };
  };

  return (
    <FormLoginAndRegister
      type="register"
      onSubmitData={registerSubmit}
      errorApi={errorApi}
      isLoad={isLoad}
    />
  );
};