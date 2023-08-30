import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
import Vote from '../../atoms/Vote';
import Media from '../../../models/Media';

type PostTextProps = {
  title: string;
  description: string;
  author: string;
  source: {
    image: string;
    name: string;
  };
  votes: number;
  date: Date;
  id: number;
};

export default function PostText({
  title,
  description,
  author,
  source,
  votes,
  date,
  id,
}: PostTextProps) {

  const componentRef = useRef<HTMLDivElement>(null);
  const [textLines, setTextLines] = useState(0);

  useEffect(() => {
    if (componentRef.current) {
      const lineHeight = parseFloat(getComputedStyle(componentRef.current).lineHeight);
      const height = componentRef.current.offsetHeight
      const calculatedLines = Math.ceil(height / lineHeight);
      setTextLines(calculatedLines);
    }
  }, []);

  return (
    <div className="min-h-[4rem] w-[100%] text-left font-normal flex flex-col border-black bg-foregroundL dark:bg-foregroundD border-solid drop-shadow-lg border-2 rounded-[5px] py-2 px-2 overflow-hidden min-w-[25vw] max-h-[50vh] my-2">
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
      <div className='pb-3'>
        <div>
          <p className="h-11 max-w-[80%] font-['IBM_Plex_Sans'] text-[170%] dark:text-white">
            <Link href={`/post/${id}`}>{title}</Link>
          </p>
        </div>
        <div ref={componentRef}>
          <p className={`font-['Roboto'] dark:text-white text-xl max-h-[4rem] w-[92%] overflow-hidden ${textLines > 2 ? 'gradient-mask-b-0' : '' }`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
