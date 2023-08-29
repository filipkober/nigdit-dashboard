import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Post from "../../../models/Post";
import { UserState } from "../../../store/userSlice";
import PostService from "../../../util/requests/PostService";
import FilteringBar from "../../molecules/FilteringBar";
import JoindeGroups from "../../molecules/JoinedGroups";
import PostMedia from "../../molecules/PostMedia";
import PostText from "../../molecules/PostText";

const postsPerScroll = 3;

//Nitroglycerin
export default function DashboardFeed()
{
  const postService = new PostService();
  const username = useSelector((state: UserState) => state.user.username)
  const [isLogged, setLogged] = useState(false);
  const [curAlg, setCurAlg] = useState<string>("Hot");
  const [counter, setCounter] = useState<number>(0);
  const [viewSubscribed, setViewSubscribed] = useState<boolean>(false); //true = subscribed, false = everything
  const [page, setPage] = useState<number>(0);
  const [posts, setPosts] = useState<Post[]>([]);
  
  //activated when toggled subs-everything
  function clicked(cc: number)
  {
    setCounter(cc)  //easter egg
    setViewSubscribed(!viewSubscribed)
  }

  //activated when toggled top-new-hot
  function changeAlg(n: string)
  {
    setCurAlg(n);
  }

  useEffect( () => {
    const f = async () => {
    setLogged(!!username);
    setPage(0);
    };
    f();
  },[viewSubscribed, curAlg]);

  useEffect(() => {
    async function fetchPosts()
    {
      let p : Post[] = []
      if(viewSubscribed && isLogged == true)
      {
        switch (curAlg)
        {
          case "New":
            p = await postService.newSub(page, postsPerScroll)
            break;
          case "Top":
            p = await postService.topSub(page, postsPerScroll)
            break;
          case "Hot":
            p = await postService.hotSub(page, postsPerScroll)
            break;
          default:
            p = await postService.popSub(page, postsPerScroll)
            break;
        }
      }
      else
      {
        switch (curAlg)
        {
          case "New":
            p = await postService.new(page, postsPerScroll)
            break;
          case "Top":
            p = await postService.top(page, postsPerScroll)
            break;
          case "Hot":
            p = await postService.hot(page, postsPerScroll)
            break;
          default:
            p = await postService.pop(page, postsPerScroll)
            break;
        }
      }
      if(page === 0 )
      {
        setPosts(p);
      }
      else
      {
        if(page + 3 > posts.length)
        {
          setPosts([...posts, ...p.slice(0,postsPerScroll)]);
        }
      }
      //console.log("FEED: counter: "+counter+", subbed: "+counter%2+ ", algorithm: "+curAlg+ ", logged: "+isLogged+", page: "+page+", response length: "+p.length)
    }
    fetchPosts();
  }, [page]);

  useEffect(() => {
    setPage(0);
  }, [viewSubscribed, curAlg]);

  //lvl 10 black magic
  const observer: any = useRef();
  const lastPostRef = useCallback(async (node: any) => {
    if (!node)
    {
      return;
    }
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(async entries =>{
      if(entries[0].isIntersecting)
      {
        //console.log("FEED: scrolled to next page")
        setPage((prevPage) => prevPage + postsPerScroll);
      }
    })
    observer.current.observe(node)
  },[])

  return (
    <>
      <div className="flex flex-row justify-between w-[100%]" >
        <div className='tl:w-[22%] w-[0%] h-[6.3vh] min-h-[56px] max-h-[4rem] bg-[rgba(255,0,0,0)] tl:block hidden'></div>
        <div className='tl:w-[56%] w-[100%] h-[6.3vh] min-h-[56px] max-h-[4rem] bg-[rgba(255,255,0,0)]'>
          <div className="flex flex-col items-center">
            <div id="scrollableDiv" className="h-full ls:w-[50vw] tl:w-[56vw] tm:w-[70vw] ts:w-[80vw] ml:w-[90vw] w-[100vw] min-w-[320px]">
              <FilteringBar clicked={clicked} changeAlg={changeAlg}/>
                {
                    posts.map((post, index) => {
                      let owner = "";
                      let mediaImage = "";
                      let subnigditName = "n/"+post.subnigdit.name;
                      let subnigditIcon = process.env.NEXT_PUBLIC_STRAPI_URL+post.subnigdit.icon.url;
        
                      if(post.type != "Text")
                      {
                        if (post.media)
                          mediaImage = process.env.NEXT_PUBLIC_STRAPI_URL+post.media.url
                      }
                      owner = post.owner?.username ? post.owner.username : "[removed]";
                      if(post.type == 'Text')
                      {
                        if(posts.length === index+1)
                        {
                          return(
                            <div key={(post.id)} ref={lastPostRef}>
                              <PostText
                                title={post.title}
                                description={post.description || ""}
                                author={owner} date={post.createdAt || new Date('1939-09-1')}
                                source={{ name: subnigditName, image: subnigditIcon }}
                                votes={post.votes} id={post.id}                              />                      
                            </div>                    
                          )
                        }
                        else
                        {
                          return(
                            <div key={(post.id)}>
                              <PostText
                                title={post.title}
                                description={post.description || ""}
                                author={owner} date={post.createdAt || new Date('1939-09-1')}
                                source={{ name: subnigditName, image: subnigditIcon }}
                                votes={post.votes} id={post.id}                              />                      
                            </div>                    
                          )
                        }
                      }
                      else
                      {
                        if(posts.length === index+1)
                        {
                          return(
                            <div key={(post.id)} ref={lastPostRef}>
                              <PostMedia
                                title={post.title}
                                media={{ type: post.type, source: mediaImage }}
                                author={owner} date={post.createdAt || new Date('1939-09-1')}
                                source={{ name: subnigditName, image: subnigditIcon }}
                                votes={post.votes} id={post.id}                              />                      
                            </div>                    
                          )
                        }
                        else
                        {
                          return(
                            <div key={(post.id)}>
                              <PostMedia
                                title={post.title}
                                media={{ type: post.type, source: mediaImage }}
                                author={owner} date={post.createdAt || new Date('1939-09-1')}
                                source={{ name: subnigditName, image: subnigditIcon }}
                                votes={post.votes} id={post.id}                              />                      
                            </div>                    
                          )
                        }
                      }
                    })
                }
            </div>
          </div>
        </div>
        <div className='tl:w-[22%] w-[0%] bg-[rgba(255,0,255,0)] tl:block hidden'>
          <div className="w-[100%] h-[100%] flex flex-row justify-start tl:p-2">
            <JoindeGroups/>
          </div>
        </div>
      </div>
      {counter > 16 ? (
          <div style={{bottom: counter+"px"}} className={"fixed w-[100%] h-[100%] bg-ocean bg-repeat-x bg-cover cursor-no-drop translate-y-[90%]"}>
          </div>
        ) : (
          <div></div>
        )}
    </>
  )
}
