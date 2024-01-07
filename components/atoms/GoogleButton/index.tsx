import Image from 'next/image';
import React from 'react';
import googleLogo from '../../../assets/google-icon.svg';

interface GoogleLoginButtonProps {
  isRegister?: boolean;
  onClick: () => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ isRegister = false, onClick }) => {
  return (
    <button type="button" className="flex items-center justify-center px-4 py-3 rounded-full bg-white text-[#373737] border-[1px] font-bold shadow-md border-[#000000] hover:bg-gray-100 transition-colors duration-300" onClick={onClick}>
      <Image src={googleLogo} width={128} height={128} alt={''} className="h-8 w-8 mr-2"/>
      <span>{isRegister ? 'Register with Google' : 'Login with Google'}</span>
    </button>
  );
};

export default GoogleLoginButton;