import { debounce } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import emptypfp from '../../../assets/emptypfp.jpg';
import { SubnigditSearchResult } from '../../../models/Subnigdit';
import { UserState } from '../../../store/userSlice';
import SubnigditService from '../../../util/requests/SubnigditService';
import SubnigditSearch from '../../molecules/SubnigditSearch';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const subnigditService = new SubnigditService();
  const [searchValue, setSearchValue] = useState('');
  const [searched, setSearched] = useState<SubnigditSearchResult[]>([]);
  const [isLogged, setLogged] = useState(false);
  const user = useSelector((state: UserState) => state.user);
  const { username, profilePicture } = user;

  const [hasScrollbar, setHasScrollbar] = useState(false);
  const realRef = useRef<HTMLDivElement | null>(null);
  const imaginaryRef = useRef<HTMLDivElement | null>(null);
  const checkForScrollbar = () => {
    const realElement = realRef.current;
    const imaginaryElement = imaginaryRef.current;
    if (realElement && imaginaryElement) {
      setHasScrollbar(realElement.clientWidth < imaginaryElement.clientWidth);
      //console.log("r: "+realElement.clientWidth)
      //console.log("i: "+imaginaryElement.clientWidth)
      //console.log(realElement.clientWidth < imaginaryElement.clientWidth)
    }
  };

  useEffect(() => {
    setLogged(!!username);
    window.addEventListener('resize', checkForScrollbar);

    const handleRouteChange = () => {
      setSearchValue('');
      setIsMenuOpen(false);
    };
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      window.removeEventListener('resize', checkForScrollbar);
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    checkForScrollbar();
  }, [searchValue]);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const router = useRouter();

  const searchValChanged = async (cval: string) => {
    if (!!cval) {
      subnigditService.searchSubnigdits(cval).then((data) => {
        setSearched(data);
      });
    } else {
      setSearched([]);
    }
    setSearchValue(cval);
  };

  const debouncedChangeHandler = useCallback(
    debounce((x) => searchValChanged(x), 100),
    []
  );

  return (
    <div
      ref={realRef}
      className="pointer-events-none flex flex-row justify-between h-[5.5vh] min-h-[52px] max-h-[3.2rem] w-[100%] overflow-hidden bg-foregroundL dark:bg-foregroundD border-black border-b-2 border-solid sticky z-[40] top-0 left-0 right-0"
    >
      {/* dashboard icon */}
      <div className="flex flex-row">
        <Link
          href="/"
          className="pointer-events-auto min-w-[2.4rem] w-[2.4rem] ml:w-[7.4rem] tl:max-w-[13rem] h-[100%] flex flex-row my-2 mx-2"
        >
          <div className="shrink-0">
            <Image
              draggable="false"
              src={'/nigditLogo.svg'}
              width={36}
              height={36}
              className="select-none hover:cursor-pointer object-cover overflow-hidden p-0 w-[2.4rem] h-[2.4rem] rounded-full"
              alt={'Nigdit icon'}
            />
          </div>
          <div className="w-[5rem] hidden ml:block">
            <p className="select-none shrink-1 text-[24px] font-['Roboto'] dark:text-white pl-2">
              NigDIT
            </p>
          </div>
        </Link>
        {/* space for extra 3 buttons */}
        {isLogged ? (
          <div className="max-w-[7.2rem] hidden tm:flex flex-row-reverse th:w-[7.2rem] tl:w-[4.8rem] w-[2.4rem]"></div>
        ) : (
          ''
        )}
      </div>
      {/* searchbar */}
      <div className="min-w-[12rem] w-[25vw] max-w-[30rem] h-[100%] grow flex flex-row my-2 mx-2">
        {searchValue != '' ? (
          <div
            className={
              'h-[70%] w-[100%] flex flex-row justify-between bg-backgroundL dark:bg-backgroundD border-solid border-accentD border-[1px] border-b-[1px] z-50 rounded-t-[10px]'
            }
          >
            <div className="w-[2.1rem] min-w-[2.1rem]">
              <Image
                draggable="false"
                src={'/navbar/searchIcon.png'}
                width={33}
                height={33}
                className="rounded-none ml-1 p-[6px] select-none object-cover overflow-hidden"
                alt={''}
              />
            </div>
            <div className="w-[100%] m-[0.2rem]">
              <input
                value={searchValue}
                className="pointer-events-auto dark:text-white text-[1.2rem] bg-[rgba(0,0,0,0)] dark:bg-[rgba(0,0,0,0)] border-none outline-none w-[100%]"
                type="text"
                placeholder={'search...'}
                onChange={(event) => debouncedChangeHandler(event.target.value)}
              />
            </div>
            <button
              onClick={() => {
                setSearchValue('');
              }}
              className="w-[2.1rem] min-w-[2.1rem] mr-1 p-[6px] hover:cursor-pointer pointer-events-auto"
            >
              <Image
                draggable="false"
                src={'/navbar/searchx.png'}
                width={33}
                height={33}
                className=""
                alt={''}
              />
            </button>
          </div>
        ) : (
          <div
            className={
              'h-[70%] w-[100%] flex flex-row justify-between bg-backgroundL dark:bg-backgroundD  border-solid border-accentD border-[1px] border-b-[1px] z-50 rounded-[10px]'
            }
          >
            <div className="w-[2.1rem] min-w-[2.1rem]">
              <Image
                draggable="false"
                src={'/navbar/searchIcon.png'}
                width={33}
                height={33}
                className="rounded-none ml-1 p-[6px] select-none object-cover overflow-hidden"
                alt={''}
              />
            </div>
            <div className="w-[100%] m-[0.2rem]">
              <input
                value={searchValue}
                className="pointer-events-auto dark:text-white text-[1.2rem] bg-[rgba(0,0,0,0)] dark:bg-[rgba(0,0,0,0)] border-none outline-none w-[100%]"
                type="text"
                placeholder={'search...'}
                onChange={(event) => debouncedChangeHandler(event.target.value)}
              />
            </div>
          </div>
        )}
      </div>
      {/* user account panel */}
      <div className="flex flex-row-reverse">
        {/* account info */}
        <div className="ts:block hidden h-full">
          {/* login buttons or user icon */}
          {!!username ? (
            <Link
              href="/my-account"
              className="hover:cursor-pointer min-w-[2.4rem] h-[100%] flex flex-row-reverse my-2 ml-1 mr-3"
            >
              <div className="w-[2.4rem] shrink-0">
                <Image
                  draggable="false"
                  src={
                    profilePicture
                      ? process.env.NEXT_PUBLIC_STRAPI_URL + profilePicture.url
                      : emptypfp.src
                  }
                  width={36}
                  height={36}
                  className="w-[2.4rem] pointer-events-auto select-none hover:cursor-pointer object-cover overflow-hidden rounded-full"
                  alt={'Your profile picture'}
                />
              </div>
              <div className="select-none overflow-hidden ml-auto shrink-1 hidden tl:block">
                <p className="pointer-events-auto overflow-hidden text-right text-[20px] font-thin dark:text-white pr-2">
                  {username}
                </p>
              </div>
            </Link>
          ) : (
            <>
              <div className="min-w-[2.4rem] flex flex-row-reverse my-[6.5px] ml-1 mr-3">
                <Link
                  href="/register"
                  className="pointer-events-auto hover:cursor-pointer mx-1 shrink-0 px-4 py-1 rounded-[666px] bg-[#aaa] text-[#373737] border-[1px] font-bold shadow-md border-[#000000] hover:bg-gray-100 transition-colors duration-300"
                >
                  register
                </Link>
                <Link
                  href={'/login?redirect=' + router.asPath}
                  className="pointer-events-auto hover:cursor-pointer shrink-0 px-4 py-1 rounded-[666px] bg-[#aaa] text-[#373737] border-[1px] font-bold shadow-md border-[#000000] hover:bg-gray-200 transition-colors duration-300"
                >
                  login
                </Link>
              </div>
            </>
          )}
        </div>
        {/* burger */}
        <div className="ts:hidden h-full pointer-events-auto min-w-[2.4rem] w-[2.4rem] ml:w-[3.8rem] flex flex-row-reverse my-2 mx-2">
          <div className="shrink-0">
            {isLogged ? (
              <Menu
                right
                burgerBarClassName="hidden"
                isOpen={isMenuOpen}
                onClose={handleMenuClose}
                width={'35%'}
              >
                <Link className="bg-[#272727]" href="/">
                  Home
                </Link>

                <Link href="/my-account">Account</Link>
                <Link className="bg-[#272727]" href="/new/post">
                  Create Post
                </Link>
                <Link href="/subnigdits">Subnigdits</Link>
                <Link className="bg-[#272727]" href="/logout">
                  Log out
                </Link>
              </Menu>
            ) : (
              <Menu
                right
                burgerBarClassName="hidden"
                isOpen={isMenuOpen}
                onClose={handleMenuClose}
                width={'35%'}
              >
                <Link className="bg-[#272727]" href="/">
                  Home
                </Link>
                <Link href="/login">Login</Link>
                <Link className="bg-[#272727]" href="/register">
                  Register
                </Link>
              </Menu>
            )}
            <RxHamburgerMenu
              onClick={handleMenuOpen}
              size={32}
              className="select-none hover:cursor-pointer object-cover overflow-hidden p-0 w-[2.4rem] h-[2.4rem]"
            />
          </div>
        </div>
        {/* buttons */}
        {!!username ? (
          <div className="max-w-[10.8rem] hidden ts:flex flex-row-reverse">
            <Link
              href="/new/post"
              className="pointer-events-auto w-[3.6rem] ts:flex hidden select-none hover:cursor-pointeritems-center h-full p-1"
            >
              {/*<BiMessageAdd
                size={32}
                className="select-none hover:cursor-pointer object-cover overflow-hidden w-full h-full"
              /> */}
              <Image
                draggable="false"
                src={'/navbar/createpost.png'}
                width={32}
                height={32}
                className="select-none hover:cursor-pointer object-scale-down overflow-hidden w-full p-1"
                alt={'create post'}
              />
            </Link>
            <div className="w-[3.6rem] items-center h-full hidden th:flex">
              {/* icon 2 - empty disappears at the latest*/}
            </div>
            <div className="w-[3.6rem] items-center h-full hidden ls:flex">
              {/* icon 3 - disappears at the earliest*/}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>

      {/* search results - do not edit unless you know what you are doing*/}
      {searchValue != '' ? (
        <div
          ref={imaginaryRef}
          className="overflow-hidden flex flex-row fixed w-[100%] justify-between left-0 mt-[25px]"
        >
          <div className="flex flex-row">
            <div className="min-w-[2.4rem] w-[2.4rem] ml:w-[7.4rem] tl:max-w-[13rem] h-[100%] flex flex-row my-2 mx-2"></div>
            {isLogged ? (
              <div className="max-w-[7.2rem] hidden tm:flex flex-row-reverse th:w-[7.2rem] tl:w-[4.8rem] w-[2.4rem]"></div>
            ) : (
              ''
            )}
          </div>
          <div className="min-w-[12rem] w-[25vw] max-w-[30rem] h-[100%] grow flex flex-col my-2 mx-2">
            <div className="w-full h-[20px] bg-backgroundD border-accentD border-x-[1px]"></div>
            {searched.length > 0 ? (
              searched.map((x, i) => {
                return (
                  <div key={x.id}>
                    <SubnigditSearch
                      id={x.id}
                      name={x.name}
                      image={process.env.NEXT_PUBLIC_STRAPI_URL + x.icon.url}
                      members={x.subscribers.toString()}
                      number={i}
                      name_uid={x.name_uid}
                    />
                  </div>
                );
              })
            ) : (
              <div className='h-[31px] w-[100%] text-center text-[18px] font-["Roboto"] dark:text-white select-none pl-2 bg-foregroundL dark:bg-backgroundD border-accentD border-x-[1px] border-solid py-[6px] px-[6px]'>
                No matching results
              </div>
            )}
            <div className="w-full h-[10px] bg-backgroundD rounded-b-[10px] border-accentD border-[1px] border-t-[0px]"></div>
          </div>
          {/* user account panel simulation*/}
          <div className="flex flex-row-reverse">
            {/* scrollbar simulation */}
            {hasScrollbar ? <div className="ml:w-[8px] h-full"></div> : ''}
            {/* account info simulation*/}
            <div className="ts:block hidden h-full0">
              {isLogged ? (
                <div className="hover:cursor-pointer min-w-[2.4rem] h-[100%] flex flex-row-reverse my-2 ml-1 mr-3">
                  <div className="w-[2.4rem] shrink-0"></div>
                  <div className="shrink-1 hidden tl:block">
                    <p className=" text-[20px] text-transparent font-thin pr-2">
                      {username}
                    </p>
                  </div>
                  <div className="w-[5rem] block ts:hidden"></div>
                </div>
              ) : (
                <div className="min-w-[2.4rem] flex flex-row-reverse my-[6.5px] ml-1 mr-3">
                  <div className="w-[172px]"></div>
                </div>
              )}
            </div>
            {/* burger sim */}
            <div className="ts:hidden h-full pointer-events-auto w-[2.4rem] ml:w-[3.8rem] flex flex-row-reverse my-2 mx-2"></div>
            {/* buttons sim */}
            {!!username ? (
              <div className="hidden ts:flex flex-row-reverse ls:w-[10.8rem] th:w-[7.2rem] w-[3.6rem]"></div>
            ) : (
              ''
            )}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
