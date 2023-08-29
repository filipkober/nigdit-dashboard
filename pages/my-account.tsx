import type { NextPage } from 'next';
import Head from 'next/head';
import MyAccountPanel from '../components/organism/MyAccountPanel';

const MyAccount: NextPage = () => {
  return (
    <>
    <div className="dark:text-white dark:bg-backgroundD bg-backgroundL w-[100%] m-0 h-screen scrollbar-thin scrollbar-thumb-[#535353] scrollbar-track-[#2323232a] scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-y-scroll">
      <Head>
        <title>Nigdit - My account</title>
        <link rel="icon" href={'/easterEgg1/blooddrop.svg'}/>
        <meta name="description" content="Your nigdit account."/>
      </Head>
      <MyAccountPanel/>
    </div>
    </>
  )
}

export default MyAccount;
