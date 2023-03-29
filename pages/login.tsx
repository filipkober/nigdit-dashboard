import { GoogleOAuthProvider } from '@react-oauth/google';
import type { NextPage } from 'next'
import LoginForm from '../components/organism/LoginForm';

const Login: NextPage = () => {

  return (    
    <div className="dark:text-white dark:bg-backgroundD bg-backgroundL w-[100%] m-0 h-screen">   
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_KEY ?? ""}>                    
      <LoginForm/>  
    </GoogleOAuthProvider>          
    </div>
    
  )
}

export default Login
