import React, {useState} from "react";
import FilterElement from "../../atoms/FilterElement";
import Image from 'next/image';
import nigditIcon from '../../../assets/testimage.svg'

type PostFilters = {
    postTypeSelection: string,
}

export default function FilteringBar({postTypeSelection} : PostFilters)
{
    const clearHL = () => {

    }

    return(
        <div className="w-[100%] flex justify-center flex-row items-center">
            <div className="m-2 p-0 w-[60%] ls:w-[40%] min-w-[320px] h-[4.5vh] min-h-[40px] max-h-[3rem] bg-foregroundL dark:bg-foregroundD border-black border-[1px] border-solid rounded-[5px] drop-shadow-minimalistic flex justify-between flex-row items-center">
               <div className="flex justify-between flex-row items-center overflow-hidden h-[100%]">
                <FilterElement name={"Hot"} clearHL={clearHL}/>
                <FilterElement name={"New"} clearHL={clearHL}/>
                <FilterElement name={"Top"} clearHL={clearHL}/>
                <FilterElement name={"Pop"} clearHL={clearHL}/>
               </div>
                <div className="h-[100%] mr-1">
                    <div className="rounded-[10px] hover:cursor-pointer h-[100%] w-[100%] flex justify-between flex-row items-center p-1">
                        <Image src={nigditIcon} width={50} height={28} className="object-cover overflow-hidden w-[100%] h-[100%]"/>
                    </div>
                </div>
            </div>
        </div>
    )
}