import type { NextPage } from 'next'
import LoginForm from '../components/organism/LoginForm';

const Login: NextPage = () => {

  return (    
    <div className="dark:text-white dark:bg-backgroundD bg-backgroundL w-[100%] m-0 h-screen">      
      <LoginForm/>
    </div>
    
  )
}

export default Login
