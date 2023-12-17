import { useAutoAnimate } from '@formkit/auto-animate/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import emptypfp from '../../../assets/emptypfp.jpg';
import Makpaj from '../../../assets/makpaj.svg';
import { useModal } from '../../../hooks/useModal';
import ToastType from '../../../models/ToastType';
import { userAdapter } from '../../../models/User';
import { darkModeContext } from '../../../pages/_app';
import { UserState, setUser } from '../../../store/userSlice';
import UserService from '../../../util/requests/UserService';
import Switch from '../../Switch';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import TextArea from '../../atoms/TextArea';
import { toastDisplay } from '../../atoms/Toast';
import VerticalDivider from '../../atoms/VerticalDivider';
import ChangePictureModal from '../../molecules/ChangePictureModal';

type InputsAbout = {
  username: string;
  email: string;
  aboutMe: string;
};
type InputsNewPass = {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};

export default function MyAccountPanel() {
  const [visible, changeVisible] = useModal();
  const [changePassVisible, setChangePassVisible] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useContext(darkModeContext);
  //const [parent] = useAutoAnimate<HTMLDivElement>({duration: 100, easing: 'ease-in-out'});
  //przestarzały kod którego nie umiem naprawić
  const dispatch = useDispatch();

  const user = useSelector((state: UserState) => state.user);
  const { username, email, profilePicture, aboutMe, provider } = user;

  const userService = new UserService();

  const initialValuesAbout = {
    username: username,
    email: email,
    aboutMe: aboutMe,
  };
  const initialValuesPass = {
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  };

  const router = useRouter();

  const {
    register: registerAbout,
    handleSubmit: handleSubmitAbout,
    watch: watchAbout,
    formState: { errors: errorsAbout },
  } = useForm<InputsAbout>();
  const onSubmitAbout: SubmitHandler<InputsAbout> = async (values) => {
    const newUser = await userService.update({
      username: values.username,
      email: values.email,
      aboutMe: values.aboutMe,
    });
    if (newUser) {
      toastDisplay(ToastType.Success, 'Successfully updated');
      dispatch(setUser(userAdapter(newUser)));
    }
  };

  const {
    register: registerPass,
    handleSubmit: handleSubmitPass,
    watch: watchPass,
    formState: { errors: errorsPass },
  } = useForm<InputsNewPass>();
  const onSubmitPass: SubmitHandler<InputsNewPass> = async (values) => {
    const loginUser = await userService.changePassword(
      values.oldPassword,
      values.newPassword,
      values.newPasswordConfirm
    );
  };

  return (
    <div className="flex justify-center flex-col py-4">
      <div className="bg-foregroundL dark:bg-foregroundD w-full ls:w-[98%] cs:h-[60vh] font-[IBM_Plex_Sans] text-3xl flex-col ls:flex-row flex ls:mx-5 pb-4">
        <div className="flex-col w-[100%] ls:w-[12%] ls:h-[100%] flex ml-2">
          <p className="mt-1 ml-2 text-md">My account</p>
          <div className="text-center mt-8 justify-center flex flex-col">
            <div className="rounded-full bg-white mt-2 mx-auto aspect-square w-[100px]">
              <Image
                src={
                  profilePicture
                    ? process.env.NEXT_PUBLIC_STRAPI_URL + profilePicture.url
                    : emptypfp
                }
                alt="profile picture"
                className="rounded-full object-cover aspect-square"
                width={100}
                height={100}
                loader={({ src }) => {
                  return src;
                }}
              />
            </div>
            <Button
              variant="button"
              content="Change"
              onClick={changeVisible}
              className="mt-6 mr-4 ls:mx-auto cs:w-4/5"
            />
            <ChangePictureModal
              isOpen={visible}
              onClose={changeVisible}
              initialImage={
                profilePicture
                  ? process.env.NEXT_PUBLIC_STRAPI_URL + profilePicture.url
                  : emptypfp.src
              }
            />
          </div>
        </div>
        <div className="h-full justify-center items-center ml-8 hidden ls:flex">
          <VerticalDivider height="80%" />
        </div>
        <div className="flex flex-col cs:flex-row">
          <div className="flex mx-auto ls:mx-0">
            <form
              onSubmit={handleSubmitAbout(onSubmitAbout)}
              className="flex flex-col ts:ml-2 cs:ml-8"
            >
              <div className="flex flex-col ls:flex-row">
                <div className="flex flex-col">
                  <Input
                    type="text"
                    className="mt-8 ls:ml-8"
                    name="username"
                    placeholder="Username"
                    initialValue={initialValuesAbout.username}
                    register={registerAbout}
                  />
                  <Input
                    type="email"
                    className="mt-8 ls:ml-8 mx-auto"
                    name="email"
                    placeholder="Email"
                    initialValue={initialValuesAbout.email}
                    register={registerAbout}
                  />
                  <Button
                    variant="submit"
                    content="Save"
                    className="ls:ml-8 mt-8 ls:top-1/4 ls:self-auto self-center w-full ls:w-auto"
                  />
                </div>
                <div className="flex flex-col ls:ml-2 mt-8">
                  <TextArea
                    name={'aboutMe'}
                    placeholder={'About me'}
                    initialValue={initialValuesAbout.aboutMe}
                    className="ls:self-auto self-center mx-auto ls:mx-0 h-[20vh] ls:h-full"
                    register={registerAbout}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="h-full justify-center items-center ml-8 hidden ls:flex">
            <VerticalDivider height="80%" />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col ml-2 self-center ls:self-start">
              <Button
                variant="button"
                content="Change password"
                className="mx-auto ls:ml-8 mt-8"
                onClick={() => {
                  setChangePassVisible(!changePassVisible);
                }}
              />
            </div>
            <div className="flex flex-col ml-2 self-center ls:self-start">
              <Button
                variant="button"
                content="Log out"
                className="mx-auto ls:ml-8 mt-8"
                onClick={() => {
                  router.push('/logout');
                }}
              />
            </div>
            <div>
              {/* ref={parent} */}
              {changePassVisible &&
                (provider === 'local' ? (
                  <form
                    onSubmit={handleSubmitPass(onSubmitPass)}
                    className="flex flex-col"
                  >
                    <div className="flex flex-col cs:flex-row">
                      <div className="flex flex-col ml-2 cs:ml-2">
                        <Input
                          type="password"
                          className="mt-8 ls:ml-8 mx-auto"
                          name="oldPassword"
                          placeholder="Old password"
                          initialValue={initialValuesPass.oldPassword}
                          register={registerPass}
                        />
                        <Input
                          type="password"
                          className="mt-8 ls:ml-8 mx-auto"
                          name="newPassword"
                          placeholder="New password"
                          initialValue={initialValuesPass.newPassword}
                          register={registerPass}
                        />
                        <Input
                          type="password"
                          className="mt-8 ls:ml-8 mx-auto"
                          name="newPasswordConfirm"
                          placeholder="Confirm new pass"
                          initialValue={initialValuesPass.newPasswordConfirm}
                          register={registerPass}
                        />
                        <Button
                          variant="submit"
                          content="Submit"
                          className="ls:ml-8 mt-8 mx-auto"
                        />
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col">
                    <p className="text-center mt-8 max-w-md">
                      You can only change your password through {provider}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-foregroundL dark:bg-foregroundD ls:w-[98%] ls:h-[20vw] font-[IBM_Plex_Sans] text-3xl flex-row flex mt-5 ls:mx-5">
        <div className="flex-col flex">
          <p className="mt-1 ml-2">Preferences</p>
          <div className="flex flex-row">
            <p className="mt-[30%] ml-2 mb-4">Dark mode</p>
            <Switch
              isSet={darkMode}
              setIsSet={setDarkMode}
              className="mt-[34%] ml-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
