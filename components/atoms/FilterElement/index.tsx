import React, {useState} from "react";
import Image from 'next/image';
import nigditIcon from '../../../assets/testimage.svg'


type Props = {
    name: string,
    clearHL: () => void //dokończ
}

export default function FilterElement({name, clearHL}: Props) 
{
    const [zmienna, setZmienna] = useState<boolean>(false);

    return(
        <div className="min-h-[2.4rem] h-[10vw] max-h-[100%] w-[20vw] max-w-[5.4rem] p-1">
            <a onClick={() => {clearHL(), setZmienna(zmienna ? false : true)}} className={zmienna ? ("bg-foregroundL dark:bg-[#3c3c3c] rounded-[10px] hover:cursor-pointer h-[100%] w-[100%] flex justify-between flex-row items-center p-1") : ("bg-foregroundL dark:bg-foregroundD rounded-[10px] hover:cursor-pointer h-[100%] w-[100%] flex justify-between flex-row items-center p-1")}> {/*to boli, ale nie znam łatwiejszego rozwiązania*/}
                <Image src={nigditIcon} width={26} height={26} className="object-cover overflow-hidden p-0 w-[100%] h-[100%] rounded-full"/>
                <p className="shrink-1 text-[12px] ts:text-[14px] tm:text-[16px] tl:text-[18px] font-['Roboto'] dark:text-white">{name}</p>
                <div></div>
            </a>
        </div>
    )

}