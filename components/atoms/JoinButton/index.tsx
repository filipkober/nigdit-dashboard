import { useEffect, useState } from 'react';
import { GenericComponentProps } from '../../../models/GenericComponentProps';
import { StrapiSubnigdit } from '../../../models/Subnigdit';
import SubnigditService from '../../../util/requests/SubnigditService';

type JoinButtonProps = {
  subnigdit: StrapiSubnigdit;
} & GenericComponentProps;

export function JoinButton({ className, subnigdit }: JoinButtonProps) {
  const [joined, setJoined] = useState<Boolean>(false);

  const subnigditService = new SubnigditService();

  useEffect(() => {
    subnigditService.checkSubnigdit(subnigdit.id.toString())
    .then(
      (responseJoined) => {
        setJoined(responseJoined)
      }
    )
  }, []);

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
