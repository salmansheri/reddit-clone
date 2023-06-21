"use client";

import { FC, useCallback } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from 'react-hook-form'
import { PostCreationRequest, PostValidator } from "@/lib/validators/post";
import { zodResolver } from '@hookform/resolvers/zod'

interface EditorProps {
    subredditId: number, 
}

const Editor: FC<EditorProps> = ({ subredditId }) => {
    const {
        register, 
        handleSubmit, 
        formState: {
            errors
        }
    } = useForm<PostCreationRequest>({
        resolver: zodResolver(PostValidator), 
        defaultValues: {
            subredditId, 
            title: "", 
            content: null, 

        }
    })

    const initialEditor = useCallback(async () => {
        const EditorJS = (await import("@editorjs/editorjs")).default
        const Header = (await import('@editorjs/header')).default
        

    }, [])
  return (
    <div className="w-full bg-zinc-50 rounded-lg border border-zinc-200">
      <form id="subreddit-post-form" className="w-full" onSubmit={() => {}}>
        <div className="prose prose-stone dark:prose-invert">
          <TextareaAutosize
            placeholder="Title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none p-3"
          />
        </div>
      </form>
    </div>
  );
};

export default Editor;
