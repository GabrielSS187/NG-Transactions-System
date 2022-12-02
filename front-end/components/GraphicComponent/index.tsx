import { useEffect, useState } from "react";

import { Chart } from "react-google-charts";

import { 
  fetchAllTransactionsReceivedApi,
  fetchAllTransactionsSentApi,
 } from "../../services/endpoints/transactions";

import { 
  TTransactionsReceived, 
  TTransactionsSentData ,
} from "../../services/endpoints/types";

import { Load } from "../Load";
import  GraphicSvg from "../../assets/svgs/GraphicSvg";

interface IProps {
  openMenu: string;
  listSent: TTransactionsSentData[] | undefined;
  listReceived: TTransactionsReceived[] | undefined;
  loadReceived: boolean;
  loadSent: boolean;
};

export default function  GraphicComponent ({ 
  listSent,
  listReceived,
  loadReceived,
  loadSent
}: IProps) {

  function getFullYearDateApi ( date: string ) {
    return new Date(date.split("/").reverse().join("-")).getFullYear().toString()
  };

  const formattedListSent = listSent?.map((sent) => {
    return [
      getFullYearDateApi(sent.created_at), 
      Number(sent.value_sent),
    ];
  });

  const formattedListReceived = listReceived?.map((received) => {
    return [
      getFullYearDateApi(received.created_at), 
      Number(received.value_received),
    ];
  });
  
  const dataSent = [
    ["Year", "Enviados"],
    ...formattedListSent!
  ];

  const dataReceived = [ 
    ["Year", "Recebidos"],
    ...formattedListReceived!
  ];

  const optionsReceived = {
    title: "Recebidos gráfico",
    curveType: "function",
    legend: { position: "bottom" },
    hAxis: { format: "currency" },
    animation: {duration: 500, easing: "linear", startup: true},
  };
  
  const optionsSent = {
    ...optionsReceived,
    title: "Enviados gráfico",
    legend: { position: "bottom" },
    colors: ["red"],
  };
 
  return (
    <main className={`w-full ${listSent?.length ? "min-h-max" : "h-screen"} flex flex-col items-center pb-10 mt-5`}>
      {
        !loadReceived ?
          (
            <div className={`md:w-11/12  max-md:w-full px-2`}>
              {
                  listReceived?.length ?
                  (
                      <Chart
                        chartType="ScatterChart"
                        width="100%"
                        height="400px"
                        data={dataReceived}
                        options={optionsReceived}
                        className="shadow-lg border-2 rounded-sm"
                      />
                  )
                  : 
                  (
                    <div className="text-center flex flex-col justify-center items-center w-full">
                      <h1 className="font-medium">Recebidos</h1>
                      <h1>Você ainda não recebeu nenhum dinheiro!</h1>
                      <div className="-mt-12 flex justify-center">
                        <GraphicSvg />
                      </div>
                    </div>
                  )
              }
            </div>
        )
        :
        ( <Load /> )
      }

      { 
        !loadSent ?
        (
            <div className={`md:w-11/12 max-md:w-full mt-5 px-2`}>
              {
                  listSent?.length ? 
                  (
                      <Chart
                        chartType="ScatterChart"
                        width="100%"
                        height="400px"
                        data={dataSent}
                        options={optionsSent}
                        className="shadow-lg border-2 rounded-sm"
                      />
                  )
                  : 
                  (
                    <div className="text-center mt-10">
                      <h1 className="font-medium">Enviados</h1>
                      <h1>Você ainda não enviou dinheiro para ninguém!</h1>
                      <div className="-mt-12 flex justify-center">
                        <GraphicSvg />
                      </div>
                    </div>
                  )
              }
            </div>
        )
        :
        ( <Load /> )
      }
    </main>
  );
};