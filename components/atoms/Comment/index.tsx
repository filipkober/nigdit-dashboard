import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useModal } from '../../../hooks/useModal';
import Arrow from '../Arrow';
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

type CommentProps = {
  comment: CommentN
};

export default function Comment({ comment }: CommentProps) {
  const [modalVisible, changeModalVisible] = useModal();

  const [modalReportVisible, changeModalReportVisible] = useModal();

  const id = comment.id
  const votes = comment.votes;
  const content = comment.content;
  const reports = comment.reports;
  const createdAt = comment.createdAt;
  const owner = comment.owner;
  const post = comment.post;
  const replyCount = comment.replies.data.count

  return (
      <>
        <div>
          <div className="gridComment my-5">
            <div className="justify-self-auto">
              <Image
                src={process.env.NEXT_PUBLIC_STRAPI_URL! + owner.data.attributes.profilePicture?.data.attributes.url || ''}
                alt=""
                className="overflow-hidden rounded-full object-cover w-10 h-10"
                width={100}
                height={100}
                loader={() => process.env.NEXT_PUBLIC_STRAPI_URL! + owner.data.attributes.profilePicture?.data.attributes.url || ''}
              ></Image>
            </div>
            <div className="justify-self-auto">
              <p className="font-bold">{owner.data.attributes.username}</p>
            </div>
            <div className="justify-self-auto"></div>
            <div className="justify-self-auto">
              <p>{content}</p>
            </div>
            <div className="justify-self-auto col-span-2">
              <p>
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
              </p>
            </div>
          </div>
          <div>
            <ReplyTextarea id={1} visible={modalVisible} />
          </div>
          <div>
          {replyCount > 0 ? <RepliesContainer commentId={comment.id} repliesNumber={replyCount}/> : ''}
          </div>
        </div>
        <ReportModal
          isOpen={modalReportVisible}
          contentType={'post'}
          onClose={changeModalReportVisible}
        />
      </>
    )
}
