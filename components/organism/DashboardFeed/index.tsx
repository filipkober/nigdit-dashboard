import React, {useState,useCallback, useRef, useEffect } from "react";
import FilteringBar from "../../molecules/FilteringBar";
import JoindeGroups from "../../molecules/JoinedGroups";
import PostMedia from "../../molecules/PostMedia";
import PostText from "../../molecules/PostText";
import PostService from "../../../util/requests/PostService";
import Post from "../../../models/Post";
import { useSelector } from "react-redux";
import { UserState } from "../../../store/userSlice";


export default function DashboardFeed() 
{
  const postService = new PostService();
  const username = useSelector((state: UserState) => state.user.username)
  const [isLogged, setLogged] = useState(false);  
  const [curAlg, setCurAlg] = useState<string>("Hot");
  const [counter, setCounter] = useState<number>(0);    
  const postsPerScroll = 3;
  const [page, setPage] = useState<number>(0);
  const [posts, setPosts] = useState<Post[]>([]);
  
  //activated when toggled subs-everything
  function clicked(cc: number)
  {
    setCounter(cc)    
  }
  //activated when toggled top-new-hot
  function changeAlg(n: string)
  {
    setCurAlg(n);  
  }
  
  useEffect( () => {    
    setLogged(!!username);
    setPosts([]);  
    setPage(0);
    fetchPosts(false);    
  },[counter, curAlg]);

  async function fetchPosts(more: boolean)
  {
    console.log("FEED FETCH: counter: "+counter+", subbed: "+counter%2+ ", algorithm: "+curAlg+ ", logged: "+isLogged)
    let p : Post[] = []
    if(counter%2 != 0 && isLogged == true)
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
    if(more)
    {
      setPosts((prevPosts) => [...prevPosts, ...p]);
    }
    else
    {
      setPosts(p);
    }    
    setPage(page+postsPerScroll);
  }

  //lvl 10 black magic  
  const observer: any = useRef();
  const lastPostRef = useCallback((node: any) => {     
    if (!node) 
    {
      return;
    }
    console.log(node)
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries =>{
      if(entries[0].isIntersecting)
      {
        console.log("object is visible")        
        fetchPosts(true);   
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
                      let subnigditIcon = "http://localhost:1338"+post.subnigdit.icon.url;
        
                      if(post.type != "Text")
                      {
                        if (post.media)
                          mediaImage = "http://localhost:1338"+post.media.url
                      }
                      try {
                        owner = post.owner.username;
                      }
                      catch {
                        owner = "no owner"
                      }
                      if(post.type == 'Text')
                      {
                        if(posts.length === index+1)
                        {
                          return(
                            <div key={post.id} ref={lastPostRef}>
                              <PostText 
                                title={post.title} 
                                description={post.description || ""} 
                                author={owner} date={post.createdAt || new Date('1939-09-1')} 
                                source={{name: subnigditName, image: subnigditIcon}} 
                                votes={post.votes}
                              />                      
                            </div>                    
                          )
                        }
                        else
                        {
                          return(
                            <div key={post.id}>
                              <PostText 
                                title={post.title} 
                                description={post.description || ""} 
                                author={owner} date={post.createdAt || new Date('1939-09-1')} 
                                source={{name: subnigditName, image: subnigditIcon}} 
                                votes={post.votes}
                              />                      
                            </div>                    
                          )
                        }
                      }
                      else
                      {
                        if(posts.length === index+1)
                        {
                          return(
                            <div key={post.id} ref={lastPostRef}>
                              <PostMedia 
                                title={post.title}
                                media={{type: post.type, source: mediaImage}}
                                author={owner} date={post.createdAt || new Date('1939-09-1')} 
                                source={{name: subnigditName, image: subnigditIcon}} 
                                votes={post.votes}
                              />                      
                            </div>                    
                          )
                        }
                        else
                        {
                          return(
                            <div key={post.id}>
                              <PostMedia 
                                title={post.title}
                                media={{type: post.type, source: mediaImage}}
                                author={owner} date={post.createdAt || new Date('1939-09-1')} 
                                source={{name: subnigditName, image: subnigditIcon}} 
                                votes={post.votes}
                              />                      
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
