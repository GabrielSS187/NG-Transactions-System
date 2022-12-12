import { useState } from "react";
import { Eye, EyeSlash } from "phosphor-react";

import { findUserAuthApi } from "../../services/endpoints/users";
import { queryClientObj } from "../../services/queryClient";

const { useQuery } = queryClientObj

export function UserData () {
  const [ viewBalance, setViewBalance ] = 
  useState<boolean>(true);

  const { data } = useQuery("find-user-logged",
  async () => await findUserAuthApi(), {
    refetchInterval: 10000 //* 10 seconds
  })

  return (
    <>
      <div className="mt-2 flex flex-col items-center justify-center gap-1 max-md:p-2">
          <h2><strong>{data?.user_name}</strong></h2>
          <h3 className="text-sm max-md:text-center">Número da conta: <strong>{data?.account_id}</strong></h3>
          <div>
            <div className="flex gap-3 max-md:gap-1">
              <h3>
                Saldo: 
                {viewBalance && (<strong>  R$  {data?.balance.toFixed(2)}</strong>)}
              </h3>
              <button onClick={() => setViewBalance(!viewBalance)}>
                {
                  viewBalance ?
                  (<EyeSlash size={25} className="text-#fff max-md:text-#0000" />)
                  :
                  (<Eye size={25} className="text-#fff max-md:text-#0000" />)
                }
              </button>
            </div>
          </div>
      </div>
    </>
  );
};