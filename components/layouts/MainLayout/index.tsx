import { ReactNode } from 'react';
import Toast from '../../atoms/Toast';
import Navbar from '../../organism/Navbar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
    <main className='min-h-screen'>
      <Navbar/>
      {children}
    </main>
    <Toast/>
    </>
  )
}