import { useState } from 'react';
import { ReplyN } from '../../../models/Reply';
import Reply from '../../atoms/Reply';

type RepliesProps = {
  replies: ReplyN[]
  vote?: 'upvote' | 'downvote';
  subId: number;
  opId?: number;
  modIds?: number[];
};

export default function Replies({ replies, vote, subId, opId = 0, modIds = [] }: RepliesProps) {
  const [upvoteClicked, setUpvoteClicked] = useState<boolean>(
    vote === 'upvote'
  );
  const [downvoteClicked, setDownvoteClicked] = useState<boolean>(
    vote === 'downvote'
  );

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
    <>
      <div className="ml-[2vw] my-[1vh]">
      {replies.map((rep, index) => (
      <Reply key={rep.id} id={rep.id} votes={rep.votes} owner={rep.owner} content={rep.content} subId={subId} opId={opId} modIds={modIds} />
  ))}
      </div>
    </>
  );
}