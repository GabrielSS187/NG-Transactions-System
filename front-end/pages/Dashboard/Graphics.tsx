import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { parseCookies } from "nookies";
import { queryClientObj } from "../../services/queryClient";

import {
   fetchAllTransactionsSentApi,
   fetchAllTransactionsReceivedApi,
 } from "../../services/endpoints/transactions";

import Layout from "../../components/Layout";
import { Load } from "../../components/Load";

const { useQuery, dehydrate, queryClient } = queryClientObj;

const GraphicComponent = dynamic(() => import("../../components/GraphicComponent"), {
  loading: () => <Load />
});

export default function Graphics () {
  const { query } = useRouter();

  const sevenSeconds = 1000 * 7;
  
  const transactionsSent = useQuery("transactions-sent",
  async () => await fetchAllTransactionsSentApi(), 
  {staleTime: sevenSeconds }); // * 7 seconds
  const transactionsReceived = useQuery("transactions-received",
  async () => await fetchAllTransactionsReceivedApi(), 
  { staleTime: sevenSeconds });

  return (
    <Layout>
      <main className="w-full flex flex-col items-center">
        <h1 className="font-serif text-xl max-sm:text-base">
          <strong>Gráficos</strong>
        </h1>
        <GraphicComponent 
          openMenu={String(query.open)}
          listReceived={transactionsReceived.data}
          listSent={transactionsSent.data}
          loadReceived={transactionsReceived.isLoading}
          loadSent={transactionsSent.isLoading}
         />
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { ["ng.token"]: token } = parseCookies(ctx);
    
    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    };

    await queryClient.fetchQuery("transactions-sent", 
    async () => await fetchAllTransactionsSentApi(ctx));
    await queryClient.fetchQuery("transactions-received",
    async () => await fetchAllTransactionsReceivedApi(ctx));
    
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  };
};