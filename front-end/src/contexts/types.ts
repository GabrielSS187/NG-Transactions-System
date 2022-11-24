import { ReactNode } from "react";

export type TChildrenProvider = {
  children: ReactNode;
};

export type TLoginAndRegisterUser = {
  user_name: string,
  password: string,
};

export type User = {
  id_user: number,
  user_name: string,
  account_id: string,
}

export type TAuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (dataBody: TLoginAndRegisterUser) 
  => Promise<void>;
};