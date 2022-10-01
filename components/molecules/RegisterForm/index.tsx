import React, { InputHTMLAttributes, useState } from 'react';

export default function RegisterForm() 
{
    return(        
        <div className='selection:bg-[#b8b8b8] selection:text-[#FF5C00] flex flex-wrap flex-col justify-center items-center p-[0.5rem] w-[90vw] min-w-[288px] ms:w-[80w] ms:min-w-[320px] mm:w-[75vw] ml:w-[70vw] ts:w-[60vw] tm:w-[7vw] tl:w-[35vw] ls:w-[20vw]'>
          {/* Register title text */}
          <div className=' w-[100%] min-h-[3rem] h-[7vh] flex flex-wrap flex-col justify-center items-center my-4'>
              <p className="shrink-1 text-[4.5rem] font-['Roboto'] dark:text-white text-center font-bold">Register</p>
          </div>
          {/* subtitle privacy policy */}
          <div className=' w-[100%] min-h-[1.5rem] h-[1vw] flex flex-row justify-center'>
              <p className="shrink-1 text-[1rem] font-['Roboto'] dark:text-white font-bold italic">By continuing you agree to Privacy Policy</p>
          </div>
          {/* missing google stuff */}
          <div className=' w-[100%] min-h-[3rem] h-[8vh] flex flex-row justify-center items-center mt-3 '>
              <p className='border-black border-solid border-[1px] rounded-[10px] px-2 py-1'>Continue with google</p>
          </div>
          {/* --- or --- */}
          <div className=' w-[100%] min-h-[2rem] h-[5vh] flex flex-row justify-between px-3 my-3 items-center'>
              <div className='w-[38%] m-0 p-0'><hr className="border-white border-solid border-[1px] w-[100%] h-[100%]"></hr></div>
              <div className='w-[24%] m-0 p-0'><p className="text-center shrink-1 text-[2rem] font-['Roboto'] dark:text-white w-[100%] h-[100%]"> or </p></div>
              <div className='w-[38%] m-0 p-0'><hr className="border-white border-solid border-[1px] w-[100%] h-[100%]"></hr></div>
          </div>
          {/* login */}
          <div className=' w-[100%] min-h-[3rem] h-[2.8vw] flex flex-row justify-start px-0 py-0 items-center'>
              <form className='w-[63%] h-[85%]'>
                  <input className='focus:border-[#FF5C00] focus:ring-2 focus:ring-[#FF5C00] invalid:ring-1 invalid:ring-pink-500 focus:invalid:ring-2 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 drop-shadow-lucifer w-[100%] mx-[0.5rem] px-[0.5rem] min-h-[2rem] h-[100%] text-black text-[1.2rem] font-["Roboto"] bg-white outline-none border-black border-solid border-[1px] rounded-[5px]' type="text" placeholder={"h0p3less0ul"}/>                
              </form>            
              <p className="w-[37%] shrink-1 pl-4 text-[1.3rem] font-['Roboto'] dark:text-white flex font-bold">Login</p>                        
          </div>
          {/* password */}
          <div className='w-[100%] min-h-[3rem] h-[2.8vw] flex flex-row justify-start px-0 py-0 items-center'>
              <form className='w-[63%] h-[85%]'>
                  <input className='focus:border-[#FF5C00] focus:ring-2 focus:ring-[#FF5C00] invalid:ring-1 invalid:ring-pink-500 focus:invalid:ring-2 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 drop-shadow-lucifer w-[100%] mx-[0.5rem] px-[0.5rem] min-h-[2rem] h-[100%] text-black text-[1.2rem] font-["Roboto"] bg-white outline-none border-black border-solid border-[1px] rounded-[5px]' type="password" placeholder={"⠹∞∮⅟∑Ω➫ⅫΘð㊑﷼Æ"}/>                
              </form>
              <p className="w-[37%] shrink-1 pl-4 text-[1.3rem] font-['Roboto'] dark:text-white flex font-bold">Password</p>
          </div>
          {/* repeat password */}
          <div className='w-[100%] min-h-[3rem] h-[2.8vw] flex flex-row justify-start px-0 py-0 items-center'>
              <form className='w-[63%] h-[85%]'>
                  <input className='focus:border-[#FF5C00] focus:ring-2 focus:ring-[#FF5C00] invalid:ring-1 invalid:ring-pink-500 focus:invalid:ring-2 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 drop-shadow-lucifer w-[100%] mx-[0.5rem] px-[0.5rem] min-h-[2rem] h-[100%] text-black text-[1.2rem] font-["Roboto"] bg-white outline-none border-black border-solid border-[1px] rounded-[5px]' type="password" placeholder={"now repeat please"}/>                
              </form>
              <p className="w-[37%] shrink-1 pl-4 text-[1.3rem] font-['Roboto'] dark:text-white flex font-bold">Password</p>
          </div>
          {/* email */}
          <div className='w-[100%] min-h-[3rem] h-[2.8vw] flex flex-row justify-start px-0 py-0 items-center'>
              <form className='w-[63%] h-[85%]'>
                  <input className='peer focus:border-[#FF5C00] focus:ring-2 focus:ring-[#FF5C00] invalid:ring-1 invalid:ring-pink-500 focus:invalid:ring-2 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 drop-shadow-lucifer w-[100%] mx-[0.5rem] px-[0.5rem] min-h-[2rem] h-[100%] text-black text-[1.2rem] font-["Roboto"] bg-white outline-none border-black border-solid border-[1px] rounded-[5px]' type="email" placeholder={"5t3almy@data.com"}/>                
                  <p className="mt-[0.2rem]] invisible peer-invalid:visible text-pink-600 text-sm pl-2 w-[100%]">Email address is invalid.</p>
              </form>
              <p className="w-[37%] shrink-1 pl-4 text-[1.3rem] font-['Roboto'] dark:text-white flex font-bold">E-mail</p>
          </div>
          
          {/* submit button */}
          <div className='w-[100%] min-h-[3rem] h-[2vw] flex flex-row justify-center px-0 mt-8 items-center'>
              <button className='active:translate-y-0.5 duration-[10ms] shrink-1 text-[1.8rem] font-["Roboto"] text-black text-center font-bold drop-shadow-buttonDevil active:drop-shadow-buttonDevilA border-black border-solid border-[1px] rounded-[10px] py-1 px-4 bg-[#FF5C00] hover:bg-[#ff7d31]'>Create account</button>
          </div>          
        </div>
    );  
} 