import { ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import {
  ArrowFatLineRight,
  ArrowFatLineLeft,
  ChartBar,
  House,
} from "phosphor-react";

type TListItems = {
  title: string;
  pathURL: string;
  icon: ReactNode;
  gap?: boolean;
};

interface IProps {
  isOpen: boolean;
}

export function ItemsComponent({ isOpen }: IProps) {
  const { asPath } = useRouter();

  const menus: TListItems[] = [
    {
      title: "Inicio",
      icon: <House size={25} color="#f1f0ef" />,
      pathURL: `/Dashboard`,
    },
    {
      title: "Gráficos",
      icon: <ChartBar size={25} color="#f1f0ef" />,
      gap: true,
      pathURL: `/Dashboard/Graphics`,
    },
    {
      title: "Enviados",
      icon: <ArrowFatLineRight size={25} color="#f1f0ef" />,
      pathURL: `/Dashboard/Sent`,
    },
    {
      title: "Recebidos",
      icon: <ArrowFatLineLeft size={25} color="#f1f0ef" />,
      pathURL: `/Dashboard/Received`,
    },
  ];

  return (
    <>
      {menus.map((menu, index) => {
        return (
          <Link
            href={menu.pathURL}
            key={index}
            className={`flex rounded-md p-2 cursor-pointer ${
              asPath === menu.pathURL && "bg-gray-700"
            } hover:bg-gray-700 text-gray-300 hover:text-white text-sm items-center gap-x-4 
              ${menu.gap ? "mt-7" : "mt-2"}`}
          >
            {menu.icon}
            <span className={`text-base origin-left duration-200`}>
              {menu.title}
            </span>
          </Link>
        );
      })}
    </>
  );
}
