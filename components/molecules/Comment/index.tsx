import { useState } from 'react';
import Image from 'next/image';
import makpaj from '../../../assets/makpaj.svg';
import Arrow from '../../atoms/Arrow';

type CommentProps = {
  id: number;
  vote?: 'upvote' | 'downvote';
};

export default function Comment({ id, vote }: CommentProps) {
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

  const autor = 'cyganslayer';

  const komentarze = [
    {
      id: 1,
      pfp: makpaj,
      nick: 'Cygan77',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec elit est. Sed non rutrum purus, vitae sollicitudin diam. Quisque imperdiet lorem bibendum velit vehicula commodo. Vestibulum imperdiet feugiat turpis eget lobortis. Nullam fringilla tempor mauris vitae lobortis. Praesent sit amet venenatis quam, non tincidunt erat. Morbi semper ac purus id iaculis.',
    },
    {
      id: 2,
      pfp: makpaj,
      nick: 'Cygan78',
      content: 'jigger bigger digger rigger',
    },
    {
      id: 3,
      pfp: makpaj,
      nick: 'Cygan79',
      content:
        'bla bla Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec elit est. Sed non rutrum purus, vitae sollicitudin diam. Quisque imperdiet lorem bibendum elit vehicula commodo.',
    },
  ];

  return (
    <>
      <div>
        {komentarze.map((komentarz, index) => (
          <div key={index} className="">
            <div className="flex flex-row min-w-[25vw]">
              <div className="font-['Roboto'] w-7 h-7 min-w-[25px] mr-1">
                <Image
                  src={komentarz.pfp}
                  width={25}
                  height={25}
                  className="overflow-hidden w-[100%] h-[100%] min-w-7 rounded-full"
                />
              </div>
              <p className="font-['Roboto'] font-semibold dark:text-white text-base">
                {komentarz.nick}
              </p>
            </div>
            <div className="ml-[30px]">
              <p className="font-['Roboto'] font-light dark:text-white text-base">
                {komentarz.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
