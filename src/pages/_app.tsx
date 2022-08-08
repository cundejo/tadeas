import '../features/common/styles/globals.css';
import { CssBaseline, NextUIProvider } from '@nextui-org/react';
import { darkTheme, GeneralLayout, lightTheme, WithChildren } from '@/features/common';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

type Props = {
  Component: React.FC & { layout: React.FC<WithChildren> };
  pageProps: any;
};

const App: React.FC<Props> = ({ Component, pageProps }) => {
  const Layout = Component?.layout || GeneralLayout;

  return (
    <NextThemesProvider
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </NextThemesProvider>
  );
};

export default App;
