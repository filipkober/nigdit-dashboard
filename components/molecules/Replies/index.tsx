import { useState } from 'react';
import Image from 'next/image';
import makpaj from '../../../assets/makpaj.svg';
import Arrow from '../../atoms/Vote';
import Reply from '../../atoms/Reply';
import { ReplyN } from '../../../models/Reply';

type RepliesProps = {
  replies: ReplyN[]
  vote?: 'upvote' | 'downvote';
  subId: number;
};

export default function Replies({ replies, vote, subId }: RepliesProps) {
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
      <Reply key={rep.id} id={rep.id} votes={rep.votes} pfp={rep.owner.attributes.profilePicture?.data?.attributes.url || ''} nick={rep.owner.attributes.username} content={rep.content} subId={subId} />
  ))}
      </div>
    </>
  );
}