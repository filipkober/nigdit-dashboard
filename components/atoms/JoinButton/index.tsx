import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
    subnigditService.joinSubnigdit(subnigdit.id.toString());
  }

  const router = useRouter();
  const name = subnigdit?.attributes?.name_uid;

  const [isOwner, setIsOwner] = useState<boolean>(false);

  useEffect(() => {
    if (name) {
      subnigditService.getBySlug(name as string, true).then((res) => {
        if (res[0]?.attributes?.owner?.data?.id == user?.id) {
          setIsOwner(true);
        } else {
          setIsOwner(false);
        }
      });
    }
  }, [subnigdit?.attributes?.name_uid]);

  function userType() {
    if (isOwner) {
      return 'owner';
    } else if (isLogged) {
      return 'user';
    } else {
      return 'guest';
    }
  }

  const isLogged = !!useSelector((state: UserState) => state.user.username);

  switch (userType()) {
    case 'owner':
      return (
        <button
          onClick={() => {
            router.push(`/n/${subnigdit.attributes.name_uid}/edit`);
          }}
          className="w-[8rem] justify-center py-3 font-semibold text-lg text-white rounded-full shadow-sm border-4 border-white"
        >
          Edit
        </button>
      );
    case 'user':
      return (
        <button
          onClick={() => {
            joinThisSub();
          }}
          className="w-[8rem] justify-center py-3 font-semibold text-lg text-white rounded-full shadow-sm border-4 border-white"
        >
          {!joined ? 'Join' : 'Joined'}
        </button>
      );
    case 'guest':
      return (
        <button
          onClick={() => {
            router.push('/login');
          }}
          className="w-[8rem] justify-center py-3 font-semibold text-lg text-white rounded-full shadow-sm border-4 border-white"
        >
          Join
        </button>
      );
  }
}
