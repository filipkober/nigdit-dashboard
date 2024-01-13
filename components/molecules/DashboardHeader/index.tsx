import Image from 'next/image';
import { useState } from 'react';
import { StrapiSubnigdit } from '../../../models/Subnigdit';
import { JoinButton } from '../../atoms/JoinButton';
type Props = {
  subnigdit: StrapiSubnigdit;
  isLogged?: boolean
}

export default function DashboardHeader({subnigdit, isLogged}: Props)
{
  const [members, setMembers] = useState<number>(subnigdit.attributes.subscribers.data.attributes.count);
  const join = (newState: boolean) => {
    if(newState)
    {
      setMembers(members+1)
    }
    else
    {
      setMembers(members-1)
    }
  }

  return (
    <div className="font-['Roboto']">
      <div className="relative h-[25vh] bg-red-500 pointer-events-none">
        {subnigdit.attributes.banner.data == null ? (
          <Image
            src={'/defBanner.png'}
            alt={'Subnigdit Banner'}
            layout="fill"
            className="drop-shadow-walter"
          />
        ) : (
          <Image
            src={
              process.env.NEXT_PUBLIC_STRAPI_URL +
              subnigdit.attributes.banner.data.attributes.url
            }
            alt={'Subnigdit Banner'}
            layout="fill"
            className="drop-shadow-walter"
          />
        )}

      </div>
      <div className="flex overflow-hidden w-[20vh] h-[20vh] ml-[calc(50vw-10vh)] -my-[10vh] tm:ml-[3vh] drop-shadow-walter rounded-full">
        <Image
          src={
            process.env.NEXT_PUBLIC_STRAPI_URL +
            subnigdit.attributes.icon.data.attributes.url
          }
          alt="Subnigdit icon"
          layout="fill"
          className="rounded-full"
        />
      </div>

      <div className="bg-foregroundD overflow-hidden p-1 mb-2">
        <div className="flex ts:flex-row flex-col items-center tm:mt-0 mt-[10vh] justify-between p-0">
          {/* name section */}
          <div className=' h-[100%] ts:max-w-[50%] p-0 m-0'>
            <p className="text-left font-bold text-[32px] tm:ml-[24vh] ml-[2vw] font-['Roboto']">
              n/{subnigdit.attributes.name}
            </p>
          </div>
          {/* members section */}
          <div className=" h-[100%] ts:max-w-[50%] flex flex-row items-center justify-end">
            <p className="mr-1 lm:text-lg text-[18px] flex">
              {members} members
            </p>
            {isLogged ? (
              <div className='scale-[80%]'>
                <JoinButton
                    subnigdit={subnigdit}
                    onJoin={join}
                  />
              </div>
              ) : (
                ""
              )}
          </div>
        </div>

        <p className="text-left tm:mt-[5vh] mt-2 mb-[1vh] mx-[2vw]">
          {subnigdit.attributes.description}
        </p>
      </div>
    </div>
  );
}
