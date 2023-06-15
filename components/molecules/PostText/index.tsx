import React, { useState } from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
import Vote from '../../atoms/Vote';

type PostTextProps = {
  title: string,
  description: string,
  author: string,
  source: {
    image: string,
    name: string
  },
  votes: number,
  date: Date,
  id: number
}

export default function PostText({title,description,author,source,votes,date,id}: PostTextProps) {

  return (
    <div className="h-[10rem] w-[100%] text-left font-normal flex flex-col border-black bg-foregroundL dark:bg-foregroundD border-solid drop-shadow-lg border-2 rounded-[5px] py-2 px-2 overflow-hidden min-w-[25vw] max-h-[50vh] my-2">
      {/* GÓRNY PASEK AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA */}
      <div className='flex flex-row min-w-[25vw]'>
      <div className="font-['Roboto'] w-7 h-7 min-w-[25px] mr-1">
        <Image src={source.image} width={25} height={25} className="overflow-hidden w-[100%] h-[100%] min-w-7 rounded-full" alt={''}/>
      </div>
      <p className="font-['Roboto'] dark:text-white text-base">
        <Link href={"/"+source.name}>{source.name}</Link>
      </p>
      <p className="font-['Roboto'] dark:text-[rgba(197,197,197,1)] text-foregroundD ml-2 text-base">
        author:
      </p>
      <p className="font-['Roboto'] dark:text-white ml-2 text-base">
        {author}
      </p>
      <p className="h-[15px] font-['Roboto'] dark:text-white ml-auto text-base">
        posted {moment(date).fromNow()}
      </p>
      </div>
      <div>
      <Vote variant='vertical' className='absolute right-4 top-[calc(40%-1.25rem)]' votes={votes} contentType='post' contentId={id}/>
      </div>
      
      {/* CONTENT  */}
      <div>
      <div>
      <p className="h-11 w-[179px] font-['IBM_Plex_Sans'] text-[170%] dark:text-white">
        <Link href={`/post/${id}`}>{title}</Link>
      </p>
      </div>
      <div>
      <p className="font-['Roboto'] dark:text-white gradient-mask-b-0 text-xl w-[92%]">
        {description}
      </p>
      </div>
      </div>
    </div>
  )
}
