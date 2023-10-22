import Spinner from '../../atoms/Spinner';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { MdDone } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { resetData } from '../../../store/userSlice';

export default function LogoutScreen() {
  const router = useRouter();
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const dispatch = useDispatch();

  const notLoggedOut = (
    <div className="flex flex-col justify-center items-center place-content-center h-screen font-['Roboto'] space-y-[5vh]">
      <div className="text-2xl">
        <p>Logging Out... Please Wait</p>
      </div>
      <div>
        <Spinner />
      </div>
    </div>
  );

  const loggedOut = (
    <div className="flex flex-col justify-center items-center place-content-center h-screen w-screen font-['Roboto'] space-y-[5vh]">
      <div className="text-2xl">
        <p>Succefully logged out!</p>
      </div>
      <div>
        <MdDone fontWeight={600} size={48} />
      </div>
    </div>
  );

  useEffect(() => {
    setTimeout(() => {
      router.push({
        pathname: '/',
      });
    }, 3000);
  }, []);

  return (
    <>
      {useEffect(() => {
        Cookies.remove('jwt');
        dispatch(resetData())
        setTimeout(() => {
          setIsLoggedOut(true);
        }, 2000);
      }, [])}

      {isLoggedOut == true ? loggedOut : notLoggedOut}
    </>
  );
}