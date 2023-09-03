import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useModal } from '../../../hooks/useModal';
import Arrow from '../Vote';
import ReplyTextarea from '../ReplyTextarea';
import RepliesContainer from '../RepliesContainer';
import ReportModal from '../../molecules/ReportModal';
import makpaj from '../../../assets/makpaj.svg';
import { CommentExtended, CommentN, StrapiComment, commentAdapter, exampleComment } from '../../../models/Comment';
import CommentService from '../../../util/requests/CommentService';
import { useRouter } from 'next/router';
import { StrapiPost } from '../../../models/Post';
import Media, { emptyMedia } from '../../../models/Media';
import { replyAdapter } from '../../../models/Reply';
import { ReplyN } from '../../../models/Reply';
import { useSelector } from 'react-redux';
import { UserState } from '../../../store/userSlice';
import Vote from '../Vote';
import emptypfp from '../../../assets/emptypfp.jpg';

type CommentProps = {
  comment: CommentN;
  subId: number;
  opId?: number;
  modIds?: number[];
};

export default function Comment({ comment, subId, opId = 0, modIds = [] }: CommentProps) {
  const [modalVisible, changeModalVisible] = useModal();

  const [modalReportVisible, changeModalReportVisible] = useModal();

  const isLogged = !!useSelector((state: UserState) => state.user.username)
  const id = comment.id
  const votes = comment.votes;
  const content = comment.content;
  const reports = comment.reports;
  const createdAt = comment.createdAt;
  const owner = comment.owner;
  const post = comment.post;
  const [replyCount, setReplyCount] = useState<number>(0); 

  useEffect(() => {
    setReplyCount(comment.replies.data.count);
  }, [comment.replies.data.count])

  const addReply = () => {
    setReplyCount(replyCount + 1);
    changeModalVisible();
  }

  let nickColor;
  if(modIds.includes(owner.data.id)) {
    nickColor = '#77F06A'
  }
  else if (owner.data.attributes.admin) {
    nickColor = '#F05447'
  } 
  else if (owner.data.id === opId) {
    nickColor = '#F2A44B'
  }

  return (
      <>
        <div>
          <div className="gridComment my-5">
            <div className="justify-self-auto">
              <Image
                src={owner.data.attributes.profilePicture?.data ? (process.env.NEXT_PUBLIC_STRAPI_URL! + owner.data.attributes.profilePicture?.data?.attributes.url) : emptypfp}
                alt=""
                className="overflow-hidden rounded-full object-cover w-10 h-10"
                width={100}
                height={100}
                loader={({src}) => src}
              ></Image>
            </div>
            <div className="justify-self-auto">
              <p className="font-bold" style={{color: nickColor}}>{owner.data.attributes.username}</p>
            </div>
            <div className="justify-self-auto"></div>
            <div className="justify-self-auto">
              <p>{content}</p>
            </div>
            <div className="justify-self-auto col-span-2 flex flex-row gap-4 mt-2">
              <p>
                {isLogged && <><a
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
                </button></>}
              </p>
              <Vote votes={votes} contentType={'comment'} contentId={id} variant='horizontal'/>
            </div>
          </div>
          <div>
            <ReplyTextarea commentId={id} visible={modalVisible} addReply={addReply} />
          </div>
          <div>
          {replyCount > 0 ? <RepliesContainer commentId={comment.id} replyNumber={replyCount} subId={subId} opId={opId} modIds={modIds}/> : ''}
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
    )
}
