'use client'; 

import { cn } from '@/lib/utils'
import { FC, useCallback, useState } from 'react'
import { Button } from './ui/Button'
import { Github } from 'lucide-react'; 
import { signIn } from 'next-auth/react'; 
import { useToast } from '@/hooks/use-toast';
import { ClipLoader } from 'react-spinners'; 


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  className: string; 
  
}

const UserAuthForm: FC<UserAuthFormProps> = ({
  className, 
  ...props
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false); 
  const { toast }  = useToast(); 

  const loginWithGitHub = useCallback(async () => {
    setIsLoading(true); 
    try {
     
      await signIn('github')
      toast({
        title: "Login success", 
        variant: 'default', 

      })
    } catch(error: any) {
      toast({
        title: "Something went wrong", 
        description: "There was an error signing in with github",
        variant: 'destructive'
      })
        

    } finally {
      setIsLoading(false); 

    }


  }, [toast])
  return (
    <div
      className={cn("flex justify-center", className)}
      {...props}
    >
      <Button
        size="sm"
        className="w-full"
        disabled={isLoading}
        onClick={loginWithGitHub}

      >
        {isLoading ? (
          <ClipLoader color="red" />

        ): (
          <>
       <Github />
       GitHub
          </>
        )}
        
      </Button>
        
    </div>
  )

}

export default UserAuthForm