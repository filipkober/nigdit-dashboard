import React, {useState} from "react";
import Image from 'next/image';
import nigditIcon from '../../../assets/testimage.svg'

type Props = {
    initialVal?: boolean,
}


export default function JoindeGroups({initialVal}: Props)
{    
    const [expanded, setExpanded] = useState<boolean>(initialVal || false);
    const [test, setTest] = useState<number>(25);
    const y = "h-["+test+"px]";

    return(
        <div className="w-[95%] max-w-[320px] h-[320px] bg-foregroundL dark:bg-foregroundD drop-shadow-midget rounded-[10px] border-black border-[2px] border-solid">
              <div className={"bg-red-500 w-[100%] " + y}></div>
              <div className={"bg-green-500 w-[100%] " + "h-["+test+"px]"}></div>
              <div className={`bg-blue-500 w-[100%] h-[${test}px]`}></div>
              <div className="bg-yellow-500 w-[100%] h-[25px]"></div>
        </div>
    )
}