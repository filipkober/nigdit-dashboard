import { useState } from 'react';

type CommentProps = {
  id: number;
  author: {
    username: string;
    image: string;
  };
  content: string;
  votes: number;
  date: Date;
  replies?: number[];
  vote?: 'upvote' | 'downvote';
};

export default function Comment({
  id,
  author,
  content,
  votes,
  date,
  vote,
  replies = [],
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

  return <></>;
}
