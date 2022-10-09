import { useAutoAnimate } from "@formkit/auto-animate/react";

type tabProps = {
    title: string,
    onClick: () => void,
    selected?: boolean,
    leftmost?: boolean,
}


export default function Tab({title, onClick, selected = false, leftmost = false}: tabProps){
    const selectedClass = selected ? "border-b-2" : "";
    return(
        <div className={`${!leftmost && "border-l-2"} border-black flex-grow`}>
        <div className={`h-full ${selectedClass} hover:border-b-2 border-white duration-100 ease-in-out`}>
            <button onClick={onClick} className={`text-black dark:text-white text-2xl ts:text-3xl font-bold w-full self-center my-auto h-full`}>{title}</button>
        </div>
        </div>
    )
}