import React, {
  useState,
  forwardRef,
  ForwardedRef,
  useImperativeHandle,
  useRef,
} from 'react';
import InputField from '../../atoms/InputField';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import UserService from '../../../util/requests/UserService';
import { StrapiUser } from '../../../models/User';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import GoogleButton from '../../atoms/GoogleButton';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/userSlice';
import { SubmitHandler, useForm } from "react-hook-form";
import Link from 'next/link';

const userService = new UserService();

type Props = {
  verChange: (val: boolean, email: string) => void;
};
type FormValues = {
  login: string;
  password: string;
  repeat: string;
  email: string;
};
const initValues: FormValues = {
  login: '',
  password: '',
  repeat: '',
  email: '',
};
const schema = yup.object().shape({
  //! dodaj do pliku osobnego
  login: yup
    .string()
    .min(2, 'Username is too short.')
    .max(20, 'Username is too long.')
    .required('Username field is required.')
    .trim()
    .matches(
      /^(?![_-])(?!-*[_-]{2})[a-zA-Z0-9-_]+(?<![_-])$/,
      'Your username can only contain letters, numbers, underscores, dashes and dots.'
    ),
  password: yup
    .string()
    .min(2, 'Password is too short.')
    .max(30, 'Password is too long.')
    .required('Password field is required.'),
  repeat: yup
    .string()
    .required('Password confirmation is required.')
    .oneOf([yup.ref('password')], 'Passwords must match.'),
  email: yup
    .string()
    .email('Email address is invalid.')
    .trim()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Email address is invalid.'
    )
    .required('Required'),
});
//NAPRAW niech errory beda dynamiczne

