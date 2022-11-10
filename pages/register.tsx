import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import EmailVerification from '../components/organism/EmailVerification';
import RegisterForm from '../components/organism/RegisterForm';

const Register: NextPage = () => {

  const [verify,setVerify] = useState<boolean>(false);

  function verChange(val: boolean)
  {
    setVerify(val)
  }  

  return (    
    
    <div className="dark:text-white dark:bg-backgroundD bg-backgroundL w-[100%] p-0 m-0 h-screen">
      {verify == true? (
        <EmailVerification verChange={verChange} email={"Niggers@must.die"}/>
      ):(
        <RegisterForm verChange={verChange}/>
      )}
    </div>
    
  )
}

export default Register
