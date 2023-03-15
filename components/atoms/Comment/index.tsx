import Image from 'next/image';
import { useState } from 'react';
import { useModal } from '../../../hooks/useModal';
import Arrow from '../Arrow';
import ReplyTextarea from '../ReplyTextarea';
import ShowReplies from '../ShowReplies';
import ReportModal from '../../molecules/ReportModal';

type CommentProps = {
  vote?: 'upvote' | 'downvote';
  id: number;
  votes: number;
  pfp: string;
  nick: string;
  content: string;
};

export default function Comment({
  id,
  votes,
  pfp,
  nick,
  content,
  vote,
}: CommentProps) {
  const [downvoteClicked, setDownvoteClicked] = useState<boolean>(
    vote === 'downvote'
  );

  const [upvoteClicked, setUpvoteClicked] = useState<boolean>(
    vote === 'upvote'
  );

  const [modalVisible, changeModalVisible] = useModal();

  const voteOnComment = (vote: 'upvote' | 'downvote') => {
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
      <div>
        <div className="gridComment my-5">
          <div className="justify-self-auto">
            <Image
              src={pfp}
              alt=""
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
            <ReplyTextarea id={id} visible={modalVisible} />
          </div>
        <div>
          <ShowReplies key={id} id={id} />
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
