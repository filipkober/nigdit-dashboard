import Image from 'next/image';
import banner from '../../../assets/banner.png';
import makpaj from '../../../assets/o.jpg';
import { JoinButton } from '../../atoms/JoinButton';
type Props = {};

export default function DashboardHeader() {
  return (
    <div className="relative ">
      <div className="relative h-[25vh] bg-red-500 pointer-events-none">
        <Image src={banner} alt={'Subnigdit Banner'} layout="fill"></Image>
        {/* <img className="object-cover h-[20vh] w-[80vw]" src='https://source.unsplash.com/random/1920x1080' alt='></img> */}
      </div>
      <div className="overflow-hidden w-[20vh] h-[20vh] absolute object-center -my-[10vh] ml-[3vh] drop-shadow-2xl border-solid border border-gray-600/50 rounded-full">
        <Image
          src={makpaj}
          alt="Profile Picture"
          layout="fill"
          className="rounded-full "
        />
      </div>

      <div className="h-[25vh] bg-foregroundD overflow-hidden p-3 mb-[1vw]">
        <div className='flex flex-row'>
          <p className="text-left text-xl ml-[23vh]">n/JebanieCygana</p>
          <div className='ml-auto'><JoinButton /></div>
        </div>

        <p className="text-left mt-[8vh] mx-[2vw]">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          omnis fuga placeat nemo vel unde, iusto veniam! Veniam dolores libero
          odio maxime molestias perspiciatis et quidem ex nam. Nobis, pariatur.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          omnis fuga placeat nemo vel unde, iusto veniam! Veniam dolores libero
          odio maxime molestias perspiciatis et quidem ex nam. Nobis, pariatur.
        </p>
      </div>
    </div>
  );
}
