import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import '../styles/fonts.css';
import React from 'react';
import { useDarkMode } from '../hooks/useDarkMode';
import Cookies from 'js-cookie';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store/store';
import { Provider } from 'react-redux';
import { NextPage } from 'next';

export const darkModeContext = React.createContext<
  [boolean, (any: any) => void]
>([
  Cookies?.get('darkMode') != undefined
    ? JSON.parse(Cookies.get('darkMode')!)
    : true,
  (any: any) => {},
]);
function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState<boolean>(
    Cookies?.get('darkMode') != undefined
      ? JSON.parse(Cookies.get('darkMode')!)
      : true
  );
  const [addDarkMode, removeDarkMode] = useDarkMode;
  useEffect(() => {
    if (darkMode) {
      addDarkMode(setDarkMode);
    } else {
      removeDarkMode(setDarkMode);
    }
  }, [darkMode]);
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <darkModeContext.Provider value={[darkMode, setDarkMode]}>
            <Component {...pageProps} />
          </darkModeContext.Provider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
