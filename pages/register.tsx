import type { NextPage } from 'next'
import Navbar from '../components/molecules/Navbar';
import navbar from "../components/molecules/Navbar";

const Register: NextPage = () => {


  return (  //przenieś wszystko do komponentu
    <div className="dark:text-white dark:bg-backgroundD bg-backgroundL w-[100%] m-0 h-screen flex flex-col justify-center items-center">
      <div className='bg-[rgb(109,106,106)] flex flex-wrap flex-col justify-center items-center p-[0.5rem] w-[90vw] min-w-[288vw] ms:w-[90vw] ms:min-w-[320px] mm:w-[85vw] mm:min-w-[320px] ml:w-[50vw] ml:min-w-[320px] ts:w-[40vw] ls:w-[30vw] ls:min-w-[380px]'>            
        <div className='bg-[rgb(255,9,9)] w-[100%] min-h-[3rem] h-[7vh] flex flex-wrap flex-col justify-center items-center'>
            <p className="shrink-1 text-[2.5rem] font-['Roboto'] dark:text-white pl-2 font-bold ">Register</p>
        </div>
        <div className='bg-[rgb(255,148,9)] w-[100%] min-h-[1.5rem] h-[1vw] flex flex-row justify-center'>
            <p className="shrink-1 text-[1rem] font-['Roboto'] dark:text-white pl-0">By continueing you agree to Privacy Policy</p>
        </div>
        <div className='bg-[rgb(255,214,8)] w-[100%] min-h-[3rem] h-[2vw] flex flex-row justify-center items-center mt-3 '>
            <p className='border-black border-solid border-[1px] rounded-[10px] px-2 py-1'>Continue with google</p>
        </div>
        <div className='bg-[rgb(51,255,24)] w-[100%] min-h-[2rem] h-[1.3vw] flex flex-row justify-between px-3 my-3 items-center'>
            <p className="shrink-1 text-[2rem] font-['Roboto'] dark:text-white pl-2"> ---------- </p>
            <p className="shrink-1 text-[2rem] font-['Roboto'] dark:text-white pl-2"> or </p>
            <p className="shrink-1 text-[2rem] font-['Roboto'] dark:text-white pl-2"> ---------- </p>
        </div>
        <div className='bg-[rgb(9,255,148)] w-[100%] min-h-[3rem] h-[3vw] flex flex-row justify-start px-0 py-0 items-center'>
            <form className='w-[63%]'>
                <input className='w-[100%] drop-shadow-lucifer mx-[0.5rem] px-[0.5rem] h-[2rem] text-black text-[1.2rem] font-["Roboto"] bg-white outline-none border-black border-solid border-[1px] rounded-[5px]' type="text" placeholder={"dr3dieFred79"}/>                
            </form>            
            <p className="w-[37%] shrink-1 pl-4 text-[1.3rem] font-['Roboto'] dark:text-white flex font-bold"> Login</p>                        
        </div>
        <div className='bg-[rgb(9,255,148)] w-[100%] min-h-[3rem] h-[3vw] flex flex-row justify-start px-0 py-0 items-center'>
            <form className='w-[63%]'>
                <input className='drop-shadow-lucifer w-[100%] mx-[0.5rem] px-[0.5rem] h-[2rem] text-black text-[1.2rem] font-["Roboto"] bg-white outline-none border-black border-solid border-[1px] rounded-[5px]' type="password" placeholder={"⠹∞∮⅟∑Ω➫ⅫΘð㊑﷼Æ"}/>                
            </form>
            <p className="w-[37%] shrink-1 pl-4 text-[1.3rem] font-['Roboto'] dark:text-white flex font-bold"> Password</p>
        </div>
        <div className='bg-[rgb(9,255,148)] w-[100%] min-h-[3rem] h-[3vw] flex flex-row justify-start px-0 py-0 items-center'>
            <form className='w-[63%]'>
                <input className='drop-shadow-lucifer w-[100%] mx-[0.5rem] px-[0.5rem] h-[2rem] text-black text-[1.2rem] font-["Roboto"] bg-white outline-none border-black border-solid border-[1px] rounded-[5px]' type="password" placeholder={"now repeat please"}/>                
            </form>
            <p className="w-[37%] shrink-1 pl-4 text-[1.3rem] font-['Roboto'] dark:text-white flex font-bold"> Password</p>
        </div>
        <div className='bg-[rgb(9,255,148)] w-[100%] min-h-[3rem] h-[3vw] flex flex-row justify-start px-0 py-0 items-center'>
            <form className='w-[63%]'>
                <input className='drop-shadow-lucifer w-[100%] mx-[0.5rem] px-[0.5rem] h-[2rem] text-black text-[1.2rem] font-["Roboto"] bg-white outline-none border-black border-solid border-[1px] rounded-[5px]' type="text" placeholder={"5t3almy@data.com"}/>                
            </form>
            <p className="w-[37%] shrink-1 pl-4 text-[1.3rem] font-['Roboto'] dark:text-white flex font-bold"> E-mail</p>
        </div>
        <div className='bg-[rgb(206,8,255)] w-[100%] min-h-[3rem] h-[2vw]'>
            9
        </div>
      </div>
    </div>
  )
}

export default Register
