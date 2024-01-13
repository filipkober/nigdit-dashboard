import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { UserState } from "../../../store/userSlice";
import Blood from "../../atoms/Blood";
import FilterElement from "../../atoms/FilterElement";

type RefHandler = {
    childFunction: (val: string) => void
    blood: (val: number) => void    //🤫
}
type Props = {
    clicked: (cc: number) => void;
    changeAlg: (n: string) => void;
    showSubscribed: boolean;
}

export default function FilteringBar({clicked, changeAlg, showSubscribed}: Props)
{
    const [isLogged, setLogged] = useState(false);
    const username = useSelector((state: UserState) => state.user.username)
    useEffect( () => {
        setLogged(!!username)
      },[]);

    const [collection,setCollection] = useState<string>("Everything");
    const clickCount = useRef<number>(0);
    const bftbg = useRef() as React.MutableRefObject<RefHandler>;

    function swapCollection()
    {
        clickCount.current = clickCount.current+1;
        if (clickCount.current >= 66 && showSubscribed == true)
        {
            setCollection("STOP!");
            collection === "STOP!" ? setCollection("Enough!") : setCollection("STOP!");
        }
        else
        {
            if(collection === "Everything" && isLogged)
            {
                if(showSubscribed)
                {
                    setCollection("Subscribed")
                }
                else
                {
                    setCollection("My Posts")
                }
            }
            else
                setCollection("Everything");
        }
        if (clickCount.current >= 16 && showSubscribed == true)
        {
            console.log("blood spawning")
            bftbg.current.blood(Math.round(Math.random()*Math.min(clickCount.current-16,19)));
        }
        clicked(clickCount.current)
    }

    const elementRef1 = useRef() as React.MutableRefObject<RefHandler>;
    const elementRef2 = useRef() as React.MutableRefObject<RefHandler>;
    const elementRef3 = useRef() as React.MutableRefObject<RefHandler>;
    const callClearHL = (val: string) => {
        elementRef1.current.childFunction(val);
        elementRef2.current.childFunction(val);
        elementRef3.current.childFunction(val);
    }

    return(
        <>
        <div className="justify-start flex flex-col items-start w-[100%]">
            <div className="flex justify-center flex-row items-center w-[100%]">
                <div className="mt-2 p-0 w-[100%] h-[4.5vh] min-h-[40px] max-h-[3rem] bg-foregroundL dark:bg-foregroundD border-black border-[2px] border-solid rounded-[5px] drop-shadow-minimalistic flex justify-between flex-row items-center">
                    <div className="flex justify-between flex-row items-center overflow-hidden h-[100%] pl-1">
                        <FilterElement name={"Hot"} clearHL={callClearHL} changeAlg={changeAlg} svgIcon="/feed/fire.png" initialVal={true} ref={elementRef1}/>
                        <FilterElement name={"New"} clearHL={callClearHL} changeAlg={changeAlg} svgIcon="/feed/lightbulb.png" ref={elementRef2}/>
                        <FilterElement name={"Top"} clearHL={callClearHL} changeAlg={changeAlg} svgIcon="/feed/crown.png" ref={elementRef3}/>
                    </div>
                    <div className="h-[100%] ml:mr-1 pt-[3px] px-[2px]">
                        <div className="flex justify-between flex-row items-center h-[80%]">
                            
                            {clickCount.current > 16 && showSubscribed == true ?
                            (<button onClick={swapCollection} className={`hover:cursor-pointer shrink-1 text-[12px] ts:text-[14px] tm:text-[16px] tl:text-[18px] font-["Roboto"] text-red-700 active:translate-y-0.5 duration-[10ms] shrink-1 text-center font-bold drop-shadow-buttonImp active:drop-shadow-buttonImpA border-black border-solid border-[1px] w-[100%] h-[100%] hover:bg-experimentB bg-experimentA px-2 rounded-[5px]`}>{collection}</button>                                             )
                            : (<button onClick={swapCollection} className={`hover:cursor-pointer shrink-1 text-[12px] ts:text-[14px] tm:text-[16px] tl:text-[18px] font-["Roboto"] dark:text-white active:translate-y-0.5 duration-[10ms] shrink-1 text-center font-bold drop-shadow-buttonImp active:drop-shadow-buttonImpA border-black border-solid border-[1px] w-[100%] h-[100%] hover:bg-experimentB bg-experimentA px-2 rounded-[5px]`}>{collection}</button>                                             )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Blood ref={bftbg}/>
            {clickCount.current > 35 && showSubscribed == true ? (
            <div className="z-30 fixed flex translate-y-[-18px] animate-drip tl:translate-x-[-25.2vw] tm:translate-x-[-16vw] ts:translate-x-[-11vw] ml:translate-x-[-6vw] translate-x-[-2vw]">
                <div className="z-30 fixed w-[100vw] h-[85px] bg-bloodDrip bg-repeat-x bg-contain cursor-no-drop"></div>
            </div>
            ) : (
            <div></div>
            )}
        </div>
        </>
    )
}
