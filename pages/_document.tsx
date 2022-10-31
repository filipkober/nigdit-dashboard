import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() { 
  return (
    <Html className='h-full w-full'>
      <Head />
      <body className='min-h-full'>
        <main className='bg-backgroundL dark:bg-backgroundD text-black dark:text-white w-screen h-full'>
        <Main/>
        <NextScript />
        </main>
      </body>
    </Html>
  )
}
