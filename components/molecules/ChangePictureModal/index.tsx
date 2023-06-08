import Image from 'next/image';
import Button from '../../atoms/Button';
import { Formik } from 'formik';
import { GenericComponentProps } from '../../../models/GenericComponentProps';
import { useEffect, useRef } from 'react';
import emptyPfp from '../../../assets/emptypfp.jpg';
import UserService from '../../../util/requests/UserService';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/userSlice';
import { userAdapter } from '../../../models/User';

type ChangePictureModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialImage?: string;
} & GenericComponentProps;

export default function ChangePictureModal({
  isOpen,
  onClose,
  initialImage = emptyPfp.src,
}: ChangePictureModalProps) {
  const uploadImage = (e: any) => {
    document.getElementById('imgUpload')?.click();
  };
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen && !dialogRef.current?.open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.open && dialogRef.current?.close();
    }
  }, [isOpen]);

  const userService = new UserService();

  const dispatch = useDispatch();

  const initValues : {
    picture: File | null;
  } = {
    picture: null,
  }

  return (
    <Formik
      initialValues={{ picture: null }}
      onSubmit={async (values) => {
        if(!values.picture) return onClose();
        const user = await userService.setProfilePicture(values.picture);
        onClose();
        dispatch(setUser(user))
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
        <form>
          <dialog
            className={`w-screen h-screen z-1 absolute top-0 left-0 bg-transparent`}
            ref={dialogRef}
          >
            <div
              className={`rounded-lg border-2 border-black bg-foregroundL dark:bg-foregroundD absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full ts:w-[25rem] h-[10rem] flex flex-row z-2`}
            >
              <div className="top-0 left-0 absolute">
                <button className="ml-2 text-white" onClick={onClose}>
                  X
                </button>
              </div>

              <div className="rounded-full bg-white aspect-square w-[100px] h-[100px] ml-10 my-auto hover:cursor-pointer relative">
                <Image
                  src={values.picture ? URL.createObjectURL(values.picture) : initialImage}
                  alt="profile picture"
                  width={100}
                  height={100}
                  className="rounded-full z-2 object-cover absolute left-1/5 aspect-square"
                  loader={({src}) => src}
                />
                <div
                  onClick={uploadImage}
                  className="rounded-full text-transparent hover:text-black dark:hover:text-white bg-transparent hover:bg-[rgba(50,50,50,0.4)] fixed flex items-center text-2xl aspect-square w-[100px]"
                >
                  <span className="text-2xl rounded-full align-middle text-center w-full">
                    Change picture
                  </span>
                </div>
                <input
                  hidden
                  type={'file'}
                  id="imgUpload"
                  accept="image/*"
                  name="picture"
                  onChange={(e) => {
                    setFieldValue(
                      'picture',
                      e.currentTarget.files?.[0] || null
                    );
                  }}
                />
              </div>
              <div className="my-auto mr-4 ml-auto">
                <Button
                  variant="submit"
                  content="Submit"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </dialog>
        </form>
      )}
    </Formik>
  );
}
