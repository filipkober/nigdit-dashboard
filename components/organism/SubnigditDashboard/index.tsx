import { JoinButton } from '../../atoms/JoinButton';
import DashboardHeader from '../../molecules/DashboardHeader';
import FilteringBar from '../../molecules/FilteringBar';
import PostMedia from '../../molecules/PostMedia';
import PostText from '../../molecules/PostText';
import SubnigditRules from '../../molecules/SubnigditRules';
import DashboardFeed from '../DashboardFeed';
import makpaj from '../../../assets/makpaj.svg';

const desc = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat
      Duis aute irure dolor in reprehenderit in voluptate ...
      Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat
      Duis aute irure dolor in reprehenderit in voluptate
`; //temp

export default function SubnigditDashboard() {
  return (
    <>
      <div className='h-full'>
        <div className="">
          <DashboardHeader />
        </div>
        <div>
          <FilteringBar
            clicked={function (cc: number): void {
              throw new Error('Function not implemented.');
            }}
          />
        </div>
        <div className="flex flex-row justify-around ">
          <div className="w-[20vw]">
            <SubnigditRules />
          </div>
          <div className="ls:w-[50vw] tl:w-[60vw] tm:w-[70vw] ts:w-[80vw] ml:w-[90vw] w-[100vw] min-w-[320px] flex flex-col">
            {/* tu będzie map */}
            <PostMedia
              title="gif post"
              media={{
                type: 'gif',
                source:
                  'https://c.tenor.com/hVm01utkmM8AAAAd/maciek-sze%C5%9Bcia%C5%84czyk-maciasek05.gif',
              }}
              author="makpaj"
              date={new Date('2000-09-23')}
              source={{ name: 'n/subnigdit', image: makpaj }}
              votes={-1500}
            />
            <PostText
              title="post"
              description={desc}
              author="user"
              date={new Date('2022-09-23')}
              source={{ name: 'n/subnigdit', image: makpaj }}
              votes={1500}
            />
            <PostMedia
              title="gif post"
              media={{
                type: 'video',
                source: 'https://www.w3schools.com/html/mov_bbb.mp4',
              }}
              author="makpaj"
              date={new Date('2000-09-23')}
              source={{ name: 'n/subnigdit', image: makpaj }}
              votes={-1500}
            />
          </div>
          <div className="w-[20vw]">
            <SubnigditRules />
          </div>
        </div>
      </div>
    </>
  );
}
