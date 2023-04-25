import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import EmailVerification from '../components/organism/EmailVerification';
import RegisterForm from '../components/organism/RegisterForm';
import { GoogleOAuthProvider } from '@react-oauth/google';

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
      {verify == true? (
        <EmailVerification verChange={verChange} email={email}/> //prześlij email z register
      ):(
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_KEY ?? ""}>
          <RegisterForm verChange={verChange}/>
        </GoogleOAuthProvider>   
      )}
    </div>
    
  )
}

export default Register
