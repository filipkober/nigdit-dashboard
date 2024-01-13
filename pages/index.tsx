import type { NextPage } from 'next';
import Head from 'next/head';
import DashboardFeed from '../components/organism/DashboardFeed';

const Home: NextPage = () => {
   
  return (
    <>
      <Head>
        <title>Nigdit</title>
        <link rel="icon" href={'/nigditLogo.svg'}/>
        <meta name="description" content="Welcome to nigdit."/>
      </Head>
      <div className="dark:text-white dark:bg-backgroundD bg-backgroundL h-[100%] w-[100%] m-0 p-0">
        <DashboardFeed/>
      </div>
    </>
  )
};

export default Home
