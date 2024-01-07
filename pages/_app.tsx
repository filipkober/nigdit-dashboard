import Cookies from 'js-cookie';
import type { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'tailwindcss/tailwind.css';
import Layout from '../components/layouts/MainLayout';
import { useDarkMode } from '../hooks/useDarkMode';
import { persistor, store } from '../store/store';
import { resetData, setUser } from '../store/userSlice';
import '../styles/globals.css';
import UserService from '../util/requests/UserService';

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkMode]);

  const userService = new UserService();
  const jwtCookie = Cookies.get('jwt');

  useEffect(() => {
    if(jwtCookie != undefined)
    {
      userService.getMe().then((res) => {
        console.log(res)
        store.dispatch(setUser(res));
      })
    } else {
      store.dispatch(resetData());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[jwtCookie]);

  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <darkModeContext.Provider value={[darkMode, setDarkMode]}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </darkModeContext.Provider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
