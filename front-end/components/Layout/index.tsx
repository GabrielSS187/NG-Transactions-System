import { ReactNode, useEffect, useId } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Fade } from "react-awesome-reveal";

import { NavBar } from "../NavBar";

import transactionsLogo3 from "../../assets/imgs/transactions-logo-3.png";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { TTransactionsReceived } from "../../services/endpoints/types";
import { formatDate, formatHours } from "../../utils/formatData";
import { queryClientObj } from "../../services/queryClient";
import { fetchAllTransactionsReceivedApi } from "../../services/endpoints/transactions";

interface IProps {
  children: ReactNode;
};

interface IPropsToast {
  photoSent: string, 
  nameSent: string,
  valueReceived: string;
};

const { useQuery } = queryClientObj;

function ToastMsgNotify ({ photoSent, nameSent, valueReceived }: IPropsToast) {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1">
          <Image src={`${photoSent}`} alt={nameSent} height={30} width={30} />
          <h3><strong>{nameSent}</strong>,</h3>
        </div>
        <div>
          <p>acabou de te enviar R$  
            <strong className="text-green-500">
              <span>   {valueReceived}</span>
            </strong>
          </p>
        </div>
      </div>
    </>
  );
};

export default function Layout({ children }: IProps) {
  const [notifyLocal, setNotifyLocal] = useLocalStorage<TTransactionsReceived | any>("notify", {});
  const toastId = useId();

  useEffect(() => {
    if ( localStorage.getItem("notify") === "false" ) {
      setNotifyLocal({
        empty: true,
      });
    };
  }, [setNotifyLocal]);

  const currentDate = new Date()
  const dateJS = new Date();
  currentDate.setHours(currentDate.getHours() - 3)
  //* 25/12/2022
  const date = formatDate(currentDate, "short");
  //* =============================================
  dateJS.setSeconds(dateJS.getSeconds() - 10);
  const currentTimeMinus10Seconds = formatHours(dateJS);

  const transactionsReceived = useQuery(
    "transactions-received",
    async () => await fetchAllTransactionsReceivedApi(),
    {
      refetchInterval: 10000,  //* 10 seconds
    }
  );

  useEffect(() => {
    if ( transactionsReceived.status === "success"){
      notifyReceiverMoney();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionsReceived.data, notifyLocal, transactionsReceived.status]);

  const unviewedListReceiverMoney = transactionsReceived.data?.filter((item) => !item.looked);

  //* Notificar quando alguém envia dinheiro.
  function notifyReceiverMoney() {
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
        notifyLocal &&
        notifyLocal?.viewLocal &&
        notifyLocal?.id_transaction === notifyReceiverMoney?.id_transaction
      ) {
        return;
      };

      if (notifyReceiverMoney) {
        const newObj = { ...notifyReceiverMoney, viewLocal: false };
        setNotifyLocal(newObj);
      };

      if (notifyLocal && !notifyLocal?.viewLocal && !notifyLocal?.empty) {
        toast.success(
            <ToastMsgNotify 
              nameSent={notifyLocal.user_name_debited} 
              photoSent={notifyLocal.photo_url}
              valueReceived={notifyLocal.value_received}
            />
          , {
            pauseOnFocusLoss: false,
            toastId,
          }
        );
        setNotifyLocal({ ...notifyLocal, viewLocal: true });
        return
      };
      return
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
          { notifyLocal && notifyLocal !== "false" && (
            <ToastContainer />
          ) }
          <Fade
            direction="right"
            cascade={false}
            triggerOnce={false}
          >
            {children}
          </Fade>
        </div>
      </div>
    </main>
  );
};