export default function RegisterForm({ verChange }: Props) {
  const [au, setAu] = useState('');

  const dispatch = useDispatch();
  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const res = await fetch(
        '/api/google-access-token?code=' + codeResponse.code,
        { method: 'GET' }
      );
      const data = await res.json();
      const res2 = await fetch(
        'http://localhost:1338/api/auth/google/callback?access_token=' +
          data.tokens.access_token
      );
      const userData = await res2.json();
      try {
        if (userData.user.username != null) {
          Cookies.set('jwt', userData.jwt);
          dispatch(setUser(userData.user));
          router.push('/');
        }
      } catch {}
    },
    flow: 'auth-code',
  });

      const {
        register,
        handleSubmit,
        watch,
        formState: { errors, touchedFields },
      } = useForm<FormValues>({resolver: yupResolver(schema)})
      const onSubmit: SubmitHandler<FormValues> = async (values) => {
        const userData = await userService.register(values.login, values.email, values.password);
        console.log(userData);
        try
        {
            if(userData.user.email != null)
            {
                verChange(true, userData.user.email);                        
                //Cookies.set("jwt", userData.jwt);
            }
        }
        catch(e)
        {
            setAu("The username or email is already in use.")   
        }         
    }

    return(       
    <div className="w-[100%] m-0 p-0 h-[100%] flex flex-col justify-center items-center">      
        <div className='selection:bg-[#b8b8b8] selection:text-[#FF5C00] flex flex-wrap flex-col justify-center items-center p-[0.5rem] w-[90vw] min-w-[288px] ms:w-[80w] ms:min-w-[320px] mm:w-[75vw] ml:w-[70vw] ts:w-[60vw] tm:w-[7vw] tl:w-[35vw] ls:w-[20vw]'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Register title text */}
                    <div className=' w-[100%] min-h-[3rem] h-[7vh] flex flex-wrap flex-col justify-center items-center my-4'>
                        <p className="shrink-1 text-[4.5rem] font-['Roboto'] dark:text-white text-center font-bold">Register</p>
                    </div>
                    {/* subtitle privacy policy */}
                    <div className=' w-[100%] min-h-[1.5rem] h-[1vw] flex flex-row justify-center'>
                        <p className="shrink-1 text-[1rem] font-['Roboto'] dark:text-white font-bold italic">By continuing you agree to Privacy Policy</p>
                    </div>
                    {/* missing google stuff */}
                    <div className=" w-[100%] min-h-[3rem] h-[8vh] flex flex-row justify-center items-center mt-3 ">              
                        <GoogleButton isRegister onClick={()=>{login()}}/>
                    </div>
                    {/* --- or --- */}
                    <div className=' w-[100%] min-h-[2rem] h-[5vh] flex flex-row justify-between px-3 my-3 items-center'>
                        <div className='w-[38%] m-0 p-0'><hr className="border-white border-solid border-[1px] w-[100%] h-[100%]"></hr></div>
                        <div className='w-[24%] m-0 p-0'><p className="text-center shrink-1 text-[2rem] font-['Roboto'] dark:text-white w-[100%] h-[100%]"> or </p></div>
                        <div className='w-[38%] m-0 p-0'><hr className="border-white border-solid border-[1px] w-[100%] h-[100%]"></hr></div>
                    </div>
                    {/* login */}
                    <div className=' w-[100%] min-h-[3rem] h-[2.8vw] flex flex-row justify-start px-0 py-0 items-center'>
                        {(errors.login && touchedFields.login) || au != "" ? (
                            <InputField className="w-[63%] h-[85%]" fieldClassName='ring-pink-500 focus:ring-2 ring-[0.6px] border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500' name={'login'} id={'login'} placeholder={'h0p3less0ul'} type={'text'} register={register}/>
                        ) : (
                            <InputField className='w-[63%] h-[85%]' name={'login'} id={'login'} placeholder={'h0p3less0ul'} type={'text'} register={register}/>
                        )}                        
                        <p className="w-[37%] shrink-1 pl-4 text-[1.3rem] font-['Roboto'] dark:text-white flex font-bold">Username</p>                        
                    </div>
                    {/* password */}
                    <div className='w-[100%] min-h-[3rem] h-[2.8vw] flex flex-row justify-start px-0 py-0 items-center'>
                        {errors.password && touchedFields.password ? (
                            <InputField className='w-[63%] h-[85%]' fieldClassName='ring-pink-500 focus:ring-2 ring-[0.6px] border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500' name={'password'} id={'password'} placeholder={'⠹∞∮⅟∑Ω➫ⅫΘð㊑﷼Æ'} type={'password'} register={register}/>
                        ) : (
                            <InputField className='w-[63%] h-[85%]' name={'password'} id={'password'} placeholder={'⠹∞∮⅟∑Ω➫ⅫΘð㊑﷼Æ'} type={'password'} register={register}/>
                        )}                          
                        <p className="w-[37%] shrink-1 pl-4 text-[1.3rem] font-['Roboto'] dark:text-white flex font-bold">Password</p>
                    </div>
                    {/* repeat password */}
                    <div className='w-[100%] min-h-[3rem] h-[2.8vw] flex flex-row justify-start px-0 py-0 items-center'>
                        {errors.repeat && touchedFields.repeat ? (
                            <InputField className='w-[63%] h-[85%]' fieldClassName='ring-pink-500 focus:ring-2 ring-[0.6px] border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500' name={'repeat'} id={'repeat'} placeholder={'now repeat please'} type={'password'} register={register}/>
                        ) : (
                            <InputField className='w-[63%] h-[85%]' name={'repeat'} id={'repeat'} placeholder={'now repeat please'} type={'password'} register={register}/>
                        )}
                        <p className="w-[37%] shrink-1 pl-4 text-[1.3rem] font-['Roboto'] dark:text-white flex font-bold">Password</p>
                    </div>
                    {/* email */}
                    <div className='w-[100%] min-h-[3rem] h-[2.8vw] flex flex-row justify-start px-0 py-0 items-center'>
                        {(errors.email && touchedFields.email) || au != "" ? (
                            <InputField className='w-[63%] h-[85%]' fieldClassName='ring-pink-500 focus:ring-2 ring-[0.6px] border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500' name={'email'} id={'email'} placeholder={'5t3almy@data.com'} type={'email'} register={register}/>
                        ) : (
                            <InputField className='w-[63%] h-[85%]' name={'email'} id={'email'} placeholder={'5t3almy@data.com'} type={'email'} register={register}/> 
                        )}
                        <p className="w-[37%] shrink-1 pl-4 text-[1.3rem] font-['Roboto'] dark:text-white flex font-bold">E-mail</p>
                    </div>            
                    {/* submit button */}
                    <div>
                        { errors.login && touchedFields.login ? (<p className="mt-[0.2rem]] text-pink-600 text-sm pl-2 w-[100%]">{errors.login?.message}</p>) : (null)}
                        { errors.password && touchedFields.password ? (<p className="mt-[0.2rem]] text-pink-600 text-sm pl-2 w-[100%]">{errors.password?.message}</p>) : null}
                        { errors.repeat && touchedFields.repeat ? (<p className="mt-[0.2rem]] text-pink-600 text-sm pl-2 w-[100%]">{errors.repeat?.message}</p>) : null}
                        { errors.email && touchedFields.email ? (<p className="mt-[0.2rem]] text-pink-600 text-sm pl-2 w-[100%]">{errors.email?.message}</p>) : null}
                        { au != "" ? (<p className="mt-[0.2rem]] text-pink-600 text-sm pl-2 w-[100%]">{au}</p>) : null}
                    </div>
                    <div className='w-[100%] min-h-[3rem] h-[2vw] flex flex-row justify-center px-0 mt-8 items-center'>
                        <button type='submit' className='active:translate-y-0.5 duration-[10ms] shrink-1 text-[1.8rem] font-["Roboto"] text-black text-center font-bold drop-shadow-buttonDevil active:drop-shadow-buttonDevilA border-black border-solid border-[1px] rounded-[10px] py-1 px-4 bg-[#FF5C00] hover:bg-[#ff7d31]'>Create account</button>
                    </div>
                </form>         
                <div className="mt-5">
          <span className="text-[1rem] font-['Roboto'] dark:text-white font-bold">
            Already on Nigdit? &nbsp;
            <Link className="text-blue-500 hover:underline" href="/login">
              Sign in
            </Link>
          </span>
        </div>
        </div>
    </div>
  );
}
