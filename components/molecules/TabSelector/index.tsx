import { useState } from "react";
import Tab from "../../atoms/Tab";

type tabSelectorProps = {
    selected?: number,
    setSelected?: (index: number) => void,
    onClick?: (index: number) => void,
    tabs: string[],
}

export default function TabSelector({selected = 0, tabs, setSelected = () => {}, onClick = () => {}}: tabSelectorProps){
    
    return(
        <>
            <div className="flex flex-row justify-between h-[5.5vh] min-h-[52px] max-h-[3.2rem] w-[100%] overflow-hidden bg-foregroundL dark:bg-foregroundD border-black border-b-0 border-solid sticky">
                {tabs.map((tab, index) => {
                    const leftmost = index === 0;
                    return(
                        <Tab key={index} selected={selected === index} onClick={() => {setSelected(index); onClick(index)}} leftmost={leftmost} title={tab}/>
                    )
                })}
            </div>
        </>
    )
}