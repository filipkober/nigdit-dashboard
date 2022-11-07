import { useState } from 'react';
import { useModal } from '../../../hooks/useModal';
import Replies from '../Replies';

type ShowRepliesProps = {
  id: number;
};

export default function ShowReplies({ id }: ShowRepliesProps) {
  const [ visible, changeVisible ] = useModal();

  return (
    <>
      <div className="m-2">
        {' '}
        <button onClick={changeVisible} className="font-bold hover:cursor-pointer ">
          {!visible ? 'v Show Replies' : '^ Hide Replies'}
        </button>
        {visible ? <Replies id={id} /> : ''}
      </div>
    </>
  );
}
