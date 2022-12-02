import { ReactNode } from "react";
import Image from "next/image";

import { NavBar } from "../NavBar";

import transactionsLogo3 from "../../assets/imgs/transactions-logo-3.png";

interface IProps {
  children: ReactNode;
};

export default function Layout ({children}: IProps) {
  return (
    <main className="flex overflow-hidden max-md:flex-col">
      <NavBar />
      <div className="w-full flex flex-col items-center mt-4">
        <header className="w-52 h-16">
          <Image
              src={transactionsLogo3} 
              width={undefined} height={undefined} 
              priority={true} alt="logo ng transações" 
              className="w-full h-full"
           />
        </header>

        <div className="w-full mt-14">
          {children}
        </div>
      </div>
    </main>
  );
};