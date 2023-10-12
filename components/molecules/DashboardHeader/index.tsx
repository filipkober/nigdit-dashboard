import Image from 'next/image';
import banner from '../../../assets/banner.png';
import { StrapiSubnigdit } from '../../../models/Subnigdit';
import { JoinButton } from '../../atoms/JoinButton';
type Props = {
  subnigdit: StrapiSubnigdit;
  isLogged?: boolean
}

export default function DashboardHeader({subnigdit, isLogged}: Props)
{
  return (
    <div className="font-['Roboto']">
      <div className="relative h-[25vh] bg-red-500 pointer-events-none">
        {subnigdit.attributes.banner.data == null ? (
          <Image
            src={banner}
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

        {/* <img className="object-cover h-[20vh] w-[80vw]" src='https://source.unsplash.com/random/1920x1080' alt='></img> */}
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

      <div className=" bg-foregroundD overflow-hidden p-1 mb-[1vw]">
        <div className="flex tm:flex-row items-center tm:mt-0 mt-[10vh] justify-around">
          <div>
            <p className="text-left text-xl tm:ml-[23vh]">
              n/{subnigdit.attributes.name}
            </p>
          </div>
          <div className="tm:ml-auto ml-[5vw] flex flex-row items-center">
            <p className="mr-[2vw] lm:text-lg text-base tm:flex hidden">
              {subnigdit.attributes.subscribers.data.length} members
            </p>
            <div className="scale-75 tm:scale-100 m-2">
              {isLogged ? (
                <JoinButton
                  subnigdit={subnigdit}
                />
              ) : (
                <div className="py-5"></div>
              )}
            </div>
          </div>
        </div>

        <p className="mr-[2vw] lm:text-lg text-base justify-center flex tm:hidden">
          {subnigdit.attributes.subscribers.data.length} members
        </p>

        <p className="text-left mt-[5vh] mb-[1vh] mx-[2vw]">
          {subnigdit.attributes.description}
        </p>
      </div>
    </div>
  );
}
