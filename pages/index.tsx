import type { NextPage } from "next";
import makpaj from '../assets/makpaj.svg'
import PostText from "../components/molecules/PostText";

const Home: NextPage = () => {
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
    <div className="p-2 dark:text-white dark:bg-backgroundD bg-backgroundL w-[100%] m-0 h-screen">
      <PostText title="post" description={desc} author="user" date={new Date('2022-09-23')} source={{name: 'n/subnigdit', image:makpaj}} votes={1500} />
    </div>
  );
};

export default Home;
