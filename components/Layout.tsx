
'use client';

import { usePathname } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = ['/order','/account', '/login', '/signup'].includes(pathname ?? '');


  return (
    <>
      {!hideLayout && <Nav />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
