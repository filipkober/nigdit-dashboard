import Image from 'next/image';
import userIcon from '../../../assets/user-icon.svg';
import { JoinButton } from '../../atoms/JoinButton';
import { SubnigditN } from '../../../models/Subnigdit';
import moment from 'moment';

type SubnigditInfoProps = {
  subnigdit: SubnigditN;
};

function formatStrapiDate(dateIn: Date, locale = 'pl-PL') {
  return new Date(dateIn).toLocaleDateString();
}

export default function SubnigditInfo({ subnigdit }: SubnigditInfoProps) {

  console.log(subnigdit.iconUrl)

  return (
    <>
      <div className="text-left font-normal font-['Roboto'] dark:text-white bg-foregroundL dark:bg-foregroundD border-solid border-black drop-shadow-lg border-2 rounded-[5px] py-2 px-2 overflow-hidden mb-2 ">
        <div className="mb-5 flex flex-row">
          <div className="h-10 w-10">
            <Image
              src={process.env.NEXT_PUBLIC_STRAPI_URL! + subnigdit.iconUrl}  
              width={25}
              height={25}
              className="h-10 rounded-full"
              alt={''}
              loader={() => process.env.NEXT_PUBLIC_STRAPI_URL! + subnigdit.iconUrl}
            ></Image>
          </div>
{}
          <span className="ml-1 font-['Roboto'] font-semibold dark:text-white text-base self-center">
            {subnigdit.name}
          </span>
        </div>

        <div className="font-['Roboto'] dark:text-white text-base mb-5">
          <p className="mb-5 ">{subnigdit.description}</p>

          <p className="mb-5 ">
            🍰 Created at {formatStrapiDate(subnigdit.createdAt)}
          </p>
        </div>

        <div>
          <hr className="border-white border-solid border-[1px] w-[100%]"></hr>
        </div>
        <div className="flex justify-center align-middle">
          <div className="my-5 h-10 w-40 flex flex-row">
            <div>
              <Image src={userIcon} className="h-10" alt={''}></Image>
            </div>
            <div className="flex flex-col">
              <div>
                <p>{subnigdit.subscribers.length}</p>
              </div>
              <div>
                <p>Members</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <hr className="border-white border-solid border-[1px] w-[100%]"></hr>
        </div>

        <div className="my-5 flex justify-center align-middle">
          <JoinButton />
        </div>
      </div>
    </>
  );
}
