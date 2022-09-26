import type { NextPage } from 'next';
import Image from 'next/image';
import makpaj from '../../assets/makpaj.svg';
import { useRouter } from 'next/router';
import PostExtended from '../../components/molecules/PostExtended';

const PostPage: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <>
      <div>
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
          votes={0}
          date={new Date('2005-04-22')}
        />
      </div>
    </>
  );
};

export default PostPage;
