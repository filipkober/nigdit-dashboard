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
                    harvestedSouls.push(Math.round(harvestedSouls.length+harvestedSouls[harvestedSouls.length-1]*1.01));         
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
                // const y = (x.value%50)-22;
                // console.log("added: "+x.id+" "+index+" "+x.value+" "+y);     //tablica obiektów - ten sam rezultat
                // return (
                //     <div key={x.id}> 
                //     <div className={`fixed translate-x-[${y}vw] translate-y-[${-130-y}px]`}> 
                //         <div className="animate-droplet${x%5+1}">
                //             <Image src={bloodDrop} width={30} height={30} className="fixed"/>
                //         </div>
                //     </div>  
                //     </div>                   
                // )          
                switch (x%25)   //to jest rozpierdolone
                {
                    case 1: //ten kod to herezja
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
                    case 5: //nie dotykam tego nigdy więcej
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
                    case 21:
                        return (
                            <div key={x} className={`translate-x-[-12vw] fixed translate-y-[-183px]`}>   
                                <div className={`animate-droplet7`}>
                                    <Image src={bloodDrop} width={30} height={30} className="fixed"/>
                                </div>
                            </div>                     
                        )
                    case 22:
                        return (
                            <div key={x} className={`translate-x-[-9vw] fixed translate-y-[-147px]`}>   
                                <div className={`animate-droplet4`}>
                                    <Image src={bloodDrop} width={30} height={30} className="fixed"/>
                                </div>
                            </div>                     
                        )
                    case 23:
                        return (
                            <div key={x} className={`translate-x-[-16vw] fixed translate-y-[-169px]`}>   
                                <div className={`animate-droplet8`}>
                                    <Image src={bloodDrop} width={30} height={30} className="fixed"/>
                                </div>
                            </div>                     
                        )
                    case 24:
                        return (
                            <div key={x} className={`translate-x-[-20vw] fixed translate-y-[-128px]`}>   
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
