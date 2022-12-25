import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Image from "next/image";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";

import { ItemsComponent } from "./ItemsComponent";

import { UserData } from "../UserData";
// import control from "../../assets/imgs/control.png";
import logoUser from "../../assets/imgs/person-icon.png";
import { SignOut } from "phosphor-react";
import { queryClientObj } from "../../services/queryClient";
import { findUserAuthApi } from "../../services/endpoints/users";

const { useQuery } = queryClientObj

export function NavBar () {
  const { setUser } = useContext(AuthContext);
  const [open, setOpen] = useState(true);
  const [ isOpenMiniNav, setIsOpenMiniNav ] = useState<boolean>(false);

  const router = useRouter();
  const { data, isLoading } = useQuery("find-user-logged",
  async () => await findUserAuthApi(), {
    refetchInterval: 10000 //* 10 seconds
  });

  if ( isLoading ) {
    return <></>
  };

  function logout () {
    destroyCookie(undefined, "ng.token");
    setUser(null);
    router.push("/")
  };

  return (
    <div className="flex max-md:flex-col">
      {/* Desktop */}
      <div className="flex">
        <div
          className={`w-72 bg-gray-900 h-full p-5  pt-8 relative duration-300 max-md:hidden`}
        >
          {/* <Image
            src={control}
            alt="logo fechar"
            width={70}
            height={70}
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full  ${open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          /> */}
          <div className="flex flex-col gap-x-4 items-center">
            <Image
              src={`http://localhost:8000${data!.photo_url}`}
              alt="logo foto perfil"
              width={80}
              height={80}
              priority={true}
              className={`h-[6rem] w-[6.5rem] rounded-full ${
                open && "rotate-[360deg]"
              }`}
            />
            <div
              className={`text-white origin-left font-medium`}
            >
             <UserData 
              user_name={data!.user_name}
              balance={data!.balance}
              account_id={data!.account_id}
              isLoad={isLoading}
             />
            </div>
          </div>
          <nav className="pt-6">
            <ul>
              <ItemsComponent />
            </ul>
            <div onClick={logout} className={`flex origin-left duration-200 rounded-md p-2 mt-7 cursor-pointer hover:bg-red-500 text-gray-300 text-base hover:text-white items-center gap-x-4`}>
              <button>
                <SignOut size={25} color="#f1f0ef" />
              </button>
              <span>Sair</span>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile */}
      <nav className="h-20 bg-gray-900 md:hidden">
          <div className={`mt-2 mx-auto max-w-7xl px-2 md:px-6 lg:px-8`}>
            <div className={`relative flex h-16 items-center justify-between`} >
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
     
                <button type="button" onClick={() => setOpen(!open)} className={`inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`} aria-controls="mobile-menu" aria-expanded="false">
                  <span className="sr-only">Abrir menu</span>   
                  <svg className="block h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </button>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
                <div className="relative ml-3">
                  <div>
                    <button type="button" onClick={() => setIsOpenMiniNav(!isOpenMiniNav)}className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                      <span className="sr-only">Open user menu</span>
                      <Image height={50} width={50} src={`http://localhost:8000${data!.photo_url}`} priority={true} alt="foto do usuário" className="h-[3.5rem] w-[3.5rem] rounded-full" />
                    </button>
                  </div>
            
                  <div className={`${isOpenMiniNav === false && "hidden"} absolute right-0 z-20 mt-2 w-64 origin-top-right rounded-md bg-white py-3 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button`} tabIndex={-1}>
                    <UserData 
                      user_name={data!.user_name}
                      balance={data!.balance}
                      account_id={data!.account_id}
                      isLoad={isLoading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`md:hidden ${open === true && "hidden"} absolute w-full z-10 bg-gray-900`} id="mobile-menu">
            <ul className="space-y-1 px-2 pt-2 pb-3 list-none">
              <ItemsComponent />
            <div onClick={logout} className={`flex text origin-left duration-200 rounded-md p-3 mt-5 cursor-pointer hover:bg-red-500 text-gray-300 text-base hover:text-white items-center gap-x-4`}>
              <button>
                <SignOut size={25} color="#f1f0ef" />
              </button>
              <span>Sair</span>
            </div>
            </ul>
          </div>
      </nav>
    </div>
  );
};