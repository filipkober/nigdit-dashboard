import { useState } from 'react';

export function JoinButton() {
  const [joined, setJoined] = useState<Boolean>(false);

  return (
    <>
      <button
        onClick={() => setJoined(!joined)}
<<<<<<< HEAD
        className="w-[8rem] justify-center py-3 font-semibold text-sm text-white rounded-full shadow-sm border border-white"
=======
        className="flex w-[8rem] justify-center py-3 font-semibold text-sm dark:bg-accentD text-white rounded-full shadow-sm"
>>>>>>> aac0d54 (basic subnigdit dashboard)
      >
        {!joined ? 'Join' : 'Joined'}
      </button>
    </>
  );
}
