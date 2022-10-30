import Arrow from '../Arrow';
import Image from 'next/image';
import React, { useState } from 'react';

type ReplyProps = {
  vote?: 'upvote' | 'downvote';
  id: number;
  votes: number;
  pfp: string;
  nick: string;
  content: string;
  responseTo: number;
};

export default function Reply({
  id,
  votes,
  pfp,
  nick,
  content,
  vote,
  responseTo,
}: ReplyProps) {
  const [downvoteClicked, setDownvoteClicked] = useState<boolean>(
    vote === 'downvote'
  );

  const [upvoteClicked, setUpvoteClicked] = useState<boolean>(
    vote === 'upvote'
  );

  const voteOnReply = (vote: 'upvote' | 'downvote') => {
    if (vote === 'downvote' && !downvoteClicked) {
      setDownvoteClicked(true);
      setUpvoteClicked(false);
    } else if (vote === 'upvote' && !upvoteClicked) {
      setDownvoteClicked(false);
      setUpvoteClicked(true);
    }
  };

  return (
    <div>
      <div className="flex flex-row">
        <div className="mr-1">
          <Image
            src={pfp}
            width={25}
            height={25}
            objectFit="cover"
            className="overflow-hidden w-[100%] h-[100%] rounded-full "
          />
        </div>

        <p className="font-['Roboto'] font-semibold dark:text-white text-base">
          {nick}
        </p>
      </div>
      <div className="ml-[30px]">
        <p className="font-['Roboto'] font-light dark:text-white text-base">
          {content}
        </p>
      </div>
      <div className="flex flex-row mt-2">
        <div className="flex flex-row">
          <Arrow
            variant="upvote"
            className=""
            setVote={voteOnReply}
            clicked={upvoteClicked}
          />
          <p className="font-['Roboto'] dark:text-white text-base">
            {Intl.NumberFormat('en', { notation: 'compact' }).format(
              votes
            )}
          </p>
          <Arrow
            variant="downvote"
            className=""
            setVote={voteOnReply}
            clicked={downvoteClicked}
          />
        </div>
        <div className="flex font-['Roboto'] dark:text-white ml-5">
          <p>Report</p>
        </div>
      </div>
    </div>
  );
}
