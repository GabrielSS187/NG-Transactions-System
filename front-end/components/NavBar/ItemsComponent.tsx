import { ReactNode } from "react";
import { useRouter } from "next/router";
import { queryClientObj } from "../../services/queryClient";
import Link from "next/link";

import { fetchAllTransactionsReceivedApi } from "../../services/endpoints/transactions";
import {
  ArrowFatLineRight,
  ArrowFatLineLeft,
  ChartBar,
  House,
  Money,
  Bell,
  Info
} from "phosphor-react";

type TListItems = {
  title: string;
  pathURL: string;
  icon: ReactNode;
  gap?: boolean;
  looked?: boolean;
};

const { useQuery } = queryClientObj;

export function ItemsComponent() {
  const { asPath } = useRouter();

  const { data, isLoading } = useQuery(
    "transactions-received",
    async () => await fetchAllTransactionsReceivedApi(),
    {refetchInterval: 10000} //* 10 seconds
  );

  const unviewed = data?.filter((item) => !item.looked);

  const menus: TListItems[] = [
    {
      title: "Inicio",
      icon: <House size={25} color="#f1f0ef" />,
      pathURL: `/Dashboard`,
    },
    {
      title: "Enviar dinheiro",
      icon: <Money size={25} color="#f1f0ef" />,
      gap: true,
      pathURL: `/Dashboard/SentMoney`,
    },
    {
      title: "Gráficos",
      icon: <ChartBar size={25} color="#f1f0ef" />,
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
      looked: true,
    },
    {
      title: "Sobre",
      icon: <Info size={25} color="#f1f0ef" />,
      pathURL: `/Dashboard/Info`,
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
            <span className={`flex text-base origin-left duration-200`}>
              {menu.title}
              {menu.looked && (
                <div className="ml-16 flex flex-row-reverse items-center gap-1 text-green-500">
                  {!isLoading && unviewed!.length >= 1 && <Bell size={25} />}
                    {!isLoading && unviewed!.length >=1 &&
                      (
                        <span>
                        {unviewed!.length}
                       </span>
                      )
                    }
                </div>
              )}
            </span>
          </Link>
        );
      })}
    </>
  );
}
