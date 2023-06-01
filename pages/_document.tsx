import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() { 
  return (
    <Html className='h-full w-full'>
      <Head />
      <body className='flex flex-col h-screen'>
        <div className='bg-backgroundL dark:bg-backgroundD text-black dark:text-white w-screen flex-grow'>
        <Main/>
        <NextScript />
        </div>
      </body>
    </Html>
  )
}
