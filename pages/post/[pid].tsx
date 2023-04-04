import type { NextPage } from 'next';
import Image from 'next/image';
import makpaj from '../../assets/makpaj.svg';
import PostExtended from '../../components/molecules/PostExtended';
import { useRouter } from 'next/router';
import Comment from '../../components/molecules/Comments';
import SubnigditInfo from '../../components/molecules/SubnigditInfo';
import SubnigditRules from '../../components/molecules/SubnigditRules';
import Navbar from '../../components/molecules/Navbar';
import PostService from '../../util/requests/PostService';
import { useEffect, useState } from 'react';
import { StrapiPost, postAdapter } from '../../models/Post';
import Media, { emptyMedia } from '../../models/Media';

const PostPage: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query;

  const postService = new PostService();

  const [post, setPost] = useState<StrapiPost>({
    id: 0,
    attributes: {
      Title: '',
      Description: '',
      Votes: 0,
      Reports: 0,
      createdAt: new Date(),
      Type: 'Text',
      nsfw: false,
      owner: {
        data: {
          id: 0,
          attributes: {
            username: '',
            email: '',
          },
        },
      },
      subnigdit: {
        data: {
          id: 0,
          attributes: {
            name: '',
            description: '',
            createdAt: new Date(),
            reports: 0,
            icon: emptyMedia,
          }
        }
      }
    },
  });

  useEffect(() => {
    const f = async () => {
      const id = pid ? Number(pid) : 0;
      if (!id) return;
      const res = await postService.getOne(id);
      setPost(res);
    };
    f();
  }, [pid]);

  return (
    <>
      <Navbar
        searchbar={{
          value: undefined,
          onChange: function (str: string): void {
            throw new Error('Function not implemented.');
          },
        }}
      />
      <div className="dark:bg-backgroundD bg-backgroundL m-0 ls:flex">
        <div className="ls:gap-x-[3vw] ls:ml-[5vh] my-[5vh] ">
          <PostExtended
            post = {postAdapter(post)}

            // title={}
            // author={post.attributes.owner.data.attributes.username}
            // description={post.attributes.Description}
            // media={{
            //   source: process.env.NEXT_PUBLIC_STRAPI_URL! + post.attributes.Media?.data.attributes.formats.large.url,
            //   type: post.attributes.Type
            // }}
            // source={{
            //   image: makpaj,
            //   name: 'n/jebaniemakpie',
            //   description: 'tutaj jebiemy makpaja',
            //   rules: [
            //     'Jebać makpie',
            //     'Jebać makpie',
            //     'Jebać makpie',
            //     'Jebać makpie',
            //     'Jebać makpie',
            //     'Jebać makpie',
            //     'Jebać makpie',
            //     'Jebać makpie',
            //     'Jebać makpie',
            //     'Jebać makpie',
            //   ],
            //   createdAt: new Date('2001-09-11'),
            //   memberCount: 7_000_000_000,
            // }}
            // votes={post.attributes.Votes}
            // date={new Date('2005-04-22')}
          />
          {/* Prawe bloki */}
        </div>
        <div className="my-[5vh] hidden ls:block ls:mx-[5vh] w-[30%]">
          <SubnigditInfo id={1} />

          <SubnigditRules />
        </div>
      </div>
    </>
  );
};

export default PostPage;
