import Head from 'next/head';

const appName = 'Tadeas';
const defaultDescription = 'A to-do list app by Teno Fdio Team';
const defaultUrl = 'https://tadeas.pages.dev/';
const defaultImage = '/apple-touch-icon.png';

type Props = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
};

export const PageMeta: React.FC<Props> = ({
  title,
  description = defaultDescription,
  url = defaultUrl,
  image = defaultImage,
}) => {
  const titleComplete = title ? `${appName} | ${title}` : appName;
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{titleComplete}</title>
      <meta charSet="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      />
      <meta name="keywords" content="games, sports" />
      <meta name="title" content={titleComplete} />
      <meta name="description" content={description} />

      {/* iOS */}
      <meta name="apple-mobile-web-app-title" content={appName} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={titleComplete} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={titleComplete} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Head>
  );
};
