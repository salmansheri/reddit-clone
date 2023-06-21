'use client'; 

import Link from 'next/link'
import React from 'react'
import { Icons } from './Icons'
import { Button, buttonVariants } from './ui/Button'
import { signOut, useSession } from 'next-auth/react'; 
import UserProfile from './UserProfile';

const Navbar = () => {
    const {data: session } = useSession(); 
    console.log(session); 
  return (
    <div
        className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 x-[10] py-2"
    >
        <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
            {/* logo  */}
            <Link href="/" className="flex gap-2 items-center">
                <Icons.logo 
                    className="h-8 w-8 sm:h-6 sm:w-6"

                />
                <p className="text-zinc-700 text-sm font-medium md:block">
                    Reddit
                </p>


            </Link>
            {/* search bar  */}

            {!session?.user?.email ? (

                <Link href="/signin" className={buttonVariants()}>Sign in</Link>
            ): (
               <UserProfile user={session.user} />
            )}

        </div>
    </div>
  )
}

export default Navbar