import getCurrentUser from "@/actions/getCurrentUser";
import { INFINITE_SCROLLING_PAGINATION_RESULT } from "@/config";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import MiniCreatePost from "./components/MiniCreatePost";

export default async function SubredditPage({params}: { params: {
    slug: string
}}) {
    const { slug } = params; 
    const currentUser = await getCurrentUser(); 

   const subreddit = await  prisma.subreddit.findFirst({
    where: {
        name: slug
    }, 
    include: {
        posts: {
            include: {
                author: true, 
                votes: true, 
                comments: true, 
                subreddit: true, 
            }, 
            take: INFINITE_SCROLLING_PAGINATION_RESULT
        }
    }
   }); 

   if(!subreddit) {
    return notFound();
   }
    return (
        <div>
            <h1 className="font-bold text-3xl md:text-4xl h-14">
                r/{subreddit.name}
            </h1>
            <MiniCreatePost session={currentUser} />
            {/* TODO: show posts in user feed */}
            
           
        </div>
    )
}