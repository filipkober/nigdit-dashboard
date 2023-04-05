import type { NextPage } from 'next';
import Image from 'next/image';
import makpaj from '../../assets/makpaj.svg';
import { useRouter } from 'next/router';
import PostExtended from '../../components/molecules/PostExtended';
import Comment from '../../components/molecules/Comments';
import SubnigditInfo from '../../components/molecules/SubnigditInfo';
import SubnigditRules from '../../components/molecules/SubnigditRules';
import Navbar from '../../components/molecules/Navbar';

const PostPage: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <>
      <Navbar/>
      <div className="dark:bg-backgroundD bg-backgroundL m-0 ls:flex">
        <div className="ls:gap-x-[3vw] ls:ml-[5vh] my-[5vh] ">
          <PostExtended
            title={'Makpie Gej'}
            author={'EnslaveAfrica'}
            // description={'Makpie ssie'}
            media={{
              source: 'https://source.unsplash.com/random/100x50',
              type: 'image',
            }}
            source={{
              image: makpaj,
              name: 'n/jebaniemakpie',
              description: 'tutaj jebiemy makpaja',
              rules: [
                'Jebać makpie',
                'Jebać makpie',
                'Jebać makpie',
                'Jebać makpie',
                'Jebać makpie',
                'Jebać makpie',
                'Jebać makpie',
                'Jebać makpie',
                'Jebać makpie',
                'Jebać makpie',
              ],
              createdAt: new Date('2001-09-11'),
              memberCount: 7_000_000_000,
            }}
            votes={504}
            date={new Date('2005-04-22')}
          />
          {/* Prawe bloki */}
        </div>
        <div className="my-[5vh] hidden ls:block ls:mx-[5vh] w-[30%]">
          <SubnigditInfo id={1} />

          <SubnigditRules/>
        </div>
      </div>
    </>
  );
};

export default PostPage;
