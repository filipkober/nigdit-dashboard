import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';
import '../styles/fonts.css'
import React from 'react';
import { useDarkMode } from '../hooks/useDarkMode';
import Cookies from 'js-cookie';

export const darkModeContext = React.createContext<[boolean, (any: any) => void]>([Cookies?.get('darkMode') != undefined ? JSON.parse(Cookies.get('darkMode')!) : true,(any: any) => {}]);
function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState<boolean>(Cookies?.get('darkMode') != undefined ? JSON.parse(Cookies.get('darkMode')!) : true);
  const [addDarkMode, removeDarkMode] = useDarkMode;
  useEffect(() => {
    if (darkMode) {
      addDarkMode(setDarkMode);
    } else {
      removeDarkMode(setDarkMode);
    }
  }, [darkMode])
  return <darkModeContext.Provider value={[darkMode,setDarkMode]}><Component {...pageProps} /></darkModeContext.Provider>
}

export default MyApp
