import { JoinButton } from '../../atoms/JoinButton';
import DashboardHeader from '../../molecules/DashboardHeader';
import FilteringBar from '../../molecules/FilteringBar';
import PostMedia from '../../molecules/PostMedia';
import PostText from '../../molecules/PostText';
import SubnigditRules from '../../molecules/SubnigditRules';
import DashboardFeed from '../DashboardFeed';
import makpaj from '../../../assets/makpaj.svg';
import TabSelector from '../../molecules/TabSelector';
import { useState } from 'react';
import CreatePostBlock from '../../molecules/CreatePostBlock';

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
  const [selected, setSelected] = useState<number>(0);
  const content = (
    <div className="ls:w-[50vw] flex flex-col font-['Roboto']">
      <div className="mb-[1vh]">
        <FilteringBar
          clicked={function (cc: number): void {
            throw new Error('Function not implemented.');
          }} changeAlg={function (cc: string): void {
            throw new Error('Function not implemented.');
          }}
        />
      </div>
      {/* tu będzie map */}
      <div className="px-2">
        <PostMedia
          title="gif post"
          media={{
            type: 'Gif',
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
            type: 'Video',
            source: 'https://www.w3schools.com/html/mov_bbb.mp4',
          }}
          author="makpaj"
          date={new Date('2000-09-23')}
          source={{ name: 'n/subnigdit', image: makpaj }}
          votes={-1500}
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="h-full">
        <div className="">
          <DashboardHeader />
        </div>

        {/*Mobile View*/}
        <div className="ls:hidden inline">
          <TabSelector
            selected={selected}
            setSelected={setSelected}
            tabs={['Posts', 'Other']}
          />
          {selected === 0 ? (
            content
          ) : (
            <div className="ls:hidden inline">
              <div className="flex flex-col flex-wrap items-center ">
                <div className="w-[40vw] min-w-[300px] my-2 mx-2">
                  <CreatePostBlock />
                </div>
                <div className="w-[40vw] min-w-[300px] my-2 mx-2">
                  <SubnigditRules />
                </div>
              </div>
            </div>
          )}
        </div>

        {/*Desktop View*/}
        <div className="hidden ls:inline">
          <div className="flex flex-row justify-around">
            <div className="w-[20vw] my-2">
              <CreatePostBlock />
            </div>
            {content}
            <div className="w-[20vw] my-2">
              <SubnigditRules/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
