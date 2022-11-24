import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../src/contexts/AuthContext";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import InferNextPropsType from "infer-next-props-type"

import { parseCookies } from "nookies";

import { fetchAllUsersApi } from "../../src/services/endpoints/users"

export default function Dashboard (
  {users}: InferNextPropsType<typeof getServerSideProps>
  ) {
  const { user } = useContext(AuthContext);  
  // console.log(users);
  
  return (
    <>
      <h1>Dashboard</h1>
      <h2>{user?.user_name}</h2>
      <ul>
        {
          users.map((user: any) => {
              return (
                <li key={user.id_user}>
                  {user?.user_name}
                </li>
              )
            })
          }
      </ul>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { ["ng.token"]: token } = parseCookies(ctx);

    if ( !token ) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        }
      }
    };

    const users = await fetchAllUsersApi(ctx);

      return {
        props: {
          users
      }
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}