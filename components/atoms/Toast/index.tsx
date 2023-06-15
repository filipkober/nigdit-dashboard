import React from 'react';
import { ToastContainer, ToastOptions,  toast } from 'react-toastify';
import ToastType  from '../../../models/ToastType';

 type toastProps = {
   style: ToastType;
   message: string;
 };

export function toastDisplay(style: ToastType, message: string) {
    switch (style) {
        case ToastType.Success:
            toast.success(message, { className: 'bg-accentL text-black dark:bg-accentD dark:text-white' });
            break;
        case ToastType.Error:
            toast.error(message, { className: 'bg-accentL text-black dark:bg-accentD dark:text-white' });
            break;
        case ToastType.Warning:
            toast.warning(message, { className: 'bg-accentL text-black dark:bg-accentD dark:text-white' });
            break;
        case ToastType.Info:
            toast.info(message, { className: 'bg-accentL text-black dark:bg-accentD dark:text-white' });
            break;
        default:
            toast(message, { className: 'bg-accentL text-black dark:bg-accentD dark:text-white' });
            break;
    }
}

export default function Toast({}: any) {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      theme='dark'
    />
  );
}
