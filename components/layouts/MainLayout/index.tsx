import React, { ReactNode } from 'react';
import Navbar from '../../molecules/Navbar';
import Toast from '../../atoms/Toast';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
    <div>
      <Navbar />
    </div>
    <main>
      {children}
    </main>
    <Toast />
    </>
  )
}
