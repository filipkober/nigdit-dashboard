import Link from 'next/link';
import React from 'react';

export default function ReactLoggedLinks() {
  return (
    <>
      <Link className="bg-[#272727]" href="/">
        Home
      </Link>

      <Link href="/my-account">Account</Link>
      <Link className="bg-[#272727]" href="/new/post">
        Create Post
      </Link>
      <Link href="/logout">Log out</Link>
    </>
  );
}
