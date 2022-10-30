import { useState } from 'react';

export function JoinButton() {
  const [joined, setJoined] = useState<Boolean>(false);

  return (
    <>
      <button
        onClick={() => setJoined(!joined)}
        className="flex w-[8rem] justify-center py-3 font-semibold text-sm dark:bg-accentD text-white rounded-full shadow-sm"
      >
        {!joined ? 'Join' : 'Joined'}
      </button>
    </>
  );
}
