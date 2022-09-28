import React, { InputHTMLAttributes, useState } from 'react';
import Arrow from '../../atoms/Arrow';
import Image from 'next/image';
import nigditIcon from '../../../assets/testimage.svg'
import moment from 'moment';
import { ExecSyncOptionsWithStringEncoding } from 'child_process';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    user?:
    {
        username: string,
        avatar: string,
        profilePage: string,
    }
    searchbar:
    {
        value?: string,
        onChange: (str: string) => void,
    }
}

export default function Navbar({searchbar}: Props) 
{
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    }
    return(        
        <div className="flex flex-row justify-between h-[5.5vh] min-h-[52px] max-h-[3.2rem] w-[100%] overflow-hidden bg-foregroundL dark:bg-foregroundD border-black border-b-2 border-solid sticky">
            <div className='min-w-[2.4rem] w-[2.4rem] ml:w-[7.4rem] tl:w-[13rem] h-[100%] flex flex-row my-2 mx-2'>
                <div className='shrink-0'>
                    <Image src={nigditIcon} width={36} height={36} className="overflow-hidden p-0 w-[2.4rem] h-[100%] rounded-full"/>
                </div> 
                <div className='w-[5rem] hidden ml:block'>
                    <p className="shrink-1 text-[24px] font-['Roboto'] dark:text-white pl-2">NigDIT</p>
                </div>                
                <div className='w-[5.6rem] overflow-hidden shrink-1 hidden tl:flex'></div>
            </div>            
            <div className='min-w-[12rem] w-[25vw] max-w-[30rem] h-[100%] grow flex flex-row my-2 mx-2'>
                <div className='flex flex-row h-[70%] w-[100%] bg-backgroundL dark:bg-backgroundD border-black border-solid border-0 rounded-[10px]'>
                    <div className='w-[2.1rem] min-w-[2.1rem]'>
                        <Image src={nigditIcon} width={33} height={33} className="overflow-hidden min-w-[100%] w-[100%] h-[100%]"/>
                    </div>                   
                    <div className='w-[100%] m-[0.2rem]'>
                        <form>
                            <input className='dark:text-white text-[1.2rem] bg-[rgba(0,0,0,0)] dark:bg-[rgba(0,0,0,0)] border-none outline-none w-[100%]' type="text" value={searchbar.value} placeholder={"search..."}onChange={event => searchbar.onChange(event.target.value)} />
                        </form>
                    </div>
                </div> 
            </div>
            <div className='min-w-[2.4rem] w-[2.4rem] tm:w-[13rem] h-[100%] flex flex-row-reverse my-2 mx-2'>
                <div className='ml-auto min-w-[2.4rem] w-[2.4rem] shrink-0'>
                    <Image src={nigditIcon} width={36} height={36} className=" overflow-hidden w-[100%] h-[100%] rounded-full"/>
                </div> 
                <div className='overflow-hidden ml-auto shrink-1 w-[10.6rem] hidden tm:block'><p className="overflow-hidden text-right text-[20px] font-thin dark:text-white pr-2">nobodywwwwww</p></div>                 
            </div>
        </div>
    );  
}
/*onSubmit={event => searchbar.onSubmit()} */
//<div className="font-normal  drop-shadow-lg  rounded-[5px] mb-2">
/* <div><p className="mt-1 ml-2 dark:text-white font-['Roboto'] text-[20px] font-normal">zamiast tego input...</p></div> */
   