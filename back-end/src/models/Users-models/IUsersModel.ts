import { TUsersData, TEditUserData } from "./types";

export interface IUsersModel {
  create: (data: TUsersData) => Promise<void>;
  findUser: (userName: string, userId?: number) => Promise<TUsersData>;
  findUserByEmail: (userEmail: string) => Promise<TUsersData>;
  fetchUsers: (userName: string) => Promise<TUsersData[]>;
  editInfoUser: (data: TEditUserData, idUser: number ) => Promise<void>;
  findUserByCode: (codeUser: string) => Promise<TUsersData>;
  updateVerify: (Verify: boolean, codeUser: string) => Promise<void>;
};