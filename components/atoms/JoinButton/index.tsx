import { useState } from 'react';

export function JoinButton() {
  const [joined, setJoined] = useState<Boolean>(false);

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
