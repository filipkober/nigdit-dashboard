import { useState } from 'react';
import { GenericComponentProps } from '../../../models/GenericComponentProps';

type JoinButtonProps = {
  joinedAlready?: Boolean;
} & GenericComponentProps;

export function JoinButton({ className, joinedAlready = false }: JoinButtonProps) {
  const [joined, setJoined] = useState<Boolean>(joinedAlready);

  return (
    <>
      <button
        onClick={() => setJoined(!joined)}
        className="w-[8rem] justify-center py-3 font-semibold text-sm text-white rounded-full shadow-sm border border-white"
      >
        {!joined ? 'Join' : 'Joined'}
      </button>
    </>
  );
}
