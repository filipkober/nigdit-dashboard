import type { NextPage } from 'next'
import { useState } from 'react';
import Navbar from '../components/molecules/Navbar';
import MyAccountPanel from '../components/organism/MyAccountPanel';

const MyAccount: NextPage = () => {
  const [search, setSearch] = useState<string>("");
  const changeSearch = (val: string) => {
    setSearch(val);
  }
  return (
    <>
    <Navbar searchbar={{value: search, onChange: changeSearch}}/>
    <MyAccountPanel/>
    </>
  )
}

export default MyAccount;
