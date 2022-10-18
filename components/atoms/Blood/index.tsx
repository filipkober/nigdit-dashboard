import React, {useState, forwardRef, ForwardedRef, useImperativeHandle, useRef} from "react";
import Image from 'next/image';
import bloodDrop from '../../../assets/blooddrop.svg';

type Props = {
}

type rak = {
    id: number,
    value: number,
}

function Blood({}: Props, ref: ForwardedRef<any>)
{    
   const [harvestedSouls, setHS] = useState<number[]>([]); // desperacja

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
        <div className="fixed">
            {harvestedSouls.map((x,index) => {
                const y = (x%99)-22;
                console.log("added: "+x+" "+index+" "+y+" "+(x%10));
                return (
                    <div key={index}> 
                    <div className="fixed" style={{transform: 'translate('+y+'vw, '+(-130-(x%66))+'px)'}}>
                        <div className={`animate-droplet${(x%10)}`}>
                            <Image src={bloodDrop} width={30} height={30} className="fixed"/>
                        </div>
                    </div>  
                    </div>                   
                )
            })} 
        </div>
    )
}
export default forwardRef(Blood)
