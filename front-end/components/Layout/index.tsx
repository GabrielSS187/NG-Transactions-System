import { ReactNode, useEffect } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { NavBar } from "../NavBar";

import transactionsLogo3 from "../../assets/imgs/transactions-logo-3.png";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { TTransactionsReceived } from "../../services/endpoints/types";
import { formatDate, formatHours } from "../../utils/formatData";
import { queryClientObj } from "../../services/queryClient";
import { fetchAllTransactionsReceivedApi } from "../../services/endpoints/transactions";

interface IProps {
  children: ReactNode;
}

const { useQuery } = queryClientObj;

export default function Layout({ children }: IProps) {
  const [notifyLocal, setNotifyLocal] = useLocalStorage<TTransactionsReceived | any>("notify", {});

  //* 25/12/2022
  const dateJS = new Date();
  const date = formatDate(new Date(), "short");
  dateJS.setSeconds(dateJS.getSeconds() - 10);
  const currentTimeMinus10Seconds = formatHours(dateJS);

  const transactionsReceived = useQuery(
    "transactions-received",
    async () => await fetchAllTransactionsReceivedApi(),
    {
      refetchInterval: 10000,
      // onSuccess: async (data) => notifyReceiverMoney(),
    }
  );

  useEffect(() => {
    notifyReceiverMoney();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifyLocal, transactionsReceived.data]);

  const unviewedListReceiverMoney = transactionsReceived.data?.filter((item) => !item.looked);

  //* Notificar quando alguém envia dinheiro.
  function notifyReceiverMoney() {
    if (!transactionsReceived.isLoading && unviewedListReceiverMoney!.length >= 1) {
      const notifyReceiverMoney = unviewedListReceiverMoney
        ?.filter((item) => {
          return item.created_at === date;
        })
        .find((item) => {
          if (!item.looked && item.hour >= currentTimeMinus10Seconds) {
            return item;
          }
        });

      if (
        notifyLocal.viewLocal &&
        notifyLocal?.id_transaction === notifyReceiverMoney?.id_transaction
      ) {
        return;
      };

      if (notifyReceiverMoney) {
        const newObj = { ...notifyReceiverMoney, viewLocal: false };
        setNotifyLocal(newObj);
      };

      if (notifyLocal && !notifyLocal.viewLocal) {
        toast.success(
          `${notifyReceiverMoney?.user_name_debited} acabou de te enviar  R$ ${notifyReceiverMoney?.value_received} reais.`
        );
        setNotifyLocal({ ...notifyLocal, viewLocal: true });
      };
    };
  };

  return (
    <main className="flex overflow-hidden max-md:flex-col">
      <NavBar />
      <div className="w-full flex flex-col items-center mt-4">
        <header className="w-52 h-16">
          <Image
            src={transactionsLogo3}
            width={undefined}
            height={undefined}
            priority={true}
            alt="logo ng transações"
            className="w-full h-full"
          />
        </header>

        <div className="w-full mt-14">
          {Object.keys(notifyLocal).length > 1 && <ToastContainer />}
          {children}
        </div>
      </div>
    </main>
  );
}
