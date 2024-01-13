import { useRouter } from 'next/router';
import { GiHammerDrop } from 'react-icons/gi';
import { MdDeleteForever, MdReport } from 'react-icons/md';
import { GenericComponentProps } from '../../../models/GenericComponentProps';
import ToastType from '../../../models/ToastType';
import PostService from '../../../util/requests/PostService';
import { toastDisplay } from '../../atoms/Toast';
import ExpandableMenu, { Button } from '../ExpandableMenu';

type PostMenuProps = {
    postId: number;
    isAdmin?: boolean;
    showReportModal: (id: number) => void;
} & GenericComponentProps;

export default function PostMenu({postId, isAdmin = false, className, showReportModal}: PostMenuProps) {

  const postService = new PostService();
  const router = useRouter();

  let buttons: Button[] = [
      {
          text: "Report",
          onClick: () => {showReportModal(postId)},
          icon: <MdReport />,
          id: "report"
      },
  ]
    if(isAdmin) {
      buttons = [...buttons,
        {
          text: "Delete",
          onClick: async () => {
            const deleted = await postService.delete(postId);
            if(deleted) {
              toastDisplay(ToastType.Success, "Post deleted, refreshing page...")
              setTimeout(() => {
                router.reload();
              }, 1500);
            }
          },
          icon: <MdDeleteForever />,
          id: "delete"
        },
        {
          text: "Ban",
          onClick: async () => {
            const banned = await postService.banAuthor(postId);
            if(banned) {
              toastDisplay(ToastType.Success, "Author banned, refreshing page...")
              setTimeout(() => {
                router.reload();
              }, 1500);
            }
          },
          icon: <GiHammerDrop />,
          id: "ban"
        }
    ]
    }

  return <ExpandableMenu buttons={buttons} className={className} />
}