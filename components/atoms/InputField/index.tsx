import React, { InputHTMLAttributes, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { Formik, Field, Form, FormikHelpers } from 'formik';

type Parameters = {
    className?: string,
    name: string,
    id: string,
    placeholder: string,
    type: string,
    peer?: boolean,
    peerValue?: string
}

export default function InputField({className, name, id, placeholder, type, peer, peerValue} : Parameters)
{
    return(  
    <div className={className}>
          <Field className='peer focus:border-[#FF5C00] focus:ring-2 focus:ring-[#FF5C00] invalid:ring-1 invalid:ring-pink-500 focus:invalid:ring-2 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 drop-shadow-lucifer w-[100%] mx-[0.5rem] px-[0.5rem] min-h-[2rem] h-[100%] text-black text-[1.2rem] font-["Roboto"] bg-white outline-none border-black border-solid border-[1px] rounded-[5px]' id={id} name={name} placeholder={placeholder} type={type}/>
          {peer ? (<p className="mt-[0.2rem]] invisible peer-invalid:visible text-pink-600 text-sm pl-2 w-[100%]">{peerValue}</p>) : ("")}
    </div>
    );  
}