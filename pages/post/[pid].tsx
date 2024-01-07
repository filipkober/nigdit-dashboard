import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PostExtended from '../../components/molecules/PostExtended';
import SubnigditInfo from '../../components/molecules/SubnigditInfo';
import SubnigditRules from '../../components/molecules/SubnigditRules';
import { StrapiPost, postAdapter } from '../../models/Post';
import examplePostObject from '../../models/postObject';
import PostService from '../../util/requests/PostService';

const PostPage: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query;

  const postService = new PostService();

  const [post, setPost] = useState<StrapiPost>(examplePostObject);

  useEffect(() => {
    const f = async () => {
      const id = pid ? Number(pid) : 0;
      if (!id) return;
      const res = await postService.getOne(id);
      if(res){
        setPost(res);
      }
    };
    f();
  }, [pid]);

  return (
    <div className='flex-grow dark:bg-backgroundD bg-backgroundL'>
      <div className='ls:grid grid-cols-[0.5fr_1.5fr_0.5fr] grid-rows-1 row-start-1 gap-8 p-4'>
      <div className='ls:col-start-2'>
      <PostExtended post={postAdapter(post)}/>
      </div>
      <div className='hidden ls:col-start-3 ls:flex flex-col row-start-1'>
        <SubnigditInfo  subnigdit={post.attributes.subnigdit.data} />
        <SubnigditRules subnigdit={post.attributes.subnigdit.data} />
      </div>
      </div>
    </div>
  );
};

export default PostPage;