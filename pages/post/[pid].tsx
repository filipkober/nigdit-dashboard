import type { NextPage } from 'next';
import Image from 'next/image';
import makpaj from '../../assets/makpaj.svg';
import { useRouter } from 'next/router';
import PostExtended from '../../components/molecules/PostExtended';
import Comment from '../../components/molecules/Comment';
import SubnigditInfo from '../../components/molecules/SubnigditInfo';
import SubnigditRules from '../../components/molecules/SubnigditRules';

const PostPage: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <>
      <div className="">
        <div className="flex flex-row place-content-center gap-x-[3vw] ">
          <div className="flex grow my-[5vh] lg:mx-[10vh]">
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
          </div>

          {/* Prawe bloki */}
          <div className="lg:flex flex-col h-[100%] hidden ">
            <div className="">
              <SubnigditInfo id={1} />
            </div>
            <div className="">
              <SubnigditRules id={1} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;
