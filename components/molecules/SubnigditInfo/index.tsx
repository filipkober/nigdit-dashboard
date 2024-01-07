import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import userIcon from '../../../assets/user-icon.svg';
import { StrapiSubnigdit } from '../../../models/Subnigdit';
import SubnigditService from '../../../util/requests/SubnigditService';
import { JoinButton } from '../../atoms/JoinButton';

type SubnigditInfoProps = {
  subnigdit: StrapiSubnigdit
};

function formatStrapiDate(dateIn: Date, locale = 'pl-PL'){
  return new Date(dateIn).toLocaleDateString()
}

export default function SubnigditInfo({ subnigdit }: SubnigditInfoProps) {
  const subnigditService = new SubnigditService();
  const [subnigditData, setSubnigditData] = useState<StrapiSubnigdit | null>(null);

  useEffect(() => {
    if(subnigdit.id === 0) return;
    async function e() {
      setSubnigditData(await subnigditService.getOne(subnigdit.id));
    }
    e();
  }, [subnigdit]);

  return (
    <>
      <div className="text-left font-normal font-['Roboto'] dark:text-white bg-foregroundL dark:bg-foregroundD border-solid border-black drop-shadow-lg border-2 rounded-[5px] py-2 px-2 overflow-hidden mb-2 ">
        <div className="mb-5 flex flex-row">
          <Image
            src={process.env.NEXT_PUBLIC_STRAPI_URL! + subnigdit.attributes.icon.data.attributes.url || ''}
            width={128}
            height={128}
            alt={'subnigdit-picture'}
            className="rounded-full object-cover w-20 h-20"
          />
          <Link className="ml-1 font-['Roboto'] font-semibold dark:text-white text-base self-center" href={`/n/${subnigdit.attributes.name_uid}`}>
            n/{subnigdit.attributes.name}
          </Link>
        </div>

        <div className="font-['Roboto'] dark:text-white text-base mb-5">
          <p className="mb-5 max-w-[20ch] line-clamp-4">{subnigdit.attributes.description}</p>

          <p className="mb-5 ">🍰 Created at {formatStrapiDate(subnigdit.attributes.createdAt)}</p>
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
                <p>{ subnigdit.attributes.subscribers.data.length }</p>
              </div>
              <div>
                <p>{(subnigdit.attributes.subscribers.data.length > 1 || subnigdit.attributes.subscribers.data.length === 0) ? "Members" : "Member"}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <hr className="border-white border-solid border-[1px] w-[100%]"></hr>
        </div>

        <div className="my-5 flex justify-center align-middle">
        {subnigditData?
        <JoinButton subnigdit={subnigditData}/> : ""
        }
          {/*  joinedAlready={!!user.subnigdits?.find(s => s.id === subnigdit.id)} */}
        </div>
      </div>
    </>
  );
}
