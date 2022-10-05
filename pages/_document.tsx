import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() { 
  return (
    <Html>
      <Head />
      <body >
        <main className='bg-backgroundL dark:bg-backgroundD text-black dark:text-white h-screen'>
        <Main />
        <NextScript />
        </main>
      </body>
    </Html>
  )
}
