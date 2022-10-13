import { useState } from 'react';
import Image from 'next/image';
import makpaj from '../../../assets/makpaj.svg';
import Arrow from '../Arrow';

type RepliesProps = {
  id: number;
  vote?: 'upvote' | 'downvote';
};

const autor = 'niggerman654';

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
            <div key={index}>
              <div className="flex flex-row">
                <div className="mr-1">
                  <Image
                    src={odpowiedz.pfp}
                    width={25}
                    height={25}
                    objectFit="cover"
                    className="overflow-hidden w-[100%] h-[100%] rounded-full "
                  />
                </div>

                <p className="font-['Roboto'] font-semibold dark:text-white text-base">
                  {odpowiedz.nick}
                </p>
              </div>
              <div className="ml-[30px]">
                <p className="font-['Roboto'] font-light dark:text-white text-base">
                  {odpowiedz.content}
                </p>
              </div>
              <div className='flex flex-row'>
                <div className="flex flex-row">
                  <Arrow
                    commentId={odpowiedz.id}
                    variant="upvote"
                    className=""
                    setVote={voteOnComment}
                    clicked={upvoteClicked}
                  />
                  <p className="font-['Roboto'] dark:text-white text-base">
                    {Intl.NumberFormat('en', { notation: 'compact' }).format(
                      odpowiedz.votes
                    )}
                  </p>
                  <Arrow
                    commentId={odpowiedz.id}
                    variant="downvote"
                    className=""
                    setVote={voteOnComment}
                    clicked={downvoteClicked}
                  />
                </div>
                <div className="flex font-['Roboto'] dark:text-white ml-auto">
                  <p>Share</p>
                  <p className="ml-5">Report</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
