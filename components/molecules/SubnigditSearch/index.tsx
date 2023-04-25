import React, { useState } from 'react';
import Arrow from '../../atoms/Arrow';
import Image from 'next/image';
import moment from 'moment';

type SubnigditSearch = {
  name: string,
  image: string,
  members: string,
  number: number,
}

export default function SubnigditSearch({name,image,members,number}: SubnigditSearch) {
  var u = "dark:bg-backgroundD"
  if(number%2 == 0)
  {
    u = "dark:bg-highlightD"
  }

  return (
    <div className={'h-[62px] w-[100%] text-left font-normal flex bg-foregroundL border-accentD border-x-[1px] border-solid py-[6px] px-[6px] '+u}>
        <div className='w-[75%] flex'>
            <div className='w-[44px] h-[44px] flex'>
                <Image draggable="false" src={image} width={1} height={1} className="w-[44px] pointer-events-auto select-none hover:cursor-pointer object-cover overflow-hidden rounded-full" alt={''}/>
            </div>              
            <div className='w-[70%] h-[100%] justify-top flex flex-col my-[-4px]'>            
                <p className='text-[24px] px-2'>{name}</p>
                <p className='w-[100%] text-[11px] px-[9px] my-[-2px] text-[#b1b1b1]'>{members} members</p>
            </div>  
        </div>  
        {/* <div className='flex flex-row-reverse w-[25%]'>
            <button className={`w-[calc(2*10%+30px)] h-[100%] min-h-[30px] hover:cursor-pointer text-[26px] font-["Roboto"] text-white duration-[100ms] text-center hover:drop-shadow-midget border-black border-solid border-[1px] bg-experimentA hover:bg-experimentB rounded-[10px]`}>Join</button>
        </div>         */}
    </div>
  )
}
