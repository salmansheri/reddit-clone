'use client'; 

import UserAvatar from '@/components/UserAvatar';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { User } from '@prisma/client';
import { ImageIcon, Link2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { FC } from 'react'

interface MiniCreatePostProps {
    session: User | null; 
  
}

const MiniCreatePost: FC<MiniCreatePostProps> = ({ session }) => {
    const router = useRouter(); 

    const pathname = usePathname(); 

  return <li className="overflow-hidden rounded-md bg-white shadow">
    <div className="h-full px-6 py-4 flex justify-between gap-6">
        <div className="relative">
            <UserAvatar user={{
                name: session?.name || null, 
                image: session?.image || null, 
            }} />

            <span
                className="absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500 outline outline-2 outline-white"
            >

            </span>

        </div>

        <Input readOnly onClick={() => router.push(`${pathname}/submit`)} placeholder='Create Post' />

        <Button variant="ghost" onClick={() => router.push(`${pathname}/submit`)}>
            <ImageIcon className='text-zinc-600' />
        </Button>
        <Button
            onClick={() => router.push(pathname + "/submit")}
            variant="ghost"
        >
            <Link2 className="text-zinc-600" />

        </Button>

    </div>

  </li>
}

export default MiniCreatePost