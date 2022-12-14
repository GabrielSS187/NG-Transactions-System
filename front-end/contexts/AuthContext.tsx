import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { setCookie, parseCookies } from "nookies";

import { apiBase } from "../services/apiBase";
import { signInApi, findUserApi } from "../services/endpoints/users";

import {
  TAuthContextType,
  TChildrenProvider,
  TLoginAndRegisterUser,
  TUser,
} from "./types";

export const AuthContext = createContext({} as TAuthContextType);

export function AuthProvider({ children }: TChildrenProvider) {
  const [user, setUser] = useState<TUser | null>(null);
  const [viewBalance, setViewBalance] = useState<boolean>(true);

  const router = useRouter();

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "ng.token": token } = parseCookies();

    if (token) {
      findUserApi(token)
        .then(({ data }) => {
          setUser(data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  async function signIn(dataBody: TLoginAndRegisterUser) {
    const { user_name, password } = dataBody;

    const { data } = await signInApi({
      user_name,
      password,
    });

    //* Criando token e tempo de validade.
    setCookie(undefined, "ng.token", data.token, {
      maxAge: 24 * 60 * 60, //* 24 hours / 1 day.
    });

    apiBase.defaults.headers["Authorization"] = `Bearer ${data.token}`;

    findUserApi(data.token).then(({ data }) => {
      setUser(data);
    });
    router.push("/Dashboard").then(() => {
      router.reload();
    }).catch((err) => console.log(err));
  };

  const store: TAuthContextType = {
    isAuthenticated,
    user,
    signIn,
    setUser,
    viewBalance,
    setViewBalance,
  };

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};
