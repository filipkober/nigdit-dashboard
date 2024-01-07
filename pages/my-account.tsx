import type { NextPage } from 'next';
import Head from 'next/head';
import MyAccountPanel from '../components/organism/MyAccountPanel';
import { useSelector } from 'react-redux';
import { UserState } from '../store/userSlice';
import { useRouter } from 'next/router';

const MyAccount: NextPage = () => {

  const isLogged = !!useSelector((state: UserState) => state.user.username);
  const router = useRouter();


  if(!isLogged) {
    router.push('/login?redirect=my-account');
  }

  return (
    <>
    <div className="dark:text-white dark:bg-backgroundD bg-backgroundL w-[100%] m-0">
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
