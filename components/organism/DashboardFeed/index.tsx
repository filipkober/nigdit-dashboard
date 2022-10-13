import React, {useState, useRef, useImperativeHandle, forwardRef, useEffect } from "react";
import FilterElement from "../../atoms/FilterElement";
import Image from 'next/future/image';
import bloodDrop from '../../../assets/blooddrop.svg';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import FilteringBar from "../../molecules/FilteringBar";

export default function DashboardFeed() 
{
  //przenieś do nowego komponentu joinedBar

  return (
    <>
      <div className="flex flex-row justify-between w-[100%]">
        <div className='tl:w-[22%] w-[0%] h-[6.3vh] min-h-[56px] max-h-[4rem] bg-[rgba(255,0,0,0)] tl:block hidden'></div>
        <div className='tl:w-[56%] w-[100%] h-[6.3vh] min-h-[56px] max-h-[4rem] bg-[rgba(255,255,0,0)]'><FilteringBar/></div>
        <div className='tl:w-[22%] w-[0%] h-[250px] bg-[rgba(255,0,255,0)] tl:block hidden'>
          <div className=" w-[100%] h-[100%] flex flex-row justify-start tl:p-2">
            <div className="w-[95%] max-w-[320px] h-[100%] bg-foregroundL dark:bg-foregroundD drop-shadow-midget rounded-[10px] border-black border-[2px] border-solid">
              
            </div>
          </div>
        </div>
      </div> 
    </>
  )
}

