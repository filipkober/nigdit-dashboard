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
import Media, { emptyMedia } from '../../models/Media';
import { subnigditAdapter } from '../../models/Subnigdit';
import { exampleComment } from '../../models/Comment';

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
            icon: emptyMedia,
            subscribers: {
              data: [],
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

  return (
  <>
    <Navbar />
    <div className='flex items-center justify-center'>
      <div className="flex flex-nowrap m-10 gap-10 w-2/3">
        <div className='flex-initial grow' >
          <PostExtended post={postAdapter(post)}/>
        </div>
        <div className='flex-col flex gap-x-5'>          
          <div className='w-64' >
            <SubnigditInfo  subnigdit={subnigditAdapter(post.attributes.subnigdit.data)} />
          </div>
          <div className=''>
            <SubnigditRules />
          </div>
        </div>
      </div>
    </div>
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