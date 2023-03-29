import React, { InputHTMLAttributes, useState } from 'react';
import InputField from '../../atoms/InputField';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import UserService from '../../../util/requests/UserService';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/userSlice';
import { useRouter } from 'next/router';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import GoogleButton from '../../atoms/GoogleButton'

const userService = new UserService();

type FormValues = {
    login: string,
    password: string,
}
const initValues: FormValues = {
    login: "",
    password: "",
}

export default function LoginForm() {
    const dispatch = useDispatch();    
    const router = useRouter(); 

    const [failed, setFailed] = useState(false);

    const login = useGoogleLogin({
      onSuccess: async codeResponse => {
        console.log(codeResponse.code)
        const res = await fetch('/api/google-access-token?code='+codeResponse.code,{method: 'GET'})
        const data = await res.json()
        console.log(data.tokens.access_toke)
        const res2 = await fetch('http://localhost:1338/api/auth/google/callback?access_token='+data.tokens.access_token);
        const userData = await res2.json()
        console.log(userData)
        try
        {
          if(userData.user.username != null)
          {
            Cookies.set("jwt", userData.jwt);
            dispatch(setUser(userData.user))
            router.push("/")
          }
        }
        catch
        {
          setFailed(true);
        }
      },
      flow: 'auth-code', //implicit
    });
  return (
    <div className="w-[100%] m-0 p-0 h-[100%] flex flex-col justify-center items-center">
      <div className="selection:bg-[#b8b8b8] selection:text-[#FF5C00] flex flex-wrap flex-col justify-center items-center p-[0.5rem] w-[22vw] min-w-[288px] max-w-[380px]">
        <Formik
          initialValues={initValues}
          onSubmit={async (values) => {
            const userData = await userService.login( //dodaj try catch
              values.login,
              values.password
            );
            try
            {
              if(userData.user.username != null)
              {
                Cookies.set("jwt", userData.jwt);
                dispatch(setUser(userData.user))
                router.push("/")
              }
            }
            catch
            {
              setFailed(true);  
            }
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
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
                <GoogleButton onClick={()=>{login()}}/>
                {/* create custom login with google button component in react using tailwind */}
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
              <div className=" w-[100%] min-h-[3rem] h-[2.8vw] flex flex-row justify-start px-0 py-0 items-center">

                {(failed) ? (
                  <InputField className="w-[63%] h-[85%]" name={'login'} id={'login'} fieldClassName='ring-pink-500 focus:ring-2 ring-[0.6px] border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500' placeholder={'lnos ǝɥʇ ɟo ɹǝuʍo ɹǝɯɹoɟ'} type={'text'}/>
                  ) : (
                  <InputField className="w-[63%] h-[85%]" name={'login'} id={'login'} placeholder={'lnos ǝɥʇ ɟo ɹǝuʍo ɹǝɯɹoɟ'} type={'text'}/>
                )}   
                <p className="w-[37%] shrink-1 pl-4 text-[1.3rem] font-['Roboto'] dark:text-white flex font-bold">
                  Username
                </p>
              </div>
              {/* password */}
              <div className="w-[100%] min-h-[3rem] h-[2.8vw] flex flex-row justify-start px-0 py-0 items-center">
                {(failed) ? (
                  <InputField className="w-[63%] h-[85%]" name={'password'} id={'password'} fieldClassName='ring-pink-500 focus:ring-2 ring-[0.6px] border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500' placeholder={'pǝʞɐǝl ʎpɐǝɹlɐ ʎlqɐqoɹd'} type={'password'}/>
                  ) : (
                  <InputField className="w-[63%] h-[85%]" name={'password'} id={'password'} placeholder={'pǝʞɐǝl ʎpɐǝɹlɐ ʎlqɐqoɹd'} type={'password'}/>
                )}                
                <p className="w-[37%] shrink-1 pl-4 text-[1.3rem] font-['Roboto'] dark:text-white flex font-bold">
                  Password
                </p>
              </div>
              {/* forgot password */}              
              { failed ? (<p className="mt-[0.2rem]] text-pink-600 text-sm pl-2 w-[100%]">Wrong login or password.</p>) : null}
              <div className="w-[100%] min-h-[2rem] h-[1vw] flex flex-row justify-center px-0 py-0 items-center">
              { failed ? (
                <a href="http://localhost:3000/register" rel="noreferrer" target="_blank" className="pt-2 pl-2.5 text-[1rem] font-['Roboto'] dark:text-white flex hover:underline">
                  Forgot your password?
                </a>
                ) : null}
              </div>
              {/* submit button ☞  ☜*/}
              <div className="w-[100%] min-h-[3rem] h-[2vw] flex flex-row justify-center px-0 mt-8 items-center">
                <button
                  type="submit"
                  className='active:translate-y-0.5 duration-[10ms] shrink-1 text-[1.8rem] font-["Roboto"] text-black text-center font-bold drop-shadow-buttonDevil active:drop-shadow-buttonDevilA border-black border-solid border-[1px] rounded-[10px] py-1 px-4 bg-[#FF5C00] hover:bg-[#ff7d31]'
                >
                  Explore Nigdit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
