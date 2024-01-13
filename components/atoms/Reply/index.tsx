import Image from 'next/image';
import { useSelector } from 'react-redux';
import emptypfp from '../../../assets/emptypfp.jpg';
import { useModal } from '../../../hooks/useModal';
import { StrapiUser } from '../../../models/User';
import { UserState } from '../../../store/userSlice';
import ReportModal from '../../molecules/ReportModal';
import Vote from '../Vote';

type ReplyProps = {
  id: number;
  votes: number;
  owner: StrapiUser;
  content: string;
  subId: number;
  authorId?: number;
  opId?: number;
  modIds?: number[];
};

export default function Reply({
  id,
  votes,
  owner,
  content,
  subId,
  opId = 0,
  modIds = [],
}: ReplyProps) {

  const pfp = owner.attributes.profilePicture?.data?.attributes.url || ''

  const isLogged = !!useSelector((state: UserState) => state.user.username)

  const [modalReportVisible, changeModalReportVisible] = useModal();

  let nickColor;
  if(modIds.includes(owner.id)) {
    nickColor = '#77F06A'
  }
  else if (owner.attributes.admin) {
    nickColor = '#F05447'
  }
  else if (owner.id === opId) {
    nickColor = '#F2A44B'
  }

  return (
    <>
      <div className="gridComment my-5">
        <div className="justify-self-auto">
          <Image
            src={pfp ? (process.env.NEXT_PUBLIC_STRAPI_URL! + pfp) : emptypfp}
            width={128}
            height={128}
            alt=""
            className="overflow-hidden rounded-full object-cover w-10 h-10"
          ></Image>
        </div>
        <div className="justify-self-auto">
          <p className="font-bold" style={{
            color: nickColor
          }}>{owner.attributes.username}</p>
        </div>
        <div className="justify-self-auto"></div>
        <div className="justify-self-auto">
          <p>{content}</p>
        </div>
        <div className="justify-self-auto col-span-2 flex flex-row gap-2 mt-2">
              {isLogged &&
              <p className="cursor-pointer" onClick={changeModalReportVisible}>
                Report
              </p>}
            <Vote contentId={id} contentType='reply' variant='horizontal' votes={votes} />
          </div>
      </div>
      <ReportModal
        id={id}
        isOpen={modalReportVisible}
        contentType={'reply'}
        onClose={changeModalReportVisible}
        subnigditId={subId}
      />
      {/* w przyszłości jak nam przyjdzie optymalizować to najlepiej mieć jeden modal na stronę a nie jeden modal na każdy reply */}
    </>
  );
}
