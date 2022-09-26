import React, { useState } from 'react';
import Arrow from '../../atoms/Arrow';
import Image from 'next/image';
import nigditIcon from '../../../assets/testimage.svg'
import moment from 'moment';

type Props = {

}

export default function Navbar({}: Props) 
{

    return(        
        <div className="flex flex-row min-h-[50px] h-[5.5vh] max-h-[64px] w-[100%] py-2 px-2 overflow-hidden bg-foregroundL dark:bg-foregroundD border-black border-b-2 border-solid">
            <div><Image src={nigditIcon} width={36} height={36} className="overflow-hidden w-[100%] h-[100%] rounded-full"/></div> 
            <div><p className="text-[24px] font-['Roboto'] dark:text-white ml-2">NigDIT</p></div>
            <div className='ml-[32%]'>
                <div className='flex flex-row h-[4vh] w-[20vw] bg-backgroundL dark:bg-backgroundD border-black border-solid border-0 rounded-[10px] mt-[-1px]'>
                    <div><Image src={nigditIcon} width={36} height={36} className="overflow-hidden w-[20%] h-[100%]"/></div>      {/* ikona lupy */}
                    <div><p className="mt-1 ml-2 dark:text-white font-['Roboto'] text-[20px] font-normal">zamiast tego input...</p></div>
                </div> 
            </div>
            <div className='ml-auto'><Image src={nigditIcon} width={36} height={36} className=" overflow-hidden w-[100%] h-[100%] rounded-full"/></div>    
        </div>

    );  
}

//<div className="font-normal  drop-shadow-lg  rounded-[5px] mb-2">
   