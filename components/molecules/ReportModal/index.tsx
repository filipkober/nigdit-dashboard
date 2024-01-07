import { useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GenericComponentProps } from '../../../models/GenericComponentProps';
import ToastType from "../../../models/ToastType";
import ReportService from '../../../util/requests/ReportService';
import Button from "../../atoms/Button";
import { toastDisplay } from "../../atoms/Toast";

type ReportModalProps = {
  isOpen: boolean;
  contentType: 'post' | 'comment' | 'reply';
  id: number;
  subnigditId?: number;
  onClose: () => void;
} & GenericComponentProps;

type Inputs = {
  reason: string;
  platform: 'subnigdit' | 'nigdit';
};

const ReportModal = ({ isOpen, onClose, contentType, id, subnigditId }: ReportModalProps) => {

  const reportService = new ReportService();

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen && !dialogRef.current?.open) {
      dialogRef.current?.showModal();
    } else {
        dialogRef.current?.open && dialogRef.current?.close();
    }
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    try{
    await reportService.create(contentType, values.reason, id, values.platform === "subnigdit", values.platform === "subnigdit" ? subnigditId : undefined)
    toastDisplay(ToastType.Success, 'Report created')
    onClose();
    } catch (e) {
      console.log(e);
      toastDisplay(ToastType.Error, 'Error creating report')
      onClose();
    }
  }

  return (
    <dialog id='report-modal' className='fixed inset-0 items-center justify-center dark:bg-backgroundD border-white border-2 rounded-md' ref={dialogRef}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex mx-2 mt-2 text-xl dark:text-white">
            <p>Report</p>
            <div className="ml-auto cursor-pointer"><p onClick={onClose}>X</p></div>
          </div>
          <div className="mt-4 flex flex-col ls:flex-row justify-around ls:justify-self-auto h-[70%] w-full">
            <div className="mx-2 ls:w-[15rem]">
              <textarea placeholder="Reason" className="p-2 border" {...register("reason", {required: true})} />
              {errors.reason &&<p className="text-red-500">this field is required</p>}
            </div>
            <div className="mx-2 ls:w-[15rem] flex flex-col-reverse ls:my-0 my-2 justify-end">
              <select className="p-2 border ls:mb-0 mb-2" {...register("platform")}>
                <option value="subnigdit">Subnigdit</option>
                <option value="nigdit">Nigdit</option>
              </select>
              <label htmlFor="place" className={"dark:text-white ls:mb-0 mb-2"}>This post violates the rules of: </label>
            </div>
            <Button variant={"submit"} content={"Submit"} className={"mx-2 ls:w-[15rem]"} />
          </div>
        </form>
    </dialog>
  );
};

export default ReportModal;
