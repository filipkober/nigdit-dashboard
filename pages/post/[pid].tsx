import type { NextPage } from 'next';
import Image from 'next/image';
import makpaj from '../../assets/makpaj.svg';
import PostExtended from '../../components/molecules/PostExtended';
import { useRouter } from 'next/router';
import SubnigditInfo from '../../components/molecules/SubnigditInfo';
import SubnigditRules from '../../components/molecules/SubnigditRules';
import Navbar from '../../components/molecules/Navbar';
import PostService from '../../util/requests/PostService';
import { useEffect, useState } from 'react';
import { StrapiPost, postAdapter } from '../../models/Post';
import Media, { emptyMedia, emptyStrapiMedia } from '../../models/Media';
import { subnigditAdapter } from '../../models/Subnigdit';
import { exampleComment } from '../../models/Comment';

const PostPage: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query;

  const postService = new PostService();

  const [post, setPost] = useState<StrapiPost>({
    id: 0,
    attributes: {
      title: '',
      description: '',
      votes: 0,
      reports: 0,
      createdAt: new Date(),
      type: 'Text',
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
      comments: {
        data: [],
      },
      subnigdit: {
        data: {
          id: 0,
          attributes: {
            name: '',
            description: '',
            createdAt: new Date(),
            reports: 0,
            icon: emptyStrapiMedia,
            subscribers: {
              data: {
                attributes:{
                  count: 0
                }
              }
            },
          },
        },
      },
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

  const adaptedSubnigdit = subnigditAdapter(post.attributes.subnigdit.data);

  return (
    <>
      <Navbar />
      <PostExtended post={postAdapter(post)} />
<SubnigditInfo  subnigdit={adaptedSubnigdit} />
<SubnigditRules subnigdit={adaptedSubnigdit} />
    </>
  );
};

export default PostPage;

// post ext ls:ml-[5vh] my-[5vh]
// s info div: my-[5vh] hidden ls:inline ls:mx-[5vh]
/*               
<PostExtended post={postAdapter(post)} />
<SubnigditInfo  subnigdit={subnigditAdapter(post.attributes.subnigdit.data)} />
<SubnigditRules />
*/