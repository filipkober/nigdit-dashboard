import React, { InputHTMLAttributes, useState, useEffect } from 'react';
import Image from 'next/future/image';
import maciej from '../../../assets/easterEgg2/verificationMaciej.jpg';
import macieknastronke from '../../../assets/easterEgg2/macieknastronke.png';
import Spinner from '../../atoms/Spinner';

type Props = {
    verChange: (val: boolean) => void,
    email: string
}
  
export default function EmailVerification({verChange, email} : Props)
{    
    const [showButton,setShowButton] = useState<boolean>(false);
    const [e2, setE2] = useState<boolean>(false);
    const [e2b, setE2b] = useState<boolean>(false);
    
    useEffect(()=>{
        setTimeout(()=>{
        setShowButton(true)
        }, 6666)
    })

    return(       
        <>
        { e2 == true ? (            
        <div className='w-[100vw] h-[100vh] absolute m-0 p-0 b-0'>
            <Image src={maciej} alt="trolled" width={666} height={666} className="-brightness-150 hue-rotate-90 contrast-200 saturate-200 animate-troll w-[100%] h-[100%] opacity-[0%]"/> 
        </div> 
        ):(
            <div></div>
        )}  
        <div className='w-[300px] h-[300px] absolute m-0 p-0 b-0 -right-[-10vw] -bottom-[-10vh]'>
            <Image onClick={()=>{setE2b(!e2b)}} src={macieknastronke} alt=" " width={1000} height={1000} className='object-contain w-[100%] h-[100%] opacity-0 hover:opacity-100 hover:cursor-pointer'/>
        </div>
        <p className='absolute m-0 p-2 b-0 -left-[-7vw] -top-[-26vh] font-["Consolas"] animation-delay-100 animate-creep opacity-0'>He is coming for you.</p>
        <p className='absolute m-0 p-2 b-0 -right-[-16vw] -top-[-56vh] font-["Consolas"] animation-delay-2000 animate-creep opacity-0'>Sometimes we would have had time to scream.</p>
        <p className='absolute m-0 p-2 b-0 -right-[-50vw] -top-[-44vh] font-["Consolas"] animation-delay-16000 animate-creep opacity-0'>black white black white black white gray</p>
        <p className='absolute m-0 p-2 b-0 -left-[-18vw] -bottom-[-20vh] font-["Consolas"] animation-delay-12000 animate-creep opacity-0'>112.74.193.95</p>
        <p className='absolute m-0 p-2 b-0 -right-[-6vw] -bottom-[-76vh] font-["Consolas"] animation-delay-5000 animate-creep opacity-0'>Nigdit.</p>
        <p className='absolute m-0 p-2 b-0 -right-[-22vw] -top-[-4vh] font-["Consolas"] animation-delay-10000 animate-creep opacity-0'>Old data.</p>
        <p className='absolute m-0 p-2 b-0 -left-[-31vw] -bottom-[-3vh] font-["Consolas"] animation-delay-20000 animate-creep opacity-0'>N01r &b^%h*n#d!_.</p>
        <p className='absolute m-0 p-2 b-0 -right-[-14vw] -bottom-[-7vh] font-["Consolas"] animation-delay-15000 animate-creep opacity-0'>Nobody is here.</p>
        <p className='absolute m-0 p-2 b-0 -left-[-1vw] -bottom-[-12vh] font-["Consolas"] animation-delay-500 animate-creep opacity-0'>Stay secret.</p>
        <p className='absolute m-0 p-2 b-0 -left-[-15vw] -top-[-3vh] font-["Consolas"] animation-delay-9000 animate-creep opacity-0'>Show yourself!</p>
        <p className='absolute m-0 p-2 b-0 -right-[-50vw] -bottom-[-50vh] font-["Consolas"] font-bold text-red-900 animation-delay-3000 animate-creep opacity-0'>LEAVE THIS PAGE NOW!</p>
        <div className="w-[100%] m-0 p-[10vw] h-[100%] flex flex-col justify-start items-center overflow-hidden">      
            <p className="text-[calc(2vw+17px)] font-['Roboto'] font-bold text-white drop-shadow-midget">Verify your email adress</p>
            <div className='p-2 bg-gradient-black-apply'>
                <span className="text-[calc(0.5vw+10px)] font-['Roboto'] text-white">We've sent a verification message to your e-mail address: </span>
                <span className="text-[calc(0.5vw+10px)] font-['Roboto'] font-bold text-white">{email}</span>
            </div>
            {e2b==true?(
            <div className='w-[calc(10vw+150px)] p-2'>
                <Image onClick={()=>{setE2(!e2)}} src={maciej} alt="troll" width={1000} height={1000} className="blur-[3px] hover:cursor-pointer saturate-100 hover:saturate-150 contrast-100 hover:contrast-125 hover:blur-[0px] drop-shadow-midget border-solid border-4 border-experimentB duration-[1000ms] grayscale-[80%] hover:grayscale-[0%] object-contain w-[100%] h-[100%] opacity-[100%]"/>
            </div> 
            ):(
                <div className='h-[100%] w-[calc(10vw+150px)] p-2'></div>
            )} 
               {showButton == true? (
                    <div className='w-[calc(5vw+80px)] h-[calc(1.6vw+20px)] mt-2'>
                        <button onClick={() => {verChange(false)}} className='rounded-[calc(4px+0.3vw)] text-[calc(1vw+12px)] w-[100%] h-[100%] hover:cursor-pointer active:translate-y-0.5 duration-[10ms] shrink-1 font-["Roboto"] dark:text-white text-black text-center font-bold drop-shadow-buttonImp active:drop-shadow-buttonImpA border-black border-solid border-[1px] py-0 px-4 hover:bg-experimentB bg-experimentA'>Cancel</button>  
                    </div>
                    ):(
                    <div className='mt-4'>
                        <Spinner/>
                    </div>
                )}       
        </div>     
        </>

    );  
} 
//gradient-mask-b-0  