import React, {useState, forwardRef, ForwardedRef, useImperativeHandle, useRef} from "react";
import Image from 'next/image';
import nigditIcon from '../../../assets/testimage.svg'
import bloodDrop from '../../../assets/blooddrop.svg';

type Props = {
}

function Blood({}: Props, ref: ForwardedRef<any>)
{    
   const harvestedSouls = useRef<number[]>([]);    //,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21

    useImperativeHandle(ref, () => ({
        blood : (val: number): void => {
            for (let i =0; i<val; i++)
            {
                if (harvestedSouls.current.length>0)
                    harvestedSouls.current.push(harvestedSouls.current.length+1+Math.ceil(harvestedSouls.current[harvestedSouls.current.length-1]*1.3));
                else
                    harvestedSouls.current.push(666);
                    console.log(harvestedSouls.current[harvestedSouls.current.length-1]%21);
            }
        }
    }))

    return(
        <div className="w-[10vw]">
            {harvestedSouls.current.map((x) => {
                switch (x%21)   //paskudne gówno ${x} nie działa
                {
                    case 1:
                        return (
                            <div key={x} className={`translate-x-[3vw] absolute translate-y-[-142px]`}>   
                                <div className={`animate-droplet5`}>
                                    <Image src={bloodDrop} width={30} height={30} className=""/>
                                </div>
                            </div>                     
                        )
                    case 2:
                        return (
                            <div key={x} className={`translate-x-[8vw] absolute translate-y-[-156px]`}>   
                                <div className={`animate-droplet6`}>
                                    <Image src={bloodDrop} width={30} height={30} className=""/>
                                </div>
                            </div>                     
                        )
                    case 3:
                        return (
                            <div key={x} className={`translate-x-[10vw] absolute translate-y-[-150px]`}>   
                                <div className={`animate-droplet2`}>
                                    <Image src={bloodDrop} width={30} height={30} className=""/>
                                </div>
                            </div>                     
                        )
                    case 4:
                        return (
                            <div key={x} className={`translate-x-[16vw] absolute translate-y-[-135px]`}>   
                                <div className={`animate-droplet9`}>
                                    <Image src={bloodDrop} width={30} height={30} className=""/>
                                </div>
                            </div>                     
                        )
                    case 5:
                        return (
                            <div key={x} className={`translate-x-[19vw] absolute translate-y-[-176px]`}>   
                                <div className={`animate-droplet5`}>
                                    <Image src={bloodDrop} width={30} height={30} className=""/>
                                </div>
                            </div>                     
                        )
                    case 6:
                        return (
                            <div key={x} className={`translate-x-[25vw] absolute translate-y-[-144px]`}>   
                                <div className={`animate-droplet0`}>
                                    <Image src={bloodDrop} width={30} height={30} className=""/>
                                </div>
                            </div>                     
                        )
                    case 7:
                        return (
                            <div key={x} className={`translate-x-[33vw] absolute translate-y-[-165px]`}>   
                                <div className={`animate-droplet8`}>
                                    <Image src={bloodDrop} width={30} height={30} className=""/>
                                </div>
                            </div>                     
                        )
                    case 8:
                        return (
                            <div key={x} className={`translate-x-[40vw] absolute translate-y-[-180px]`}>   
                                <div className={`animate-droplet5`}>
                                    <Image src={bloodDrop} width={30} height={30} className=""/>
                                </div>
                            </div>                     
                        )
                    case 9:
                        return (
                            <div key={x} className={`translate-x-[44vw] absolute translate-y-[-147px]`}>   
                                <div className={`animate-droplet7`}>
                                    <Image src={bloodDrop} width={30} height={30} className=""/>
                                </div>
                            </div>                     
                        )
                    case 10:
                        return (
                            <div key={x} className={`translate-x-[50vw] absolute translate-y-[-153px]`}>   
                                <div className={`animate-droplet3`}>
                                    <Image src={bloodDrop} width={30} height={30} className=""/>
                                </div>
                            </div>                     
                        )
                    case 11:
                        return (
                            <div key={x} className={`translate-x-[56vw] absolute translate-y-[-176px]`}>   
                                <div className={`animate-droplet6`}>
                                    <Image src={bloodDrop} width={30} height={30} className=""/>
                                </div>
                            </div>                     
                        )
                    case 12:
                        return (
                            <div key={x} className={`translate-x-[60vw] absolute translate-y-[-154px]`}>   
                                <div className={`animate-droplet5`}>
                                    <Image src={bloodDrop} width={30} height={30} className=""/>
                                </div>
                            </div>                     
                        )
                    case 13:
                        return (
                            <div key={x} className={`translate-x-[37vw] absolute translate-y-[-148px]`}>   
                                <div className={`animate-droplet0`}>
                                    <Image src={bloodDrop} width={30} height={30} className=""/>
                                </div>
                            </div>                     
                        )
                    case 14:
                        return (
                            <div key={x} className={`translate-x-[14vw] absolute translate-y-[-139px]`}>   
                                <div className={`animate-droplet2`}>
                                    <Image src={bloodDrop} width={30} height={30} className=""/>
                                </div>
                            </div>                     
                        )
                    case 15:
                        return (
                            <div key={x} className={`translate-x-[66vw] absolute translate-y-[-166px]`}>   
                                <div className={`animate-droplet9`}>
                                    <Image src={bloodDrop} width={30} height={30} className=""/>
                                </div>
                            </div>                     
                        )
                    case 16:
                        return (
                            <div key={x} className={`translate-x-[69vw] absolute translate-y-[-161px]`}>   
                                <div className={`animate-droplet3`}>
                                    <Image src={bloodDrop} width={30} height={30} className=""/>
                                </div>
                            </div>                     
                        )
                    case 17:
                        return (
                            <div key={x} className={`translate-x-[75vw] absolute translate-y-[-193px]`}>   
                                <div className={`animate-droplet7`}>
                                    <Image src={bloodDrop} width={30} height={30} className=""/>
                                </div>
                            </div>                     
                        )
                    case 18:
                        return (
                            <div key={x} className={`translate-x-[77vw] absolute translate-y-[-157px]`}>   
                                <div className={`animate-droplet4`}>
                                    <Image src={bloodDrop} width={30} height={30} className=""/>
                                </div>
                            </div>                     
                        )
                    case 19:
                        return (
                            <div key={x} className={`translate-x-[80vw] absolute translate-y-[-180px]`}>   
                                <div className={`animate-droplet8`}>
                                    <Image src={bloodDrop} width={30} height={30} className=""/>
                                </div>
                            </div>                     
                        )
                    case 20:
                        return (
                            <div key={x} className={`translate-x-[85vw] absolute translate-y-[-140px]`}>   
                                <div className={`animate-droplet1`}>
                                    <Image src={bloodDrop} width={30} height={30} className=""/>
                                </div>
                            </div>                     
                        )
                    default:
                        return (
                            <div key={x} className={`translate-x-[89vw] absolute translate-y-[-155px]`}>   
                                <div className={`animate-droplet7`}>
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
//  className={`absolute overflow-hidden translate-x-[${help.current}px] translate-y-[-120px] bg-cover h-[100%] bg-black`}