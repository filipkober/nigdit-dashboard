import Arrow from '../Vote';
import Image from 'next/image';
import React, { useState } from 'react';
import { useModal } from '../../../hooks/useModal';
import ReportModal from '../../molecules/ReportModal';
import { useSelector } from 'react-redux';
import { UserState } from '../../../store/userSlice';
import Vote from '../Vote';

type ReplyProps = {
  vote?: 'upvote' | 'downvote';
  id: number;
  votes: number;
  pfp: string;
  nick: string;
  content: string;
  subId: number;
};

export default function Reply({
  id,
  votes,
  pfp,
  nick,
  content,
  vote,
  subId,
}: ReplyProps) {
  const [downvoteClicked, setDownvoteClicked] = useState<boolean>(
    vote === 'downvote'
  );

  const [upvoteClicked, setUpvoteClicked] = useState<boolean>(
    vote === 'upvote'
  );

  const isLogged = !!useSelector((state: UserState) => state.user.username)

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
        <div className="justify-self-auto col-span-2 flex flex-row gap-2 mt-2">
            <p>
              {isLogged && 
              <a className="cursor-pointer" onClick={changeModalReportVisible}>
                Report
              </a>
}
            </p>
            <Vote contentId={id} contentType='reply' variant='horizontal' votes={votes} />
          </div>
      </div>
      <ReportModal
        id={id}
        isOpen={modalReportVisible}
        contentType={'reply'}
        onClose={changeModalReportVisible}
        subnigditId={subId}
      />
    </>
  );
}
