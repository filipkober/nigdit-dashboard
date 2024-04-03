import router from 'next/router';

export default function CreateSubButton() {
  return (
    <>
      <button
        onClick={() => router.push('/new/subnigdit')}
        className="object-fill w-[100%] ls:w-[80%] drop-shadow-midget border-[2px] border-solid min-h-[40px] bg-green-700 hover:bg-green-600 text-white font-bold py-0 px-4 border-b-4 border-green-900 hover:border-green-700 rounded-[10px]"
      >
        Create your own community now!
      </button>
    </>
  );
}
