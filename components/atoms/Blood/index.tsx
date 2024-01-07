import Image from 'next/image';
import { ForwardedRef, forwardRef, useImperativeHandle, useState } from "react";

type Props = {
}

type rak = {
    id: number,
    value: number,
}

function Blood({}: Props, ref: ForwardedRef<any>)
{
   const [harvestedSouls, setHS] = useState<number[]>([]);

    useImperativeHandle(ref, () => ({
        blood : (val: number): void => {
            for (let i =0; i<val; i++)
            {
                if (harvestedSouls.length>0)
                {
                    harvestedSouls.push(Math.round(harvestedSouls.length+harvestedSouls[harvestedSouls.length-1]*(1+(1/harvestedSouls.length))));
                }
                else
                {
                    harvestedSouls.push(666);
                    console.log("hs length: "+harvestedSouls.length);
                }
            }
        }
    }))

    return(
        <div className="fixed z-50">
            {harvestedSouls.map((x,index) => {
                const y = (x%99)-22;
                const z = x%2;
                console.log("added: "+x+" "+index+" "+y+" "+z);
                return (
                    <div key={index}>
                        <div className="h-[30px] w-[30px] fixed" style={{transform: 'translate('+y+'vw, '+(-130-(x%166))+'px)'}}>
                            {z == 1 ? (
                            <div className={"animate-droplet6"}><Image src={'/easterEgg1/blooddrop.svg'} width={128} height={128} className="fixed" alt={""}/></div>
                            ) : (
                            <div className={"animate-droplet2"}><Image src={'/easterEgg1/blooddrop.svg'} width={128} height={128} className="fixed" alt={""}/></div>
                            )}  {/* ( ͡° ͜ʖ ͡°) */}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default forwardRef(Blood)
