import { Formik } from 'formik';
import Image from 'next/image';
import { useRef, useState } from 'react';
import SubnigditRulesType from '../../../models/SubnigditRulesType';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import SubnigditRules from '../../molecules/SubnigditRules';

type mediaPostFormProps = {
  className?: string;
  subnigdit?: SubnigditRulesType;
};
const initialValues = {
  title: '',
  media: undefined,
};
export default function MediaPostForm({ className, subnigdit={name:'n/subnigdit', rules:['no rules']} }: mediaPostFormProps) {

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [mediaType,setMediaType] = useState("")

  const dropHandler = (e: React.DragEvent<HTMLDivElement>, setFieldValue: (a:any, b:any) => void) => {;
    e.preventDefault();
    if (e.dataTransfer.files.length && inputFileRef.current) {
      setFieldValue('media', e.dataTransfer.files[0]);
      setMediaType(e.dataTransfer.files[0].type);
    }
  };


  return (
    <div className={className}>
      <Formik
        initialValues={initialValues}
        onSubmit={() => {
          return;
        }}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <div className='ts:flex flex-row-reverse'>
            {subnigdit && <div className="mt-2 ts:ml-2 ts:w-1/2 ts:flex align-middle">
              <div className="ml-auto ts:w-1/2 mx-auto">
                <SubnigditRules rules={subnigdit}/>
              </div>
            </div>}
          <form onSubmit={handleSubmit} className={subnigdit ? 'ts:w-1/2' : 'w-full'}>
            <Input
              type="text"
              name="title"
              onChange={handleChange}
              initialValue={values.title}
              placeholder={'Title'}
              className="my-2 w-full h-[2rem] text-xl"
            />

            <div className="flex justify-center items-center w-full relative" onDrop={(e) => dropHandler(e, setFieldValue)} onDragOver={e => e.preventDefault()}>
              {
                !values.media ? (
                  <label
                htmlFor="dropzone-file"
                className="flex flex-col justify-center items-center w-full h-64 bg-backgroundL dark:bg-backgroundD rounded-lg border-2 border-foregroundL dark:border-foregroundD border-dashed cursor-pointer dark:hover:bg-bray-800 hover:bg-gray-100 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="mb-3 w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Image or video formats
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" value={values.media} onChange={(t) => {if(t.target.files){ setFieldValue('media', t.target.files[0]); setMediaType(t.target.files[0].type)}}} ref={inputFileRef} accept="video/*,image/*"/>
              </label>
                ) : (
                  <>
                  {mediaType.includes('image') ? (
                    <Image
                    src={URL.createObjectURL(values.media)}
                    alt="media"
                    width={800}
                    height={400}
                    className="rounded-lg flex flex-col justify-center items-center w-full h-[50vh]"
                  />
                  ) : (
                    <video
                    src={URL.createObjectURL(values.media)}
                    className="rounded-lg flex flex-col justify-center items-center w-full h-full"
                    controls
                  />
                  )}
                <button className='border-0 bg-transparent text-red-600 absolute top-2 right-4 font-bold' type='button' onClick={() => setFieldValue('media', undefined)}>
                  X
                </button></>
                )
              }
            </div>

            <Button variant="submit" content={'Submit'} className="mt-2 w-full h-12"/>
          </form>
          </div>
        )}
      </Formik>
    </div>
  );
}
