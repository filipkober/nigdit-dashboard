import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html style={{minHeight: '100vh'}}>
      <Head />
      <body style={{minHeight: '100vh'}} >
        <div className='bg-backgroundL dark:bg-backgroundD text-black dark:text-white w-screen h-screen ml:scrollbar-thin scrollbar-thumb-[#535353] scrollbar-track-[#2323232a] scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-y-scroll'>
        <Main/>
        <NextScript />
        </div>
      </body>
    </Html>
  )
}
