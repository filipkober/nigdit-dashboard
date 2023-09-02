import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import DashboardFeed from '../components/organism/DashboardFeed';

const Home: NextPage = () => {

  useEffect( ()=> {
    return () =>     console.log(`
    $$\\   $$\\ $$\\           $$$$$$$\\  $$$$$$\\ $$$$$$$$\\
    $$$\\  $$ |\\__|          $$  __$$\\ \\_$$  _|\\__$$  __|
    $$$$\\ $$ |$$\\  $$$$$$\\  $$ |  $$ |  $$ |     $$ |
    $$ $$\\$$ |$$ |$$  __$$\\ $$ |  $$ |  $$ |     $$ |
    $$ \\$$$$ |$$ |$$ /  $$ |$$ |  $$ |  $$ |     $$ |
    $$ |\\$$$ |$$ |$$ |  $$ |$$ |  $$ |  $$ |     $$ |
    $$ | \\$$ |$$ |\\$$$$$$$ |$$$$$$$  |$$$$$$\\    $$ |
    \\__|  \\__|\\__| \\____$$ |\\_______/ \\______|   \\__|
                  $$\\   $$ |
                  \\$$$$$$  |
                   \\______/`);
  },[]);
   
  return (
    <>
      <Head>
        <title>Welcome to nigdit!</title>
        <link rel="icon" href={'/easterEgg1/blooddrop.svg'}/>
        <meta name="description" content="Welcome to nigdit."/>
      </Head>
      <div className="dark:text-white dark:bg-backgroundD bg-backgroundL w-[100%] m-0 h-auto">
        <DashboardFeed/>
      </div>
    </>
  )
};

export default Home
