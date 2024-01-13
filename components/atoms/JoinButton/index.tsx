import { useState } from 'react';
import { useSelector } from 'react-redux';
import { GenericComponentProps } from '../../../models/GenericComponentProps';
import { StrapiSubnigdit } from '../../../models/Subnigdit';
import { UserState } from '../../../store/userSlice';
import SubnigditService from '../../../util/requests/SubnigditService';

type JoinButtonProps = {
  subnigdit: StrapiSubnigdit;
  onJoin?: (newState: boolean) => void;
} & GenericComponentProps;

export function JoinButton({ className, subnigdit, onJoin }: JoinButtonProps) {
  const subnigditService = new SubnigditService();

  const user = useSelector((state: UserState) => state.user);

  const [joined, setJoined] = useState<Boolean>(
    !!user.subnigdits?.find((s) => s.id === subnigdit.id) ?? false
  );

  function joinThisSub() {
    onJoin?.(!joined);
    setJoined(!joined);
    subnigditService.joinSubnigdit(subnigdit.id.toString()).then((response) => {
      console.log('has user joined: ' + response);
    });
  }

  return (
    <>
      <button
        onClick={() => {
          joinThisSub();
        }}
        className="w-[8rem] justify-center py-3 font-semibold text-lg text-white rounded-full shadow-sm border-4 border-white"
      >
        {!joined ? 'Join' : 'Joined'}
      </button>
    </>
  );
}
