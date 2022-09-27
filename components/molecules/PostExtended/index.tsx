import moment from 'moment';
import Image from 'next/image';
import { useState } from 'react';
import Arrow from '../../atoms/Arrow';

type PostExtendedProps = {
  title: string;
  description?: string;
  media?: {
    source: string;
    type: 'video' | 'image' | 'gif';
  };
  author: string;
  source: {
    image: string;
    name: string;
    description: string;
    rules: string[];
    createdAt: Date;
    memberCount: number;
  };
  comments?: number[];
  votes: number;
  date: Date;
  vote?: 'upvote' | 'downvote';
};

export default function PostExtended({
  title,
  description,
  media,
  author,
  source,
  comments,
  votes,
  date,
  vote,
}: PostExtendedProps) {
  const [upvoteClicked, setUpvoteClicked] = useState<boolean>(
    vote === 'upvote'
  );
  const [downvoteClicked, setDownvoteClicked] = useState<boolean>(
    vote === 'downvote'
  );

  const voteOnPost = (vote: 'upvote' | 'downvote') => {
    if (vote === 'downvote' && !downvoteClicked) {
      setDownvoteClicked(true);
      setUpvoteClicked(false);
    } else if (vote === 'upvote' && !upvoteClicked) {
      setDownvoteClicked(false);
      setUpvoteClicked(true);
    }
  };

  return (
    <>
      <div className="w-[50%] text-left font-normal flex flex-col border-black bg-foregroundL dark:bg-foregroundD border-solid drop-shadow-lg border-2 rounded-[5px] py-2 px-2 overflow-hidden min-w-[25vw] max-h-[50vh] mb-2">
        {/* GÓRNY PASEK AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA */}
        <div className="flex flex-row min-w-[25vw]">
          <div className="font-['Roboto'] w-7 h-7 min-w-[25px] mr-1">
            <Image
              src={source.image}
              width={25}
              height={25}
              className="overflow-hidden w-[100%] h-[100%] min-w-7 rounded-full"
            />
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
          <Arrow
            variant="upvote"
            className="absolute right-4 top-[calc(4.25rem-1.25rem)]"
            setVote={voteOnPost}
            clicked={upvoteClicked}
          />
          <p className="h-5 font-['Roboto'] dark:text-white absolute right-4 top-[4.25rem] text-base">
            {Intl.NumberFormat('en', { notation: 'compact' }).format(votes)}
          </p>
          <Arrow
            variant="downvote"
            className="absolute right-4 top-[calc(4.25rem+1.5rem)]"
            setVote={voteOnPost}
            clicked={downvoteClicked}
          />
        </div>

        {/* CONTENT  */}
        <div>
          <div>
            <p className="h-11 w-[179px] font-['IBM_Plex_Sans'] text-[170%] dark:text-white">
              {title}
            </p>
          </div>
          <div>
            {description ? (
              <div>
                <p className="font-['Roboto'] dark:text-white text-xl w-[92%]">
                  {description}
                </p>
              </div>
            ) : media && (media.type == 'image' || media.type == 'gif') ? (
              <Image
                src={media.source}
                alt={title + ' image or gif'}
                width={880}
                height={880}
                objectFit="none"
                loader={(img) => media.source}
                objectPosition={'50% 0'}
              />
            ) : (
              <video controls className="w-[92%]">
                <source src={media!.source} />
              </video>
            )}
          </div>
        </div>
        <div className="flex flex-row font-['Roboto'] dark:text-white text-xl mt-5">
          {/* chujstwo pod contenetm */}
          {/* ikonka comments */}
          <p>666 Comments</p>

          <div className="flex flex-row ml-auto">
            {' '}
            {/* ikonka share */}
            <p className="mr-5">Share</p>
            {/* ikonka report sus */}
            <p>Report</p>
          </div>
        </div>
        <div>{/* KOMETNARZE */}
        <textarea className='px-1 w-[100%] resize-none bg-accentL dark:bg-accentD text-black dark:text-white placeholder:text-black dark:placeholder:text-white placeholder:italic' cols={50} rows={5} placeholder="Put your racist opinion here..."></textarea>
        
        <button className='p-1 rounded ml-auto flex bg-accentL dark:bg-accentD border-solid border-black dark:border-white text-black dark:text-white'>Comment</button>
        
        </div>
      </div>
    </>
  );
}
