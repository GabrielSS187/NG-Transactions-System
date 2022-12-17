import { SEO } from "../../Seo";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { queryClientObj } from "../../services/queryClient";
import { parseCookies } from "nookies";

import {
  fetchAllTransactionsReceivedApi,
  fetchAllTransactionsSentApi,
} from "../../services/endpoints/transactions";
import { findUserAuthApi } from "../../services/endpoints/users";

import Layout from "../../components/Layout";
import { Load } from "../../components/Load";

const { useQuery, dehydrate, queryClient } = queryClientObj;

const CardsDashboard = dynamic(
  () => import("../../components/CardsDashboard"),
  {
    loading: () => <Load />,
  }
);

const GraphicDashboard = dynamic(
  () => import("../../components/GraphicDashboard"),
  {
    loading: () => <Load />,
  }
);

const Modal = dynamic(
  () => import("../../components/Modal"),
  {
    ssr: false
  }
);

export default function Dashboard() {
 const sevenSeconds = 1000 * 7;

  const userLogged = useQuery(
    "find-user-logged",
    async () => await findUserAuthApi()
  );

  const transactionsSent = useQuery(
    "transactions-sent",
    async () => await fetchAllTransactionsSentApi(),
    { staleTime: sevenSeconds }
  ); // * 7 seconds
  const transactionsReceived = useQuery(
    "transactions-received",
    async () => await fetchAllTransactionsReceivedApi(),
    { 
      staleTime: sevenSeconds, 
    },
  );

  const totalValueSet = transactionsSent?.data?.reduce(
    (prevValue, currentValue) => {
      return prevValue + Number(currentValue.value_sent);
    },
    0
  );

  const totalValueReceived = transactionsReceived?.data?.reduce(
    (prevValue, currentValue) => {
      return prevValue + Number(currentValue.value_received);
    },
    0
  );

  return (
    <>
      <SEO title="Dashboard" />
      <Modal />
      <Layout> 
      <main className="flex flex-col items-center h-full mb-2 lg:h-screen">
        <CardsDashboard
          userLogged={userLogged.data!}
          isLoading={userLogged.isLoading}
          valueReceivedTotal={totalValueReceived?.toFixed(2)!}
          valueSentTotal={totalValueSet?.toFixed(2)!}
        />
        <GraphicDashboard
          receivedMoney={totalValueReceived!}
          sentMoney={Math.floor(totalValueSet!)}
        />
      </main>
    </Layout>
    </>
  );
}

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
    }

    await queryClient.fetchQuery(
      "find-user-logged",
      async () => await findUserAuthApi(ctx)
    );

    await queryClient.fetchQuery(
      "transactions-sent",
      async () => await fetchAllTransactionsSentApi(ctx)
    );

    await queryClient.fetchQuery(
      "transactions-received",
      async () => await fetchAllTransactionsReceivedApi(ctx)
    );

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
