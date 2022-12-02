import { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import { MagnifyingGlass } from "phosphor-react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

import { TableTr } from "./TableTr";
import logoUser from "../../assets/imgs/person-icon.png";
import { Load } from "../Load";

export type TReceived = {
  id_transaction: string;
  user_name_debited: string;
  value_received: string;
  looked: boolean;
  created_at: string;
  hour: string;
};

interface IProps {
  listReceived: TReceived[];
  search: string;
  setSearch: (search: string) => void;
  date: string;
  setDate: (date: string) => void;
  isLoading: boolean;
};

export default function TableReceived({
  listReceived,
  search,
  setSearch,
  date,
  setDate,
  isLoading
}: IProps) {
  return (
    <section className="antialiased text-gray-600 h-screen px-4">
      <div className="flex flex-col h-full">
        {/* <!-- Table --> */}
        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-100">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-1 max-desk460:flex-col"
            >
              <label htmlFor="search" className="sr-only">
                Procura
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MagnifyingGlass className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  id="search"
                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Procura..."
                />
              </div>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm w-2/4 max-desk460:w-full rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </form>
          </header>
          <div className="p-3">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                {listReceived.length ? (
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Nome</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">
                          Valor recebido
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Data</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Horário</div>
                      </th>
                    </tr>
                  </thead>
                ) : null}

                <tbody className="text-sm divide-y divide-gray-100">
                  {
                    !isLoading ?

                    listReceived.length ? (
                      TableTr(listReceived!)
                    ) : (
                      <tr className="flex justify-center">
                          <td>Lista vazia.</td>
                      </tr>
                    )

                    : (<Load />)
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
