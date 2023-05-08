import moment from 'moment';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Arrow from '../../atoms/Arrow';
import commentIcon from '../../../assets/comment-icon.svg';
import shareIcon from '../../../assets/share-icon.svg';
import reportIcon from '../../../assets/report-icon.svg';
import makpaj from '../../../assets/makpaj.svg';
import Comment from '../../atoms/Comment';
import Reply from '../../atoms/ReplyButton';
import ReportModal from '../ReportModal';
import { useModal } from '../../../hooks/useModal';
import PostService from '../../../util/requests/PostService';
import { StrapiPost, PostN } from '../../../models/Post';
import { commentAdapter } from '../../../models/Comment';

type PostExtendedProps = {
  post: PostN;
};

export default function PostExtended({ post }: PostExtendedProps) {
  const title = post.title;
  const description = post.description;
  const media = post.media;
  const author = post.owner;
  const subnigdit = post.subnigdit;
  const comments = post.comments;
  const votes = post.votes;
  const createdAt = post.createdAt;
  const type = post.type;
  console.log(comments)

  const [modalReportVisible, changeModalReportVisible] = useModal();

  return (
    <>
      <div>
        <div className="text-left font-normal border-black bg-foregroundL dark:bg-foregroundD border-solid drop-shadow-lg border-2 rounded-[5px] py-2 px-2 overflow-hidden mb-2">
          <div className="flex ls:flex-row flex-col">
            <div className="flex ">
              <div className="font-['Roboto'] w-7 h-7 mr-1">
                <Image
                  src={
                    process.env.NEXT_PUBLIC_STRAPI_URL! +
                      subnigdit?.data.attributes.icon.data.attributes.url || ''
                  }
                  width={25}
                  height={25}
                  className="overflow-hidden w-[100%] h-[100%] rounded-full object-cover"
                  alt={''}
                  loader={() =>
                    process.env.NEXT_PUBLIC_STRAPI_URL! +
                      subnigdit?.data.attributes.icon.data.attributes.url || ''
                  }
                />
              </div>
              <p className="font-['Roboto'] dark:text-white text-base">
                {subnigdit?.data.attributes.name}
              </p>
              <p className="font-['Roboto'] dark:text-[rgba(197,197,197,1)] text-foregroundD ml-2 text-base truncate">
                autor:{' '}
                <span className="dark:text-white">
                  {author.data.attributes.username}
                </span>
              </p>
            </div>
            <div className="ls:ml-auto">
              {' '}
              <p className="font-['Roboto'] dark:text-white text-base whitespace-nowrap">
                posted {moment(createdAt).fromNow()}
              </p>
            </div>
          </div>
          <div>
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
              ) : media &&
                media.data.attributes.formats.large.url &&
                (type == 'Image' || type == 'Gif') ? (
                <div className="text-center mr-10 w-[92%] max-h-[100vh]">
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_STRAPI_URL! +
                      media.data.attributes.url
                    }
                    alt={title + ' image or gif'}
                    width="100"
                    height="100"
                    loader={(img) =>
                      process.env.NEXT_PUBLIC_STRAPI_URL! +
                      media.data.attributes.url!
                    }
                    unoptimized
                    className="w-[100%] h-[100%] object-cover"
                  />
                </div>
              ) : media &&
                media.data.attributes.formats.large.url &&
                type == 'Video' ? (
                <video controls className="w-[92%] max-h-[100vh]">
                  <source src={media!.data.attributes.formats.large.url} />
                </video>
              ) : null}
            </div>
          </div>
          <div className="flex font-['Roboto'] dark:text-white text-xl mt-5">
            {/* chujstwo pod contentem */}
            <p className="mr-5">{comments?.data.length} Comment{(comments?.data.length || 0) > 1 ? 's' : ''}</p>
            <p className="ml-auto">Share</p>
            <p className="ml-5 cursor-pointer">
              <a onClick={changeModalReportVisible}>Report</a>
            </p>
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
              {comments?.data.map((comment) => {
                return <Comment key={comment.id} comment={commentAdapter(comment)} />;
              })}
            </div>
          </div>
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
