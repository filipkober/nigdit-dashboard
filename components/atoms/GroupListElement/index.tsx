import React, {useState} from "react";
import Image from 'next/image';
import nigditIcon from '../../../assets/testimage.svg'
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type Props = {
    num: number,
    name: string,
    link: string,
    image: string,
    last?: boolean,
}


export default function GroupListElement({num, name, link, image, last = false}: Props)
{    
    const classes = twMerge(
        "hover:cursor-pointer overflow-hidden w-[100%] h-[3vw] flex flex-row hover:bg-experimentB bg-foregroundD",
        num % 2 == 1 ? "bg-experimentC" : "bg-foregroundD",
        last ? "rounded-b-[10px]" : ""
    )

    return(
        <Link href={link} className={classes}>
            <div className="flex flex-row justify-center items-center w-[15%] overflow-hidden">
                <p className="text-[16px] ls:text-[18px] cs:text-[20px] cm:text-[22px]">{num}.</p>
            </div>
            <div className="flex flex-row justify-center items-center w-[3vw] overflow-hidden">
                <Image src={image} width={25} height={25} className="rounded-full overflow-hidden object-cover w-[100%] h-[100%] p-[4px] ls:p-[4px] cs:p-[6px] cm:p-[10px]" alt={""}/>
            </div>
            <div className="flex flex-row justify-start items-center p-1 overflow-hidden">
                <p className="font-bold text-[12px] ls:text-[14px] cs:text-[16px] cm:text-[20px] overflow-hidden">n/{name}</p>
            </div>
        </Link>
    )
}