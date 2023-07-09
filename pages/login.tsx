import { GoogleOAuthProvider } from '@react-oauth/google';
import type { NextPage } from 'next';
import Head from 'next/head';
import LoginForm from '../components/organism/LoginForm';

const Login: NextPage = () => {

  return (
    <div className="dark:text-white dark:bg-backgroundD bg-backgroundL w-[100%] m-0 h-screen">
      <Head>
        <title>Nigdit - Welcome back!</title>
        <link rel="icon" href={'/easterEgg1/blooddrop.svg'}/>
        <meta name="description" content="Log into nigdit."/>
      </Head>
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_KEY ?? ""}>
      <LoginForm/>
    </GoogleOAuthProvider>
    </div>
    
  )
}

export default Login
