import moment from 'moment';
import Image from 'next/future/image';
import { useState } from 'react';
import Arrow from '../../atoms/Arrow';
import commentIcon from '../../../assets/comment-icon.svg';
import shareIcon from '../../../assets/share-icon.svg';
import reportIcon from '../../../assets/report-icon.svg';
import makpaj from '../../../assets/makpaj.svg';
import Comment from '../Comments';
import Reply from '../../atoms/ReplyButton';
import ReportModal from '../ReportModal';
import { useModal } from '../../../hooks/useModal';

type PostExtendedProps = {
  title: string;
  description?: string;
  media?: {
    source: string;
    type: 'video' | 'image' | 'gif';
  };
  author: string;
  source: {
    image: string;
    name: string;
    description: string;
    rules: string[];
    createdAt: Date;
    memberCount: number;
  };
  comments?: number[];
  votes: number;
  date: Date;
  vote?: 'upvote' | 'downvote';
};

export default function PostExtended({
  title,
  description,
  media,
  author,
  source,
  comments,
  votes,
  date,
  vote,
}: PostExtendedProps) {
  const [upvoteClicked, setUpvoteClicked] = useState<boolean>(
    vote === 'upvote'
  );
  const [downvoteClicked, setDownvoteClicked] = useState<boolean>(
    vote === 'downvote'
  );
  const [modalReportVisible, changeModalReportVisible] = useModal();

  const voteOnPost = (vote: 'upvote' | 'downvote') => {
    if (vote === 'downvote' && !downvoteClicked) {
      setDownvoteClicked(true);
      setUpvoteClicked(false);
    } else if (vote === 'upvote' && !upvoteClicked) {
      setDownvoteClicked(false);
      setUpvoteClicked(true);
    }
  };

  return (
    <>
      <div>
        <div className="text-left font-normal border-black bg-foregroundL dark:bg-foregroundD border-solid drop-shadow-lg border-2 rounded-[5px] py-2 px-2 overflow-hidden mb-2">
          {/* GÓRNY PASEK AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA */}

          {/* Post Info */}

          <div className="flex ls:flex-row flex-col">
            <div className="flex ">
              <div className="font-['Roboto'] w-7 h-7 mr-1">
                <Image
                  src={source.image}
                  width={25}
                  height={25}
                  className="overflow-hidden w-[100%] h-[100%] rounded-full object-cover"
                />
              </div>
              <p className="font-['Roboto'] dark:text-white text-base">
                {source.name}
              </p>
              <p className="font-['Roboto'] dark:text-[rgba(197,197,197,1)] text-foregroundD ml-2 text-base truncate">
                autor: <span className="dark:text-white">{author}</span>
              </p>
            </div>
            <div className="ls:ml-auto">
              {' '}
              <p className="font-['Roboto'] dark:text-white text-base whitespace-nowrap">
                posted {moment(date).fromNow()}
              </p>
            </div>
          </div>
          <div>
            <Arrow
              variant="upvote"
              className="absolute right-4 ls:top-[calc(4.25rem-1.25rem)] top-[calc(3.25rem-1.25rem)]"
              setVote={voteOnPost}
              clicked={upvoteClicked}
            />
            <p className="h-5 font-['Roboto'] dark:text-white absolute right-4 top-[3.25rem] ls:top-[4.25rem] text-base">
              {Intl.NumberFormat('en', { notation: 'compact' }).format(votes)}
            </p>
            <Arrow
              variant="downvote"
              className="absolute right-4 top-[calc(3.25rem+1.5rem)] ls:top-[calc(4.25rem+1.5rem)]"
              setVote={voteOnPost}
              clicked={downvoteClicked}
            />
          </div>

          {/* CONTENT  */}
          <div className="">
            <div>
              <p className="font-['IBM_Plex_Sans'] text-[170%] dark:text-white">
                {title}
              </p>
            </div>
            <div className="flex">
              {description ? (
                <div>
                  <p className="font-['Roboto'] dark:text-white text-xl">
                    {description}
                  </p>
                </div>
              ) : media && (media.type == 'image' || media.type == 'gif') ? (
                <div className="text-center mr-10 w-[92%] max-h-[100vh]">
                  <Image
                    src={media.source}
                    alt={title + ' image or gif'}
                    width="100"
                    height="100"
                    loader={(img) => media.source}
                    unoptimized
                    className="w-[100%] h-[100%] object-cover"
                  />
                </div>
              ) : (
                <video controls className="w-[92%] max-h-[100vh]">
                  <source src={media!.source} />
                </video>
              )}
            </div>
          </div>
          <div className="flex font-['Roboto'] dark:text-white text-xl mt-5">
            {/* chujstwo pod contentem */}
            <p className="mr-5">666 Comments</p>
            <p className="ml-auto">Share</p>
            <p className="ml-5 cursor-pointer"><a onClick={changeModalReportVisible}>Report</a></p>
          </div>
          <div>
            {/* KOMETNARZE */}
            <textarea
              className="px-1 w-[100%] resize-none bg-accentL dark:bg-accentD text-black dark:text-white placeholder:text-black dark:placeholder:text-white placeholder:italic"
              cols={50}
              rows={5}
              placeholder="Put your racist opinion here..."
            ></textarea>

            <button className="p-1 rounded ml-auto flex bg-accentL dark:bg-accentD border-solid border-black dark:border-white text-black dark:text-white">
              Comment
            </button>

            <div>
              <Comment id={1} />
            </div>
          </div>
        </div>
      </div>
      <ReportModal isOpen={modalReportVisible} contentType={'post'} onClose={changeModalReportVisible} />
    </>
  );
}
