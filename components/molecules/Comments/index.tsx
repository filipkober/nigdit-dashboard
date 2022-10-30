import { useState } from 'react';
import Image from 'next/image';
import makpaj from '../../../assets/makpaj.svg';
import Arrow from '../../atoms/Arrow';
import Replies from '../Replies';
import ShowReplies from '../../atoms/ShowReplies';
import Reply from '../../atoms/ReplyButton';
import { useModal } from '../../../hooks/useModal';
import ReplyTextarea from '../../atoms/ReplyTextarea';
import ReplyButton from '../../atoms/ReplyButton';
import Comment from '../../atoms/Comment';

type CommentsProps = {
  id: number;
  vote?: 'upvote' | 'downvote';
};

export default function Comments({ id, vote }: CommentsProps) {
  const [upvoteClicked, setUpvoteClicked] = useState<boolean>(
    vote === 'upvote'
  );
  const [downvoteClicked, setDownvoteClicked] = useState<boolean>(
    vote === 'downvote'
  );

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

  return (
    <>
      <div>
        {komentarze.map((komentarz, index) => (
          <Comment
            key={komentarz.id}
            id={komentarz.id}
            nick={komentarz.nick}
            votes={komentarz.votes}
            pfp={komentarz.pfp}
            content={komentarz.content}
          />
        ))}
      </div>
    </>
  );
}