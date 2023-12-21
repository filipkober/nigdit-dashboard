import Image from 'next/image';
import { ForwardedRef, forwardRef, useImperativeHandle, useState } from "react";

type Props = {
    name: string,
    clearHL: (val: string) => void,
    initialVal?: boolean,
    changeAlg: (val: string) => void,
    svgIcon: string
}

function FilterElement({name, clearHL, initialVal, changeAlg, svgIcon}: Props, ref: ForwardedRef<any>)
{
    const [currentState, setCurrentState] = useState<boolean>(initialVal || false);
    const aDefClass = "rounded-[10px] hover:cursor-pointer h-[100%] w-[100%] flex justify-between flex-row items-center p-1 duration-[300ms] ";

    useImperativeHandle(ref, () => ({
        childFunction : (val: string): void => {
            val == name ? setCurrentState(true) : setCurrentState(false)
        }
    }))
    return(
        <div className="min-h-[2.4rem] h-[10vw] max-h-[100%] w-[20vw] max-w-[5.1rem] px-[1px] py-1">
            <div onClick={() => {changeAlg(name),clearHL(name)}} className={currentState ? (`bg-white dark:bg-experimentB ${aDefClass}`) : (`bg-white hover:dark:bg-experimentA dark:bg-foregroundD ${aDefClass}`)}>
                <Image src={svgIcon} width={64} height={64} className="w-[26px] h-[26px] object-cover overflow-hidden p-0 rounded-full" alt={""}/>
                <p className="shrink-1 text-[12px] ms:text-[14px] mm:text-[16px] ml:text-[18px] font-['Roboto'] dark:text-white">{name}</p>
                <div></div>
            </div>
        </div>
    )
}
export default forwardRef(FilterElement)