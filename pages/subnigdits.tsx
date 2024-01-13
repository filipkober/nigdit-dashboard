import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import CreateSubButton from '../components/atoms/CreateSubButton';
import JoinedGroups, {
  JoinedGroupsMobile,
} from '../components/molecules/JoinedGroups';
import { UserState } from '../store/userSlice';

const Subnigdits: NextPage = () => {
  const isLogged = !!useSelector((state: UserState) => state.user.username);
  const isOwner = !!useSelector(
    (values: UserState) => values.user.owned_subnigdit
  );
  const hasJoined = !!useSelector(
    (values: UserState) => values.user.subnigdits?.length
  );
  const router = useRouter();

  if (!isLogged) {
    router.push('/login?redirect=my-account');
  }

  return (
    <>
      <div>
        <Head>
          <title>Subnigdits</title>
          <link rel="icon" href={'/nigditLogo.svg'} />
          <meta name="description" content="Your communities." />
        </Head>
        {(hasJoined && (
          <div>
            <div className="flex ts:hidden justify-center mt-10 mx-2">
              <JoinedGroupsMobile />
            </div>
            <div className="ts:flex hidden justify-center mt-10 ts:mx-[5%] cm:mx-[20%]">
              <JoinedGroups />
            </div>
          </div>
        )) || (
          <div className="flex justify-center mt-10 font-bold">
            You haven't joined any subnigdit yet.
          </div>
        )}

        {!isOwner && (
          <div className="flex justify-center mt-10">
            <CreateSubButton />
          </div>
        )}
      </div>
    </>
  );
};

export default Subnigdits;
