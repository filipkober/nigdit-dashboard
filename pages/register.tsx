import type { NextPage } from 'next'
import RegisterForm from '../components/organisms/RegisterForm';

const Register: NextPage = () => {

  return (    
    <div className="dark:text-white dark:bg-backgroundD bg-backgroundL w-[100%] m-0 h-screen">      
      <RegisterForm/>
    </div>
    
  )
}

export default Register
