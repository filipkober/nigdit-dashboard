import Arrow from '../Arrow';
import Image from 'next/image';
import React, { useState } from 'react';
import { useModal } from '../../../hooks/useModal';
import ReportModal from '../../molecules/ReportModal';

type ReplyProps = {
  vote?: 'upvote' | 'downvote';
  id: number;
  votes: number;
  pfp: string;
  nick: string;
  content: string;
};

export default function Reply({
  id,
  votes,
  pfp,
  nick,
  content,
  vote,
}: ReplyProps) {
  const [downvoteClicked, setDownvoteClicked] = useState<boolean>(
    vote === 'downvote'
  );

  const [upvoteClicked, setUpvoteClicked] = useState<boolean>(
    vote === 'upvote'
  );

  const voteOnReply = (vote: 'upvote' | 'downvote') => {
    if (vote === 'downvote' && !downvoteClicked) {
      setDownvoteClicked(true);
      setUpvoteClicked(false);
    } else if (vote === 'upvote' && !upvoteClicked) {
      setDownvoteClicked(false);
      setUpvoteClicked(true);
    }
  };

  const [modalReportVisible, changeModalReportVisible] = useModal();

  return (
    <>
      <div className="gridComment my-5">
        <div className="justify-self-auto">
          <Image
            src={process.env.NEXT_PUBLIC_STRAPI_URL! + pfp}
            width={50}
            height={50}
            alt=""
            loader={() => process.env.NEXT_PUBLIC_STRAPI_URL! + pfp}
            className="overflow-hidden rounded-full object-cover w-10 h-10"
          ></Image>
        </div>
        <div className="justify-self-auto">
          <p className="font-bold">{nick}</p>
        </div>
        <div className="justify-self-auto"></div>
        <div className="justify-self-auto">
          <p>{content}</p>
        </div>
        <div className="justify-self-auto col-span-2">
            <p>
              <a className="cursor-pointer" onClick={changeModalReportVisible}>
                Report
              </a>
            </p>
          </div>
      </div>
      <ReportModal
        isOpen={modalReportVisible}
        contentType={'post'}
        onClose={changeModalReportVisible}
      />
    </>
  );
}
