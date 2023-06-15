import { useState } from 'react';
import { useModal } from '../../../hooks/useModal';
import Replies from '../../molecules/Replies';
import CommentService from '../../../util/requests/CommentService';
import {
  CommentExtended,
  CommentN,
  StrapiComment,
  commentAdapter,
  exampleComment,
} from '../../../models/Comment';
import { ReplyN, replyAdapter } from '../../../models/Reply';

type ShowRepliesProps = {
  commentId: number;
  repliesNumber: number;
  subId: number;
};

export default function RepliesContainer({
  commentId,
  repliesNumber,
  subId,
}: ShowRepliesProps) {
  const [visible, changeVisible] = useModal();

  const commentService = new CommentService();

  const [replies, setReplies] = useState<ReplyN[]>([]);

  const getReplies = async () => {
    const strapiComment = await commentService
      .getOne(commentId)
    const strapiReplies = strapiComment.attributes.replies.data
    const extendedReplies = strapiReplies.map((r) => replyAdapter(r));
    setReplies(extendedReplies);
  };

  const onClick = () => {
    changeVisible();
    if (replies.length == 0) getReplies();
  };

  return (
    <>
      <div className="m-2">
        <button
          onClick={onClick}
          className="font-bold hover:cursor-pointer "
        >
          {!visible ? 'v Show ' + repliesNumber + (repliesNumber>1 ? ' replies' : ' reply ') : '^ Hide ' + (repliesNumber>1 ? ' replies' : ' reply ')}
        </button>
        {visible ? <Replies replies={replies} subId={subId} /> : ''}
      </div>
    </>
  );
}