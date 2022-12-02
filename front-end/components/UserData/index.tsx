import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Eye, EyeSlash } from "phosphor-react";

export function UserData () {
  const { user } = useContext(AuthContext);
  const [ viewBalance, setViewBalance ] = 
  useState<boolean>(true);

  return (
    <>
      <div className="mt-2 flex flex-col items-center justify-center gap-1 max-md:p-2">
          <h2><strong>{user?.user_name}</strong></h2>
          <h3 className="text-sm max-md:text-center">Número da conta: <strong>{user?.account_id}</strong></h3>
          <div>
            <div className="flex gap-3 max-md:gap-1">
              <h3>
                Saldo: 
                {viewBalance && (<strong>  R$  {user?.balance}</strong>)}
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