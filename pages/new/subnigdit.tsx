import type { NextPage } from 'next'
import Navbar from '../../components/molecules/Navbar';
import DashboardFeed from '../../components/organism/DashboardFeed';
import SubnigditCreationPanel from '../../components/organism/SubnigditCreationPanel';

const onChange = (value: string)=> console.log(value);

const AddSubnigdit: NextPage = () => {
  const onChange = (value: string)=> console.log(value);

  return (
    <>    
      <div className="dark:text-white dark:bg-backgroundD bg-backgroundL w-[100%] m-0 h-screen scrollbar-thin scrollbar-thumb-[#535353] scrollbar-track-[#2323232a] scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-y-scroll">
        <Navbar value={"test"} searchbar={{onChange: onChange}}/>
        <SubnigditCreationPanel/>
      </div>
    </>
  )
};

export default AddSubnigdit;

