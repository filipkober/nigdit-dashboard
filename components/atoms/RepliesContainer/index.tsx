import { useEffect, useState } from 'react';
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
  replyNumber: number;
  subId: number;
  opId?: number;
  modIds?: number[];
};

export default function RepliesContainer({
  commentId,
  replyNumber,
  subId,
  opId = 0,
  modIds = [],
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

  useEffect(() => {
    if (visible) getReplies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replyNumber, visible]);

  return (
    <>
      <div className="m-2">
        <button
          onClick={onClick}
          className="font-bold hover:cursor-pointer "
        >
          {!visible ? 'v Show ' + replyNumber + (replyNumber>1 ? ' replies' : ' reply ') : '^ Hide ' + (replyNumber>1 ? ' replies' : ' reply ')}
        </button>
        {visible ? <Replies replies={replies} subId={subId} opId={opId} modIds={modIds} /> : ''}
      </div>
    </>
  );
}