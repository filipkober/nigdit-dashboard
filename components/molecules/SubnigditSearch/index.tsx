import React, { useEffect, useState } from 'react';
import Arrow from '../../atoms/Vote';
import Image from 'next/image';
import moment from 'moment';
import SubnigditService from '../../../util/requests/SubnigditService';
import { useSelector } from 'react-redux';
import { UserState } from '../../../store/userSlice';

type SubnigditSearch = {
  id: number,
  name: string,
  image: string,
  members: string,
  number: number,
}


export default function SubnigditSearch({id,name,image,members,number}: SubnigditSearch) {
  const subnigditService = new SubnigditService();
  const user = useSelector((state: UserState) => state.user)
  const {username, profilePicture} = user;
  const [joined,setJoined] = useState<boolean>(!!user.subnigdits?.find(s => s.id === id));
  
  async function joinSubNigdit() {
    let j = await subnigditService.joinSubnigdit(id.toString());
    setJoined(j);
  }

  var u = "dark:bg-backgroundD"
  if(number%2 == 0)
  {
    u = "dark:bg-highlightD"
  }

  return (
    <div className={'h-[62px] w-[100%] text-left font-normal flex bg-foregroundL border-accentD border-x-[1px] border-solid py-[6px] px-[6px] '+u}>
        <div className='w-[75%] flex'>
            <a className='w-[44px] h-[44px] flex' href={"/n/"+name}>
                <Image draggable="false" src={image} width={100} height={100} className="w-[44px] pointer-events-auto select-none hover:cursor-pointer object-cover overflow-hidden rounded-full" alt={''}/>
            </a>              
            <div className='w-[70%] h-[100%] justify-top flex flex-col my-[-4px]'>            
                <a className='text-[24px] w-fit px-2 pointer-events-auto select-none hover:cursor-pointer' href={"/n/"+name}>{name}</a>
                <a className='text-[11px] w-fit px-[9px] my-[-2px] text-[#b1b1b1] pointer-events-auto select-none hover:cursor-pointer' href={"/n/"+name}>{members} members</a>
            </div>  
        </div>  
        {/* connect joining to backend */}
        {!!username?         
          <a className='flex flex-row-reverse w-[25%] p-[5px] pointer-events-auto'>
              <button onClick={joinSubNigdit} className={`w-[calc(2*20%+30px)] h-[100%] min-h-[30px] hover:cursor-pointer text-[calc(0.7vw+10px)] font-["Roboto"] text-white duration-[100ms] text-center hover:drop-shadow-midget border-black border-solid border-[1px] bg-experimentA hover:bg-experimentB rounded-[10px]`}>{joined?"joined":"join"}</button>
          </a>  
          :
          ""
        }      
    </div>
  )
}
