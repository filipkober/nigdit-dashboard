import type { NextPage } from 'next';
import Head from 'next/head';
import SubnigditCreationPanel from '../../components/organism/SubnigditCreationPanel';

const onChange = (value: string)=> console.log(value);

const AddSubnigdit: NextPage = () => {
  const onChange = (value: string)=> console.log(value);

  return (
    <>
      <Head>
        <title>Create subnigdit</title>
        <link rel="icon" href={'/easterEgg1/blooddrop.svg'}/>
        <meta name="description" content="Create subnigdit."/>
      </Head>
      <div className="dark:text-white dark:bg-backgroundD bg-backgroundL w-[100%] m-0 h-screen scrollbar-thin scrollbar-thumb-[#535353] scrollbar-track-[#2323232a] scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-y-scroll">
        <SubnigditCreationPanel/>
      </div>
    </>
  )
};

export default AddSubnigdit;

