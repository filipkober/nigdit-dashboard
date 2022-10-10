import React, {useState, forwardRef, ForwardedRef, useImperativeHandle, useRef} from "react";
import Image from 'next/image';
import nigditIcon from '../../../assets/testimage.svg'
import bloodDrop from '../../../assets/blooddrop.svg';

type Props = {
}

function Blood({}: Props, ref: ForwardedRef<any>)
{    
   const harvestedSouls = useRef<number[]>([100,111,124]);

    useImperativeHandle(ref, () => ({
        childFunction : (val: number): void => {
            for (let i =0; i<val; i++)
            {
                harvestedSouls.current.push(harvestedSouls.current.length+1+Math.ceil(harvestedSouls.current[harvestedSouls.current.length-1]*1.5));
                //1 3 8 21 
            }
        }
    }))

    return(
        <div className="w-[100px] h-[100px] z-0">
            {harvestedSouls.current.map((x) => {
                if (x%2 == 1)
                {
                    return (
                        <div key={x} className={`translate-x-[500px]`}>   
                            <div className={`animate-droplet`}>
                                <Image src={bloodDrop} width={30} height={30} className=""/>
                            </div>
                        </div>                     
                    )
                }
                else
                {
                    return (
                        <div key={x} className={`translate-x-[300px]`}>   
                            <div className={`animate-droplet`}>
                                <Image src={bloodDrop} width={30} height={30} className=""/>
                            </div>
                        </div>                     
                    )
                }
            })} 
        </div>
    )
}
export default forwardRef(Blood)

//pierwszy element w returnie po mapie nie może mieć class name
//  (Math.round(Math.random()*500)) z jakiegoś powodu nie działa
//  liczba dziala , odwołanie do zmiennej w returnie nie działa
//  dlaczego??
//  className={`absolute overflow-hidden translate-x-[${help.current}px] translate-y-[-120px] bg-cove h-[100%] bg-black`}