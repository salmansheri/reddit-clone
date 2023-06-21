'use client'; 

import { Button } from '@/components/ui/Button'
import { SubscribeToSubredditPayload } from '@/lib/validators/subreddit';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { FC, startTransition } from 'react'; 
import { useRouter } from 'next/navigation'; 
import { toast } from '@/hooks/use-toast';
import { Loader, Loader2 } from 'lucide-react'; 
import { ClipLoader } from 'react-spinners';


interface SubscribeLeaveToggleProps {
  subredditId: number; 
  subredditName: string; 
  isSubscribed: boolean; 
  
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({ subredditId, subredditName, isSubscribed }) => {
  const router = useRouter(); 
  

    const { mutate: subscribe, isLoading: isSubLoading } =  useMutation({
      mutationFn: async () => {
        const payload: SubscribeToSubredditPayload = {
          subredditId, 

        }

        const { data } = await axios.post("/api/subreddit/subscribe", payload)

        return data; 

      }, 
      onError: (error: any) => {
        if(error instanceof AxiosError) {
          if(error.response?.status == 401) {
            router.push("/signin")
          }
        }
        return toast({
          title: "There was a problem", 
          description: "Something went wrong", 
          variant: "destructive", 

        })

      }, 
      onSuccess: (data) => {
        startTransition(() => {
          router.refresh(); 
        })

        return toast({
          title: "Subsribed", 
          description: `You are now subsribed to ${ subredditName }`
        })

      }

    })
    const { mutate: unSubscribe, isLoading: isUnsubscribing } =  useMutation({
      mutationFn: async () => {
        const payload: SubscribeToSubredditPayload = {
          subredditId, 

        }

        const { data } = await axios.post("/api/subreddit/unsubscribe", payload)

        return data; 

      }, 
      onError: (error: any) => {
        if(error instanceof AxiosError) {
          if(error.response?.status == 401) {
            router.push("/signin")
          }
        }
        return toast({
          title: "There was a problem", 
          description: "Something went wrong", 
          variant: "destructive", 

        })

      }, 
      onSuccess: (data) => {
        startTransition(() => {
          router.refresh(); 
        })

        return toast({
          title: "Subsribed", 
          description: `You are now subsribed to ${ subredditName }`
        })

      }

    })

  return (
    <div>
        {isSubscribed ? (
            <Button onClick={() => unSubscribe()} size="fullwidth" >{isUnsubscribing ? (<Loader2 className="h-4 w-4 animate-spin" />): "Leave this community"}</Button>

        ): (
            <Button onClick={() => subscribe()} size="fullwidth">{isSubLoading ? (<Loader2 className="h-4 w-4 animate-spin" />) : "Join the subreddit"}</Button>

        )}
    </div>
  )
}

export default SubscribeLeaveToggle