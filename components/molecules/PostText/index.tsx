import React, { useState } from 'react';
import Arrow from '../../atoms/Arrow';
import Image from 'next/image';
import moment from 'moment';

type PostTekstowyProps = {
  title: string,
  description: string,
  author: string,
  source: {
    image: string,
    name: string
  },
  votes: number,
  date: Date,
  vote?: "upvote" | "downvote",
}

export default function PostTekstowy({title,description,author,source,votes,date, vote}: PostTekstowyProps) {

  const [upvoteClicked, setUpvoteClicked] = useState<boolean>(vote === "upvote");
  const [downvoteClicked, setDownvoteClicked] = useState<boolean>(vote === "downvote");

  const voteOnPost = (vote: "upvote" | "downvote") => {
    if(vote === "downvote" && !downvoteClicked){
      setDownvoteClicked(true);
      setUpvoteClicked(false);
    }else if(vote === "upvote" && !upvoteClicked){
      setDownvoteClicked(false);
      setUpvoteClicked(true);
    }
  }

  return (
    <div className="h-[10rem] w-[50%] text-left font-normal flex flex-col border-black bg-foregroundL dark:bg-foregroundD border-solid drop-shadow-lg border-2 rounded-[5px] py-2 px-2 overflow-hidden min-w-[25vw] max-h-[50vh] mb-2">
      {/* GÓRNY PASEK AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA */}
      <div className='flex flex-row min-w-[25vw]'>
      <div className="font-['Roboto'] w-7 h-7 min-w-[25px] mr-1">
        <Image src={source.image} width={25} height={25} className="overflow-hidden w-[100%] h-[100%] min-w-7 rounded-full"/>
      </div>
      <p className="font-['Roboto'] dark:text-white text-base">
        {source.name}
      </p>
      <p className="font-['Roboto'] dark:text-[rgba(197,197,197,1)] text-foregroundD ml-2 text-base">
        autor:
      </p>
      <p className="font-['Roboto'] dark:text-white ml-2 text-base">
        {author}
      </p>
      <p className="h-[15px] font-['Roboto'] dark:text-white ml-auto text-base">
        posted {moment(date).fromNow()}
      </p>
      </div>
      <div>
      <Arrow variant='upvote' className='absolute right-4 top-[calc(40%-1.25rem)]' setVote={voteOnPost} clicked={upvoteClicked}/>
      <p className="h-5 w-[31px] font-['Roboto'] dark:text-white absolute right-4 top-[40%] text-base">
        {Intl.NumberFormat('en', {notation: 'compact'}).format(votes)}
      </p>
      <Arrow variant='downvote' className='absolute right-4 top-[calc(40%+1.5rem)]' setVote={voteOnPost} clicked={downvoteClicked}/>
      </div>
      
      {/* CONTENT  */}
      <div>
      <div>
      <p className="h-11 w-[179px] font-['IBM_Plex_Sans'] text-[170%] dark:text-white">
        {title}
      </p>
      </div>
      <div>
      <p className="font-['Roboto'] dark:text-white gradient-mask-b-0 text-xl w-[92%]">
        {description}
      </p>
      </div>
      </div>
    </div>
  )
}
