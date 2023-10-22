import { useEffect, useState } from 'react';
import { GenericComponentProps } from '../../../models/GenericComponentProps';
import { StrapiSubnigdit } from '../../../models/Subnigdit';
import SubnigditService from '../../../util/requests/SubnigditService';
import { useSelector } from 'react-redux';
import { UserState } from '../../../store/userSlice';

type JoinButtonProps = {
  subnigdit: StrapiSubnigdit;
} & GenericComponentProps;

export function JoinButton({ className, subnigdit }: JoinButtonProps) {
  
  const subnigditService = new SubnigditService();
  
  const user = useSelector((state: UserState) => state.user)
  
  const [joined, setJoined] = useState<Boolean>(!!user.subnigdits?.find(s => s.id === subnigdit.id) ?? false);

  function joinThisSub()
  {
    setJoined(!joined);
    subnigditService.joinSubnigdit(subnigdit.id.toString())
    .then(
      (response) => {
        console.log("has user joined: "+response)
      }
    )
  }

  return (
    <>
      <button
        onClick={() => {
          joinThisSub()
        }}
        className="w-[8rem] justify-center py-3 font-semibold text-sm text-white rounded-full shadow-sm border border-white"
      >
        {!joined ? 'Join' : 'Joined'}
      </button>
    </>
  );
}
