import Head from 'next/head';
import LogoutScreen from '../components/organism/LogoutScreen';

export default function logout() {
  return (
    <>
      <Head>
        <title>Logout page</title>
        <link rel="icon" href={'/nigditLogo.svg'}/>
        <meta name="description" content="Log out of nigdit."/>
      </Head>
      <LogoutScreen />
    </>
  );
}
