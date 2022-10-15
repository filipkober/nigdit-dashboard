import { useState } from 'react';
import Image from 'next/image';
import makpaj from '../../../assets/makpaj.svg';
import Arrow from '../../atoms/Arrow';
import Replies from '../../atoms/Replies';
import ShowReplies from '../../atoms/ShowReplies';
import Reply from '../../atoms/ReplyButton';
import { useModal } from '../../../hooks/useModal';
import ReplyTextarea from '../../atoms/ReplyTextarea';
import ReplyButton from '../../atoms/ReplyButton';

type CommentsProps = {
  id: number;
  vote?: 'upvote' | 'downvote';
};

export default function Comment({ id, vote }: CommentsProps) {
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

  const { visible, changeVisible } = useModal();

  const autor = 'cyganslayer';

  const komentarze = [
    {
      id: 1,
      votes: 5,
      pfp: makpaj,
      nick: 'Cygan77',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec elit est. Sed non rutrum purus, vitae sollicitudin diam. Quisque imperdiet lorem bibendum velit vehicula commodo. Vestibulum imperdiet feugiat turpis eget lobortis. Nullam fringilla tempor mauris vitae lobortis. Praesent sit amet venenatis quam, non tincidunt erat. Morbi semper ac purus id iaculis.',
    },
    {
      id: 2,
      votes: -6,
      pfp: makpaj,
      nick: 'Cygan78',
      content: 'jigger bigger digger rigger',
    },
    {
      id: 3,
      votes: 6969,
      pfp: makpaj,
      nick: 'Cygan79',
      content:
        'bla bla Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec elit est. Sed non rutrum purus, vitae sollicitudin diam. Quisque imperdiet lorem bibendum elit vehicula commodo.',
    },
  ].sort((a, b) => b.votes - a.votes);

  console.log('comments ' + visible);

  return (
    <>
      <div>
        {komentarze.map((komentarz, index) => (
          <div key={index}>
            <div className="">
              <div className="flex flex-row">
                <div className="font-['Roboto'] mr-1">
                  <Image
                    src={komentarz.pfp}
                    width={25}
                    height={25}
                    objectFit="cover"
                    className="overflow-hidden w-[100%] h-[100%] rounded-full"
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
              <div className="flex flex-row mt-2">
                <div className="flex flex-row">
                  <Arrow
                    commentId={komentarz.id}
                    variant="upvote"
                    className=""
                    setVote={voteOnComment}
                    clicked={upvoteClicked}
                  />
                  <p className="font-['Roboto'] dark:text-white text-base">
                    {Intl.NumberFormat('en', { notation: 'compact' }).format(
                      komentarz.votes
                    )}
                  </p>
                  <Arrow
                    commentId={komentarz.id}
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
                  >Reply</button>
                </div>
              </div>
              <div>
                <ReplyTextarea id={komentarz.id} visible={visible} />
              </div>
            </div>
            <div>
              <ShowReplies key={komentarz.id} id={komentarz.id} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
