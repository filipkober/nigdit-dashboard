import { GoogleOAuthProvider } from '@react-oauth/google';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import EmailVerification from '../components/organism/EmailVerification';
import RegisterForm from '../components/organism/RegisterForm';

const Register: NextPage = () => {

  const [verify,setVerify] = useState<boolean>(false);
  const [email,setEmail] = useState<string>("");

  function verChange(val: boolean, email: string)
  {
    setVerify(val)
    setEmail(email)
  }

  return (
    <div className="dark:text-white dark:bg-backgroundD bg-backgroundL w-[100%] p-0 m-0 h-screen">
      <Head>
        <title>Create account</title>
        <link rel="icon" href={'/nigditLogo.svg'}/>
        <meta name="description" content="Register to nigdit."/>
      </Head>
      {verify == true? (
        <EmailVerification verChange={verChange} email={email}/>
      ):(
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_KEY ?? ""}>
          <RegisterForm verChange={verChange}/>
        </GoogleOAuthProvider>
      )}
    </div>
    
  )
}

export default Register
