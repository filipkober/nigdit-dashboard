import autoAnimate from '@formkit/auto-animate';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StrapiSubnigdit } from '../../../models/Subnigdit';
import ToastType from '../../../models/ToastType';
import PostService from '../../../util/requests/PostService';
import SubnigditService from '../../../util/requests/SubnigditService';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import { toastDisplay } from '../../atoms/Toast';
import SubnigditRules from '../../molecules/SubnigditRules';

type mediaPostFormProps = {
  className?: string;
  subnigditId?: number;
};
const initialValues = {
  title: '',
  media: undefined,
};

type Inputs = {
  title: string;
  media: FileList;
}

export default function MediaPostForm({ className, subnigditId }: mediaPostFormProps) {

  const router = useRouter();

  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [mediaType,setMediaType] = useState("")
  
  const dropHandler = (e: React.DragEvent<HTMLDivElement>, setFieldValue: (a:any, b:any) => void) => {;
    e.preventDefault();
    if (e.dataTransfer.files.length && inputFileRef.current) {
      setFieldValue('media', e.dataTransfer.files[0]);
      setMediaType(e.dataTransfer.files[0].type)
    }
  };
  
  const [subnigdit, setSubnigdit] = useState<StrapiSubnigdit | null>(null)
  const subnigditService = new SubnigditService()
  const postService = new PostService();
  
  useEffect(() => {
      if(subnigditId) {
          subnigditService.getOne(subnigditId).then((res) => {
              setSubnigdit(res)
          })
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subnigditId])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    if(!subnigditId) return toastDisplay(ToastType.Error, "Please select a subnigdit")
    if(values.media) {
      let mediaType: "Image" | "Video" | "Gif";
      if(values.media[0].type.includes("gif")) mediaType = "Gif"
      else if(values.media[0].type.includes("image")) mediaType = "Image"
      else if(values.media[0].type.includes("video")) mediaType = "Video"
      else return toastDisplay(ToastType.Error, "Invalid media type")
      const post = await postService.createMedia({subnigdit: subnigditId, title: values.title, media: values.media[0], type: mediaType});
      toastDisplay(ToastType.Success, "Post created, redirecting...")
      setTimeout(() => {
          router.push(`/post/${post.id}`)
      }, 1500)
  }
  }

  const m = watch('media');

  useEffect(() => {
    if(m && m[0]) setMediaType(m[0].type)
  }, [m]);

  const {ref, onChange: onMediaChange, ...rest} = register('media');
  const [image, setImage] = useState<HTMLImageElement>();

  const mediaInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(e.target.files[0]);
      img.onload = () => {
        setImage(img);
      }
    }
    onMediaChange(e);
  };

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    divRef.current && autoAnimate(divRef.current);
  }, [divRef])

  return (
    <div className={className}>
          <div className='ts:flex flex-row-reverse' ref={divRef}>
            {subnigdit && <div className="mt-2 ts:ml-2 ts:w-1/2 ts:flex align-middle">
              <div className="ml-auto ts:w-1/2 mx-auto">
                <SubnigditRules subnigdit={subnigdit}/>
              </div>
            </div>}
          <form onSubmit={handleSubmit(onSubmit)} className={subnigdit ? 'ts:w-1/2' : 'w-full'}>
            <Input
              type="text"
              name="title"
              initialValue={initialValues.title}
              placeholder={'Title'}
              className="my-2 w-full h-[2rem] text-xl"
              register={register}
            />

            <div className="flex justify-center items-center w-full relative bg-experimentC rounded-lg" onDrop={(e) => dropHandler(e, setValue)} onDragOver={e => e.preventDefault()}>
              {
                (!m || (!!m && !m[0])) ? (
                  <label
                htmlFor="dropzone-file"
                className="flex flex-col justify-center items-center w-full h-64 bg-backgroundL dark:bg-backgroundD rounded-lg border-2 border-foregroundL dark:border-foregroundD border-dashed cursor-pointer dark:hover:bg-bray-800 hover:bg-gray-100 dark:hover:border-gray-500 dark:hover:bg-gray-600 duration-75"
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
                <input id="dropzone-file" type="file" className="hidden" accept="video/*,image/*" {...rest} ref={e => {
                  ref(e);
                  inputFileRef.current = e;
                }}
                onChange={mediaInputOnChange}
                />
              </label>
                ) : (
                  <>
                  {mediaType.includes('image') ? (
                    <Image
                    src={m && m[0] ? URL.createObjectURL(m[0]) : ""}
                    alt="media"
                    height={0}
                    width={0}
                    sizes='100vw'
                    style={{ width: 'auto', height: 'auto', maxWidth: "100%"}}
                    className="rounded-lg flex flex-col justify-center items-center w-full h-[50vh]"
                  />
                  ) : (
                    <video
                    src={m && m[0] ? URL.createObjectURL(m[0]) : ""}
                    className="rounded-lg flex flex-col justify-center items-center w-full h-full"
                    controls
                  />
                  )}
                <button className='border-0 bg-transparent text-red-600 absolute top-2 right-4 font-bold' type='button' onClick={() => reset({
                  media: undefined
                })}>
                  X
                </button></>
                )
              }
            </div>

            <Button variant="submit" content={'Submit'} className="mt-2 w-full h-12"/>
          </form>
          </div>
    </div>
  );
}
