import React, { InputHTMLAttributes, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import nigditIcon from '../../../assets/testimage.svg'
import Link from 'next/link';
import { useSelector } from 'react-redux'
import { UserState } from '../../../store/userSlice'
import SubnigditSearch from '../SubnigditSearch';
import {debounce} from 'lodash';
import { useRouter } from 'next/router';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    user?:
    {
        username: string,
        avatar: string,
        profilePage: string,
    }
}
type searchSubnigdit = {
    name: string,
    id: number,
}

export default function Navbar()
{
    const [searchValue, setSearchValue] = useState("");
    const [searched, setSearched] = useState<searchSubnigdit[]>([]);
    const [isLogged, setLogged] = useState(false);
    const username = useSelector((state: UserState) => state.user.username)
    useEffect(() => {
        setLogged(!!username) //Cookies.get("jwt") !! - zamienia wartości takie jak null/undefined na false, reszta jest true
    },[]);

    const router = useRouter();

    const searchValChanged = async (cval: string) =>
    {
        console.log("Search Value: "+cval);
        if(!!cval)
        {
            fetch('http://localhost:1338/api/search?search='+cval)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setSearched(data)
            })
        }
        else
        {
            setSearched([])
        }        
        setSearchValue(cval)
    }

    const debouncedChangeHandler = useCallback(
        debounce((x) => searchValChanged(x), 100)
      , []);

    return(        
        <div className="pointer-events-none flex flex-row justify-between h-[5.5vh] min-h-[52px] max-h-[3.2rem] w-[100%] overflow-hidden bg-foregroundL dark:bg-foregroundD border-black border-b-2 border-solid sticky z-40 top-0 left-0">
            <a href="http://localhost:3000" className='pointer-events-auto min-w-[2.4rem] w-[2.4rem] ml:w-[7.4rem] tl:max-w-[13rem] h-[100%] flex flex-row my-2 mx-2'>
                <div className='shrink-0'>
                    <Image draggable="false" src={nigditIcon} width={36} height={36} className="select-none hover:cursor-pointer object-cover overflow-hidden p-0 w-[2.4rem] h-[2.4rem] rounded-full" alt={''}/>
                </div> 
                <div className='w-[5rem] hidden ml:block'>
                    <p className="select-none shrink-1 text-[24px] font-['Roboto'] dark:text-white pl-2"><Link href={'/'}>NigDIT</Link></p>
                </div>                
                <div className='w-[5.6rem] overflow-hidden shrink-1 hidden tl:flex'></div>
            </a>            
            <div className='min-w-[12rem] w-[25vw] max-w-[30rem] h-[100%] grow flex flex-row my-2 mx-2'>
                {
                    (searchValue != "")?(
                        <div className={'h-[70%] w-[100%] flex flex-row justify-between bg-backgroundL dark:bg-backgroundD  border-solid border-accentD border-[1px] border-b-[1px] z-50 rounded-t-[10px]'}>
                            <div className='w-[2.1rem] min-w-[2.1rem]'>
                                <Image draggable="false" src={'/searchIcon.png'} width={33} height={33} className="rounded-none ml-1 p-[6px] select-none object-cover overflow-hidden" alt={''}/>
                            </div>                   
                            <div className='w-[100%] m-[0.2rem]'>
                                <input className='pointer-events-auto dark:text-white text-[1.2rem] bg-[rgba(0,0,0,0)] dark:bg-[rgba(0,0,0,0)] border-none outline-none w-[100%]' type="text" placeholder={"search..."} onChange={event => debouncedChangeHandler(event.target.value)} /> 
                            </div>  
                        </div>
                    ):(
                        <div className={'h-[70%] w-[100%] flex flex-row justify-between bg-backgroundL dark:bg-backgroundD  border-solid border-accentD border-[1px] border-b-[1px] z-50 rounded-[10px]'}>
                            <div className='w-[2.1rem] min-w-[2.1rem]'>
                                <Image draggable="false" src={'/searchIcon.png'} width={33} height={33} className="rounded-none ml-1 p-[6px] select-none object-cover overflow-hidden" alt={''}/>
                            </div>                   
                            <div className='w-[100%] m-[0.2rem]'>
                                <input className='pointer-events-auto dark:text-white text-[1.2rem] bg-[rgba(0,0,0,0)] dark:bg-[rgba(0,0,0,0)] border-none outline-none w-[100%]' type="text" placeholder={"search..."} onChange={event => debouncedChangeHandler(event.target.value)} /> 
                            </div>  
                        </div>
                    )
                }

            </div>        
            {(isLogged) ? (
            <Link href="/my-account" className='hover:cursor-pointer min-w-[2.4rem] tm:min-w-[13rem] h-[100%] flex flex-row-reverse my-2 ml-1 mr-3'>
                <div className='w-[2.4rem] shrink-0'>
                    <Image draggable="false" src={nigditIcon} width={36} height={36} className="w-[2.4rem] pointer-events-auto select-none hover:cursor-pointer object-cover overflow-hidden rounded-full" alt={''}/>
                </div> 
                <div className='select-none overflow-hidden ml-auto shrink-1 hidden tm:block'>
                    <p className="pointer-events-auto overflow-hidden text-right text-[20px] font-thin dark:text-white pr-2">{username}</p>
                </div>                 
            </Link>
            ):(                
            <div className='min-w-[2.4rem] tm:min-w-[13rem] flex flex-row-reverse my-[6.5px] ml-1 mr-3'>
                <Link href="/register" className="pointer-events-auto hover:cursor-pointer mx-1 shrink-0 px-4 py-1 rounded-[666px] bg-[#aaa] text-[#373737] border-[1px] font-bold shadow-md border-[#000000] hover:bg-gray-100 transition-colors duration-300">
                    register
                </Link>     
                <Link href={"/login?redirect=" + router.asPath} className="pointer-events-auto hover:cursor-pointer shrink-0 px-4 py-1 rounded-[666px] bg-[#aaa] text-[#373737] border-[1px] font-bold shadow-md border-[#000000] hover:bg-gray-200 transition-colors duration-300">
                    login
                </Link>    
            </div>
            )}
            {
                (searchValue != "") ? (
                    <div className='overflow-hidden flex flex-row fixed w-[100%] justify-between left-0 mt-[25px] '>
                    <div className='min-w-[2.4rem] w-[2.4rem] ml:w-[7.4rem] tl:max-w-[13rem] h-[100%] flex flex-row my-2 mx-2'></div>
                    <div className='min-w-[12rem] w-[25vw] max-w-[30rem] h-[100%] grow flex flex-col my-2 mx-2'>
                        <div className='w-full h-[20px] bg-backgroundD border-accentD border-x-[1px]'></div>
                        {
                            (searched.length>0) ? (
                                searched.map((x,i)=>{
                                    return (
                                        <div key={x.id}>
                                            <SubnigditSearch name={x.name} image={nigditIcon} members={'564'} number={i}/>
                                        </div>
                                    )
                                })
                            ):(
                                <div className='h-[31px] w-[100%] text-center text-[18px] font-["Roboto"] dark:text-white select-none pl-2 bg-foregroundL dark:bg-backgroundD border-accentD border-x-[1px] border-solid py-[6px] px-[6px]'>
                                    No matching results
                                </div>
                            )
                        }
                        <div className='w-full h-[10px] bg-backgroundD rounded-b-[10px] border-accentD border-[1px] border-t-[0px]'></div>
                    </div>
                    {(isLogged) ? (
                    <div className='hover:cursor-pointer min-w-[2.4rem] tm:min-w-[13rem] h-[100%] flex flex-row-reverse my-2 ml-1 mr-3'>
                        <div className='w-[2.4rem] shrink-0'></div> 
                        <div className='shrink-1 hidden tm:block'>
                            <p className=" text-[20px] text-transparent font-thin pr-2">{username}</p>
                        </div>                 
                    </div>
                    ):( 
                    <div className='min-w-[2.4rem] tm:min-w-[13rem] flex flex-row-reverse my-[6.5px] ml-1 mr-3'>
                        <div className='w-[172px]'></div>
                    </div>
                    )}
                </div>
                ):(
                    ""
                )
            }

        </div>
    );  
}
   