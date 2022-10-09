import { useState } from "react";
import Tab from "../../atoms/Tab";

type tabSelectorProps = {
    selected?: number,
    setSelected?: (index: number) => void,
    onClick?: (index: number) => void,
}

export default function TabSelector({selected = 0, setSelected = () => {}, onClick = () => {}}: tabSelectorProps){

    return(
        <>
                <div className="flex flex-row justify-between h-[5.5vh] min-h-[52px] max-h-[3.2rem] w-[100%] overflow-hidden bg-foregroundL dark:bg-foregroundD border-black border-b-0 border-solid sticky">
                    <Tab title="Posts" onClick={() => {setSelected(0)}} selected={selected === 0} leftmost/>
                    <Tab title="Comments" onClick={() => {setSelected(1)}} selected={selected === 1}/>
                    <Tab title="Subnigdits" onClick={() => {setSelected(2)}} selected={selected === 2}/>
                </div>
        </>
    )
}