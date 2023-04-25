import type { NextPage } from 'next'
import { useState } from 'react';
import Navbar from '../components/molecules/Navbar';
import MyAccountPanel from '../components/organism/MyAccountPanel';

const MyAccount: NextPage = () => {
  return (
    <>
    <div className="dark:text-white dark:bg-backgroundD bg-backgroundL w-[100%] m-0 h-screen scrollbar-thin scrollbar-thumb-[#535353] scrollbar-track-[#2323232a] scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-y-scroll">
      <Navbar/>
      <MyAccountPanel/>
    </div>
    </>
  )
}

export default MyAccount;
