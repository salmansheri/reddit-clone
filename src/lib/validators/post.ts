import { z } from 'zod'; 

export const PostValidator = z.object({
    title: z.string().min(3, {message: "Title must be longer than 3 charactors" }).max(128, { message: "Title cannot be more than 128 characters"}), 
    subredditId: z.number(), 
    content: z.any(), 
})

export type PostCreationRequest = z.infer<typeof PostValidator>; 

