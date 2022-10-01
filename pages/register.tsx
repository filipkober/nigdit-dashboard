import type { NextPage } from 'next'
import RegisterForm from '../components/molecules/RegisterForm';

const Register: NextPage = () => {

  return (    
    <div className="dark:text-white dark:bg-backgroundD bg-backgroundL w-[100%] m-0 h-screen flex flex-col justify-center items-center">
        <RegisterForm/>
    </div>
    
  )
}

export default Register
