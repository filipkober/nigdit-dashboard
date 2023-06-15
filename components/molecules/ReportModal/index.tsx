import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from "../../atoms/Button";
import { GenericComponentProps } from '../../../models/GenericComponentProps';
import { useEffect, useRef } from 'react';
import ReportService from '../../../util/requests/ReportService';

type ReportModalProps = {
  isOpen: boolean;
  contentType: 'post' | 'comment' | 'reply';
  id: number;
  subnigditId?: number;
  onClose: () => void;
} & GenericComponentProps;

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

  return (
    <dialog id='report-modal' className='fixed inset-0 items-center justify-center dark:bg-backgroundD border-white border-2 rounded-md' ref={dialogRef}>
      <Formik
        initialValues={{ reason: '', platform: 'subnigdit' }}
        validate={values => {
          const errors: any = {};
          if (!values.reason) {
            errors.reason = 'Reason is required';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try{
          await reportService.create(contentType, values.reason, id, values.platform === "subnigdit", values.platform === "subnigdit" ? subnigditId : undefined)
          setSubmitting(false);
          onClose();
          } catch (e) {
            console.log(e);
            onClose();
          }
        }}
      >
        <Form>
          <div className="flex mx-2 mt-2 text-xl dark:text-white">
            <p>Report</p>
            <p className="ml-auto cursor-pointer"><a onClick={onClose}>X</a></p>
          </div>
          <div className="mt-4 flex flex-col ls:flex-row justify-around ls:justify-self-auto h-[70%] w-full">
            <div className="mx-2 ls:w-[15rem]">
              <Field as="textarea" name="reason" placeholder="Reason" className="p-2 border" />
              <ErrorMessage name="reason" component="div" className="text-red-500" />
            </div>
            <div className="mx-2 ls:w-[15rem] flex flex-col-reverse ls:my-0 my-2 justify-end">
              <Field as="select" name="place" className="p-2 border ls:mb-0 mb-2">
                <option value="subnigdit">Subnigdit</option>
                <option value="nigdit">Nigdit</option>
              </Field>
              <label htmlFor="place" className={"dark:text-white ls:mb-0 mb-2"}>This post violates the rules of: </label>
            </div>
            <Button variant={"submit"} content={"Submit"} className={"mx-2 ls:w-[15rem]"} />
          </div>
        </Form>
      </Formik>
    </dialog>
  );
};

export default ReportModal;
