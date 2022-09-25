import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';
import '../styles/fonts.css'

function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  useEffect( () => { darkMode && document.querySelector("body")!.classList.add("dark") } );
  return <Component {...pageProps} />
}

export default MyApp
