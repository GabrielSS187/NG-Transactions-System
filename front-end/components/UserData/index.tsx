import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Eye, EyeSlash } from "phosphor-react";

interface IProps {
  user_name: string;
  account_id: string;
  balance: number;
  isLoad: boolean;
};

export function UserData ({
  user_name,
  balance,
  account_id,
  isLoad
}: IProps) {
  const { viewBalance, setViewBalance } = useContext(AuthContext);

  
if ( isLoad ) {
  return <h1>aaaa</h1>
};

  return (
    <>
      <div className="mt-2 flex flex-col items-center justify-center gap-1 max-md:p-2">
          <h2><strong>{user_name}</strong></h2>
          <h3 className="text-sm max-md:text-center">Número da conta: <strong>{account_id}</strong></h3>
          <div>
            <div className="flex gap-3 max-md:gap-1">
              <h3>
                Saldo: 
                {viewBalance && (<strong>  R$  {balance.toFixed(2)}</strong>)}
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