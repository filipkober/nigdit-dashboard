import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaRegCommentAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { useModal } from '../../../hooks/useModal';
import { useShare } from '../../../hooks/useShare';
import { commentAdapter } from '../../../models/Comment';
import { GenericComponentProps } from '../../../models/GenericComponentProps';
import { PostN } from '../../../models/Post';
import ToastType from '../../../models/ToastType';
import { UserState } from '../../../store/userSlice';
import CommentService from '../../../util/requests/CommentService';
import PostService from '../../../util/requests/PostService';
import Comment from '../../atoms/Comment';
import Share from '../../atoms/Share';
import { toastDisplay } from '../../atoms/Toast';
import Vote from '../../atoms/Vote';
import ExpandableMenu from '../ExpandableMenu';
import ReportModal from '../ReportModal';

type PostExtendedProps = {
  post: PostN;
};

type FormValues = {
  content: string;
};

export default function PostExtended({
  post,
  className,
}: PostExtendedProps & GenericComponentProps) {
  const title = post.title;
  const description = post.description;
  const media = post.media;
  const author = post.owner;
  const subnigdit = post.subnigdit;
  const comments = post.comments;
  const votes = post.votes;
  const createdAt = post.createdAt;
  const type = post.type;
  const id = post.id;
  const modIds = subnigdit.data.attributes.moderators.data.map((m) => m.id);

  const [modalReportVisible, changeModalReportVisible] = useModal();

  const postService = new PostService();
  const router = useRouter();

  const isLogged = !!useSelector((state: UserState) => state.user.username);

  let allComNum = comments?.data.length || 0;
  comments?.data.map(
    (c) => (allComNum += c.attributes.replies?.data.attributes.count || 0)
  );

  const commentService = new CommentService();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const comment = await commentService.create({
      content: values.content,
      post: post.id,
    });
    if (comment) {
      toastDisplay(ToastType.Success, 'Comment created');
      post.comments
        ? post.comments.data.push(comment)
        : (post.comments = { data: [comment] });
      reset();
    } else {
      toastDisplay(ToastType.Error, 'Error creating comment');
    }
  };

  const share = useShare();

  let menuButtons = [
    {
      text: 'Share',
      onClick: share,
      id: 'share',
      disasbled: !isLogged,
    },
    {
      text: 'Report',
      onClick: changeModalReportVisible,
      id: 'report',
      disasbled: !isLogged,
    }
  ];

  const {id: userId, admin, moderates} = useSelector((state: UserState) => state.user);

  const isAdminOrMod = (admin || !!moderates?.find(m => m.id === subnigdit.data.id))
  const isOwner = userId === author.data.id

  const deletePost = async () => {
    const deleted = await postService.delete(id);
    if(deleted) {
      toastDisplay(ToastType.Success, "Post deleted, refreshing page...")
      setTimeout(() => {
        router.reload();
      }, 1500);
    }
  }

  const banUser = async () => {
    const banned = await postService.banAuthor(id);
    if(banned) {
      toastDisplay(ToastType.Success, "Author banned, refreshing page...")
      setTimeout(() => {
        router.reload();
      }, 1500);
    }
  }

  if (isAdminOrMod) {
    menuButtons = [...menuButtons,
      {
        text: "Delete",
        onClick: deletePost,
        id: "delete",
        disasbled: !isLogged,
      },
      {
        text: "Ban",
        onClick: banUser,
        id: "ban",
        disasbled: !isLogged,
      }
  ]
  } else if (isOwner) {
    menuButtons = [...menuButtons,
      {
        text: "Delete",
        onClick: deletePost,
        id: "delete",
        disasbled: !isLogged,
      }
  ]
  }

  return (
    <>
      <div className={className}>
        <div className="text-left font-normal border-black bg-foregroundL dark:bg-foregroundD border-solid drop-shadow-lg border-2 rounded-[5px] py-2 px-2 overflow-hidden mb-2">
          <div className="flex ls:flex-row flex-col">
            <div className="flex ">
              <div className="font-['Roboto'] w-7 h-7 mr-1 flex-shrink-0">
                <Image
                  src={
                    process.env.NEXT_PUBLIC_STRAPI_URL! +
                      subnigdit?.data.attributes.icon.data.attributes.url || ''
                  }
                  width={128}
                  height={128}
                  className="overflow-hidden w-[100%] h-[100%] rounded-full object-cover"
                  alt={''}
                />
              </div>
              <p className="font-['Roboto'] dark:text-white text-base">
                n/{subnigdit?.data.attributes.name}
              </p>
              <p className="font-['Roboto'] dark:text-[rgba(197,197,197,1)] text-foregroundD ml-2 text-base truncate">
                author:{' '}
                <span className="dark:text-white">
                  {author.data.attributes.username}
                </span>
              </p>
            </div>
            <div className="ls:ml-auto">
              {' '}
              <p className="font-['Roboto'] dark:text-white text-base whitespace-nowrap">
                posted {moment(createdAt).fromNow()}
              </p>
            </div>
          </div>
          <div>
            <div>
              <p className="font-['IBM_Plex_Sans'] text-[170%] dark:text-white">
                {title}
              </p>
            </div>
            <div className="flex">
              {type === 'Text' ? (
                <div>
                  <p className="font-['Roboto'] dark:text-white text-xl">
                    {description}
                  </p>
                </div>
              ) : media &&
                media.data.attributes &&
                (type == 'Image' || type == 'Gif') ? (
                <div
                  className={`text-center mr-10 w-[92%] h-${media.data.attributes.height}px`}
                >
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_STRAPI_URL! +
                      media.data.attributes.url
                    }
                    alt={title + ' image or gif'}
                    width={media.data.attributes.width!}
                    height={media.data.attributes.height!}
                    className={`w-[100%] h-[${media.data.attributes.height}px] object-cover`}
                  />
                </div>
              ) : media && media.data.attributes && type == 'Video' ? (
                <video controls className="w-[92%] max-h-[100vh]">
                  <source
                    src={process.env.NEXT_PUBLIC_STRAPI_URL + media!.data.attributes.url}
                  />
                </video>
              ) : null}
            </div>
          </div>
          <div className="flex font-['Roboto'] dark:text-white text-xl mt-5 z-0">
            <div className="flex flex-row content-start ls:w-1/2 w-full">
              <p className="mr-5 flex">
              <FaRegCommentAlt className='h-full mr-2' />{allComNum} <span className='hidden ls:inline ml-[.6ch]'>Comment{allComNum === 0 || allComNum > 1 ? 's' : ''}</span>
              </p>
              <Vote
                  votes={votes}
                  contentId={id}
                  contentType="post"
                  variant="horizontal"
                  arrowSize={22}
                  className='mr-4'
                />
              <div className='ls:flex hidden'>
              <div className="flex flex-row content-end w-1/2">
                <Share />
                {isLogged && (
                  <p className="ml-5 cursor-pointer">
                    <div onClick={changeModalReportVisible}>Report</div>
                  </p>
                )}
                {isAdminOrMod && (
                    <p className="ml-5 cursor-pointer text-red-400" onClick={banUser}>
                    Ban
                    </p>
                    )}
                {(isOwner || isAdminOrMod) && (
                  <p className="ml-5 cursor-pointer text-red-400" onClick={deletePost}>
                    Delete
                  </p>
                )}
              </div>
              </div>
              <ExpandableMenu
              className='ls:hidden'
                buttons={menuButtons}
              />
            </div>
          </div>
          <div>
            {/* comments */}
            {isLogged && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <textarea
                  className="px-1 w-[100%] resize-none bg-accentL dark:bg-accentD text-black dark:text-white placeholder:text-black dark:placeholder:text-white placeholder:italic"
                  cols={50}
                  rows={5}
                  placeholder="Put your opinion here..."
                  {...register('content', { required: true })}
                ></textarea>

                <button className="p-1 rounded ml-auto flex bg-accentL dark:bg-accentD border-solid border-black dark:border-white text-black dark:text-white">
                  Comment
                </button>
              </form>
            )}
            <div>
              {comments?.data.map((comment) => {
                return (
                  <Comment
                    key={comment.id}
                    comment={commentAdapter(comment)}
                    subId={subnigdit.data.id}
                    opId={author.data.id}
                    modIds={modIds}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <ReportModal
        isOpen={modalReportVisible}
        contentType={'post'}
        onClose={changeModalReportVisible}
        id={id}
        subnigditId={subnigdit?.data.id!}
      />
    </>
  );
}
