import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import useBreakpoint from '../../../hooks/useBreakpoint';
import Share from '../../atoms/Share';
import Vote from '../../atoms/Vote';
import PostMenu from '../PostMenu';
import { PostProps } from '../PostText';

const MAX_HEIGHT = 600;
const MAX_TS_HEIGHT = 700;
const MAX_TL_HEIGHT = 800;

export default function PostMedia({
  post,
  showReportModal,
  isAdmin = false
}: PostProps) {

  const { isAboveTs, isBelowTs } = useBreakpoint('ts');
  const { isAboveTl, isBelowTl } = useBreakpoint('tl')
  const mediaContainerRef = useRef<HTMLDivElement>(null);

  const mediaHeight = post.media!.height;

  // const isImageOverflowing = (isAboveTs && post.media!.height > MAX_TS_HEIGHT) || (isBelowTs && post.media!.height > MAX_HEIGHT)
  let isImageOverflowing = false;
  let maxHeight = MAX_HEIGHT;
  if (isAboveTl) {

    maxHeight = MAX_TL_HEIGHT;

    if(mediaHeight > MAX_TL_HEIGHT)
    isImageOverflowing = true
  }
  else if (isAboveTs) {
    
    maxHeight = MAX_TS_HEIGHT;

    if(mediaHeight > MAX_TS_HEIGHT)
    isImageOverflowing = true}
  
  else if (isBelowTs) {

    maxHeight = MAX_HEIGHT;

    if(mediaHeight > MAX_HEIGHT)
    isImageOverflowing = true
  }


  return (
    <div className="w-[100%] text-left font-normal flex flex-col border-black bg-foregroundL dark:bg-foregroundD border-solid drop-shadow-lg border-2 rounded-[5px] pt-2 min-w-[25vw] my-2">
        {/* GÓRNY PASEK AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA */}
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
        <p className="font-['Roboto'] dark:text-white text-base">
          <Link href={'/n/' + post.subnigdit.name_uid}>n/{post.subnigdit.name}</Link>
        </p>
        <div className='flex flex-row'>
        <p className="font-['Roboto'] dark:text-[rgba(197,197,197,1)] text-foregroundD ml-2 text-base">
          author:
        </p>
        <p className="font-['Roboto'] dark:text-white ml-2 text-base truncate max-w-[20em]">
          {post.owner.username}
        </p>
        </div>
        <p className="font-['Roboto'] dark:text-white ls:ml-auto text-base">
          <span className='text-foregroundD dark:text-[rgba(197,197,197,1)]'>posted</span> {moment(post.createdAt).fromNow()}
        </p>
      </div>
        {/* CONTENT  */}
        <div className=''>
          <div className='mx-2'>
            <p className="h-11 max-w-full font-['IBM_Plex_Sans'] text-[170%] dark:text-white">
              <Link href={`/post/${post.id}`}>{post.title}</Link>
            </p>
          </div>
          <div className='flex flex-row'>
          <div ref={mediaContainerRef} className={`overflow-y-hidden bg-[rgba(0,0,0,0.3)] px-2 flex-1 relative`} style={
            {
              maxHeight: isImageOverflowing ? maxHeight : undefined,
            }
          }>
            <Link href={`/post/${post.id}`}>
            {post.type == 'Image' || post.type == 'Gif' ? (
              <div className={`h-[${post.media!.height}px] w-full flex justify-center`} style={{opacity: isImageOverflowing ? 0.5 : undefined}}>
              <Image
                src={process.env.NEXT_PUBLIC_STRAPI_URL + post.media!.url}
                alt={post.title + ' image'}
                width={post.media!.width}
                height={post.media!.height}
                priority={true}
                style={{ aspectRatio: `${post.media!.width} / ${post.media!.height}`, maxWidth: '100%'}}
              />
              </div>
            ) : (
              <video controls className="w-[92%]">
                <source src={process.env.NEXT_PUBLIC_STRAPI_URL + post.media!.url} />
              </video>
            )}
            {isImageOverflowing && (
              <div className={`border-2 border-black fixed bg-backgroundL dark:bg-experimentA py-2 px-5 rounded-lg font-bold`} style={{top: '82%', left: '50%', transform: 'translateX(-50%)'}}>
                <p className="text-center text-white">Click to expand</p>
              </div>
            )}
            </Link>
          </div>
          <div className='content-center flex w-auto justify-center bg-[rgba(0,0,0,0.4)]'>
        <Vote
          variant="vertical"
          className="my-auto"
          votes={post.votes}
          contentType="post"
          contentId={post.id}
        />
      </div>
      </div>
        </div>
        <div className='flex flex-row gap-2 border-t-[1px] border-experimentA px-2 h-9'>
          <div className="hover:bg-backgroundL dark:hover:bg-experimentB flex items-center">
            <Share floatRight={false} className='align-middle'/>
          </div>
          <PostMenu className='my-auto h-full' postId={post.id} showReportModal={showReportModal} isAdmin={isAdmin}/>
        </div>
    </div>
  );
}
