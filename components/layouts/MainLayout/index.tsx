import React, { ReactNode } from 'react';
import Navbar from '../../molecules/Navbar';

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
    </>
  )
}
