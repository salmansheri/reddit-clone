import { Button } from "@/components/ui/Button";
import prisma from "@/lib/db"
import { notFound } from "next/navigation";
import Editor from "../components/Editor";

export default async function CreatePage({params}: { params: {
    slug: string, 
}}) {

    const subreddit = await prisma.subreddit.findFirst({
        where: {
            name: params.slug, 
        }
    }); 

    if(!subreddit) {
        return notFound(); 
    }
    return (
        <div
            className="flex flex-col items-start gap-6"

        >
            <div className="border-b border-gray-200 pb-5">
                <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
                    <h3 className="ml-2 mt-2 text-base font-semibold leading-6 text-gray-900 ">Create Post</h3>
                    <p className="ml-2 mt-1 truncate text-sm text-gray-500">in r/{params.slug}</p>

                </div>

            </div>

            {/* form  */}
            <Editor 
                subredditId={subreddit.id}
            />
            <div className="w-full flex ">
                <Button type="submit" size="fullwidth" className="w-full" form="subreddit-post-form">
                    Post
                </Button>

            </div>
             
            
        </div>
    )
}