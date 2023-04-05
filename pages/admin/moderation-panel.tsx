import type { NextPage } from 'next'
import { useState } from 'react';
import ModerationPanel from '../../components/organism/ModerationPanel';
import Navbar from '../../components/molecules/Navbar'
import TabSelector from '../../components/molecules/TabSelector';

const Ballin: NextPage = () => {
    const [selected, setSelected] = useState<number>(0);
  return (
    <div className='bg-backgroundL dark:bg-backgroundD h-full'>
      <Navbar/>
      <TabSelector selected={selected} setSelected={setSelected} tabs={['Posts', 'Comments', 'Subnigdits']}/>
      <ModerationPanel tab={selected} className={"h-screen"}/>
    </div>
  )
}

export default Ballin
