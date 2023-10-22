import { debounce } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { InputHTMLAttributes, useCallback, useEffect, useState } from 'react';
import { BiMessageAdd } from 'react-icons/Bi';
import { RxHamburgerMenu } from 'react-icons/Rx';
import { useSelector } from 'react-redux';
import emptypfp from '../../../assets/emptypfp.jpg';
import nigditIcon from '../../../assets/testimage.svg';
import { SubnigditSearchResult } from '../../../models/Subnigdit';
import { UserState } from '../../../store/userSlice';
import SubnigditService from '../../../util/requests/SubnigditService';
import SubnigditSearch from '../SubnigditSearch';
interface Props extends InputHTMLAttributes<HTMLInputElement> {
    user?:
    {
        username: string,
        avatar: string,
        profilePage: string,
    }
}

export default function Navbar()
{
    const subnigditService = new SubnigditService();
    const [searchValue, setSearchValue] = useState("");
    const [searched, setSearched] = useState<SubnigditSearchResult[]>([]);
    const [isLogged, setLogged] = useState(false);
    const user = useSelector((state: UserState) => state.user)
    const {username, profilePicture} = user;
    useEffect(() => {
        setLogged(!!username) //Cookies.get("jwt") !! - zamienia wartości takie jak null/undefined na false, reszta jest true
    },[]);

    const router = useRouter();

    const searchValChanged = async (cval: string) =>
    {
        console.log("Search Value: "+cval);
        if(!!cval)
        {
            //fetch(process.env.NEXT_PUBLIC_STRAPI_URL+'/api/search?search='+cval)
            //.then(res => res.json())
            subnigditService.searchSubnigdits(cval)
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
        <div className="pointer-events-none flex flex-row justify-between h-[5.5vh] min-h-[52px] max-h-[3.2rem] w-[100%] overflow-hidden bg-foregroundL dark:bg-foregroundD border-black border-b-2 border-solid sticky z-[40] top-0 left-0">
            {/* dashboard icon */}
            <div className='flex flex-row bg-purple-500'>
                <Link href="/" className='pointer-events-auto min-w-[2.4rem] w-[2.4rem] ml:w-[7.4rem] tl:max-w-[13rem] h-[100%] flex flex-row my-2 mx-2'>
                    <div className='shrink-0'>
                        <Image draggable="false" src={nigditIcon} width={36} height={36} className="select-none hover:cursor-pointer object-cover overflow-hidden p-0 w-[2.4rem] h-[2.4rem] rounded-full" alt={'Nigdit icon'} loader={({src}) => src}/>
                    </div>
                    <div className='w-[5rem] hidden ml:block'>
                        <p className="select-none shrink-1 text-[24px] font-['Roboto'] dark:text-white pl-2"><Link href={'/'}>NigDIT</Link></p>
                    </div>
                </Link>
                {/* space for extra 3 buttons */}
                {isLogged ?<div className='max-w-[7.2rem] hidden tm:flex flex-row-reverse th:w-[7.2rem] tl:w-[4.8rem] w-[2.4rem]'></div>:""}
            </div>
            {/* searchbar */}
            <div className='min-w-[12rem] w-[25vw] max-w-[30rem] h-[100%] grow flex flex-row my-2 mx-2'>
                {
                    (searchValue != "")
                    ?(
                        <div className={'h-[70%] w-[100%] flex flex-row justify-between bg-backgroundL dark:bg-backgroundD  border-solid border-accentD border-[1px] border-b-[1px] z-50 rounded-t-[10px]'}>
                            <div className='w-[2.1rem] min-w-[2.1rem]'>
                                <Image draggable="false" src={'/searchIcon.png'} width={33} height={33} className="rounded-none ml-1 p-[6px] select-none object-cover overflow-hidden" alt={''}/>
                            </div>
                            <div className='w-[100%] m-[0.2rem]'>
                                <input value={searchValue} className='pointer-events-auto dark:text-white text-[1.2rem] bg-[rgba(0,0,0,0)] dark:bg-[rgba(0,0,0,0)] border-none outline-none w-[100%]' type="text" placeholder={"search..."} onChange={event => debouncedChangeHandler(event.target.value)} />
                            </div>
                            <button onClick={() =>{setSearchValue("")}} className='w-[2.1rem] min-w-[2.1rem] mr-1 p-[6px] hover:cursor-pointer pointer-events-auto'>
                                <Image draggable="false" src={'/searchx.png'} width={33} height={33} className="" alt={''}/>
                            </button>
                        </div>
                    ):(
                        <div className={'h-[70%] w-[100%] flex flex-row justify-between bg-backgroundL dark:bg-backgroundD  border-solid border-accentD border-[1px] border-b-[1px] z-50 rounded-[10px]'}>
                            <div className='w-[2.1rem] min-w-[2.1rem]'>
                                <Image draggable="false" src={'/searchIcon.png'} width={33} height={33} className="rounded-none ml-1 p-[6px] select-none object-cover overflow-hidden" alt={''}/>
                            </div>
                            <div className='w-[100%] m-[0.2rem]'>
                                <input value={searchValue} className='pointer-events-auto dark:text-white text-[1.2rem] bg-[rgba(0,0,0,0)] dark:bg-[rgba(0,0,0,0)] border-none outline-none w-[100%]' type="text" placeholder={"search..."} onChange={event => debouncedChangeHandler(event.target.value)} />
                            </div>
                        </div>
                    )
                }
            </div>
            {/* user account panel */}
            <div className='flex flex-row-reverse bg-purple-500'>
                {/* account info */}
                <div className='ts:block hidden h-full bg-orange-300'>
                    {/* login buttons or user icon */}
                    {(!!username) ? (
                    <Link href="/my-account" className='hover:cursor-pointer min-w-[2.4rem] h-[100%] tm:min-w-[13rem] flex flex-row-reverse my-2 ml-1 mr-3 bg-orange-500'>
                        <div className='w-[2.4rem] shrink-0'>
                            <Image draggable="false" src={profilePicture ? (process.env.NEXT_PUBLIC_STRAPI_URL + profilePicture.url) : emptypfp.src} width={36} height={36} className="w-[2.4rem] pointer-events-auto select-none hover:cursor-pointer object-cover overflow-hidden rounded-full" alt={'Your profile picture'} loader={({src}) => src}/>
                        </div>
                        <div className='select-none overflow-hidden ml-auto shrink-1 hidden tm:block bg-emerald-500'>
                            <p className="pointer-events-auto overflow-hidden text-right text-[20px] font-thin dark:text-white pr-2">{username}</p>
                        </div>
                    </Link>
                    ):(
                    <div className='min-w-[2.4rem] flex flex-row-reverse my-[6.5px] ml-1 mr-3'>
                        <Link href="/register" className="pointer-events-auto hover:cursor-pointer mx-1 shrink-0 px-4 py-1 rounded-[666px] bg-[#aaa] text-[#373737] border-[1px] font-bold shadow-md border-[#000000] hover:bg-gray-100 transition-colors duration-300">
                            register
                        </Link>
                        <Link href={"/login?redirect=" + router.asPath} className="pointer-events-auto hover:cursor-pointer shrink-0 px-4 py-1 rounded-[666px] bg-[#aaa] text-[#373737] border-[1px] font-bold shadow-md border-[#000000] hover:bg-gray-200 transition-colors duration-300">
                            login
                        </Link>
                    </div>
                    )}
                </div>
                {/* burger */}
                <div className='ts:hidden h-full pointer-events-auto min-w-[2.4rem] w-[2.4rem] ml:w-[3.8rem] flex flex-row-reverse my-2 mx-2'>
                    <div className='shrink-0'>
                        {/* edytuj to */}
                        <RxHamburgerMenu size={32} className="select-none hover:cursor-pointer object-cover overflow-hidden p-0 w-[2.4rem] h-[2.4rem]"/>
                    </div>
                </div>
                {/* buttons */}
                {isLogged ?
                <div className='max-w-[7.2rem] hidden tm:flex flex-row-reverse'>
                    <div className='w-[2.4rem] tl:flex hidden items-center h-full p-1 '>
                        {/* dostylizuj to olo */}
                        <BiMessageAdd size={32} className="select-none hover:cursor-pointer object-cover overflow-hidden w-full h-full"/>
                    </div>
                    <div className='w-[2.4rem] items-center h-full hidden tm:flex '>
                        {/* icon 2 - empty disappears at the latest*/}
                    </div>
                    <div className='w-[2.4rem] items-center h-full hidden th:flex '>
                        {/* icon 3 - disappears at the earliest*/}
                    </div>
                </div>
                :""}
            </div>



            {/* search results FRAGILE*/}
            {
                (searchValue != "") ? (
                <div className='overflow-hidden flex flex-row fixed w-[100%] justify-between left-0 mt-[25px]'>
                    <div className='flex flex-row bg-red-500'>
                        <div className='min-w-[2.4rem] w-[2.4rem] ml:w-[7.4rem] tl:max-w-[13rem] h-[100%] flex flex-row my-2 mx-2'></div>
                        {isLogged ?<div className='max-w-[7.2rem] hidden tm:flex flex-row-reverse th:w-[7.2rem] tl:w-[4.8rem] w-[2.4rem]'></div>:""}
                    </div>
                    <div className='min-w-[12rem] w-[25vw] max-w-[30rem] h-[100%] grow flex flex-col my-2 mx-2'>
                        <div className='w-full h-[20px] bg-backgroundD border-accentD border-x-[1px]'></div>
                        {
                            (searched.length>0) ? (
                                searched.map((x,i)=>{
                                    return (
                                        <div key={x.id}>
                                            <SubnigditSearch id={x.id} name={x.name} image={process.env.NEXT_PUBLIC_STRAPI_URL+x.icon.url} members={x.subscribers.toString()} number={i}/>
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
                    <div className='flex flex-row-reverse bg-red-500'>
                        <div className='ts:block hidden h-full bg-orange-500'>
                            {(isLogged) ? (
                            <div className='hover:cursor-pointer min-w-[2.4rem] h-[100%] tm:min-w-[13rem] flex flex-row-reverse my-2 ml-1 mr-3'>
                                <div className='w-[2.4rem] shrink-0'></div>
                                <div className='shrink-1 hidden tm:block'>
                                    <p className=" text-[20px] text-transparent font-thin pr-2">{username}</p>
                                </div>
                            </div>
                            ):(
                            <div className='min-w-[2.4rem] flex flex-row-reverse my-[6.5px] ml-1 mr-3'>
                                <div className='w-[172px]'></div>
                            </div>
                            )}
                        </div>
                        <div className='ts:hidden h-full pointer-events-auto w-[2.4rem] ml:w-[3.8rem] flex flex-row-reverse my-2 mx-2'></div>
                        {isLogged ? <div className='max-w-[7.2rem] hidden tm:flex flex-row-reverse th:w-[7.2rem] tl:w-[4.8rem] w-[2.4rem]'></div>:""}
                        <div className='w-[9px] h-full'></div> {/* scrollbar simulation */}
                    </div>
                </div>
                ):("")
            }
        </div>
    );
}
   