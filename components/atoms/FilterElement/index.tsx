import React, {useState, forwardRef, ForwardedRef, useImperativeHandle, useRef} from "react";
import Image from 'next/image';
import nigditIcon from '../../../assets/testimage.svg'

type Props = {
    name: string,
    clearHL: (val: string) => void,
    initialVal?: boolean,
}

function FilterElement({name, clearHL, initialVal}: Props, ref: ForwardedRef<any>)
{    
    const [currentState, setCurrentState] = useState<boolean>(initialVal || false);
    const aDefClass = "rounded-[10px] hover:cursor-pointer h-[100%] w-[100%] flex justify-between flex-row items-center p-1 duration-[300ms] ";

    useImperativeHandle(ref, () => ({
        childFunction : (val: string): void => {
            val == name ? setCurrentState(true) : setCurrentState(false)    //true -> !currentState - aby dało się odkliknąć
        }
    }))
    return(
        <div className="min-h-[2.4rem] h-[10vw] max-h-[100%] w-[20vw] max-w-[5.1rem] px-[1px] py-1">
            <a onClick={() => {clearHL(name)}} className={currentState ? (`bg-white dark:bg-experimentB ${aDefClass}`) : (`bg-white hover:dark:bg-experimentA dark:bg-foregroundD ${aDefClass}`)}>
                <Image src={nigditIcon} width={26} height={26} className="object-cover overflow-hidden p-0 w-[100%] h-[100%] rounded-full"/>
                <p className="shrink-1 text-[12px] ms:text-[14px] mm:text-[16px] ml:text-[18px] font-['Roboto'] dark:text-white">{name}</p>
                <div></div>
            </a>
        </div>
    )
}
export default forwardRef(FilterElement)