import React, {useState} from "react";
import Image from 'next/image';
import nigditIcon from '../../../assets/testimage.svg'
import GroupListElement from "../../atoms/GroupListElement";

type Props = {
    initialVal?: boolean,
}


export default function JoindeGroups({initialVal}: Props)
{    
    const [expanded, setExpanded] = useState<boolean>(initialVal || false);

    return(
        <div className="object-fill w-[95%] max-w-[320px] h-[50vh] ls:h-[45vh] cs:h-[40vh] min-h-[200px] bg-foregroundL dark:bg-foregroundD drop-shadow-midget rounded-[10px] border-black border-[2px] border-solid">
            <div className="w-[100%] h-[100%] flex flex-col object-fill">
                <div className="flex flex-col justify-between items-center h-[15%] min-h-[40px]">
                    <div className="w-[100%] h-[98%] flex flex-col justify-end items-start bg-joinedGroups bg-cover bg-left overflow-hidden object-cover rounded-[10px]">
                        <p className="mx-2 cs:mx-8 shrink-1 text-[15px] ls:text-[18px] cs:text-[20px] cm:text-[22px] font-['Roboto'] dark:text-white">Your Communities</p>
                    </div>
                    <div className="w-[100%] h-[2%] min-h-[1px]">
                        <hr className="h-[1px] border-solid border-[0px] w-[100%] bg-black drop-shadow-lucifer"></hr>
                    </div>  
                </div>
                <div className="w-[100%] h-[70%] overflow-hidden bg-scroll bg-cover scrollbar-thin scrollbar-thumb-[#535353] scrollbar-track-[#2323232a] scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-y-scroll "> 
                    <GroupListElement num={1} name="Science" link="" image={nigditIcon}/>
                    <GroupListElement num={2} name="2110Biotech" link="" image={nigditIcon}/>
                    <GroupListElement num={3} name="Fight4Reich" link="" image={nigditIcon}/>
                    <GroupListElement num={4} name="DankMemes" link="" image={nigditIcon}/>
                    <GroupListElement num={5} name="MakpieGore" link="" image={nigditIcon}/>
                    <GroupListElement num={6} name="TotalAnarchy" link="" image={nigditIcon}/>
                </div>
                <div className="flex flex-col justify-between items-center h-[15%] min-h-[40px]">                    
                    <div className="w-[100%] h-[2%] min-h-[1px]">
                        <hr className="h-[1px] border-solid border-[0px] w-[100%] bg-black"></hr>
                    </div>                   
                    <div className="w-[100%] h-[98%] flex flex-col justify-center items-center p-2">
                        <button className={`w-[100%] h-[100%] min-h-[30px] hover:cursor-pointer text-[18px] font-["Roboto"] text-white duration-[100ms] text-center font-bold hover:drop-shadow-midget border-black border-solid border-[1px] bg-experimentA hover:bg-experimentB rounded-full`}>Expand</button>
                    </div> 
                </div>
            </div>
        </div>
    )
}
{/* <div className={"bg-red-500 w-[100%] " + y}></div>
<div className={"bg-green-500 w-[100%] " + "h-["+test+"px]"}></div>
<div className={`bg-blue-500 w-[100%] h-[${test}px]`}></div>
<div className="bg-yellow-500 w-[100%] h-[25px]"></div> 

<hr className="h-[1px] border-solid border-[0px] w-[100%]" style={{backgroundImage: "linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0))"}}></hr>

*/}
