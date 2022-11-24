import { TUsersData } from "./types";

export interface IUsersModel {
  create: (data: TUsersData) => Promise<void>;
  findUser: (userName: string, userId?: number) => Promise<TUsersData>;
  fetchUsers: (userName: string) => Promise<TUsersData[]>;
};