import { FC } from 'react'; 
import { User } from 'next-auth'; 
import { Avatar, AvatarFallback } from './ui/Avatar';
import Image from 'next/image';
import { Icons } from './Icons';
import { AvatarProps } from '@radix-ui/react-avatar';

interface UserAvatarProps extends AvatarProps {
    user: Pick<User, 'name' | 'image'>
  
}

const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
  return (
    <Avatar {...props}>
        {user.image ? (
            <div className="relative h-full w-full">
                <Image 
                    fill
                    src={user.image as string}
                    alt={user.name!}
                    


                />
            </div>
            
        ): (
            <AvatarFallback>
                <span
                    className=""
                >
                    
                    <Icons.user className="h-4 w-4" />

                </span>
            </AvatarFallback>

        )}
    </Avatar>
  )
}

export default UserAvatar