import type { NextPage } from 'next'
import LoginForm from '../components/organism/RegisterForm';
import Navbar from '../components/molecules/Navbar';

const Navbartest: NextPage = () => {
const onChange = (value: string)=> console.log(value);

  return (
    <div className="dark:text-white dark:bg-backgroundD bg-backgroundL w-[100%] m-0 h-screen">
      <Navbar value={"test"} searchbar={{onChange: onChange}}/>
      <div></div>
    </div>
  )
}

export default Navbartest