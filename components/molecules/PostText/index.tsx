import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Post from '../../../models/Post';
import Share from '../../atoms/Share';
import Vote from '../../atoms/Vote';
import PostMenu from '../PostMenu';

export type PostProps = {
  post: Post;
  showReportModal: (id: number) => void;
  isAdmin?: boolean;
  isOwner?: boolean;
};

export default function PostText({
  post,
  showReportModal,
  isAdmin = false,
  isOwner = false,
}: PostProps) {
  const componentRef = useRef<HTMLDivElement>(null);
  const [textLines, setTextLines] = useState(0);

  useEffect(() => {
    if (componentRef.current) {
      const lineHeight = parseFloat(
        getComputedStyle(componentRef.current).lineHeight
      );
      const height = componentRef.current.offsetHeight;
      const calculatedLines = Math.ceil(height / lineHeight);
      setTextLines(calculatedLines);
    }
  }, []);

  return (
    <div className="min-h-[4rem] w-[100%] text-left font-normal flex flex-col border-black bg-foregroundL dark:bg-foregroundD border-solid drop-shadow-lg border-2 rounded-[5px] pt-2 min-w-[25vw] max-h-[50vh] my-2">
      <div className="flex flex-row min-w-[25vw] mx-2 flex-wrap">
        <div className="relative aspect-square mr-1 min-w-[24px] max-h-[1.5rem]">
          <Image
            src={process.env.NEXT_PUBLIC_STRAPI_URL + post.subnigdit.icon.url}
            className="rounded-[50%] object-cover"
            alt={''}
            fill
            sizes="(max-width: 128px) 128px"
          />
        </div>
        <p className="font-['Roboto'] dark:text-white text-base truncate max-w-[12ch] ls:max-w-full">
          <Link href={'/n/' + post.subnigdit.name_uid}>
            n/{post.subnigdit.name}
          </Link>
        </p>
        <div className="flex flex-row">
          <p className="font-['Roboto'] dark:text-[rgba(197,197,197,1)] text-foregroundD ml-2 text-base">
            author:
          </p>
          <p className="font-['Roboto'] dark:text-white ml-2 text-base truncate max-w-[15ch] ls:max-w-[25ch]">
            {post.owner.username}
          </p>
        </div>
        <p className="font-['Roboto'] dark:text-white ls:ml-auto text-base">
          <span className="text-foregroundD dark:text-[rgba(197,197,197,1)]">
            posted
          </span>{' '}
          {moment(post.createdAt).fromNow()}
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-row">
        <div className="flex-1">
          <div className="mx-2">
            <p className="h-11 max-w-[80%] font-['IBM_Plex_Sans'] text-[170%] dark:text-white truncate">
              <Link href={`/post/${post.id}`}>{post.title}</Link>
            </p>
          </div>
          <div className="flex flex-row">
            <div ref={componentRef} className="px-2 flex-1 flex pb-2">
              <p
                className={`font-['Roboto'] dark:text-white text-xl max-h-[5.5rem] w-[92%] overflow-hidden ${
                  textLines > 2 ? 'gradient-mask-b-0' : ''
                }`}
              >
                <Link href={`/post/${post.id}`}>{post.description}</Link>
              </p>
            </div>
          </div>
        </div>
        <div className="content-center flex w-auto justify-center my-1">
          <Vote
            variant="vertical"
            className="my-auto"
            votes={post.votes}
            contentType="post"
            contentId={post.id}
          />
        </div>
      </div>
      <div className="flex flex-row gap-2 border-t-[1px] border-experimentA px-2 h-9">
        <div className="hover:bg-backgroundL dark:hover:bg-experimentB flex items-center">
          <Share floatRight={false} className="align-middle" />
        </div>
        <PostMenu
          className="my-auto h-full"
          postId={post.id}
          showReportModal={showReportModal}
          isAdmin={isAdmin}
          isOwner={isOwner}
        />
      </div>
    </div>
  );
}
