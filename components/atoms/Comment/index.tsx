import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import emptypfp from '../../../assets/emptypfp.jpg';
import { useModal } from '../../../hooks/useModal';
import { CommentN } from '../../../models/Comment';
import { UserState } from '../../../store/userSlice';
import ReportModal from '../../molecules/ReportModal';
import RepliesContainer from '../RepliesContainer';
import ReplyTextarea from '../ReplyTextarea';
import Vote from '../Vote';
import CommentService from '../../../util/requests/CommentService';
import { useRouter } from 'next/router';
import { toastDisplay } from '../Toast';
import ToastType from '../../../models/ToastType';

type CommentProps = {
  comment: CommentN;
  subId: number;
  opId?: number;
  modIds?: number[];
};

export default function Comment({
  comment,
  subId,
  opId = 0,
  modIds = [],
}: CommentProps) {
  const [modalVisible, changeModalVisible] = useModal();

  const [modalReportVisible, changeModalReportVisible] = useModal();

  const isLogged = !!useSelector((state: UserState) => state.user.username);
  const id = comment.id;
  const votes = comment.votes;
  const content = comment.content;
  const reports = comment.reports;
  const createdAt = comment.createdAt;
  const owner = comment.owner;
  const post = comment.post;
  const [replyCount, setReplyCount] = useState<number>(0);

  useEffect(() => {
    setReplyCount(comment.replies.data.count);
  }, [comment.replies.data.count]);

  const addReply = () => {
    setReplyCount(replyCount + 1);
    changeModalVisible();
  };

  let nickColor;
  if (modIds.includes(owner.data.id)) {
    nickColor = '#77F06A';
  } else if (owner.data.attributes.admin) {
    nickColor = '#F05447';
  } else if (owner.data.id === opId) {
    nickColor = '#F2A44B';
  }

  const {
    id: userId,
    admin,
    moderates,
  } = useSelector((state: UserState) => state.user);
  const commentService = new CommentService();
  const router = useRouter();

  const isAdminOrMod = admin || modIds.includes(userId || 0);
  const isOwner = userId === comment.owner.data.id;

  const deleteComment = async () => {
    const deleted = await commentService.delete(id);
    if (deleted) {
      toastDisplay(ToastType.Success, 'Post deleted, refreshing page...');
      setTimeout(() => {
        router.reload();
      }, 1500);
    }
  };

  const banUser = async () => {
    const banned = await commentService.banAuthor(id);
    if (banned) {
      toastDisplay(ToastType.Success, 'Author banned, refreshing page...');
      setTimeout(() => {
        router.reload();
      }, 1500);
    }
  };

  return (
    <>
      <div>
        <div className="gridComment my-5">
          <div className="justify-self-auto">
            <Image
              src={
                owner.data.attributes.profilePicture?.data
                  ? process.env.NEXT_PUBLIC_STRAPI_URL! +
                    owner.data.attributes.profilePicture?.data?.attributes.url
                  : emptypfp
              }
              alt=""
              className="overflow-hidden rounded-full object-cover w-10 h-10"
              width={128}
              height={128}
            ></Image>
          </div>
          <div className="justify-self-auto">
            <p className="font-bold" style={{ color: nickColor }}>
              {owner.data.attributes.username}
            </p>
          </div>
          <div className="justify-self-auto"></div>
          <div className="justify-self-auto">
            <p>{content}</p>
          </div>
          <div className="justify-self-auto col-span-2 flex flex-row gap-4 mt-2">
            <p>
              {isLogged && (
                <>
                  <a
                    className="cursor-pointer"
                    onClick={changeModalReportVisible}
                  >
                    Report
                  </a>
                  <button
                    onClick={changeModalVisible}
                    className="font-['Roboto'] dark:text-white ml-5"
                  >
                    Reply
                  </button>
                </>
              )}
                            {isAdminOrMod && (
                <a className="cursor-pointer text-red-400 ml-5" onClick={banUser}>
                  Ban
                </a>
              )}
              {(isOwner || isAdminOrMod) && (
                <a
                  className="cursor-pointer text-red-400 ml-5"
                  onClick={deleteComment}
                >
                  Delete
                </a>
              )}
            </p>
            <Vote
              votes={votes}
              contentType={'comment'}
              contentId={id}
              variant="horizontal"
            />
          </div>
        </div>
        <div>
          <ReplyTextarea
            commentId={id}
            visible={modalVisible}
            addReply={addReply}
          />
        </div>
        <div>
          {replyCount > 0 ? (
            <RepliesContainer
              commentId={comment.id}
              replyNumber={replyCount}
              subId={subId}
              opId={opId}
              modIds={modIds}
            />
          ) : (
            ''
          )}
        </div>
      </div>
      <ReportModal
        isOpen={modalReportVisible}
        contentType={'comment'}
        onClose={changeModalReportVisible}
        id={id}
        subnigditId={subId}
      />
    </>
  );
}
