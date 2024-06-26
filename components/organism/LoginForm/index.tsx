import { useGoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { UserState, setUser } from '../../../store/userSlice';
import UserService from '../../../util/requests/UserService';
import GoogleButton from '../../atoms/GoogleButton';
import InputField from '../../atoms/InputField';

const userService = new UserService();

type FormValues = {
  login: string;
  password: string;
};
const initValues: FormValues = {
  login: '',
  password: '',
};

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const redirect = router.query.redirect as string;

  const [failed, setFailed] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const res = await fetch(
        '/api/google-access-token?code=' + codeResponse.code,
        { method: 'GET' }
      );
      const data = await res.json();
      const res2 = await fetch(
        process.env.NEXT_PUBLIC_STRAPI_URL+'/api/auth/google/callback?access_token=' +
          data.tokens.access_token
      );
      const userData = await res2.json();
      try {
        if (userData.user.username != null) {
          Cookies.set('jwt', userData.jwt, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
          });
          dispatch(setUser(userData.user));
          router.push(!!redirect ? redirect : '/');
        }
      }
        catch
        {
          setFailed(true);
        }
      },
      flow: 'auth-code', //implicit
    });

  //redirect if logged
  const user = useSelector((state: UserState) => state.user)
  const {username, profilePicture} = user;
  useEffect(()=>{
    if(!!username)
    {
      window.location.href = '/my-account'
    }
  },[])


    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<FormValues>()
    const onSubmit: SubmitHandler<FormValues> = async (values) => {
      const userData = await userService.login(
              values.login,
              values.password
            );
            try {
              if (userData.user.username != null) {
                Cookies.set('jwt', userData.jwt);
                dispatch(setUser(userData.user));
                router.push(!!redirect ? redirect : '/');
              }
            } catch {
              setFailed(true);
            }
    }

    console.log(register('login'))

  return (
    <div className="w-[100%] m-0 p-0 h-[100%] flex flex-col justify-center items-center">
      <div className="selection:bg-[#b8b8b8] selection:text-[#FF5C00] flex flex-wrap flex-col justify-center items-center w-[90vw]">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Login title text */}
              <div className=" w-[100%] min-h-[3rem] h-[7vh] flex flex-wrap flex-col justify-center items-center my-4">
                <p className="shrink-1 text-[4.5rem] font-['Roboto'] dark:text-white text-center font-bold">
                  Log in
                </p>
              </div>
              {/* subtitle privacy policy */}
              <div className=" w-[100%] min-h-[1.5rem] h-[1vw] flex flex-row justify-center">
                <p className="shrink-1 text-[1rem] font-['Roboto'] dark:text-white font-bold italic">
                  Welcome back!
                </p>
              </div>
              {/* google login */}
              <div className=" w-[100%] min-h-[3rem] h-[8vh] flex flex-row justify-center items-center mt-3 ">
                <br></br>
                <GoogleButton
                  onClick={() => {
                    login();
                  }}
                />
              </div>
              {/* --- or --- */}
              <div className=" w-[100%] min-h-[2rem] h-[5vh] flex flex-row justify-between px-3 my-3 items-center">
                <div className="w-[38%] m-0 p-0">
                  <hr className="border-white border-solid border-[1px] w-[100%] h-[100%]"></hr>
                </div>
                <div className="w-[24%] m-0 p-0">
                  <p className="text-center shrink-1 text-[2rem] font-['Roboto'] dark:text-white w-[100%] h-[100%]">
                    {' '}
                    or{' '}
                  </p>
                </div>
                <div className="w-[38%] m-0 p-0">
                  <hr className="border-white border-solid border-[1px] w-[100%] h-[100%]"></hr>
                </div>
              </div>
              {/* login */}
              <div className="w-[100%] min-h-[3rem] h-[2.8vw] flex flex-row justify-between px-2 py-0 items-center">
                <p className="w-[37%] shrink-1 text-[1.3rem] font-['Roboto'] dark:text-white flex font-bold">
                  Username
                </p>
                {(failed) ? (
                  <InputField className="w-[63%] h-[85%]" id={'login'} fieldClassName='ring-pink-500 focus:ring-2 ring-[0.6px] border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500' placeholder={'lnosǝɥʇɟoɹǝuʍoɹǝɯɹoɟ'} type={'text'} register={register} name='login'/>
                  ) : (
                  <InputField className="w-[63%] h-[85%]" id={'login'} placeholder={'ln0stǝɥʇɟoɹǝuʍoɹǝɯɹoɟ'} type={'text'} register={register} name='login'/>
                )}
              </div>
              {/* password */}
              <div className="w-[100%] min-h-[3rem] h-[2.8vw] flex flex-row justify-start px-2 py-0 items-center">
                <p className="w-[37%] shrink-1 text-[1.3rem] font-['Roboto'] dark:text-white flex font-bold">
                  Password
                </p>
                {(failed) ? (
                  <InputField className="w-[63%] h-[85%]" id={'password'} fieldClassName='ring-pink-500 focus:ring-2 ring-[0.6px] border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500' placeholder={'pǝʞɐǝl ʎpɐǝɹlɐ ʎlqɐqoɹd'} type={'password'} register={register} name='password'/>
                  ) : (
                  <InputField className="w-[63%] h-[85%]" id={'password'} placeholder={'pǝʞɐǝl ʎpɐǝɹlɐ ʎlqɐqoɹd'} type={'password'} register={register} name='password'/>
                )}
              </div>
              {/* forgot password */}
              {failed ? (
                <p className="mt-[0.2rem]] text-pink-600 text-sm pl-2 w-[100%]">
                  Wrong login or password.
                </p>
              ) : null}
              <div className="w-[100%] min-h-[2rem] h-[1vw] flex flex-row justify-center px-0 py-0 items-center">
                {failed ? (
                  <a
                    href="/register"
                    rel="noreferrer"
                    target="_blank"
                    className="pt-2 pl-2.5 text-[1rem] font-['Roboto'] dark:text-white flex hover:underline"
                  >
                    Forgot your password?
                  </a>
                ) : null}
              </div>
              {/* submit button*/}
              <div className="w-[100%] min-h-[3rem] h-[2vw] flex flex-row justify-center px-0 mt-2 items-center">
                <button
                  type="submit"
                  className='active:translate-y-0.5 duration-[10ms] shrink-1 text-[1.8rem] font-["Roboto"] text-black text-center font-bold drop-shadow-buttonDevil active:drop-shadow-buttonDevilA border-black border-solid border-[1px] rounded-[10px] py-1 px-4 bg-[#FF5C00] hover:bg-[#ff7d31]'
                >
                  Log In
                </button>
              </div>
            </form>
        <div className="mt-5">
          <span className="text-[1rem] font-['Roboto'] dark:text-white font-bold">
            New to Nigdit? &nbsp;
            <Link className="text-blue-500 hover:underline" href="/register">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
