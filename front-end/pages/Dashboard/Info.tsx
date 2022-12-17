import { SEO } from "../../Seo";
import { GetServerSideProps } from "next";
import Link from "next/link";
import  Image from "next/image";
import { parseCookies } from "nookies";
import { LinkSimple, UserCircle, LinkedinLogo, GithubLogo } from "phosphor-react";
import Layout from "../../components/Layout";

import myPhoto from "../../assets/imgs/myPhoto.png" 

export default function Info () {
  const classNameDiv = "flex flex-col lg:flex-row text-center justify-center items-center gap-1 px-2"

  return (
    <Layout>
      <SEO title="Informações" description="Informações do criado do projeto" />
     <main className="flex flex-col items-center gap-10 pb-20">
      <h1 className="text-3xl font-sans">Sobre a aplicação</h1>
      <section className="flex flex-col gap-2">
        <h2 className="text-center text-lg font-bold">Informações do criado</h2>
        <div className={`${classNameDiv} mt-5`}>
          <Image src={myPhoto} width={35} height={35} alt={"Minha foto"} />
          <h2>Criador:</h2>
          <h2><strong>Gabriel Silva</strong></h2>
        </div>
        <div className={classNameDiv}>
          <LinkedinLogo size={36} color="#000" /> 
          <h2>Linkedin:</h2>
          <Link href="https://www.linkedin.com/in/gabriel-silva-souza-developer/" 
            target="_blank" 
            title="Ir para a pagina do LinkedIn"
            className="text-sky-500"
          >
            https://www.linkedin.com/in/gabriel-silva-souza-developer/
          </Link>
        </div>
        <div className={classNameDiv}>
          <LinkSimple size={36} color="#000" />
          <h2>Site:</h2>
          <Link 
            href="https://my-site-portfolio-dev.vercel.app/"
            target="_blank"
            title="Ir para a pagina do meu site"
            className="text-sky-500"
          >
            https://my-site-portfolio-dev.vercel.app/
          </Link>
        </div>
        <div className={classNameDiv}>
          <GithubLogo size={36} color="#000" />
          <h2>Github:</h2>
          <Link 
            href="https://github.com/GabrielSS187" 
            target="_blank"
            title="Ir para a pagina do Github"
            className="text-sky-500"
          >
            https://github.com/GabrielSS187
          </Link>
        </div>
        <div className={classNameDiv}>
          <GithubLogo size={36} color="#000" />
          <h2>Repositório da aplicação:</h2>
          <Link 
            href="https://github.com/GabrielSS187/NG-Transactions-System" 
            target="_blank"
            title="Ir para a pagina do repositório da aplicação"
            className="text-sky-500"
          >
            https://github.com/GabrielSS187/NG-Transactions-System
          </Link>
        </div>
      </section>
      <div className="flex flex-col items-center gap-2 text-center px-2">
        <h2 className="text-lg font-bold" >Sobre</h2>
        <h3>A aplicação <strong>NG Transações</strong> consiste em ser uma carteira digital.</h3>
        <h3>Onde você pode enviar e receber dinheiro entre usuários que possuam uma conta <strong>NG</strong></h3>
        <h3>de uma forma simples, fácil é rápida. Com atualizações dos dados em tempo real dos gráficos de suas movimentações.</h3>
        <h3>Notificações das pessoas que te enviaram dinheiro em tempo real para que você fique sempre atualizado.</h3>
        <h3>Além disso possui tabelas das pessoas que te enviaram dinheiro é para quem você enviou dinheiro onde você poderá</h3>
        <h3>filtrar por nome e data da transação tendo assim um controle maior de sua movimentações.</h3>
        <br/>
        <h3>O Projeto ai esta em desenvolvimento e novas <strong>features</strong> ainda serão adicionadas</h3>
        <h3>Espero que você goste do meu projeto bom uso e obrigado.</h3>
      </div>
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
    }

    return {
      props: {},
    };
  } catch (error) {
    return {
      notFound: true,
    };
  };
};