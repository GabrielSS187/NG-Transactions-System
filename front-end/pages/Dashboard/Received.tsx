import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { parseCookies } from "nookies";

import { queryClientObj } from "../../services/queryClient";
import Layout from "../../components/Layout";
import { Load } from "../../components/Load";

import { 
  fetchAllTransactionsReceivedFilterApi
} from "../../services/endpoints/transactions";

const { useQuery, dehydrate, queryClient } = queryClientObj;

const TableReceived = dynamic(() => import("../../components/TableReceived"), {
  loading: () => <Load />
});

export default function Received () {
  const [ search, setSearch ] = useState<string>("");
  const [ date, setDate ] = useState<string>("");  

  const transactionsReceived = useQuery("transactions-received-filter",
  async () => await fetchAllTransactionsReceivedFilterApi("", search, date),
    {refetchInterval: 10000,}
  );

  useEffect(() => {
    transactionsReceived.refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, date]);

  return (
   <Layout>
     <div className="w-full h-screen flex flex-col">
        <h1 className="font-serif text-xl text-center max-sm:text-base">
          <strong>Lista das pessoas que te enviaram dinheiro</strong>
        </h1>
        <br />
        <TableReceived
          listReceived={transactionsReceived.data || []}
          search={search}
          setSearch={setSearch}
          date={date}
          setDate={setDate}
          isLoading={transactionsReceived.isLoading}
        />
     </div>
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

    await queryClient.fetchQuery("transactions-received-filter",
    async () => await fetchAllTransactionsReceivedFilterApi(ctx));

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