import React, {useState} from "react";
import Image from 'next/future/image';
import nigditIcon from '../../../assets/testimage.svg'

type Props = {
    num: number,
    name: string,
    link: string,
    image: string,
}


export default function GroupListElement({num, name, link, image}: Props)
{    

    return(
        <a href={link} className={num%2 ==1 ? ("hover:cursor-pointer overflow-hidden w-[100%] h-[3vw] flex flex-row hover:bg-experimentB bg-foregroundD") : ("overflow-hidden w-[100%] h-[3vw] flex flex-row hover:bg-experimentB bg-experimentC")}>
            <div className="flex flex-row justify-center items-center w-[15%] overflow-hidden">
                <p className="text-[16px] ls:text-[18px] cs:text-[20px] cm:text-[22px]">{num}.</p>
            </div>
            <div className="flex flex-row justify-center items-center w-[3vw] overflow-hidden">
                <Image src={image} width={25} height={25} className="rounded-full overflow-hidden object-cover w-[100%] h-[100%] p-[4px] ls:p-[4px] cs:p-[6px] cm:p-[10px]"/>
            </div>
            <div className="flex flex-row justify-start items-center p-1 overflow-hidden">
                <p className="font-bold text-[12px] ls:text-[14px] cs:text-[16px] cm:text-[20px] overflow-hidden">r/{name}</p>
            </div>
        </a>
    )
}