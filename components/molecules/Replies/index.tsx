import { useState } from 'react';
import Image from 'next/image';
import makpaj from '../../../assets/makpaj.svg';
import Arrow from '../../atoms/Arrow';
import Reply from '../../atoms/Reply';
import { ReplyN } from '../../../models/Reply';

type RepliesProps = {
  replies: ReplyN[]
  vote?: 'upvote' | 'downvote';
};

export default function Replies({ replies, vote }: RepliesProps) {
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
      {replies.map((odpowiedz, index) => (
    <Reply key={odpowiedz.id} id={odpowiedz.id} votes={odpowiedz.votes} pfp={odpowiedz.owner.attributes.profilePicture?.data.attributes.url || ''} nick={odpowiedz.owner.attributes.username} content={odpowiedz.content} />
  ))}
      </div>
    </>
  );
}