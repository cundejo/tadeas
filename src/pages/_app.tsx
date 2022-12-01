import React from 'react';
import { Provider } from 'react-redux';
import dynamic from 'next/dynamic';
import { CssBaseline, NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { darkTheme, GeneralLayout, store, WithChildren } from '@/common';
import '../common/styles/globals.css';

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
        // light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <CssBaseline />
        <ToastContainer
          autoClose={2000}
          position="bottom-center"
          theme="dark"
          hideProgressBar
          closeOnClick
          pauseOnHover
          closeButton={false}
        />
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </NextUIProvider>
    </NextThemesProvider>
  );
};

// Disabling SSR for the whole application
export default dynamic(() => Promise.resolve(App), { ssr: false });
