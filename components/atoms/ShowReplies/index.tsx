import { useState } from 'react';
import { useModal } from '../../../hooks/useModal';
import Replies from '../Replies';

type ShowRepliesProps = {
  id: number;
};

export default function ShowReplies({ id }: ShowRepliesProps) {
  const { visible, changeVisible } = useModal();

  return (
    <>
      <div className="m-2">
        {' '}
        <a onClick={changeVisible} className="font-bold hover:cursor-pointer ">
          {!visible ? 'v Pokaż odpowiedzi' : '^ Schowaj odpowiedzi'}
        </a>
        {visible ? <Replies id={id} /> : ''}
      </div>
    </>
  );
}
