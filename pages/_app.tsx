import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import '../styles/fonts.css'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect( () => { document.querySelector("body")!.classList.add("dark") } );
  return <Component {...pageProps} />
}

export default MyApp
