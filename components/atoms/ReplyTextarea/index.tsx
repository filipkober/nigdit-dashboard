import { SubmitHandler, useForm } from 'react-hook-form';
import ToastType from '../../../models/ToastType';
import ReplyService from '../../../util/requests/ReplyService';
import { toastDisplay } from '../Toast';

type ReplyTextareaProps = {
  commentId: number;
  visible: boolean;
  addReply: () => void;
};

type FormValues = {
  content: string;
}

export default function ReplyTextarea({ commentId, visible, addReply }: ReplyTextareaProps) {

  const replyService = new ReplyService();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const comment = await replyService.create({content: values.content, comment: commentId});
    if (comment) {
      toastDisplay(ToastType.Success, 'Comment created');
      addReply();
    }
  };

  return (
    <>
      <div>
        {visible ? (
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className=''>
            <textarea
              className="px-1 resize-none bg-accentL dark:bg-accentD text-black dark:text-white placeholder:text-black dark:placeholder:text-white placeholder:italic"
              cols={50}
              rows={5}
              placeholder="Put your conclusions and insults here..."
              {...register('content', { required: true })}
            ></textarea>
            <button className="p-1 rounded flex bg-accentL dark:bg-accentD border-solid border-black dark:border-white text-black dark:text-white">
              Reply
            </button>
          </div>
          </form>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
