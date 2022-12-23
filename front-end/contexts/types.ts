import { ReactNode } from "react";

export type TChildrenProvider = {
  children: ReactNode;
};

export type TLoginAndRegisterUser = {
  user_name: string,
  password: string,
};

export type TUser = {
  id_user: number,
  user_name: string,
  account_id: string,
  balance: number,
};

export type TAuthContextType = {
  isAuthenticated: boolean;
  user: TUser | null;
  signIn: (dataBody: TLoginAndRegisterUser) 
  => Promise<void>;
  setUser: (user: TUser | any) => void;
  viewBalance: boolean,
   setViewBalance: (input: boolean) => void;
};