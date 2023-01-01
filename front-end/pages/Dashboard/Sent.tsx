import { SEO } from "../../Seo";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { parseCookies } from "nookies";

import Layout from "../../components/Layout";
import { fetchAllTransactionsSentFilterApi } 
from "../../services/endpoints/transactions";
import { queryClientObj } from "../../services/queryClient";
import { Load } from "../../components/Load";

const { useQuery, dehydrate, queryClient } = queryClientObj;

const TableSent = dynamic(() => import("../../components/TableSent"), {
  loading: () => <Load />
});

export default function Sent () {
  const [ search, setSearch ] = useState<string>("");
  const [ date, setDate ] = useState<string>("");  

  const transactionsSent = useQuery("transactions-sent-filter",
  async () => await fetchAllTransactionsSentFilterApi("", search, date));

  useEffect(() => {
    transactionsSent.refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, date]);

  return (
    <Layout>
      <SEO title="Enviados" description="Tabela de dinheiro enviado" />
      <div className="w-full h-screen mb-14">
        <h1 className="px-1 font-serif text-xl text-center max-sm:text-base">
          <strong>Lista das pessoas que você enviou dinheiro</strong>
        </h1>
        <br />
        <TableSent 
          listSent={transactionsSent.data || []}
          search={search}
          setSearch={setSearch}
          date={date}
          setDate={setDate}
          isLoading={transactionsSent.isLoading}
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
    
    await queryClient.fetchQuery("transactions-sent-filter",
    async () => await fetchAllTransactionsSentFilterApi(ctx));

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