import React, {useState, useRef, useImperativeHandle, forwardRef } from "react";
import FilterElement from "../../atoms/FilterElement";
import Image from 'next/image';
import nigditIcon from '../../../assets/testimage.svg'

type PostFilters = {
    postTypeSelection: string,
}
type RefHandler = {
    childFunction: (val: string) => void
}

export default function FilteringBar({postTypeSelection} : PostFilters)
{    
    const elementRef1 = useRef() as React.MutableRefObject<RefHandler>;
    const elementRef2 = useRef() as React.MutableRefObject<RefHandler>;
    const elementRef3 = useRef() as React.MutableRefObject<RefHandler>;
    const elementRef4 = useRef() as React.MutableRefObject<RefHandler>;
    const callClearHL = (val: string) => {
        elementRef1.current.childFunction(val);
        elementRef2.current.childFunction(val);
        elementRef3.current.childFunction(val);
        elementRef4.current.childFunction(val);
    }

    return(
        <div className="w-[100%] flex justify-center flex-row items-center">
            <div className="m-2 p-0 w-[60%] ls:w-[40%] min-w-[320px] h-[4.5vh] min-h-[40px] max-h-[3rem] bg-foregroundL dark:bg-foregroundD border-black border-[1px] border-solid rounded-[5px] drop-shadow-minimalistic flex justify-between flex-row items-center">
               <div className="flex justify-between flex-row items-center overflow-hidden h-[100%]">
                <FilterElement name={"Hot"} clearHL={callClearHL} ref={elementRef1}/>
                <FilterElement name={"New"} clearHL={callClearHL} ref={elementRef2}/>
                <FilterElement name={"Top"} clearHL={callClearHL} ref={elementRef3}/>
                <FilterElement name={"Pop"} clearHL={callClearHL} ref={elementRef4}/>
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