import React, { InputHTMLAttributes, useState, useEffect } from 'react';
import Image from 'next/future/image';
import maciej from '../../../assets/verificationMaciej.jpg';

type Props = {
    verChange: (val: boolean) => void,
    email: string
}
  
export default function EmailVerification({verChange, email} : Props)
{    
    const [showButton,setShowButton] = useState<boolean>(false);
    const [e2, setE2] = useState<boolean>(false);
    function trolled()
    {
        setE2(!e2);
    }
    
    useEffect(()=>{
        setTimeout(()=>{
        setShowButton(true)
        }, 3000)
    })

    return(       
        <>
        { e2 == true ? (            
        <div className='w-[100vw] h-[100vh] absolute m-0 p-0 b-0'>
            <Image src={maciej} alt="trolled" width={666} height={666} className="brightness-150 hue-rotate-90 contrast-200 saturate-200 animate-troll w-[100%] h-[100%] opacity-[0%]"/> 
        </div> 
        ):(
            <div></div>
        )}  
        <div className="w-[100%] m-0 p-[10vw] h-[100%] flex flex-col justify-start items-center overflow-hidden">      
            <p className="text-[calc(2vw+17px)] font-['Roboto'] font-bold text-white drop-shadow-midget">Verify your email adress</p>
            <div className='p-2 bg-gradient-black-apply'>
                <span className="text-[calc(0.5vw+10px)] font-['Roboto'] text-white">We've sent a verification message to your e-mail address: </span>
                <span className="text-[calc(0.5vw+10px)] font-['Roboto'] font-bold text-white">{email}</span>
            </div>
            <div className='w-[calc(10vw+150px)] p-2'>
                <Image onClick={trolled} src={maciej} alt="troll" width={100} height={100} className="blur-[3px] hover:cursor-pointer saturate-100 hover:saturate-150 contrast-100 hover:contrast-125 hover:blur-[0px] drop-shadow-midget border-solid border-4 border-experimentB duration-[1000ms] grayscale-[80%] hover:grayscale-[0%] object-contain w-[100%] h-[100%] opacity-[100%]"/>
            </div>
            <div className='w-[calc(5vw+80px)] h-[calc(1.6vw+20px)] mt-2'>
                {showButton == true? (
                    <button onClick={() => {verChange(false)}} className='rounded-[calc(4px+0.3vw)] text-[calc(1vw+12px)] w-[100%] h-[100%] hover:cursor-pointer active:translate-y-0.5 duration-[10ms] shrink-1 font-["Roboto"] dark:text-white text-black text-center font-bold drop-shadow-buttonImp active:drop-shadow-buttonImpA border-black border-solid border-[1px] py-0 px-4 hover:bg-experimentB bg-experimentA'>Cancel</button>  
                ):(
                    <div></div>
                )}
              
            </div>               
        </div>     
        </>

    );  
} 
//gradient-mask-b-0  