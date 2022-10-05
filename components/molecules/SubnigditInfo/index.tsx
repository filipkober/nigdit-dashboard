import Image from 'next/image';
import makpaj from '../../../assets/makpaj.svg';
import userIcon from '../../../assets/user-icon.svg';
import { JoinButton } from '../../atoms/JoinButton';

type SubnigditInfoProps = {
  id: number;
};

const name = 'n/jebaniemakpie';
const description = 'tutaj jebiemy makpaja';
const createdAt = new Date('2001-09-11');
const memberCount = 69;

export default function SubnigditInfo({ id }: SubnigditInfoProps) {
  return (
    <>
      <div className="text-left font-normal flex flex-row dark:text-white bg-foregroundL dark:bg-foregroundD border-solid drop-shadow-lg border-2 rounded-[5px] py-2 px-2 overflow-hidden mb-2 ">
        <div className="">
          <div className="flex flex-row mb-5">
            <Image
              src={makpaj}
              width={25}
              height={25}
              className="overflow-hidden rounded-full"
            />
            <p className="ml-1 font-['Roboto'] font-semibold dark:text-white text-base">
              {name}
            </p>
          </div>

          <div className="font-['Roboto'] dark:text-white text-base mb-5">
            <p className="mb-5 ">{description}</p>

            <p className="mb-5 ">🍰 Created at {createdAt.toDateString()}</p>
          </div>

          <div>
            <hr className="border-white border-solid border-[1px] w-[100%]"></hr>
          </div>

          <div className="flex flex-row my-5 justify-center">
            <div className="mx-2">
              <Image src={userIcon} width={40} height={60} />
            </div>
            <div className="flex flex-col">
              <div className="text-3xl text-center">
                <p>{memberCount}</p>
              </div>
              <div>
                <p className='text-lg'>{'Members'}</p>
              </div>
            </div>
          </div>

          <div>
            <hr className="border-white border-solid border-[1px] w-[100%]"></hr>
          </div>

          <div className="my-5">
            <JoinButton />
          </div>
        </div>
      </div>
    </>
  );
}
