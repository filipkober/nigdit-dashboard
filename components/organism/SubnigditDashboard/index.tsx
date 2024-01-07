import { toLower } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Post from '../../../models/Post';
import { StrapiSubnigdit } from '../../../models/Subnigdit';
import { UserState } from '../../../store/userSlice';
import PostService from '../../../util/requests/PostService';
import SubnigditService from '../../../util/requests/SubnigditService';
import CreatePostBlock from '../../molecules/CreatePostBlock';
import DashboardHeader from '../../molecules/DashboardHeader';
import FilteringBar from '../../molecules/FilteringBar';
import PostMedia from '../../molecules/PostMedia';
import PostText from '../../molecules/PostText';
import SubnigditRules from '../../molecules/SubnigditRules';
import TabSelector from '../../molecules/TabSelector';

const postsPerScroll = 3;

export default function SubnigditDashboard()
{
  const postService = new PostService();
  
  const [isLogged, setLogged] = useState(false);
  const {username, moderates, admin} = useSelector((state: UserState) => state.user);
  
  const subnigditService = new SubnigditService();
  const [selected, setSelected] = useState<number>(0);
  const [thisSubnigdit, setThisSubnigdit] = useState<StrapiSubnigdit | null>(null);
  //display
  const [viewMyPosts, setViewMyPosts] = useState<boolean>(false); //true = my posts, false = everything
  const [curAlg, setCurAlg] = useState<string>('Hot');
  const [page, setPage] = useState<number>(0);
  const [posts, setPosts] = useState<Post[]>([]);

  
  let address = window.location.pathname
  const split = address.split('/');
  const subnigditName = split[split.length - 1];

  function clicked(cc: number)
  {
    if(isLogged)
    {
      setViewMyPosts(!viewMyPosts);
    }
    console.log("clicked "+viewMyPosts)
  }

  function changeAlg(n: string)
  {
    setCurAlg(n);
    console.log("changed alg to "+n)
  }
  
  useEffect(() => {
    setPage(0);
  }, [viewMyPosts, curAlg]);

  useEffect(() => {
    let sn = thisSubnigdit ? thisSubnigdit.id : null;
    async function fetchPosts()
    {
      if(thisSubnigdit == null)
      {
        setLogged(!!username)
        const response = await subnigditService.getBySlug(subnigditName,true)
        setThisSubnigdit(response[0]);
        sn = response[0].id
      }
      let p: Post[] = [];
      if (viewMyPosts && isLogged == true)
      {
        p = await postService.getPosts(page, postsPerScroll,toLower(curAlg),"My",sn); //replace null with id
      }
      else
      {
        p = await postService.getPosts(page, postsPerScroll,toLower(curAlg),"",sn);
      }
      if (page === 0)
      {
        setPosts(p);
      }
      else
      {
        if (page + 3 > posts.length) {
          setPosts([...posts, ...p.slice(0, postsPerScroll)]);
        }
      }
    }
    fetchPosts();
  }, [page,curAlg,viewMyPosts]);

  const observer: any = useRef();
  const lastPostRef = useCallback(async (node: any) => {
    if (!node)
    {
      return;
    }
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting)
      {
        //scrolled to the next page
        setPage((prevPage) => prevPage + postsPerScroll);
      }
    });
    observer.current.observe(node);
  }, []);
  
  const [modalReportOpen, setModalReportOpen] = useState<boolean>(false);
  const [reportedPostId, setReportedPostId] = useState<number>(0);

  const toggleModalReport = (id: number) => {
    setModalReportOpen(true);
    setReportedPostId(id);
  }
  
  const content = (
    <div className="ls:w-[50vw] flex flex-col font-['Roboto']">
      <div className="mb-[1vh]">
        <FilteringBar
          showSubscribed={false}
          clicked={clicked}
          changeAlg={changeAlg}
        />
        {posts.map((post, index) => {
        let isAdmin = false;
        if(admin) isAdmin = true;
        else if(moderates?.find(sub => sub.id === post.subnigdit.id)) isAdmin = true;

        if (post.type == 'Text') {
          return (
            <div
              key={post.id}
              ref={posts.length === index + 1 ? lastPostRef : undefined}
              style={{
                zIndex: 5 + (posts.length - index),
                position: 'relative',
              }}
            >
              <PostText post={post} showReportModal={toggleModalReport} isAdmin={isAdmin} />
            </div>
          );
        } else {
          return (
            <div
              key={post.id}
              ref={posts.length === index + 1 ? lastPostRef : undefined}
              style={{
                zIndex: 5 + (posts.length - index),
                position: 'relative',
              }}
            >
              <PostMedia post={post} showReportModal={toggleModalReport} isAdmin={isAdmin} />
            </div>
          );
        }
        })}
      </div>
    </div>
  );

  return (
    <>
      <div className="h-full">
        <div className="">
          {
            thisSubnigdit === null ? (""):(
              <DashboardHeader subnigdit={thisSubnigdit} isLogged={isLogged}/>
            )
          }
        </div>

        {/*Mobile View*/}
        <div className="ls:hidden inline">
          <TabSelector
            selected={selected}
            setSelected={setSelected}
            tabs={['Posts', 'Other']}
          />
          {selected === 0 ? (
            content
          ) : (
            <div className="ls:hidden inline">
              <div className="flex flex-col flex-wrap items-center ">
                <div className="w-[40vw] min-w-[300px] my-2 mx-2">
                  <CreatePostBlock subnigditSlug={subnigditName} />
                </div>
                <div className="w-[40vw] min-w-[300px] my-2 mx-2">
                  {thisSubnigdit ? <SubnigditRules subnigdit={thisSubnigdit} /> : ""}
                </div>
              </div>
            </div>
          )}
        </div>

        {/*Desktop View*/}
        <div className="hidden ls:inline">
          <div className="flex flex-row justify-around">
            <div className="w-[20vw] my-2">
              <CreatePostBlock subnigditSlug={subnigditName} />
            </div>
            {content}
            <div className="w-[20vw] my-2">
              {thisSubnigdit ? <SubnigditRules subnigdit={thisSubnigdit} /> : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
