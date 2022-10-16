import React, {useState, useRef, useImperativeHandle, forwardRef, useEffect } from "react";
import FilterElement from "../../atoms/FilterElement";
import Image from 'next/future/image';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import FilteringBar from "../../molecules/FilteringBar";
import JoindeGroups from "../../atoms/JoinedGroups";

export default function DashboardFeed() 
{
  const [counter, setCounter] = useState<number>(0);
  function clicked(cc: number)
  {
    setCounter(cc*2)    
    console.log(counter/2)
  }

  return (
    <>
      <div className="flex flex-row justify-between w-[100%]">
        <div className='tl:w-[22%] w-[0%] h-[6.3vh] min-h-[56px] max-h-[4rem] bg-[rgba(255,0,0,0)] tl:block hidden'></div>
        <div className='tl:w-[56%] w-[100%] h-[6.3vh] min-h-[56px] max-h-[4rem] bg-[rgba(255,255,0,0)]'><FilteringBar clicked={clicked}/></div>
        <div className='tl:w-[22%] w-[0%] bg-[rgba(255,0,255,0)] tl:block hidden'>
          <div className=" w-[100%] h-[100%] flex flex-row justify-start tl:p-2">
            <JoindeGroups/>
          </div>
        </div>
      </div>
      <div style={{bottom: counter+"px"}} className={"fixed w-[100%] h-[100%] bg-ocean bg-repeat-x bg-cover cursor-no-drop translate-y-[90%]"}>
      </div>
    </>
  )
}
