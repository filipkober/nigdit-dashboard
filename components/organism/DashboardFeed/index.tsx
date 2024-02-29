import { toLower } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Post from '../../../models/Post';
import { UserState } from '../../../store/userSlice';
import PostService from '../../../util/requests/PostService';
import CreateSubButton from '../../atoms/CreateSubButton';
import FilteringBar from '../../molecules/FilteringBar';
import JoinedGroups from '../../molecules/JoinedGroups';
import PostMedia from '../../molecules/PostMedia';
import PostText from '../../molecules/PostText';
import ReportModal from '../../molecules/ReportModal';

const postsPerScroll = 3;

export default function DashboardFeed() {
  const postService = new PostService();
  const { username, moderates, admin, id } = useSelector(
    (state: UserState) => state.user
  );
  const [isLogged, setLogged] = useState(false);
  const [curAlg, setCurAlg] = useState<string>('Hot');
  const [counter, setCounter] = useState<number>(0);
  const [viewSubscribed, setViewSubscribed] = useState<boolean>(false); //true = subscribed, false = everything
  const [page, setPage] = useState<number>(0);
  const [posts, setPosts] = useState<Post[]>([]);

  //activated when toggled subs-everything
  function clicked(cc: number) {
    setCounter(cc); //easteregg
    setViewSubscribed(!viewSubscribed);
  }

  //activated when toggled top-new-hot
  function changeAlg(n: string) {
    console.log(n);
    setCurAlg(n);
  }

  useEffect(() => {
    const f = async () => {
      setLogged(!!username);
      setPage(0);
    };
    f();
  }, [username]);

  useEffect(() => {
    async function fetchPosts() {
      let p: Post[] = [];
      if (viewSubscribed && isLogged == true) {
        p = await postService.getPosts(
          page,
          postsPerScroll,
          toLower(curAlg),
          'Sub',
          null
        );
      } else {
        p = await postService.getPosts(
          page,
          postsPerScroll,
          toLower(curAlg),
          '',
          null
        );
      }
      if (page === 0) {
        setPosts(p);
      } else {
        if (page + 3 > posts.length) {
          setPosts([...posts, ...p.slice(0, postsPerScroll)]);
        }
      }
    }
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, curAlg, viewSubscribed]);

  useEffect(() => {
    setPage(0);
  }, [viewSubscribed, curAlg]);

  const observer: any = useRef();
  const lastPostRef = useCallback(async (node: any) => {
    if (!node) {
      return;
    }
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting) {
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
  };

  const isOwner = !!useSelector(
    (values: UserState) => values.user.owned_subnigdit
  );
  const hasJoined = !!useSelector(
    (values: UserState) => values.user.subnigdits?.length
  );

  return (
    <>
      <div className="flex flex-row justify-between w-[100%] m-0 p-0 ">
        <div className="tl:w-[22%] w-[0%] min-h-[56px] bg-[rgba(255,0,0,0)] tl:block hidden "></div>
        <div className="tl:w-[56%] w-[100%] min-h-[56px] bg-[rgba(255,255,0,0)] px-1 ">
          <div className="flex flex-col items-center w-[100%]">
            <div
              id="scrollableDiv"
              className="h-full ls:w-[50vw] tl:w-[56vw] tm:w-[70vw] ts:w-[80vw] ml:w-[90vw] w-[100vw] min-w-[320px] ml:p-0 p-2"
            >
              <FilteringBar
                clicked={clicked}
                changeAlg={changeAlg}
                showSubscribed={true}
              />
              {posts.map((post, index) => {
                let isAdmin = false;
                let isOwner = false;
                if (admin) isAdmin = true;
                else if (moderates?.find((sub) => sub.id === post.subnigdit.id))
                  isAdmin = true;

                if ((id !== undefined) && (post.owner.id == id)) isOwner = true;

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
                      <PostText
                        post={post}
                        showReportModal={toggleModalReport}
                        isAdmin={isAdmin}
                        isOwner={isOwner}
                      />
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
                      <PostMedia
                        post={post}
                        showReportModal={toggleModalReport}
                        isAdmin={isAdmin}
                        isOwner={isOwner}
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
        <div className="tl:w-[22%] w-[0%] bg-[rgba(255,0,255,0)] tl:block hidden">
          {isLogged && hasJoined && (
            <div className="w-[100%] flex flex-row justify-start tl:pt-2 p-0 m-0">
              <JoinedGroups />
            </div>
          )}
          {!isOwner && isLogged && (
            <div className="w-[100%] ls:w-[80%] flex flex-row justify-center tl:pt-2 p-0 m-0">
              <CreateSubButton/>
            </div>
          )}
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
        <div className="p-0 m-0 w-0"></div>
      )}
      <ReportModal
        isOpen={modalReportOpen}
        contentType={'post'}
        id={reportedPostId}
        onClose={() => setModalReportOpen(false)}
      />
    </>
  );
}
