import React, {useState, useRef, useImperativeHandle, forwardRef, useEffect } from "react";
import FilteringBar from "../../molecules/FilteringBar";
import JoindeGroups from "../../molecules/JoinedGroups";
import PostMedia from "../../molecules/PostMedia";
import PostText from "../../molecules/PostText";
import makpaj from '../../../assets/makpaj.svg'

export default function DashboardFeed() 
{
  const [counter, setCounter] = useState<number>(0);
  function clicked(cc: number)
  {
    setCounter(cc*2)    
    console.log(counter/2)
  }
  const desc = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat
        Duis aute irure dolor in reprehenderit in voluptate ...
        Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat
        Duis aute irure dolor in reprehenderit in voluptate
  `;  //temp

  return (
    <>
      <div className="flex flex-row justify-between w-[100%]">
        <div className='tl:w-[22%] w-[0%] h-[6.3vh] min-h-[56px] max-h-[4rem] bg-[rgba(255,0,0,0)] tl:block hidden'></div>
        <div className='tl:w-[56%] w-[100%] h-[6.3vh] min-h-[56px] max-h-[4rem] bg-[rgba(255,255,0,0)]'>
          <div className="flex flex-col items-center">
            <div className="ls:w-[50vw] tl:w-[56vw] tm:w-[70vw] ts:w-[80vw] ml:w-[90vw] w-[100vw] min-w-[320px]">
              <FilteringBar clicked={clicked}/>
              {/* tu będzie map */}
              <PostMedia title="gif post" media={{type: "gif", source: "https://c.tenor.com/hVm01utkmM8AAAAd/maciek-sze%C5%9Bcia%C5%84czyk-maciasek05.gif"}} author="makpaj" date={new Date('2000-09-23')} source={{name: 'n/subnigdit', image:makpaj}} votes={-1500} />
              <PostText title="post" description={desc} author="user" date={new Date('2022-09-23')} source={{name: 'n/subnigdit', image:makpaj}} votes={1500}/>
              <PostMedia title="gif post" media={{type: "video", source: "https://www.w3schools.com/html/mov_bbb.mp4"}} author="makpaj" date={new Date('2000-09-23')} source={{name: 'n/subnigdit', image:makpaj}} votes={-1500} />
            </div>
          </div>       
        </div>
        <div className='tl:w-[22%] w-[0%] bg-[rgba(255,0,255,0)] tl:block hidden'>
          <div className="w-[100%] h-[100%] flex flex-row justify-start tl:p-2">
            <JoindeGroups/>            
          </div>
        </div>
      </div>
      {counter > 16 ? (        
          <div style={{bottom: counter+"px"}} className={"fixed w-[100%] h-[100%] bg-ocean bg-repeat-x bg-cover cursor-no-drop translate-y-[90%]"}>
          </div>
        ) : (        
          <div></div>
        )}  

    </>
  )
}
