import { useEffect } from "react";

import { SEO } from "../Seo";
import Login from "./Login";


export default function Home() {
  useEffect(() => {
    localStorage.setItem("notify", "false");
  }, []);

  return (
    <main>
      <SEO title="Login" description="Faça o login na NG Transações" />
      <Login />
    </main>
  );
};
