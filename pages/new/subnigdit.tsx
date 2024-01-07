import type { NextPage } from 'next';
import Head from 'next/head';
import SubnigditCreationPanel from '../../components/organism/SubnigditCreationPanel';

const AddSubnigdit: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create subnigdit</title>
        <link rel="icon" href={'/nigditLogo.svg'}/>
        <meta name="description" content="Create subnigdit."/>
      </Head>
      <div className="dark:text-white dark:bg-backgroundD bg-backgroundL w-[100%] m-0 h-screen">
        <SubnigditCreationPanel/>
      </div>
    </>
  )
};

export default AddSubnigdit;

