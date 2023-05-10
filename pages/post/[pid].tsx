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
      <div className="">
        <div className="dark:bg-backgroundD bg-backgroundL flex flex-wrap m-10 gap-10 ">
          <div className=' bg-cyan-300 flex-auto ' >1</div>
          <div className='flex-col flex-auto flex gap-5'>          
            <div className=' bg-red-600 flex-auto' >2</div>
            <div className=' bg-lime-400 flex-auto' >3</div>
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