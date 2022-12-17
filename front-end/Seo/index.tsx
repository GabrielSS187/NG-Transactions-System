import Head from "next/head";

interface IProps {
  title?: string;
  description?: string;
};

export function SEO ({ description, title }: IProps) {
  const metaDescription = description || "Bem vido a NG Transações";
  const defaultTitle = `NG Transações - ${title}` || "NG Transações";
  const IMG_URL = "";

  

  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      <meta httpEquiv="content-Type" content="text/html; charset=utf-8" />

      <meta name="keywords"
        content="NG, ng, NG Transactions, NG Transações, Transações, Carteira, Carteira digital"
        />
      <meta name="robots" content="index, follow"/>

      <title>{ defaultTitle }</title>
      <meta name="title" content={defaultTitle} />
      <meta property="og:title" content={defaultTitle} />
      <link rel="icon" href="/favicon.jpg" />

      <meta property="og:image" content={IMG_URL} />
      <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL} />

      <meta name="description" content={metaDescription} />
      <meta property="og:description" content={metaDescription} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={defaultTitle} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={defaultTitle} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:url" content={process.env.NEXT_PUBLIC_SITE_URL} />
      <meta property="twitter:image" content={IMG_URL} />
    </Head>
  );
};