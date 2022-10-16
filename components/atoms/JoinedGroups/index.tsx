import React, {useState} from "react";
import Image from 'next/image';
import nigditIcon from '../../../assets/testimage.svg'

type Props = {
    initialVal?: boolean,
}


export default function JoindeGroups({initialVal}: Props)
{    
    const [expanded, setExpanded] = useState<boolean>(initialVal || false);

    return(
        <div className="w-[95%] max-w-[320px] h-[40vh] bg-foregroundL dark:bg-foregroundD drop-shadow-midget rounded-[10px] border-black border-[2px] border-solid">
            <div className="w-[100%] h-[100%] flex flex-col justify-center items-center">
                <p className="m-[2px] shrink-1 text-[22px] ls:text-[24px] cs:text-[26px] cm:text-[28px] font-['Roboto'] dark:text-white">Subscriptions</p>
                <hr className="h-[1px] border-solid border-[0px] w-[100%]" style={{backgroundImage: "linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0))"}}></hr>
                <div className="w-[100%] h-[80%]">
                    
                </div>
                <hr className="h-[1px] border-solid border-[0px] w-[100%]" style={{backgroundImage: "linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0))"}}></hr>
                <p className="m-[2px] shrink-1 text-[18px] ls:text-[20px] cs:text-[22px] cm:text-[24px] font-['Roboto'] dark:text-white">Expand</p>
            </div>
        </div>
    )
}
{/* <div className={"bg-red-500 w-[100%] " + y}></div>
<div className={"bg-green-500 w-[100%] " + "h-["+test+"px]"}></div>
<div className={`bg-blue-500 w-[100%] h-[${test}px]`}></div>
<div className="bg-yellow-500 w-[100%] h-[25px]"></div> */}
