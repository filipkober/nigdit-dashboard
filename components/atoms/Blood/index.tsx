import React, {useState, forwardRef, ForwardedRef, useImperativeHandle, useRef} from "react";
import Image from 'next/image';
import bloodDrop from '../../../assets/blooddrop.svg';

type Props = {
}

function Blood({}: Props, ref: ForwardedRef<any>)
{    
   const [harvestedSouls] = useState<number[]>([]); //,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21

    useImperativeHandle(ref, () => ({
        blood : (val: number): void => {
            console.log("działa "+val)
            for (let i =0; i<val; i++)
            {                
                if (harvestedSouls.length>0)
                {
                    harvestedSouls.push(harvestedSouls.length+1+Math.ceil(harvestedSouls[harvestedSouls.length-1]*1.3));
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
            {harvestedSouls.map((x) => {
                switch (x%21)   //Mmmmm ${x} działa idealnie
                {
                    case 1:
                        return (
                            <div key={x} className={`translate-x-[3vw] fixed translate-y-[-122px]`}>   
                                <div className={`animate-droplet5`}>
                                    <Image src={bloodDrop} width={30} height={30} className="fixed"/>
                                </div>
                            </div>                     
                        )
                    case 2:
                        return (
                            <div key={x} className={`translate-x-[8vw] fixed translate-y-[-136px]`}>   
                                <div className={`animate-droplet6`}>
                                    <Image src={bloodDrop} width={30} height={30} className="fixed"/>
                                </div>
                            </div>                     
                        )
                    case 3:
                        return (
                            <div key={x} className={`translate-x-[10vw] fixed translate-y-[-130px]`}>   
                                <div className={`animate-droplet2`}>
                                    <Image src={bloodDrop} width={30} height={30} className="fixed"/>
                                </div>
                            </div>                     
                        )
                    case 4:
                        return (
                            <div key={x} className={`translate-x-[16vw] fixed translate-y-[-115px]`}>   
                                <div className={`animate-droplet9`}>
                                    <Image src={bloodDrop} width={30} height={30} className="fixed"/>
                                </div>
                            </div>                     
                        )
                    case 5:
                        return (
                            <div key={x} className={`translate-x-[19vw] fixed translate-y-[-156px]`}>   
                                <div className={`animate-droplet5`}>
                                    <Image src={bloodDrop} width={30} height={30} className="fixed"/>
                                </div>
                            </div>                     
                        )
                    case 6:
                        return (
                            <div key={x} className={`translate-x-[25vw] fixed translate-y-[-124px]`}>   
                                <div className={`animate-droplet0`}>
                                    <Image src={bloodDrop} width={30} height={30} className="fixed"/>
                                </div>
                            </div>                     
                        )
                    case 7:
                        return (
                            <div key={x} className={`translate-x-[33vw] fixed translate-y-[-145px]`}>   
                                <div className={`animate-droplet8`}>
                                    <Image src={bloodDrop} width={30} height={30} className="fixed"/>
                                </div>
                            </div>                     
                        )
                    case 8:
                        return (
                            <div key={x} className={`translate-x-[40vw] fixed translate-y-[-160px]`}>   
                                <div className={`animate-droplet5`}>
                                    <Image src={bloodDrop} width={30} height={30} className="fixed"/>
                                </div>
                            </div>                     
                        )
                    case 9:
                        return (
                            <div key={x} className={`translate-x-[44vw] fixed translate-y-[-127px]`}>   
                                <div className={`animate-droplet7`}>
                                    <Image src={bloodDrop} width={30} height={30} className="fixed"/>
                                </div>
                            </div>                     
                        )
                    case 10:
                        return (
                            <div key={x} className={`translate-x-[50vw] fixed translate-y-[-133px]`}>   
                                <div className={`animate-droplet3`}>
                                    <Image src={bloodDrop} width={30} height={30} className="fixed"/>
                                </div>
                            </div>                     
                        )
                    case 11:
                        return (
                            <div key={x} className={`translate-x-[56vw] fixed translate-y-[-156px]`}>   
                                <div className={`animate-droplet6`}>
                                    <Image src={bloodDrop} width={30} height={30} className="fixed"/>
                                </div>
                            </div>                     
                        )
                    case 12:
                        return (
                            <div key={x} className={`translate-x-[60vw] fixed translate-y-[-134px]`}>   
                                <div className={`animate-droplet5`}>
                                    <Image src={bloodDrop} width={30} height={30} className="fixed"/>
                                </div>
                            </div>                     
                        )
                    case 13:
                        return (
                            <div key={x} className={`translate-x-[37vw] fixed translate-y-[-128px]`}>   
                                <div className={`animate-droplet0`}>
                                    <Image src={bloodDrop} width={30} height={30} className="fixed"/>
                                </div>
                            </div>                     
                        )
                    case 14:
                        return (
                            <div key={x} className={`translate-x-[14vw] fixed translate-y-[-119px]`}>   
                                <div className={`animate-droplet2`}>
                                    <Image src={bloodDrop} width={30} height={30} className="fixed"/>
                                </div>
                            </div>                     
                        )
                    case 15:
                        return (
                            <div key={x} className={`translate-x-[66vw] fixed translate-y-[-146px]`}>   
                                <div className={`animate-droplet9`}>
                                    <Image src={bloodDrop} width={30} height={30} className="fixed"/>
                                </div>
                            </div>                     
                        )
                    case 16:
                        return (
                            <div key={x} className={`translate-x-[69vw] fixed translate-y-[-141px]`}>   
                                <div className={`animate-droplet3`}>
                                    <Image src={bloodDrop} width={30} height={30} className="fixed"/>
                                </div>
                            </div>                     
                        )
                    case 17:
                        return (
                            <div key={x} className={`translate-x-[85vw] fixed translate-y-[-173px]`}>   
                                <div className={`animate-droplet7`}>
                                    <Image src={bloodDrop} width={30} height={30} className="fixed"/>
                                </div>
                            </div>                     
                        )
                    case 18:
                        return (
                            <div key={x} className={`translate-x-[77vw] fixed translate-y-[-137px]`}>   
                                <div className={`animate-droplet4`}>
                                    <Image src={bloodDrop} width={30} height={30} className="fixed"/>
                                </div>
                            </div>                     
                        )
                    case 19:
                        return (
                            <div key={x} className={`translate-x-[-8vw] fixed translate-y-[-160px]`}>   
                                <div className={`animate-droplet8`}>
                                    <Image src={bloodDrop} width={30} height={30} className="fixed"/>
                                </div>
                            </div>                     
                        )
                    case 20:
                        return (
                            <div key={x} className={`translate-x-[-2vw] fixed translate-y-[-120px]`}>   
                                <div className={`animate-droplet1`}>
                                    <Image src={bloodDrop} width={30} height={30} className="fixed"/>
                                </div>
                            </div>                     
                        )
                    default:
                        return (
                            <div key={x} className={`translate-x-[-6vw] fixed translate-y-[-135px]`}>   
                                <div className={`animate-droplet7`}>
                                    <Image src={bloodDrop} width={30} height={30} className="fixed"/>
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