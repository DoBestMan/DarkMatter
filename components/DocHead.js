import Head from "next/head";

const description =
  "Dark Matter presents: Mission to Marp. Users will navigate their way through a narrative-driven augmented reality game utilizing DeFi yield farming and collectible NFT's. Dark Matter is the next evolution in yield farming protocols.";

const DocHead = () => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <link rel="preload" href="/images/splash-logo-top.png" as="image" />
    <link rel="preload" href="/images/splash-logo-bot.png" as="image" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#466eab" />
    <meta name="msapplication-TileColor" content="#ffc40d" />
    <meta name="theme-color" content="#ffffff" />
    {/* og/twitter meta tags below */}
    <meta property="og:site_name" content="DarkMatter" />
    <meta property="og:type" content="website" />
    <meta name="title" content="darkmatter.finance" />
    <meta property="og:title" content="darkmatter.finance" />
    <meta property="twitter:title" content="darkmatter.finance" />
    <meta name="twitter:site" content="@yTSLAFi" />
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
    <meta property="twitter:description" content={description} />
    <meta property="og:url" content="https://darkmatter.finance/" />
    <meta property="al:web:url" content="https://darkmatter.finance/" />
    <meta
      property="og:image"
      content="https://darkmatter.finance/images/preview.png"
    />
    <meta
      name="twitter:image:src"
      content="https://darkmatter.finance/images/preview.png"
    />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="robots" content="noindex,follow,max-image-preview:large" />
  </Head>
);

export default DocHead;
