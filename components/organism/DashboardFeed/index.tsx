import React, {useState, useRef, useImperativeHandle, forwardRef, useEffect } from "react";
import FilteringBar from "../../molecules/FilteringBar";
import JoindeGroups from "../../molecules/JoinedGroups";
import PostMedia from "../../molecules/PostMedia";
import PostText from "../../molecules/PostText";
import makpaj from '../../../assets/makpaj.svg';
import PostService from "../../../util/requests/PostService";
import Post from "../../../models/Post";
import Image from 'next/image';
import Media from "../../../models/Media";
import { useSelector } from "react-redux";
import { UserState } from "../../../store/userSlice";

export default function DashboardFeed() 
{
  const [isLogged, setLogged] = useState(false);
  const username = useSelector((state: UserState) => state.user.username)

  const postService = new PostService();

  //click counter
  const [counter, setCounter] = useState<number>(0);
  useEffect( () => {    
    fetchPosts() 
  },[counter]);
  
  function clicked(cc: number)
  {
    setCounter(cc)    
  }

  //feed algorithms
  const [curAlg, setCurAlg] = useState<string>("Hot");
  useEffect( () => {
    fetchPosts() 
  },[curAlg]);

  const changeAlg = (n: string) => {
    setCurAlg(n);  
  }

  //posts
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect( () => {
    setLogged(!!username)
    fetchPosts()
  },[]);

  function fetchPosts() 
  {        
    console.log("click counter: "+counter+" "+counter%2)
    console.log("algorithm: "+curAlg)
    console.log("logged: "+isLogged)
    if(counter%2 != 0 && isLogged)
    {
      console.log("displaying: subscribed")
      switch (curAlg)
      {
        case "New":
          postService.newSub().then((data) => {
            console.log(data)
            setPosts(data);
          });
          break;
        case "Top":
          postService.topSub().then((data) => {
            console.log(data)
            setPosts(data);
          });
          break;
        case "Hot":
          postService.hotSub().then((data) => {
            console.log(data)
            setPosts(data);
          });
          break;
        default:
          postService.popSub().then((data) => {
            console.log(data)
            setPosts(data);
          });
          break;
      }
    }
    else
    {
      console.log("displaying: everything")
      switch (curAlg)
      {
        case "New":
          postService.new().then((data) => {
            console.log(data)
            setPosts(data);
          });
          break;
        case "Top":
          postService.top().then((data) => {
            console.log(data)
            setPosts(data);
          });
          break;
        case "Hot":
          postService.hot().then((data) => {
            console.log(data)
            setPosts(data);
          });
          break;
        default:
          postService.pop().then((data) => {
            console.log(data)
            setPosts(data);
          });
          break;
      }
    }
  }
  

  return (
    <>
      <div className="flex flex-row justify-between w-[100%]">
        <div className='tl:w-[22%] w-[0%] h-[6.3vh] min-h-[56px] max-h-[4rem] bg-[rgba(255,0,0,0)] tl:block hidden'></div>
        <div className='tl:w-[56%] w-[100%] h-[6.3vh] min-h-[56px] max-h-[4rem] bg-[rgba(255,255,0,0)]'>
          <div className="flex flex-col items-center">
            <div className="ls:w-[50vw] tl:w-[56vw] tm:w-[70vw] ts:w-[80vw] ml:w-[90vw] w-[100vw] min-w-[320px]">
              <FilteringBar clicked={clicked} changeAlg={changeAlg}/>
              {/* <PostMedia title="gif post" media={{type: "Gif", source: "https://c.tenor.com/hVm01utkmM8AAAAd/maciek-sze%C5%9Bcia%C5%84czyk-maciasek05.gif"}} author="makpaj" date={new Date('2000-09-23')} source={{name: 'n/subnigdit', image:makpaj}} votes={-1500} />
              <PostText title="post" description={"niggadesc"} author="user" date={new Date('2022-09-23')} source={{name: 'n/subnigdit', image:makpaj}} votes={1500}/>
              <PostMedia title="gif post" media={{type: "Video", source: "https://www.w3schools.com/html/mov_bbb.mp4"}} author="makpaj" date={new Date('2000-09-23')} source={{name: 'n/subnigdit', image:makpaj}} votes={-1500} />
               */}
              { !!posts ? 
                posts.map((post) => {
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
                    owner = "[removed]"
                  }
                  if(post.type == 'Text')
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
                })
                :
                <p className="h-[10rem] w-[100%] text-2xl text-center font-normal flex flex-col py-2 px-2 overflow-hidden min-w-[25vw] max-h-[50vh] my-2">No posts found</p>
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
