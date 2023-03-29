import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import Image from 'next/image';
import nigditIcon from '../../../assets/testimage.svg'
import Link from 'next/link';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    user?:
    {
        username: string,
        avatar: string,
        profilePage: string,
    }
}

export default function Navbar() //{searchbar}: Props
{
    const searchValChanged = async (cval: string) =>
    {
        console.log("current: "+cval);
    }

    return(        
        <div className="flex flex-row justify-between h-[5.5vh] min-h-[52px] max-h-[3.2rem] w-[100%] overflow-hidden bg-foregroundL dark:bg-foregroundD border-black border-b-2 border-solid sticky z-40 top-0 left-0">
            <div className='min-w-[2.4rem] w-[2.4rem] ml:w-[7.4rem] tl:w-[13rem] h-[100%] flex flex-row my-2 mx-2'>
                <div className='shrink-0'>
                    <Image src={nigditIcon} width={36} height={36} className="hover:cursor-pointer object-cover overflow-hidden p-0 w-[2.4rem] h-[2.4rem] rounded-full" alt={''}/>
                </div> 
                <div className='w-[5rem] hidden ml:block'>
                    <p className="shrink-1 text-[24px] font-['Roboto'] dark:text-white pl-2"><Link href={'/'}>NigDIT</Link></p>
                </div>                
                <div className='w-[5.6rem] overflow-hidden shrink-1 hidden tl:flex'></div>
            </div>            
            <div className='min-w-[12rem] w-[25vw] max-w-[30rem] h-[100%] grow flex flex-row my-2 mx-2'>
                <div className='flex flex-row h-[70%] w-[100%] bg-backgroundL dark:bg-backgroundD border-black border-solid border-0 rounded-[10px]'>
                    <div className='w-[2.1rem] min-w-[2.1rem]'>
                        <Image src={nigditIcon} width={33} height={33} className="object-cover overflow-hidden min-w-[100%] w-[100%] h-[100%]" alt={''}/>
                    </div>                   
                    <div className='w-[100%] m-[0.2rem]'>
                        <input className='dark:text-white text-[1.2rem] bg-[rgba(0,0,0,0)] dark:bg-[rgba(0,0,0,0)] border-none outline-none w-[100%]' type="text" placeholder={"search..."}onChange={event => searchValChanged(event.target.value)} />
                    </div>
                </div> 
            </div>
            <div className='min-w-[2.4rem] w-[2.4rem] tm:w-[13rem] h-[100%] flex flex-row-reverse my-2 ml-1 mr-3'>
                <div className='ml-auto min-w-[2.4rem] w-[2.4rem] shrink-0'>
                    <Image src={nigditIcon} width={36} height={36} className="hover:cursor-pointer object-cover overflow-hidden w-[100%] rounded-full" alt={''}/>
                </div> 
                <div className='overflow-hidden ml-auto shrink-1 w-[10.6rem] hidden tm:block'><p className="overflow-hidden text-right text-[20px] font-thin dark:text-white pr-2">nobodywwwwww</p></div>                 
            </div>
        </div>
    );  
}
   