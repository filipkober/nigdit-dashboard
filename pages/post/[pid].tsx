import type { NextPage } from 'next';
import Image from 'next/image';
import makpaj from '../../assets/makpaj.svg';
import { useRouter } from 'next/router';
import PostExtended from '../../components/molecules/PostExtended';
import Comment from '../../components/molecules/Comment';
import SubnigditInfo from '../../components/molecules/SubnigditInfo';
import SubnigditRules from '../../components/molecules/SubnigditRules';
import Navbar from '../../components/molecules/Navbar';

const PostPage: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <div className="dark:bg-backgroundD bg-backgroundL w-[100%] m-0 h-screen">
      <Navbar
        searchbar={{
          value: undefined,
          onChange: function (str: string): void {
            throw new Error('Function not implemented.');
          },
        }}
      />
      <div className="ls:gap-x-[3vw] ls:mx-[10vh] my-[5vh] flex flex-row">
          <PostExtended
            title={'Makpie Gej'}
            author={'EnslaveAfrica'}
            description={'Makpie ssie'}
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

        <div className="my-[5vh]">
          <SubnigditInfo id={1} />

          <SubnigditRules id={1} />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
