import React, {useState, useRef, useImperativeHandle, forwardRef, useEffect } from "react";
import FilterElement from "../../atoms/FilterElement";
import Image from 'next/future/image';
import bloodDrop from '../../../assets/blooddrop.svg';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Blood from "../../atoms/Blood";

type RefHandler = {
    childFunction: (val: string) => void
    blood: (val: number) => void    //🤫
}
type Props = {
    clicked: (cc: number) => void;
}

export default function FilteringBar({clicked}: Props)
{     
    //const [parent] = useAutoAnimate<HTMLDivElement>({duration: 300, easing: 'ease-in-out'});
    const [collection,setCollection] = useState<string>("Everything");
    const clickCount = useRef<number>(0);    
    const bftbg = useRef() as React.MutableRefObject<RefHandler>;

    function swapCollection()
    {
        clickCount.current = clickCount.current+1;
        if (clickCount.current >= 66)
        {
            setCollection("STOP!");
            collection === "STOP!" ? setCollection("Enough!") : setCollection("STOP!");
        }
        else
        {
            collection === "Everything" ? setCollection("Subscribed") : setCollection("Everything");
        }
        if (clickCount.current >= 16) bftbg.current.blood(Math.round(Math.random()*Math.min(clickCount.current-16,19))); 
        clicked(clickCount.current)
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

    return(
        <>       
        <div className="justify-start flex flex-col items-start w-[100%]">
            <div className="flex justify-center flex-row items-center w-[100%]">
                <div className="m-2 p-0 ls:w-[50vw] tl:w-[60vw] tm:w-[70vw] ts:w-[80vw] ml:w-[90vw] w-[100vw] min-w-[320px] h-[4.5vh] min-h-[40px] max-h-[3rem] bg-foregroundL dark:bg-foregroundD border-black border-[2px] border-solid rounded-[5px] drop-shadow-minimalistic flex justify-between flex-row items-center">
                <div className="flex justify-between flex-row items-center overflow-hidden h-[100%]">
                    <FilterElement name={"Hot"} clearHL={callClearHL} initialVal={true} ref={elementRef1}/>
                    <FilterElement name={"New"} clearHL={callClearHL} ref={elementRef2}/>
                    <FilterElement name={"Top"} clearHL={callClearHL} ref={elementRef3}/>
                    <FilterElement name={"Pop"} clearHL={callClearHL} ref={elementRef4}/>
                </div>
                    <div className="h-[100%] ml:mr-1 pt-[3px] px-[2px]">
                        <div className="flex justify-between flex-row items-center h-[80%]">  {/* specjalny przycisk: "użytkownik powinien wiedzieć, że może go kliknąć" */}
                            
                            {clickCount.current > 16 ?
                            (<button onClick={swapCollection} className={`hover:cursor-pointer shrink-1 text-[12px] ts:text-[14px] tm:text-[16px] tl:text-[18px] font-["Roboto"] text-red-700 active:translate-y-0.5 duration-[10ms] shrink-1 text-center font-bold drop-shadow-buttonImp active:drop-shadow-buttonImpA border-black border-solid border-[1px] w-[100%] h-[100%] hover:bg-experimentB bg-experimentA px-2 rounded-[5px]`}>{collection}</button>                                             )
                            : (<button onClick={swapCollection} className={`hover:cursor-pointer shrink-1 text-[12px] ts:text-[14px] tm:text-[16px] tl:text-[18px] font-["Roboto"] dark:text-white active:translate-y-0.5 duration-[10ms] shrink-1 text-center font-bold drop-shadow-buttonImp active:drop-shadow-buttonImpA border-black border-solid border-[1px] w-[100%] h-[100%] hover:bg-experimentB bg-experimentA px-2 rounded-[5px]`}>{collection}</button>                                             )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Blood ref={bftbg}/>
            {clickCount.current > 35 ? (        
            <div className="z-30 fixed flex translate-y-[-18px] tl:translate-x-[-22vw] animate-drip">
                <div className="z-30 fixed w-[100vw] h-[85px] bg-bloodDrip bg-repeat-x bg-contain cursor-no-drop"></div> 
            </div> 
            ) : (        
            <div></div>
            )}  
        </div>
        </>
    )
}


        // if (clickCount.current == 25)
        // {
        //     window.setInterval(() => {
        //         bftbg.current.blood(4);
        //     }, 700);  
        // }