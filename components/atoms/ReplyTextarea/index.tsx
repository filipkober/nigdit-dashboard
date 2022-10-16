import { useState } from 'react';
import Replies from '../Replies';
import TextArea from '../TextArea';
import { useModal } from '../../../hooks/useModal';

type ReplyTextareaProps = {
  id: number;
  visible: boolean;
};

export default function ReplyTextarea({ id, visible }: ReplyTextareaProps) {

  return (
    <>
      <div>
        {visible ? (
          <div className=''>
            <textarea
              className="px-1 resize-none bg-accentL dark:bg-accentD text-black dark:text-white placeholder:text-black dark:placeholder:text-white placeholder:italic"
              cols={50}
              rows={5}
              placeholder="Put your racist conclusions and insults here..."
            ></textarea>
            <button className="p-1 rounded flex bg-accentL dark:bg-accentD border-solid border-black dark:border-white text-black dark:text-white">
              Reply
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
