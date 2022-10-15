import { useState } from 'react';
import Replies from '../Replies';
import TextArea from '../TextArea';
import { useModal } from '../../../hooks/useModal';

type ReplyButtonProps = {
  id: number;
};

export default function ShowReplies({ id}: ReplyButtonProps) {

  return (
    <>
      <div>
        <button
          // onClick={}
          className="font-['Roboto'] dark:text-white ml-5"
        >
        </button>
      </div>
    </>
  );
}
