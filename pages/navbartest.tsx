import type { NextPage } from 'next'
import Navbar from '../components/molecules/Navbar';
import navbar from "../components/molecules/Navbar";

const Navbartest: NextPage = () => {
  return (
    <div className="dark:text-white dark:bg-backgroundD bg-backgroundL w-[100%] m-0 h-screen">
      <Navbar/>
    </div>
  )
}

export default Navbartest
