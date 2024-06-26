import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import error404svg from '../assets/error404.svg';

export default function Custom404() {
  const router = useRouter();
  const { asPath } = router;

  let errorMessage =
    'The page with this address does not exist. Check the URL and try again.';

  if (asPath.startsWith('/error=404?type=/post/')) {
    errorMessage =
      'Post with this ID does not exist. Check the URL and try again.';
  } else if (asPath.startsWith('/n/')) {
    errorMessage =
      'Subnigdit with this name does not exist. Check the URL and try again.';
  }

  return (
    <div className="flex flex-col items-center justify-center h-[calc(90vh)] text-center">
      <Head>
        <title>Error 404</title>
        <link rel="icon" href={'/nigditLogo.svg'}/>
        <meta name="description" content="Nigdit error page."/>
      </Head>
      <Image src={error404svg} alt='404' width={600} height={400}/>
      <h1 className="text-4xl font-bold mt-8">404 Error</h1>
      <p className="text-lg text-gray-500 mt-4">{errorMessage}</p>
      <Link className="text-blue-500 hover:underline mt-8" href="/">
        Go back to home page
      </Link>
    </div>
  );
}