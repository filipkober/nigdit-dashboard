<<<<<<<< HEAD:pages/new/add-subnigdit.tsx
import type { NextPage } from 'next'
import Navbar from '../../components/molecules/Navbar';
import DashboardFeed from '../../components/organism/DashboardFeed';
import SubnigditCreationPanel from '../../components/organism/SubnigditCreationPanel';

const onChange = (value: string)=> console.log(value);

const AddSubnigdit: NextPage = () => {
  const onChange = (value: string)=> console.log(value);

  return (
    <>    
      <div className="dark:text-white dark:bg-backgroundD bg-backgroundL w-[100%] m-0 h-screen scrollbar-thin scrollbar-thumb-[#535353] scrollbar-track-[#2323232a] scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-y-scroll">
        <Navbar value={"test"} searchbar={{onChange: onChange}}/>
        <SubnigditCreationPanel/>
      </div>
    </>
  )
};

export default AddSubnigdit;
========
import type { NextPage } from 'next';
import makpaj from '../assets/makpaj.svg';
import Navbar from "../components/molecules/Navbar";
import PostMedia from '../components/molecules/PostMedia';
import PostText from '../components/molecules/PostText';

const onChange = (value: string)=> console.log(value);

const Testing: NextPage = () => {
  const desc = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat
        Duis aute irure dolor in reprehenderit in voluptate ...
        Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat
        Duis aute irure dolor in reprehenderit in voluptate
  `;

  return (
    <div className="dark:text-white dark:bg-backgroundD bg-backgroundL w-[100%] m-0 h-screen">
      <Navbar value={"test"} searchbar={{onChange: onChange}}/>
      <div className="p-2">
      <PostText title="post" description={desc} author="user" date={new Date('2022-09-23')} source={{name: 'n/subnigdit', image:makpaj}} votes={1500} />
      <PostMedia title="gif post" media={{type: "gif", source: "https://c.tenor.com/hVm01utkmM8AAAAd/maciek-sze%C5%9Bcia%C5%84czyk-maciasek05.gif"}} author="makpaj" date={new Date('2000-09-23')} source={{name: 'n/subnigdit', image:makpaj}} votes={-1500} />
      <PostMedia title="gif post" media={{type: "video", source: "https://www.w3schools.com/html/mov_bbb.mp4"}} author="makpaj" date={new Date('2000-09-23')} source={{name: 'n/subnigdit', image:makpaj}} votes={-1500} />

      </div>      
    </div>
  );
};

export default Testing;
>>>>>>>> fde788481de2aa2debad31006ee6bcf240869e9f:pages/testing.tsx
