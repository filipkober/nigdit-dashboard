import { useState } from 'react';
import Image from 'next/image'
import makpaj from '../../../assets/makpaj.svg';
import Arrow from '../../atoms/Arrow';

type CommentProps = {
  id: number;
  vote?: 'upvote' | 'downvote';
};

export default function Comment({
  id,
  vote,
}: CommentProps) {
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

  const autor = "cyganslayer"


  return (
    <>
      <div>
        <div>
            <Image src={makpaj}
            width={25}
            height={25}
            className="overflow-hidden w-[100%] h-[100%] min-w-7 rounded-full"/>
          <p>{autor}</p>
        </div>
        <div>

        </div>
        <Arrow 
            variant="downvote"
            className="absolute right-4 top-[calc(4.25rem+1.5rem)]"
            setVote={voteOnComment}
            clicked={downvoteClicked}
        />
      </div>
    </>
  );
}
