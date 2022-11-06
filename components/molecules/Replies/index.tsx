import { useState } from 'react';
import Image from 'next/image';
import makpaj from '../../../assets/makpaj.svg';
import Arrow from '../../atoms/Arrow';
import Reply from '../../atoms/Reply';

type RepliesProps = {
  id: number;
  vote?: 'upvote' | 'downvote';
};

const odpowiedzi = [
  {
    id: 1,
    votes: 65,
    pfp: makpaj,
    nick: 'Cygan45',
    content: 'Jeste gejem',
    responseTo: 1,
  },
  {
    id: 2,
    votes: 345,
    pfp: makpaj,
    nick: 'Cygan46',
    content: 'hehehehaw',
    responseTo: 2,
  },
  {
    id: 3,
    votes: 8855,
    pfp: makpaj,
    nick: 'Cygan47',
    content: 'ballin',
    responseTo: 3,
  },
  {
    id: 4,
    votes: -4,
    pfp: makpaj,
    nick: 'Cygan48',
    content: 'ja tesz',
    responseTo: 1,
  },
];

export default function Replies({ id, vote }: RepliesProps) {
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
        {odpowiedzi
          .filter((odpowiedz) => odpowiedz.responseTo === id)
          .map((odpowiedz, index) => (
            <Reply id={odpowiedz.id} votes={odpowiedz.votes} pfp={odpowiedz.pfp} nick={odpowiedz.nick} content={odpowiedz.content} responseTo={odpowiedz.responseTo} />
          ))}
      </div>
    </>
  );
}