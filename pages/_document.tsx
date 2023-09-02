import { Html, Head, Main, NextScript } from 'next/document'
import Toast from '../components/atoms/Toast'

export default function Document() { 
  return (
    <Html style={{minHeight: '100vh'}}>
      <Head />
      <body style={{minHeight: '100vh'}} >
        <div className='bg-backgroundL dark:bg-backgroundD text-black dark:text-white w-screen min-h-screen'>
        <Main/>
        <NextScript />
        </div>
      </body>
    </Html>
  )
}
