import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import React from 'react';
import { useDarkMode } from '../hooks/useDarkMode';
import Cookies from 'js-cookie';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store/store';
import { Provider } from 'react-redux';
import { NextPage } from 'next';
import '../styles/globals.css';
import UserService from '../util/requests/UserService';
import { setUser } from '../store/userSlice';
import { userAdapter } from '../models/User';

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
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[jwtCookie]);

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
