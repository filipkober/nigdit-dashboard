import type { NextPage } from 'next';
import Head from 'next/head';
import FeedDashboard from '../components/organism/FeedDashboard';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <link rel="icon" href={'/nigditLogo.svg'} />
        <title>Nigdit - Unleash Your Opinions, Ignite Discussions!</title>
        <meta
          name="title"
          content="Nigdit - Unleash Your Opinions, Ignite Discussions!"
        />
        <meta
          name="description"
          content="🌐Welcome to Nigdit, where free expression reigns supreme! Dive into a digital realm where censorship takes a back seat, and your opinions matter."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nigdit.men/" />
        <meta
          property="og:title"
          content="Nigdit - Unleash Your Opinions, Ignite Discussions!"
        />
        <meta
          property="og:description"
          content="🌐Welcome to Nigdit, where free expression reigns supreme! Dive into a digital realm where censorship takes a back seat, and your opinions matter."
        />
        <meta property="og:image" content="/nigditLogo2b2b2b1200628.svg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://nigdit.men/" />
        <meta
          property="twitter:title"
          content="Nigdit - Unleash Your Opinions, Ignite Discussions!"
        />
        <meta
          property="twitter:description"
          content="🌐Welcome to Nigdit, where free expression reigns supreme! Dive into a digital realm where censorship takes a back seat, and your opinions matter."
        />
        <meta property="twitter:image" content="/nigditLogo2b2b2b1200628.svg" />
      </Head>
      <div className="dark:text-white dark:bg-backgroundD bg-backgroundL h-[100%] w-[100%] m-0 p-0">
        <FeedDashboard />
      </div>
    </>
  );
};

export default Home;
