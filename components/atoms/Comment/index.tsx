import Image from 'next/image';
import { useState } from 'react';
import { useModal } from '../../../hooks/useModal';
import Arrow from '../Arrow';
import ReplyTextarea from '../ReplyTextarea';
import ShowReplies from '../ShowReplies';

type CommentProps = {
  vote?: 'upvote' | 'downvote';
  id: number;
  votes: number;
  pfp: string;
  nick: string;
  content: string;
};

export default function Comment({
  id,
  votes,
  pfp,
  nick,
  content,
  vote,
}: CommentProps) {
  const [downvoteClicked, setDownvoteClicked] = useState<boolean>(
    vote === 'downvote'
  );

  const [upvoteClicked, setUpvoteClicked] = useState<boolean>(
    vote === 'upvote'
  );

  const { visible, changeVisible } = useModal();

  const voteOnComment = (vote: 'upvote' | 'downvote') => {
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
      <div className="">
        <div className="flex flex-row">
          <div className="font-['Roboto'] mr-1">
            <Image
              src={pfp}
              width={25}
              height={25}
              objectFit="cover"
              className="overflow-hidden w-[100%] h-[100%] rounded-full"
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
              commentId={id}
              variant="upvote"
              className=""
              setVote={voteOnComment}
              clicked={upvoteClicked}
            />
            <p className="font-['Roboto'] dark:text-white text-base">
              {Intl.NumberFormat('en', { notation: 'compact' }).format(votes)}
            </p>
            <Arrow
              commentId={id}
              variant="downvote"
              className=""
              setVote={voteOnComment}
              clicked={downvoteClicked}
            />
          </div>
          <div className="flex font-['Roboto'] dark:text-white ml-5">
            <p>Share</p>
            <p className="ml-5">Report</p>
          </div>
          <div className="font-['Roboto'] dark:text-white">
            <button
              onClick={changeVisible}
              className="font-['Roboto'] dark:text-white ml-5"
            >
              Reply
            </button>
          </div>
        </div>
        <div>
          <ReplyTextarea id={id} visible={visible} />
        </div>
      </div>
      <div>
        <ShowReplies key={id} id={id} />
      </div>
    </div>
  );
}
