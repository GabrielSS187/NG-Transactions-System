import { SEO } from "../Seo";

import Login from "./Login";

export default function Home() {
  return (
    <main>
      <SEO title="Login" description="Faça o login na NG Transações" />
      <Login />
    </main>
  );
};
