import type { NextPage } from 'next'
import Navbar from '../components/molecules/Navbar';
import navbar from "../components/molecules/Navbar";

const Register: NextPage = () => {


  return (  //przenieś wszystko do komponentu
    <div className="dark:text-white dark:bg-backgroundD bg-backgroundL w-[100%] m-0 h-screen flex flex-col justify-center items-center">
      <div className='bg-[rgb(109,106,106)] flex flex-wrap flex-col justify-center items-center min-w-[320px] w-[20vw] p-[0.5rem]'>            
        <div className='bg-[rgb(255,9,9)] w-[100%] min-h-[3rem] h-[7vh] flex flex-wrap flex-col justify-center items-center'>
            <p className="shrink-1 text-[2.5rem] font-['Roboto'] dark:text-white pl-2">Register</p>
        </div>
        <div className='bg-[rgb(255,148,9)] w-[100%] min-h-[1.5rem] h-[1vw] flex flex-row justify-center'>
            <p className="shrink-1 text-[1rem] font-['Roboto'] dark:text-white pl-2">By continueing you agree to Privacy Policy</p>
        </div>
        <div className='bg-[rgb(255,214,8)] w-[100%] min-h-[3rem] h-[2vw] flex flex-row justify-center items-center py-3'>
            Continue with google
        </div>
        <div className='bg-[rgb(51,255,24)] w-[100%] min-h-[2rem] h-[1.3vw] flex flex-row justify-between px-3 my-3 items-center'>
            <p className="shrink-1 text-[2rem] font-['Roboto'] dark:text-white pl-2"> ---------- </p>
            <p className="shrink-1 text-[2rem] font-['Roboto'] dark:text-white pl-2"> or </p>
            <p className="shrink-1 text-[2rem] font-['Roboto'] dark:text-white pl-2"> ---------- </p>
        </div>
        <div className='bg-[rgb(9,255,148)] w-[100%] min-h-[3rem] h-[2vw]'>
            5
        </div>
        <div className='bg-[rgb(8,214,255)] w-[100%] min-h-[3rem] h-[2vw]'>
            6
        </div>
        <div className='bg-[rgb(24,55,255)] w-[100%] min-h-[3rem] h-[2vw]'>
            7
        </div>
        <div className='bg-[rgb(107,9,255)] w-[100%] min-h-[3rem] h-[2vw]'>
            8
        </div>
        <div className='bg-[rgb(206,8,255)] w-[100%] min-h-[3rem] h-[2vw]'>
            9
        </div>
      </div>
    </div>
  )
}

export default Register
