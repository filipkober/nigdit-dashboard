import React, {useState, useRef, useImperativeHandle, forwardRef } from "react";
import FilterElement from "../../atoms/FilterElement";
import Image from 'next/image';
import nigditIcon from '../../../assets/testimage.svg';
import { useAutoAnimate } from '@formkit/auto-animate/react';

type PostFilters = {
    postTypeSelection: string,
}
type RefHandler = {
    childFunction: (val: string) => void
}

export default function FilteringBar({postTypeSelection} : PostFilters)
{   
    const [parent] = useAutoAnimate<HTMLDivElement>({duration: 300, easing: 'ease-in-out'});
    const [collection,setCollection] = useState<string>("Everything");
    function swapCollection()
    {
        collection === "Everything" ? setCollection("Subscribed") : setCollection("Everything");
        setHarvestedSouls(harvestedSouls+1)
    }

    const elementRef1 = useRef() as React.MutableRefObject<RefHandler>; //nie mogłem odwołać wszystkiego do 1 elementu
    const elementRef2 = useRef() as React.MutableRefObject<RefHandler>;
    const elementRef3 = useRef() as React.MutableRefObject<RefHandler>;
    const elementRef4 = useRef() as React.MutableRefObject<RefHandler>;
    const callClearHL = (val: string) => {
        elementRef1.current.childFunction(val);
        elementRef2.current.childFunction(val);
        elementRef3.current.childFunction(val);
        elementRef4.current.childFunction(val);
    }
    const [harvestedSouls,setHarvestedSouls] = useState<number>(0);

    return(
        <div className="w-[100%] flex justify-center flex-row items-center">
            <div className="m-2 p-0 ls:w-[50%] tl:w-[60%] tm:w-[70%] ts:w-[80%] ml:w-[90%] w-[100%] min-w-[320px] h-[4.5vh] min-h-[40px] max-h-[3rem] bg-foregroundL dark:bg-foregroundD border-black border-[1px] border-solid rounded-[5px] drop-shadow-minimalistic flex justify-between flex-row items-center">
               <div className="flex justify-between flex-row items-center overflow-hidden h-[100%]">
                <FilterElement name={"Hot"} clearHL={callClearHL} initialVal={true} ref={elementRef1}/>
                <FilterElement name={"New"} clearHL={callClearHL} ref={elementRef2}/>
                <FilterElement name={"Top"} clearHL={callClearHL} ref={elementRef3}/>
                <FilterElement name={"Pop"} clearHL={callClearHL} ref={elementRef4}/>
               </div>
                <div className="h-[100%] ml:mr-1 pt-[3px] px-[2px]">
                    <div className="flex justify-between flex-row items-center h-[80%]">  {/* specjalny przycisk: "użytkownik powinien wiedzieć, że może go kliknąć" */}
                        <button onClick={swapCollection} className='hover:cursor-pointer shrink-1 text-[12px] ts:text-[14px] tm:text-[16px] tl:text-[18px] font-["Roboto"] dark:text-white active:translate-y-0.5 duration-[10ms] shrink-1 text-white text-center font-bold drop-shadow-buttonImp active:drop-shadow-buttonImpA border-black border-solid border-[1px] w-[100%] h-[100%] hover:bg-experimentB bg-experimentA px-2 rounded-[5px]'>{collection}</button>                                             
                    </div>
                </div>
            </div>
            <div ref={parent}>
                {harvestedSouls % 2 == 0 ? <p>{harvestedSouls/2}</p> : ""}
            </div>
        </div>
    )
}
//dodaj on clicka 

//<Image src={nigditIcon} width={50} height={28} className="object-cover overflow-hidden w-[100%] h-[100%]"/>
// <div ref={parent}>
//  {collection === "Subscribed" ? <p>{collection}</p> : ""}
// </div>