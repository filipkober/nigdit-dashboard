import moment from 'moment';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Arrow from '../../atoms/Vote';
import commentIcon from '../../../assets/comment-icon.svg';
import shareIcon from '../../../assets/share-icon.svg';
import reportIcon from '../../../assets/report-icon.svg';
import makpaj from '../../../assets/makpaj.svg';
import Comment from '../../atoms/Comment';
import Reply from '../../atoms/ReplyButton';
import ReportModal from '../ReportModal';
import { useModal } from '../../../hooks/useModal';
import PostService from '../../../util/requests/PostService';
import { StrapiPost, PostN } from '../../../models/Post';
import { StrapiComment, commentAdapter } from '../../../models/Comment';
import { GenericComponentProps } from '../../../models/GenericComponentProps';
import { useDispatch, useSelector } from 'react-redux';
import { UserState, setCurrentSubnigdit } from '../../../store/userSlice';
import Toast, { toastDisplay } from '../../atoms/Toast';
import { ToastContainer, toast } from 'react-toastify';
import ToastType from '../../../models/ToastType';
import 'react-toastify/dist/ReactToastify.css';
import Share from '../../atoms/Share';
import Vote from '../../atoms/Vote';
import CommentService from '../../../util/requests/CommentService';
import { SubmitHandler, useForm } from 'react-hook-form';

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
  const modIds = subnigdit.data.attributes.moderators.data.map(m => m.id);

  const [modalReportVisible, changeModalReportVisible] = useModal();

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
  } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const comment = await commentService.create({content: values.content, post: post.id});
    if (comment) {
      toastDisplay(ToastType.Success, 'Comment created');
      post.comments ? post.comments.data.push(comment) : post.comments = {data: [comment]};
      reset();
    } else {
      toastDisplay(ToastType.Error, 'Error creating comment');
    }
  };

  return (
    <>
      <div className={className}>
        <div className="text-left font-normal border-black bg-foregroundL dark:bg-foregroundD border-solid drop-shadow-lg border-2 rounded-[5px] py-2 px-2 overflow-hidden mb-2">
          <div className="flex ls:flex-row flex-col">
            <div className="flex ">
              <div className="font-['Roboto'] w-7 h-7 mr-1">
                <Image
                  src={
                    process.env.NEXT_PUBLIC_STRAPI_URL! +
                      subnigdit?.data.attributes.icon.data.attributes.url || ''
                  }
                  width={25}
                  height={25}
                  className="overflow-hidden w-[100%] h-[100%] rounded-full object-cover"
                  alt={''}
                  loader={() =>
                    process.env.NEXT_PUBLIC_STRAPI_URL! +
                      subnigdit?.data.attributes.icon.data.attributes.url || ''
                  }
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
                    loader={(img) =>
                      process.env.NEXT_PUBLIC_STRAPI_URL! +
                      media.data.attributes.url!
                    }
                    className={`w-[100%] h-[${media.data.attributes.height}px] object-cover`}
                  />
                </div>
              ) : media && media.data.attributes && type == 'Video' ? (
                <video controls className="w-[92%] max-h-[100vh]">
                  <source src={media!.data.attributes.url} />
                </video>
              ) : null}
            </div>
          </div>
          <div className="flex font-['Roboto'] dark:text-white text-xl mt-5">
            {/* chujstwo pod contentem */}
            <div className='flex flex-row content-start w-1/2'>
            <p className="mr-5">{allComNum} Comment{(allComNum === 0 || allComNum > 1) ? 's' : ''}</p>
            <Vote votes={votes} contentId={id} contentType='post' variant='horizontal' className='mb-2' arrowSize={30}/>
            </div>
            <div className='flex flex-row content-end w-1/2'>
            <Share />
            {isLogged &&
            <p className="ml-5 cursor-pointer">
              <a onClick={changeModalReportVisible}>Report</a>
            </p>}
            </div>
          </div>
          <div>
            {/* KOMETNARZE */}
            {isLogged && (
            <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              className="px-1 w-[100%] resize-none bg-accentL dark:bg-accentD text-black dark:text-white placeholder:text-black dark:placeholder:text-white placeholder:italic"
              cols={50}
              rows={5}
              placeholder="Put your racist opinion here..."
              {...register("content", { required: true })}
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
