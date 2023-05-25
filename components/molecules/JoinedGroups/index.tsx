import React, {useState} from "react";
import Image from 'next/image';
import nigditIcon from '../../../assets/testimage.svg'
import GroupListElement from "../../atoms/GroupListElement";

type Props = {

}

type GroupListEl = {
    name: string,
    adress: string,
    image: string,
}


export default function JoindeGroups({}: Props)
{    
    const [expanded, setExpanded] = useState<boolean>(true);
    const [h, seth] = useState<string>("28vh");
    const [expandButtonText, setExpandButtonText] = useState<string>("Expand");

    const subnigdits = [{name: "Fight44Reich",adress:"",image:nigditIcon},
    {name: "Churchofsatan",adress:"",image:nigditIcon},
    {name: "2110Biotech",adress:"",image:nigditIcon},
    {name: "DankMemes",adress:"",image:nigditIcon},
    {name: "TotalAnarchy",adress:"",image:nigditIcon},
    {name: "Science",adress:"",image:nigditIcon},
    {name: "12charactersmaxpls",adress:"",image:nigditIcon},
    {name: "gorre",adress:"https://kekma.net/",image:nigditIcon}]

    function expand()
    {
        setExpanded(!expanded)
        console.log("changed expansion of list of groups: "+expanded)
        if(expanded == true)
        {
            seth((subnigdits.length*3).toString()+"vw")
            setExpandButtonText("Collapse")            
        }
        else
        {
            seth("28vh")
            setExpandButtonText("Expand")
        }
    }

    return(
        <div className={"object-fill w-[100%] ls:w-[80%] bg-foregroundL dark:bg-foregroundD drop-shadow-midget rounded-[10px] border-black border-[2px] border-solid"}>
            <div className="w-[100%] h-[100%] flex flex-col object-fill justify-between">
                <div className="flex flex-col justify-between items-center h-[3vw]">
                    <div className="w-[100%] h-[98%] flex flex-col justify-end items-center bg-joinedGroups bg-cover bg-left overflow-hidden object-cover rounded-[10px]">
                        <p className=" shrink-1 text-[1.3vw] font-['Roboto'] dark:text-white">Your Communities</p>
                    </div>
                    <div className="w-[100%] h-[2%] min-h-[1px]">
                        <hr className="h-[1px] border-solid border-[0px] w-[100%] bg-black drop-shadow-lucifer"></hr>
                    </div>  
                </div>
                <div style={{height: h}} className={"w-[100%] overflow-hidden bg-scroll bg-cover scrollbar-thin scrollbar-thumb-[#535353] scrollbar-track-[#2323232a] scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-y-scroll "}> 
                    {subnigdits.map((x,index) =>{
                        return(
                            <GroupListElement key={index} num={index+1} name={x.name} link={x.adress} image={x.image}/>
                        )
                    })}
                </div>
                <div className="flex flex-col justify-between items-center h-[3vw]">                    
                    <div className="w-[100%] h-[2%] min-h-[1px]">
                        <hr className="h-[1px] border-solid border-[0px] w-[100%] bg-black"></hr>
                    </div>                   
                    <div className="w-[100%] h-[98%] flex flex-col justify-center items-center p-[2.5%]">
                        <button onClick={expand} className={`w-[100%] h-[100%] hover:cursor-pointer text-[1.2vw] font-["Roboto"] text-white duration-[100ms] text-center hover:drop-shadow-midget border-black border-solid border-[1px] bg-experimentA hover:bg-experimentB rounded-[10px]`}>{expandButtonText}</button>
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
