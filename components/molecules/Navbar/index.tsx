import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import Image from 'next/image';
import nigditIcon from '../../../assets/testimage.svg'
import Link from 'next/link';
import { useSelector } from 'react-redux'
import { UserState } from '../../../store/userSlice'
import Cookies from 'js-cookie';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    user?:
    {
        username: string,
        avatar: string,
        profilePage: string,
    }
}

export default function Navbar()
{
    const [isLogged, setLogged] = useState(false);
    const a = useSelector((state: UserState) => state.user.username)
    useEffect(() => {
        setLogged(!!a) //Cookies.get("jwt") !! - zamienia wartości nakie jak null/undefined na false, reszta jest true
    },[]);

    const searchValChanged = async (cval: string) =>
    {
        console.log("current: "+cval);
    }

    return(        
        <div className="pointer-events-none flex flex-row justify-between h-[5.5vh] min-h-[52px] max-h-[3.2rem] w-[100%] overflow-hidden bg-foregroundL dark:bg-foregroundD border-black border-b-2 border-solid sticky z-40 top-0 left-0">
            <a href="http://localhost:3000" className='pointer-events-auto min-w-[2.4rem] w-[2.4rem] ml:w-[7.4rem] tl:max-w-[13rem] h-[100%] flex flex-row my-2 mx-2'>
                <div className='shrink-0'>
                    <Image draggable="false" src={nigditIcon} width={36} height={36} className="select-none hover:cursor-pointer object-cover overflow-hidden p-0 w-[2.4rem] h-[2.4rem] rounded-full" alt={''}/>
                </div> 
                <div className='w-[5rem] hidden ml:block'>
                    <p className="select-none shrink-1 text-[24px] font-['Roboto'] dark:text-white pl-2"><Link href={'/'}>NigDIT</Link></p>
                </div>                
                <div className='w-[5.6rem] overflow-hidden shrink-1 hidden tl:flex'></div>
            </a>            
            <div className='min-w-[12rem] w-[25vw] max-w-[30rem] h-[100%] grow flex flex-row my-2 mx-2'>
                <div className='flex flex-row h-[70%] w-[100%] bg-backgroundL dark:bg-backgroundD border-black border-solid border-0 rounded-[10px]'>
                    <div className='w-[2.1rem] min-w-[2.1rem]'>
                        <Image draggable="false" src={nigditIcon} width={33} height={33} className="select-none object-cover overflow-hidden min-w-[100%] w-[100%] h-[100%]" alt={''}/>
                    </div>                   
                    <div className='w-[100%] m-[0.2rem]'>
                        <input className='pointer-events-auto dark:text-white text-[1.2rem] bg-[rgba(0,0,0,0)] dark:bg-[rgba(0,0,0,0)] border-none outline-none w-[100%]' type="text" placeholder={"search..."}onChange={event => searchValChanged(event.target.value)} /> 
                    </div>
                </div> 
            </div>            
            {(isLogged) ? (
            <a href="http://localhost:3000/my-account" className='hover:cursor-pointer min-w-[2.4rem] tm:min-w-[13rem] h-[100%] flex flex-row-reverse my-2 ml-1 mr-3'>
                <div className='w-[2.4rem] shrink-0'>
                    <Image draggable="false" src={nigditIcon} width={36} height={36} className="w-[2.4rem] pointer-events-auto select-none hover:cursor-pointer object-cover overflow-hidden rounded-full" alt={''}/>
                </div> 
                <div className='select-none overflow-hidden ml-auto shrink-1 hidden tm:block'>
                    <p className="pointer-events-auto overflow-hidden text-right text-[20px] font-thin dark:text-white pr-2">{a}</p>
                </div>                 
            </a>
            ):(
                
            <div className='min-w-[2.4rem] tm:min-w-[13rem] flex flex-row-reverse my-[6.5px] ml-1 mr-3'>
                <a href="http://localhost:3000/register" className="pointer-events-auto hover:cursor-pointer mx-1 shrink-0 px-4 py-1 rounded-[666px] bg-[#aaa] text-[#373737] border-[1px] font-bold shadow-md border-[#000000] hover:bg-gray-100 transition-colors duration-300">
                    register
                </a>     
                <a href="http://localhost:3000/login" type="button" className="pointer-events-auto hover:cursor-pointer shrink-0 px-4 py-1 rounded-[666px] bg-[#aaa] text-[#373737] border-[1px] font-bold shadow-md border-[#000000] hover:bg-gray-200 transition-colors duration-300">
                    login
                </a>    
            </div>
            )}
        </div>
    );  
}
   