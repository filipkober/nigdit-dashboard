import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Post from '../../../models/Post';
import { UserState } from '../../../store/userSlice';
import PostService from '../../../util/requests/PostService';
import FilteringBar from '../../molecules/FilteringBar';
import JoinedGroups from '../../molecules/JoinedGroups';
import PostMedia from '../../molecules/PostMedia';
import PostText from '../../molecules/PostText';
import ReportModal from '../../molecules/ReportModal';

const postsPerScroll = 3;

//Nitroglycerin
export default function DashboardFeed() {
  const postService = new PostService();
  const {username, moderates, admin} = useSelector((state: UserState) => state.user);
  const [isLogged, setLogged] = useState(false);
  const [curAlg, setCurAlg] = useState<string>('Hot');
  const [counter, setCounter] = useState<number>(0);
  const [viewSubscribed, setViewSubscribed] = useState<boolean>(false); //true = subscribed, false = everything
  const [page, setPage] = useState<number>(0);
  const [posts, setPosts] = useState<Post[]>([]);

  //activated when toggled subs-everything
  function clicked(cc: number) {
    setCounter(cc); //easter egg
    setViewSubscribed(!viewSubscribed);
  }

  //activated when toggled top-new-hot
  function changeAlg(n: string) {
    setCurAlg(n);
  }

  useEffect(() => {
    const f = async () => {
      setLogged(!!username);
      setPage(0);
    };
    f();
  }, [viewSubscribed, curAlg, username]);

  useEffect(() => {
    async function fetchPosts() {
      let p: Post[] = [];
      if (viewSubscribed && isLogged == true) {
        switch (curAlg) {
          case 'New':
            p = await postService.newSub(page, postsPerScroll);
            break;
          case 'Top':
            p = await postService.topSub(page, postsPerScroll);
            break;
          case 'Hot':
            p = await postService.hotSub(page, postsPerScroll);
            break;
          default:
            p = await postService.popSub(page, postsPerScroll);
            break;
        }
      } else {
        switch (curAlg) {
          case 'New':
            p = await postService.new(page, postsPerScroll);
            break;
          case 'Top':
            p = await postService.top(page, postsPerScroll);
            break;
          case 'Hot':
            p = await postService.hot(page, postsPerScroll);
            break;
          default:
            p = await postService.pop(page, postsPerScroll);
            break;
        }
      }
      if (page === 0) {
        setPosts(p);
      } else {
        if (page + 3 > posts.length) {
          setPosts([...posts, ...p.slice(0, postsPerScroll)]);
        }
      }
      //console.log("FEED: counter: "+counter+", subbed: "+counter%2+ ", algorithm: "+curAlg+ ", logged: "+isLogged+", page: "+page+", response length: "+p.length)
    }
    fetchPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    setPage(0);
  }, [viewSubscribed, curAlg]);

  //lvl 10 black magic
  const observer: any = useRef();
  const lastPostRef = useCallback(async (node: any) => {
    if (!node) {
      return;
    }
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting) {
        //console.log("FEED: scrolled to next page")
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

  return (
    <>
      <div className="flex flex-row justify-between w-[100%] m-0 p-0 ">
        <div className="tl:w-[22%] w-[0%] min-h-[56px] bg-[rgba(255,0,0,0)] tl:block hidden"></div>
        <div className="tl:w-[56%] w-[100%] min-h-[56px] bg-[rgba(255,255,0,0)]">
          <div className="flex flex-col items-center">
            <div
              id="scrollableDiv"
              className="h-full ls:w-[50vw] tl:w-[56vw] tm:w-[70vw] ts:w-[80vw] ml:w-[90vw] w-[100vw] min-w-[320px]"
            >
              <FilteringBar clicked={clicked} changeAlg={changeAlg} />
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
        </div>
        <div className="tl:w-[22%] w-[0%] bg-[rgba(255,0,255,0)] tl:block hidden">
          <div className="w-[100%] flex flex-row justify-start tl:p-2">
            {isLogged && <JoinedGroups />}
          </div>
        </div>
      </div>
      {counter > 16 ? (
        <div
          style={{ bottom: counter + 'px' }}
          className={
            'fixed w-[100%] h-[100%] bg-ocean bg-repeat-x bg-cover cursor-no-drop translate-y-[90%]'
          }
        ></div>
      ) : (
        <div></div>
      )}
      <ReportModal isOpen={modalReportOpen} contentType={'post'} id={reportedPostId} onClose={() => setModalReportOpen(false)} />
    </>
  );
}
