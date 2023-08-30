import React, { useState } from 'react';
import Arrow from '../../atoms/Vote';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
import Vote from '../../atoms/Vote';

type PostMediaProps = {
  title: string;
  media: {
    source: string;
    type: 'Video' | 'Image' | 'Gif';
  };
  author: string;
  source: {
    image: string;
    name: string;
  };
  votes: number;
  date: Date;
  vote?: 'upvote' | 'downvote';
  id: number;
};

export default function PostMedia({
  title,
  media,
  author,
  source,
  votes,
  date,
  id,
}: PostMediaProps) {
  return (
    <div className="w-[100%] text-left font-normal flex flex-col border-black bg-foregroundL dark:bg-foregroundD border-solid drop-shadow-lg border-2 rounded-[5px] py-2 px-2 overflow-hidden min-w-[25vw] my-2">
        {/* GÓRNY PASEK AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA */}
        <div className="flex flex-row min-w-[25vw] max-h-[1.5rem]">
        <div className="relative aspect-square mr-1">
          <Image
            src={source.image}
            className="rounded-[50%] object-cover"
            alt={''}
            fill
          />
        </div>
        <p className="font-['Roboto'] dark:text-white text-base">
          <Link href={'/' + source.name}>{source.name}</Link>
        </p>
        <p className="font-['Roboto'] dark:text-[rgba(197,197,197,1)] text-foregroundD ml-2 text-base">
          author:
        </p>
        <p className="font-['Roboto'] dark:text-white ml-2 text-base truncate max-w-[20em]">
          {author}
        </p>
        <p className="font-['Roboto'] dark:text-white ml-auto text-base">
          posted {moment(date).fromNow()}
        </p>
      </div>
      <div>
        <Vote
          variant="vertical"
          className="absolute right-4 top-[calc(40%-1.25rem)]"
          votes={votes}
          contentType="post"
          contentId={id}
        />
      </div>

        {/* CONTENT  */}
        <div>
          <div>
            <p className="h-11 w-[179px] font-['IBM_Plex_Sans'] text-[170%] dark:text-white">
              <Link href={`/post/${id}`}>{title}</Link>
            </p>
          </div>
          <div className='max-h-[200px] ts:max-h-[1000px] overflow-scroll'>
            {media.type == 'Image' || media.type == 'Gif' ? (
              <Image
                src={media.source}
                alt={title}
                width={880}
                height={880}
                loader={(img) => media.source}
              />
            ) : (
              <video controls className="w-[92%]">
                <source src={media.source} />
              </video>
            )}
          </div>
        </div>
        <div className='h-4'></div>
    </div>
  );
}
