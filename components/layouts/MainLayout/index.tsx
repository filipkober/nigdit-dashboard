import { ReactNode, useEffect } from 'react';
import Toast from '../../atoms/Toast';
import Navbar from '../../organism/Navbar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  
  useEffect( ()=> {
    return () =>     console.log(`
    $$\\   $$\\ $$\\           $$$$$$$\\  $$$$$$\\ $$$$$$$$\\
    $$$\\  $$ |\\__|          $$  __$$\\ \\_$$  _|\\__$$  __|
    $$$$\\ $$ |$$\\  $$$$$$\\  $$ |  $$ |  $$ |     $$ |
    $$ $$\\$$ |$$ |$$  __$$\\ $$ |  $$ |  $$ |     $$ |
    $$ \\$$$$ |$$ |$$ /  $$ |$$ |  $$ |  $$ |     $$ |
    $$ |\\$$$ |$$ |$$ |  $$ |$$ |  $$ |  $$ |     $$ |
    $$ | \\$$ |$$ |\\$$$$$$$ |$$$$$$$  |$$$$$$\\    $$ |
    \\__|  \\__|\\__| \\____$$ |\\_______/ \\______|   \\__|
                  $$\\   $$ |
                  \\$$$$$$  |
                   \\______/`);
  },[]);
  
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