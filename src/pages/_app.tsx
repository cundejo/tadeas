import React, { useState } from 'react';
import { CssBaseline, NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ToastContainer } from 'react-toastify';
import {
  AppContext,
  appContextDefault,
  ContextObject,
  darkTheme,
  GeneralLayout,
  lightTheme,
  WithChildren,
} from '@/features/common';
import 'react-toastify/dist/ReactToastify.css';
import '../features/common/styles/globals.css';

type Props = {
  Component: React.FC & { layout: React.FC<WithChildren> };
  pageProps: any;
};

const App: React.FC<Props> = ({ Component, pageProps }) => {
  const [appContext, setAppContext] = useState<ContextObject>(appContextDefault);
  const value = { appContext, setAppContext };
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
        <ToastContainer position="bottom-center" theme="dark" />
        <AppContext.Provider value={value}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppContext.Provider>
      </NextUIProvider>
    </NextThemesProvider>
  );
};

export default App;
