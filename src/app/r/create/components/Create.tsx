"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FC, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CreateSubredditPayload } from "@/lib/validators/subreddit";
import { toast } from "@/hooks/use-toast";

interface CreateProps {}

const Create: FC<CreateProps> = ({}) => {
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const {
    mutate: createCommunity,
    isLoading,
    
  
  } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubredditPayload = {
        name: input,
      };
      const { data } = await axios.post("/api/subreddit", payload);
      return data as string; 
    },
    onError: (error) => {
      if(error instanceof AxiosError) {
        if(error?.response?.status === 409) {
          return toast({
            title: "Subreddit already Exists", 
            description: "Please choose a different subreddit name.", 
            variant: "destructive"
          })

        }
        if(error?.response?.status === 422) {
          return toast({
            title: "Invalid Subreddit Name", 
            description: "Please choose a different subreddit name.", 
            variant: "destructive"
          })

        }

        if(error.response?.status === 401) {
          return router.push("/sign-in")
        } 

       
      }
    }, 
    onSuccess: (data) => {
      router.push(`/r/${data}`)

    }
  });

  return (
    <div className="container flex items-center h-full max-w-3xl mx-auto ">
      <div className="relative bg-white w-full h-fit p-4 rounded-lg space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Create a community</h1>
        </div>
        <hr className="bg-zinc-500 h-px" />

        <div className="">
          <p className="text-lg font-medium">Name</p>
          <p className="text-xs pb-2">
            Community names including capitalization cannot be changed
          </p>

          <div className="relative">
            <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center ">
              r/
            </p>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="pl-6"
            />
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button onClick={() => router.back()} variant="outline">
            Cancel
          </Button>
          <Button
            disabled={input.length === 0 || isLoading}
            onClick={() => createCommunity()}
          >
            Create Community
          </Button>
         
        </div>
      </div>
    </div>
  );
};

export default Create;
