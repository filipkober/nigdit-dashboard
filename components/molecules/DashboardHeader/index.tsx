import Image from 'next/image';
import banner from '../../../assets/banner.png';
import makpaj from '../../../assets/o.jpg';
import { JoinButton } from '../../atoms/JoinButton';
type Props = {};

export default function DashboardHeader() {
  return (
    <div className="font-['Roboto']">
      <div className="relative h-[25vh] bg-red-500 pointer-events-none">
        <Image src={banner} alt={'Subnigdit Banner'} layout="fill" className='drop-shadow-walter'/>
        {/* <img className="object-cover h-[20vh] w-[80vw]" src='https://source.unsplash.com/random/1920x1080' alt='></img> */}
      </div>
      <div className="flex overflow-hidden w-[20vh] h-[20vh] absolute ml-[calc(50vw-10vh)] -my-[10vh] tm:ml-[3vh] drop-shadow-walter rounded-full">
        <Image
          src={makpaj}
          alt="Profile Picture"
          layout="fill"
          className="rounded-full"
        />
      </div>

      <div className=" bg-foregroundD overflow-hidden p-1 mb-[1vw]">
        <div className="flex tm:flex-row items-center tm:mt-0 mt-[10vh] justify-around">
          <div><p className="text-left text-xl tm:ml-[23vh]">n/JebanieCygana</p></div>
          <div className="tm:ml-auto ml-[5vw] flex flex-row items-center">
          <p className="mr-[2vw] lm:text-lg text-base tm:flex hidden">420 members</p> 
            <div className='scale-75 tm:scale-100 m-2'><JoinButton /></div>
          </div>
        </div>
        
        <p className="mr-[2vw] lm:text-lg text-base justify-center flex tm:hidden">420 members</p>

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
