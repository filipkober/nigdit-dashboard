import type { NextPage } from 'next'
import { useState } from 'react';
import Navbar from '../components/molecules/Navbar';
import MyAccountPanel from '../components/organism/MyAccountPanel';

const MyAccount: NextPage = () => {
  return (
    <>
    <Navbar/>
    <MyAccountPanel/>
    </>
  )
}

export default MyAccount;
