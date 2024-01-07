import Link from 'next/link';
import React from 'react';

export default function MenuNotLoggedLinks() {
  return (
    <>
      <Link className="bg-[#272727]" href="/">
        Home
      </Link>
      <Link href="/login">Login</Link>
      <Link className="bg-[#272727]" href="/register">
        Register
      </Link>
    </>
  );
}
